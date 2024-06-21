import React, { useState } from 'react'
import Button from '../Button'
import { UserContext } from '../../../App'
export interface SelectRootFieldProps {
  carMake: any
  borderRight?: string
  placeholder?: string | any[]
  name?: string
  handleChange: Function
  filled?: boolean
  initialValue?: string
  disabled?: boolean
}

const carMakes = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Nissan',
  'Volkswagen',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Hyundai',
  'Kia',
  'Subaru',
  'Mazda',
  'Jeep',
  'Lexus',
  'Volvo',
  'Tesla',
  'Ram',
  'GMC',
  'Chrysler',
]

const carModelsByMake: any = {
  Toyota: [
    'Camry',
    'Corolla',
    'RAV4',
    'Highlander',
    'Tacoma',
    'Sienna',
    'Prius',
  ],
  Honda: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V'],
  Ford: ['F-150', 'Escape', 'Explorer', 'Focus', 'Edge', 'Fusion', 'Mustang'],
  Chevrolet: [
    'Silverado',
    'Equinox',
    'Tahoe',
    'Malibu',
    'Cruze',
    'Traverse',
    'Impala',
  ],
  Nissan: [
    'Altima',
    'Rogue',
    'Sentra',
    'Pathfinder',
    'Murano',
    'Versa',
    'Maxima',
  ],
  Volkswagen: [
    'Jetta',
    'Passat',
    'Tiguan',
    'Atlas',
    'Golf',
    'Beetle',
    'Arteon',
  ],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'X1', '4 Series'],
  'Mercedes-Benz': [
    'C-Class',
    'E-Class',
    'GLC',
    'GLE',
    'S-Class',
    'CLA',
    'GLA',
  ],
  Audi: ['A4', 'Q5', 'A3', 'Q7', 'A6', 'Q3', 'A5'],
  Hyundai: [
    'Elantra',
    'Tucson',
    'Santa Fe',
    'Sonata',
    'Kona',
    'Accent',
    'Veloster',
  ],
  Kia: ['Optima', 'Sorento', 'Soul', 'Sportage', 'Forte', 'Telluride', 'Rio'],
  Subaru: [
    'Outback',
    'Forester',
    'Impreza',
    'Crosstrek',
    'Legacy',
    'WRX',
    'Ascent',
  ],
  Mazda: ['Mazda3', 'CX-5', 'Mazda6', 'CX-9', 'MX-5 Miata', 'CX-3'],
  Jeep: [
    'Wrangler',
    'Cherokee',
    'Grand Cherokee',
    'Renegade',
    'Compass',
    'Gladiator',
    'Wrangler Unlimited',
  ],
  Lexus: ['RX', 'ES', 'NX', 'RX Hybrid', 'IS', 'GX', 'LS'],
  Volvo: ['XC90', 'XC60', 'S60', 'XC40', 'S90', 'V60', 'V90'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Roadster', 'Cybertruck'],
  Ram: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'],
  GMC: ['Sierra', 'Terrain', 'Acadia', 'Canyon', 'Yukon', 'Savana', 'Envoy'],
  Chrysler: ['300', 'Pacifica', 'Voyager', 'Pacifica Hybrid'],
}

const yearManufactured = [
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
]

// Engine Size (in CC)
const engineSizes = [
  'Under 1000',
  '1000 - 1500',
  '1501 - 2000',
  '2001 - 2500',
  'Over 2500',
]

// Estimated Annual Mileage (in miles)
const annualMileages = [
  'Under 5000',
  '5000 - 10000',
  '10001 - 15000',
  '15001 - 20000',
  'Over 20000',
]

// Overnight Parking
const overnightParkingOptions = ['Garage', 'Driveway', 'Street']

// Cover Durations
const coverDurations = ['2 weeks', '30 days', '90 days', '180 days', '365 days']

// Cover Type
const coverTypes = [
  'Comprehensive',
  'Third Party, Fire & Theft',
  'Third Party Only',
]

// Usage
const usageTypes = [
  'Social, Domestic & Pleasure',
  'Commute to Work',
  'Business Use',
]

// Security Measures
const securityMeasures = [
  'Alarm',
  'Immobiliser',
  'Tracker',
  'Steering Lock',
  'None',
]

// Driving Offences
const drivingOffences = [
  'None',
  'Speeding',
  'Drink Driving',
  'Careless Driving',
  'Other',
]

// Claims History
const claimsHistory = ['None', '1 Claim', '2 Claims', '3 Claims', '4+ Claims']

// Risk Address
const riskAddresses = ['Urban', 'Suburban', 'Rural']

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]

const yearOptions = [
  '1950',
  '1951',
  '1952',
  '1953',
  '1954',
  '1955',
  '1956',
  '1957',
  '1958',
  '1959',
  '1960',
  '1961',
  '1962',
  '1963',
  '1964',
  '1965',
  '1966',
  '1967',
  '1968',
  '1969',
  '1970',
  '1971',
  '1972',
  '1973',
  '1974',
  '1975',
  '1976',
  '1977',
  '1978',
  '1979',
  '1980',
  '1981',
  '1982',
  '1983',
  '1984',
  '1985',
  '1986',
  '1987',
  '1988',
  '1989',
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
]

function RiskSelectRootField({
  carMake,
  borderRight,
  placeholder,
  name,
  handleChange,
  filled,
  initialValue,
  disabled,
}: SelectRootFieldProps) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((v) => !v)

  const ErrorMessage = () => {
    return (
      <span style={{ color: 'red' }}>
        {filled ? 'Error, Please enter a valid value' : 'Required!'}
      </span>
    )
  }

  const [value, setValue] = useState(initialValue ? initialValue : '')
  const [selected, setSelected] = useState(true)
  const changeValue = (value: string) => {
    setValue(value)
    handleChange(name, value)
    toggleOpen()
  }
  const { theme } = React.useContext(UserContext)

  var options = ['Demmy 1', 'Demmy 2', 'Demmy 3']

  if (name === 'make') {
    options = carMakes
  } else if (name === 'model') {
    options = carModelsByMake[carMake]
  } else if (name === 'yearManufactured') {
    options = yearManufactured
  } else if (name === 'engineSize') {
    options = engineSizes
  } else if (name === 'annualMileage') {
    options = annualMileages
  } else if (name === 'overnightParking') {
    options = overnightParkingOptions
  } else if (name === 'coverDuration') {
    options = coverDurations
  } else if (name === 'coverType') {
    options = coverTypes
  } else if (name === 'usage') {
    options = usageTypes
  } else if (name === 'securityMeasures') {
    options = securityMeasures
  } else if (name === 'drivingOffences') {
    options = drivingOffences
  } else if (name === 'claimHistory') {
    options = claimsHistory
  } else if (name === 'riskAddress') {
    options = riskAddresses
  } else if (name === 'country') {
    options = countries
  } else if (name === 'yearObtainedLicence') {
    options = yearOptions
  }

  return (
    <div className="w-full">
      <div
        className={`rounded h-10 bg-dark-800 dark:bg-light-800 cursor-pointer flex items-center justify-between dark:box-border-2x-dark ${
          borderRight || ''
        }`}
        style={{
          border: `1px solid ${
            (!filled || !selected) && value === ''
              ? 'red'
              : theme === 'dark'
              ? '#bbbbbb'
              : '#43444B'
          }`,
          borderColor:
            (!filled || !selected) && value === ''
              ? 'red'
              : theme === 'dark'
              ? '#bbbbbb'
              : '#43444B',
        }}
        onClick={() => {
          if (!disabled) {
            toggleOpen()
          }
        }}
        // onBlur={() => {
        //   if (value === '') {
        //     setSelected(false)
        //   }
        // }}
      >
        <span className="block px-5 py-3 text-lg truncate">
          {value === '' ? (
            <span className="text-dark-650" aria-label="placeholder">
              {placeholder}
            </span>
          ) : (
            <span
              className="text-white dark:text-dark-800"
              aria-label="selected input value"
            >
              {value}
            </span>
          )}
        </span>
        <img className="mr-4" src="/images/Frame 2928.svg" alt="" />
      </div>
      {/* {!filled && value === '' && ErrorMessage()} */}
      {open && (
        <div className="relative z-10 bg-brand-300">
          <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-transparent -z-10"
            onClick={toggleOpen}
          />
          <div className="absolute z-10 top-0.5 left-0 right-0">
            {options.map((value, index) => (
              <Button
                onClick={() => changeValue(value)}
                key={index}
                className="justify-start w-full dark:bg-white dark:hover:bg-light-1200"
                color={theme == 'dark' ? '' : 'dark'}
                text={value}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RiskSelectRootField
