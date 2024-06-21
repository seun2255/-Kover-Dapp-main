const carModelValues: { [key: string]: number } = {
  Camry: 1000,
  Corolla: 800,
  RAV4: 1200,
  Highlander: 1500,
  Tacoma: 1400,
  Sienna: 1600,
  Prius: 1200,
  Accord: 1100,
  Civic: 900,
  'CR-V': 1300,
  Pilot: 1600,
  Odyssey: 1800,
  Fit: 1000,
  'HR-V': 1100,
  'F-150': 1800,
  Escape: 1500,
  Explorer: 1800,
  Focus: 900,
  Edge: 1600,
  Fusion: 1200,
  Mustang: 2000,
  Silverado: 1900,
  Equinox: 1300,
  Tahoe: 2200,
  Malibu: 1500,
  Cruze: 900,
  Traverse: 1700,
  Impala: 1600,
  Altima: 1100,
  Rogue: 1300,
  Sentra: 900,
  Pathfinder: 1600,
  Murano: 1500,
  Versa: 800,
  Maxima: 1800,
  Jetta: 1200,
  Passat: 1300,
  Tiguan: 1500,
  Atlas: 1800,
  Golf: 1100,
  Beetle: 1000,
  Arteon: 2000,
  '3 Series': 1700,
  '5 Series': 2200,
  X3: 2000,
  X5: 2400,
  '7 Series': 2600,
  X1: 1400,
  '4 Series': 1700,
  'C-Class': 1800,
  'E-Class': 2200,
  GLC: 2000,
  GLE: 2400,
  'S-Class': 3500,
  CLA: 1600,
  GLA: 1400,
  A4: 1700,
  Q5: 1800,
  A3: 1500,
  Q7: 2700,
  A6: 2400,
  Q3: 1700,
  A5: 1800,
  Elantra: 1000,
  Tucson: 1300,
  'Santa Fe': 1500,
  Sonata: 1200,
  Kona: 1400,
  Accent: 800,
  Veloster: 900,
  Optima: 1200,
  Sorento: 1600,
  Soul: 1000,
  Sportage: 1400,
  Forte: 900,
  Telluride: 2200,
  Rio: 700,
  Outback: 1500,
  Forester: 1300,
  Impreza: 1100,
  Crosstrek: 1200,
  Legacy: 1300,
  WRX: 1800,
  Ascent: 2100,
  Mazda3: 1100,
  'CX-5': 1500,
  Mazda6: 1800,
  'CX-9': 2200,
  'MX-5 Miata': 1900,
  'CX-3': 1000,
  Wrangler: 2200,
  Cherokee: 1800,
  'Grand Cherokee': 2500,
  Renegade: 1400,
  Compass: 1300,
  Gladiator: 2000,
  'Wrangler Unlimited': 1900,
  RX: 2200,
  ES: 2400,
  NX: 1700,
  'RX Hybrid': 2500,
  IS: 1600,
  GX: 2200,
  LS: 3000,
  XC90: 2600,
  XC60: 2200,
  S60: 1700,
}

const importanceFactors = {
  yearManufactured: 0.05,
  engineSize: 0.1,
  annualMileage: 0.1,
  overnightParking: 0.05,
  coverDuration: 0.1,
  coverType: 0.5,
  usageType: 0.1,
  securityMeasures: 0.1,
  drivingOffences: 0.1,
  claimsHistory: 0.1,
  riskAddress: 0.05,
}

const yearManufactured: { [key: string]: number } = {
  '2000': 0.2,
  '2001': 0.2,
  '2002': 0.2,
  '2003': 0.2,
  '2004': 0.2,
  '2005': 0.2,
  '2006': 0.2,
  '2007': 0.2,
  '2008': 0.2,
  '2009': 0.2,
  '2010': 0.2,
  '2011': 0.2,
  '2012': 0.2,
  '2013': 0.2,
  '2014': 0.2,
  '2015': 0.2,
  '2016': 0.2,
  '2017': 0.2,
  '2018': 0.2,
  '2019': 0.2,
  '2020': 0.2,
  '2021': 0.2,
  '2022': 0.2,
  '2023': 0.2,
  '2024': 0.2,
}

const engineSizes: { [key: string]: number } = {
  'Under 1000': 0.1,
  '1000 - 1500': 0.3,
  '1501 - 2000': 0.5,
  '2001 - 2500': 0.7,
  'Over 2500': 0.9,
}

const annualMileages: { [key: string]: number } = {
  'Under 5000': 0.2,
  '5000 - 10000': 0.4,
  '10001 - 15000': 0.6,
  '15001 - 20000': 0.8,
  'Over 20000': 1.0,
}

const overnightParkingOptions: { [key: string]: number } = {
  Garage: 0.2,
  Driveway: 0.5,
  Street: 0.8,
}

const coverDurations: { [key: string]: number } = {
  '2 weeks': 0.1,
  '30 days': 0.3,
  '90 days': 0.5,
  '180 days': 0.7,
  '365 days': 1.0,
}

const coverTypes: { [key: string]: number } = {
  Comprehensive: 0.6,
  'Third Party, Fire & Theft': 0.8,
  'Third Party Only': 1.0,
}

const usageTypes: { [key: string]: number } = {
  'Social, Domestic & Pleasure': 0.6,
  'Commute to Work': 0.8,
  'Business Use': 1.0,
}

const securityMeasures: { [key: string]: number } = {
  Alarm: 0.2,
  Immobiliser: 0.4,
  Tracker: 0.6,
  'Steering Lock': 0.8,
  None: 1.0,
}

const drivingOffences: { [key: string]: number } = {
  None: 0.2,
  Speeding: 0.4,
  'Drink Driving': 0.6,
  'Careless Driving': 0.8,
  Other: 1.0,
}

const claimsHistory: { [key: string]: number } = {
  None: 0.2,
  '1 Claim': 0.4,
  '2 Claims': 0.6,
  '3 Claims': 0.8,
  '4+ Claims': 1.0,
}

const riskAddresses: { [key: string]: number } = {
  Urban: 0.4,
  Suburban: 0.6,
  Rural: 0.8,
}

interface CarInsuranceOptions {
  model: string
  yearManufactured: string
  engineSize: string
  annualMileage: string
  overnightParking: string
  coverDuration: string
  coverType: string
  usage: string
  securityMeasures: string
  drivingOffences: string
  claimHistory: string
  riskAddress: string
}

interface InsuranceValues {
  premiumQuote: number
  maxExposure: number
  src: number
  deductiblePerc: number
  riskFactor: number
}

function calculatePremiumQuote(options: CarInsuranceOptions): InsuranceValues {
  // Get the car model value
  const modelValue = carModelValues[options.model] || 0

  // Get the values from the initial option types
  const yearManufacturedValue = yearManufactured[options.yearManufactured] || 0
  const engineSizeValue = engineSizes[options.engineSize] || 0
  const annualMileageValue = annualMileages[options.annualMileage] || 0
  const overnightParkingValue =
    overnightParkingOptions[options.overnightParking] || 0
  const coverDurationValue = coverDurations[options.coverDuration] || 0
  const coverTypeValue = coverTypes[options.coverType] || 0
  const usageTypeValue = usageTypes[options.usage] || 0
  const securityMeasuresValue = securityMeasures[options.securityMeasures] || 0
  const drivingOffencesValue = drivingOffences[options.drivingOffences] || 0
  const claimsHistoryValue = claimsHistory[options.claimHistory] || 0
  const riskAddressValue = riskAddresses[options.riskAddress] || 0

  // Calculate the weighted sum of importance factors
  const importanceSum =
    yearManufacturedValue * importanceFactors.yearManufactured +
    engineSizeValue * importanceFactors.engineSize +
    annualMileageValue * importanceFactors.annualMileage +
    overnightParkingValue * importanceFactors.overnightParking +
    coverDurationValue * importanceFactors.coverDuration +
    coverTypeValue * importanceFactors.coverType +
    usageTypeValue * importanceFactors.usageType +
    securityMeasuresValue * importanceFactors.securityMeasures +
    drivingOffencesValue * importanceFactors.drivingOffences +
    claimsHistoryValue * importanceFactors.claimsHistory +
    riskAddressValue * importanceFactors.riskAddress

  // Calculate the premium quote
  const premiumQuote = modelValue * importanceSum

  // Calculate max_exposure based on the value of the car model
  const maxExposure = carModelValues[options.model] * 1.5 // Assumed to be 1.5 times the value of the car model

  // Calculate src based on the max premium quote
  const src = maxExposure * 0.2 // Assumed to be 10% of max_exposure

  // Calculate deductible_perc as a percentage between 0% and 30%
  const deductiblePerc = Math.random() * 0.3 // Random percentage for deductible between 0% and 30%

  // Calculate risk_factor based on the average of all importance factors
  const riskFactor =
    (yearManufactured[options.yearManufactured] +
      engineSizes[options.engineSize] +
      annualMileages[options.annualMileage] +
      overnightParkingOptions[options.overnightParking] +
      coverDurations[options.coverDuration] +
      coverTypes[options.coverType] +
      usageTypes[options.usage] +
      securityMeasures[options.securityMeasures] +
      drivingOffences[options.drivingOffences] +
      claimsHistory[options.claimHistory] +
      riskAddresses[options.riskAddress]) /
    11 // Averaged sum of all options, since there are 11 options

  return {
    premiumQuote: Math.round(parseFloat(premiumQuote.toFixed(2))),
    maxExposure: Math.round(parseFloat(maxExposure.toFixed(2))),
    src: Math.round(parseFloat(src.toFixed(2))),
    deductiblePerc: Math.round(parseFloat(deductiblePerc.toFixed(2)) * 100),
    riskFactor: Math.round(parseFloat(riskFactor.toFixed(2)) * 100),
  }
}

export default calculatePremiumQuote
