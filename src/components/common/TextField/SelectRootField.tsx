import React, { useState } from 'react'
import Button from '../Button'
import { UserContext } from '../../../App'
export interface SelectRootFieldProps {
  borderRight?: string
  placeholder?: string | any[]
  name?: string
  handleChange: Function
  filled?: boolean
}

const dayOptions = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
]
const monthOptions = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
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

const phoneCodes = [
  '+1', // United States
  '+44', // United Kingdom
  '+81', // Japan
  '+86', // China
  '+91', // India
  '+49', // Germany
  '+33', // France
  '+7', // Russia
  '+55', // Brazil
  '+92', // Pakistan
  '+93', // Afghanistan
  '+355', // Albania
  '+213', // Algeria
  '+376', // Andorra
  '+244', // Angola
  '+54', // Argentina
  '+374', // Armenia
  '+297', // Aruba
  '+61', // Australia
  '+43', // Austria
  '+994', // Azerbaijan
  '+973', // Bahrain
  '+880', // Bangladesh
  '+375', // Belarus
  '+32', // Belgium
  '+501', // Belize
  '+229', // Benin
  '+975', // Bhutan
  '+591', // Bolivia
  '+387', // Bosnia and Herzegovina
  '+267', // Botswana
  '+55', // Brazil
  '+673', // Brunei
  '+359', // Bulgaria
  '+226', // Burkina Faso
  '+257', // Burundi
  '+855', // Cambodia
  '+237', // Cameroon
  '+1', // Canada
  '+238', // Cape Verde
  '+236', // Central African Republic
  '+235', // Chad
  '+56', // Chile
  '+86', // China
  '+57', // Colombia
  '+269', // Comoros
  '+506', // Costa Rica
  '+385', // Croatia
  '+53', // Cuba
  '+357', // Cyprus
  '+420', // Czech Republic
  '+243', // Democratic Republic of the Congo
  '+45', // Denmark
  '+253', // Djibouti
  '+1', // Dominica
  '+1', // Dominican Republic
  '+593', // Ecuador
  '+20', // Egypt
  '+503', // El Salvador
  '+240', // Equatorial Guinea
  '+291', // Eritrea
  '+372', // Estonia
  '+251', // Ethiopia
  '+500', // Falkland Islands
  '+298', // Faroe Islands
  '+679', // Fiji
  '+358', // Finland
  '+33', // France
  '+594', // French Guiana
  '+689', // French Polynesia
  '+241', // Gabon
  '+220', // Gambia
  '+995', // Georgia
  '+49', // Germany
  '+233', // Ghana
  '+350', // Gibraltar
  '+30', // Greece
  '+299', // Greenland
  '+1', // Grenada
  '+590', // Guadeloupe
  '+502', // Guatemala
  '+224', // Guinea
  '+245', // Guinea-Bissau
  '+592', // Guyana
  '+509', // Haiti
  '+504', // Honduras
  '+852', // Hong Kong
  '+36', // Hungary
  '+354', // Iceland
  '+91', // India
  '+62', // Indonesia
  '+98', // Iran
  '+964', // Iraq
  '+353', // Ireland
  '+972', // Israel
  '+39', // Italy
  '+225', // Ivory Coast
  '+1', // Jamaica
  '+81', // Japan
  '+962', // Jordan
  '+7', // Kazakhstan
  '+254', // Kenya
  '+686', // Kiribati
  '+965', // Kuwait
  '+996', // Kyrgyzstan
  '+856', // Laos
  '+371', // Latvia
  '+961', // Lebanon
  '+266', // Lesotho
  '+231', // Liberia
  '+218', // Libya
  '+423', // Liechtenstein
  '+370', // Lithuania
  '+352', // Luxembourg
  '+853', // Macau
  '+389', // Macedonia
  '+261', // Madagascar
  '+265', // Malawi
  '+60', // Malaysia
  '+960', // Maldives
  '+223', // Mali
  '+356', // Malta
  '+596', // Martinique
  '+222', // Mauritania
  '+230', // Mauritius
  '+262', // Mayotte
  '+52', // Mexico
  '+691', // Micronesia
  '+373', // Moldova
  '+377', // Monaco
  '+976', // Mongolia
  '+382', // Montenegro
  '+212', // Morocco
  '+258', // Mozambique
  '+95', // Myanmar
  '+264', // Namibia
  '+674', // Nauru
  '+977', // Nepal
  '+31', // Netherlands
  '+599', // Netherlands Antilles
  '+687', // New Caledonia
  '+64', // New Zealand
  '+505', // Nicaragua
  '+227', // Niger
  '+234', // Nigeria
  '+683', // Niue
  '+672', // Norfolk Island
  '+850', // North Korea
  '+47', // Norway
  '+968', // Oman
  '+92', // Pakistan
  '+680', // Palau
  '+507', // Panama
  '+675', // Papua New Guinea
  '+595', // Paraguay
  '+51', // Peru
  '+63', // Philippines
  '+48', // Poland
  '+351', // Portugal
  '+974', // Qatar
  '+242', // Republic of the Congo
  '+262', // Reunion
  '+40', // Romania
  '+7', // Russia
  '+250', // Rwanda
  '+590', // Saint Barthelemy
  '+290', // Saint Helena
  '+1', // Saint Kitts and Nevis
  '+590', // Saint Martin
  '+508', // Saint Pierre and Miquelon
  '+1', // Saint Vincent and the Grenadines
  '+685', // Samoa
  '+378', // San Marino
  '+239', // Sao Tome and Principe
  '+966', // Saudi Arabia
  '+221', // Senegal
  '+381', // Serbia
  '+248', // Seychelles
  '+232', // Sierra Leone
  '+65', // Singapore
  '+421', // Slovakia
  '+386', // Slovenia
  '+677', // Solomon Islands
  '+252', // Somalia
  '+27', // South Africa
  '+82', // South Korea
  '+211', // South Sudan
  '+34', // Spain
  '+94', // Sri Lanka
  '+249', // Sudan
  '+597', // Suriname
  '+268', // Swaziland
  '+46', // Sweden
  '+41', // Switzerland
  '+963', // Syria
  '+886', // Taiwan
  '+992', // Tajikistan
  '+255', // Tanzania
  '+66', // Thailand
  '+228', // Togo
  '+690', // Tokelau
  '+676', // Tonga
  '+1', // Trinidad and Tobago
  '+216', // Tunisia
  '+90', // Turkey
  '+993', // Turkmenistan
  '+688', // Tuvalu
  '+256', // Uganda
  '+380', // Ukraine
  '+971', // United Arab Emirates
  '+598', // Uruguay
  '+998', // Uzbekistan
  '+678', // Vanuatu
  '+39', // Vatican City
  '+58', // Venezuela
  '+84', // Vietnam
  '+681', // Wallis and Futuna
  '+967', // Yemen
  '+260', // Zambia
  '+263', // Zimbabwe
]

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

const identityTypes = [
  'Passport',
  "Driver's License",
  'National ID Card',
  'Voter ID',
  // 'National ID Number',
]

function SelectRootField({
  borderRight,
  placeholder,
  name,
  handleChange,
  filled,
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

  const [value, setValue] = useState('')
  const changeValue = (value: string) => {
    setValue(value)
    handleChange(name, value)
    toggleOpen()
  }
  const { theme } = React.useContext(UserContext)

  var options = ['Demmy 1', 'Demmy 2', 'Demmy 3']

  if (name === 'month') {
    options = monthOptions
  } else if (name === 'day') {
    options = dayOptions
  } else if (name === 'year') {
    options = yearOptions
  } else if (name === 'countryCode') {
    options = phoneCodes
  } else if (name === 'country') {
    options = countries
  } else if (name === 'identityType') {
    options = identityTypes
  } else {
    console.log(name)
  }

  return (
    <div className="w-full">
      <div
        className={`rounded h-10 bg-dark-800 dark:bg-light-800 cursor-pointer flex items-center justify-between dark:box-border-2x-dark ${
          borderRight || ''
        }`}
        style={{
          border: `1px solid ${
            !filled && value === ''
              ? 'red'
              : theme === 'dark'
              ? '#bbbbbb'
              : '#43444B'
          }`,
          borderColor:
            !filled && value === ''
              ? 'red'
              : theme === 'dark'
              ? '#bbbbbb'
              : '#43444B',
        }}
        onClick={toggleOpen}
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

export default SelectRootField
