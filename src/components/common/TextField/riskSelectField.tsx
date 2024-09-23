import React from 'react'
import InfoText from '../InfoText'
import RiskSelectRootField from './RiskSelectRootField'
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
  showRequiredMessage?: boolean
  initialValue?: any
  disabled?: boolean
  carMake?: string
}

function RiskSelectField({
  label,
  placeholder,
  labelIcon,
  className,
  name,
  handleDobChange,
  handleChange,
  showRequiredMessage,
  initialValue,
  disabled,
  carMake,
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
    console.log('name: ', name, ' value: ', value)
    if (name === 'dob' && typeof handleDobChange === 'function') {
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
          // className={theme === 'dark' ? 'text-white' : 'text-black'}
          color="white"
        />
      )}
      {label === false && <span className="h-[14px]" />}
      {typeof placeholder === 'object' ? (
        <div className="flex sm:gap-5 gap-[10px] items-center justify-between  ">
          {placeholder.map((value, index) => (
            <RiskSelectRootField
              carMake={carMake}
              placeholder={value}
              {...rest}
              name={value.toLowerCase()}
              handleChange={handleSelect}
              showRequiredMessage={showRequiredMessage}
              disabled={disabled}
              initialValue={
                initialValue ? initialValue.split('/')[index] : null
              }
            />
          ))}
        </div>
      ) : (
        <RiskSelectRootField
          carMake={carMake}
          placeholder={placeholder}
          {...rest}
          name={name}
          handleChange={handleSelect}
          showRequiredMessage={showRequiredMessage}
          disabled={disabled}
          initialValue={initialValue}
        />
      )}
    </div>
  )
}

export default RiskSelectField
