import React, { useState } from 'react'
import Button from '../Button'
import { UserContext } from '../../../App'
export interface SelectRootFieldProps {
  borderRight?: string
  placeholder?: string | any[]
  name?: string
  handleChange: Function
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

function SelectRootField({
  borderRight,
  placeholder,
  name,
  handleChange,
}: SelectRootFieldProps) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((v) => !v)

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
  }
  return (
    <div className="w-full">
      <div
        className={`rounded h-10 bg-dark-800 dark:bg-light-800 cursor-pointer flex items-center justify-between box-border-2x-light dark:box-border-2x-dark ${
          borderRight || ''
        }`}
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
