import React from 'react'
import InfoText from '../InfoText'
import SelectRootField, { SelectRootFieldProps } from './SelectRootField'
import { UserContext } from '../../../App'
import { useState } from 'react'

interface SelectField {
  label?: string | false
  labelIcon?: boolean
  className?: string
  name?: string
  handleDobChange?: Function
  handleChange?: Function
  borderRight?: string
  placeholder?: string | any[]
  filled?: boolean
  initialValue?: any
  disabled?: boolean
  pools?: string[]
}

function SelectField({
  label,
  placeholder,
  labelIcon,
  className,
  name,
  handleDobChange,
  handleChange,
  filled,
  initialValue,
  disabled,
  pools,
  ...rest
}: SelectField) {
  const { theme } = React.useContext(UserContext)
  const [dob, setDob] = useState({
    month: '01',
    day: '01',
    year: '1990',
  })

  // Generic change handler for all inputs
  const handleSelect = (title: string, value: any) => {
    if (
      (name === 'dob' || name === 'eventDate') &&
      typeof handleDobChange === 'function'
    ) {
      handleDobChange({ ...dob, [title]: value })
      setDob((prevState: any) => ({
        ...prevState,
        [title]: value,
      }))
    } else if (typeof handleChange === 'function') {
      handleChange({ target: { name, value } })
    }
  }
  return (
    <div className={`flex flex-col  ${className || 'flex flex-col gap-2.5'}`}>
      {label && (
        <InfoText
          variant="small"
          icon={labelIcon}
          text={label}
          className={theme === 'dark' ? 'dark' : 'white'}
        />
      )}
      {label === false && <span className="h-[14px]" />}
      {typeof placeholder === 'object' ? (
        <div className="flex sm:gap-5 gap-[10px] items-center justify-between  ">
          {placeholder.map((value, index) => (
            <SelectRootField
              placeholder={value}
              {...rest}
              name={value.toLowerCase()}
              handleChange={handleSelect}
              filled={filled}
              disabled={disabled}
              initialValue={
                initialValue ? initialValue.split('/')[index] : null
              }
            />
          ))}
        </div>
      ) : (
        <SelectRootField
          placeholder={placeholder}
          {...rest}
          name={name}
          handleChange={handleSelect}
          filled={filled}
          disabled={disabled}
          initialValue={initialValue}
          pools={pools}
        />
      )}
    </div>
  )
}

export default SelectField
