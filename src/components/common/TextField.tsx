import React, { useState } from 'react'
import { UserContext } from '../../App'
import InfoText from './InfoText'

interface TextFieldProps {
  label?: string | false
  name?: string
  labelIcon?: boolean
  placeholder?: string | string[]
  endElement?: JSX.Element
  variant?: 'contained' | 'outlined'
  field?: string
  outerClass?: string
  classname?: string
  verify?: boolean
  startVerification?: Function
  verificationState?: 'unverified' | 'verified' | 'verifying'
  outline?: boolean
  handleChange?: Function
  filled?: boolean
  initialValue?: string
  disabled?: boolean
}

function TextField(props: TextFieldProps) {
  const {
    label,
    placeholder,
    field,
    labelIcon,
    endElement,
    variant,
    outerClass,
    classname,
    verify = false,
    outline,
    name,
    handleChange,
    verificationState,
    startVerification,
    filled,
    initialValue,
    disabled,
  } = props
  const { theme } = React.useContext(UserContext)
  const [error, setError] = useState(false)
  const [value, setValue] = useState('')
  const checkIfCorrect = (text: any) => {
    // Use a regular expression to check for only alphabetical characters
    if (
      name === 'state' ||
      name === 'firstName' ||
      name === 'lastName' ||
      name === 'city'
    ) {
      const regex = /^[a-zA-Z]+$/
      regex.test(text) ? setError(false) : setError(true)
    } else if (name === 'postCode' || name === 'nationalID') {
      var regex = /^[0-9]+$/
      regex.test(text) ? setError(false) : setError(true)
    }
  }
  let variantStyle = 'bg-dark-800'
  if (variant === 'outlined') {
    variantStyle = 'border-2 border-dark-350'
  }

  const ErrorMessage = () => {
    return (
      <span style={{ color: 'red' }}>
        {filled && value !== ''
          ? 'Error, Please enter a valid value'
          : 'This filed is required'}
      </span>
    )
  }

  interface InputProps
    extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}
  const Input = ({ className, ...rest }: InputProps) => (
    <div
      className={`rounded relative flex gap-3 items-center h-10 ${variantStyle}`}
      style={{
        border: '1px solid white !important',
      }}
    >
      {field && <span className="inline-block ml-5 -mr-2">{field}</span>}
      <input
        {...rest}
        defaultValue={initialValue}
        disabled={disabled}
        className={`placeholder:text-dark-650 flex-grow text-white text-lg py-3 w-full ${className} ${
          field ? '' : 'px-5'
        }`}
      />
      {((!filled && value === '') || error) && ErrorMessage()}
    </div>
  )

  return (
    <div className={`flex flex-col gap-2.5 ${outerClass || ''}`}>
      {label && (
        <InfoText variant="small" icon={labelIcon} text={label} color="white" />
      )}
      {label === false && <span className="h-3.5" />}
      {typeof placeholder === 'object' ? (
        <div className="flex items-center justify-between gap-5 ">
          {placeholder.map((value, index) => (
            <Input
              placeholder={value}
              key={index}
              defaultValue={initialValue}
              disabled={disabled}
              onBlur={(e) => {
                if (e.target.value.trim() === '') {
                  setError(true)
                }
              }}
            />
          ))}
        </div>
      ) : (
        <>
          {verify ? (
            <>
              <div
                className="rounded relative flex gap-3 items-center h-10 bg-dark-800 dark:bg-[#F1F1F1]  dark:box-border-2x-dark"
                style={{
                  border: `1px solid ${
                    (!filled && value === '') || error
                      ? 'red'
                      : theme === 'dark'
                      ? '#bbbbbb'
                      : '#43444B'
                  }`,
                  borderColor:
                    (!filled && value === '') || error
                      ? 'red'
                      : theme === 'dark'
                      ? '#bbbbbb'
                      : '#43444B',
                }}
              >
                <input
                  placeholder="654875236"
                  name={name}
                  defaultValue={initialValue}
                  disabled={disabled}
                  onChange={(e) => {
                    checkIfCorrect(e.target.value)
                    handleChange?.(e)
                    setValue(e.target.value)
                  }}
                  onBlur={(e) => {
                    if (e.target.value.trim() === '') {
                      setError(true)
                    }
                  }}
                  className="placeholder:text-dark-650 flex-grow text-white dark:text-[#000000] text-lg py-3 w-full px-5  "
                />
                {verificationState === 'unverified' ? (
                  <span
                    className="mr-4 text-lg font-medium cursor-pointer text-primary-700 whitespace-nowrap dark:text-dark-800"
                    onClick={() =>
                      startVerification ? startVerification() : null
                    }
                  >
                    VERIFY
                  </span>
                ) : verificationState === 'verifying' ? (
                  <span
                    className="mr-4 text-lg font-medium cursor-pointer text-primary-700 whitespace-nowrap dark:text-dark-800"
                    style={{ color: 'grey' }}
                  >
                    VERIFY
                  </span>
                ) : (
                  <span className="mr-4 text-lg font-medium cursor-pointer text-primary-700 whitespace-nowrap dark:text-dark-800">
                    VERIFIED
                  </span>
                )}
              </div>
              {((!filled && value === '') || error) && ErrorMessage()}
            </>
          ) : (
            <>
              {outline ? (
                <>
                  <input
                    placeholder={placeholder}
                    name={name}
                    defaultValue={initialValue}
                    disabled={disabled}
                    className={`
    ${
      classname ||
      `placeholder:text-dark-650 flex-grow 
      ${
        theme === 'dark'
          ? 'dark:bg-[#F1F1F1] text-dark-800'
          : 'text-white bg-dark-800'
      }`
    } rounded h-[40px] text-lg py-3 w-full px-5`}
                    style={{
                      border: `1px solid ${
                        (!filled && value === '') || error
                          ? 'red'
                          : theme === 'dark'
                          ? '#bbbbbb'
                          : '#43444B'
                      }`,
                      borderColor:
                        (!filled && value === '') || error
                          ? 'red'
                          : theme === 'dark'
                          ? '#bbbbbb'
                          : '#43444B',
                    }}
                    onChange={(e) => {
                      checkIfCorrect(e.target.value)
                      handleChange?.(e)
                      setValue(e.target.value)
                    }}
                    onBlur={(e) => {
                      if (e.target.value.trim() === '') {
                        setError(true)
                      }
                    }}
                  />
                  {((!filled && value === '') || error) && ErrorMessage()}
                </>
              ) : (
                <>
                  <input
                    placeholder={placeholder}
                    name={name}
                    defaultValue={initialValue}
                    disabled={disabled}
                    className={`
              ${
                classname ||
                ` placeholder:text-dark-650 flex-grow 
              ${
                theme === 'dark'
                  ? 'dark:bg-[#F1F1F1] text-dark-800'
                  : 'text-white bg-dark-800'
              }`
              } rounded h-[40px] text-lg py-3 w-full px-5`}
                    style={{
                      border: `1px solid ${
                        (!filled && value === '') || error
                          ? 'red'
                          : theme === 'dark'
                          ? '#bbbbbb'
                          : '#43444B'
                      }`,
                      borderColor:
                        (!filled && value === '') || error
                          ? 'red'
                          : theme === 'dark'
                          ? '#bbbbbb'
                          : '#43444B',
                    }}
                    onChange={(e) => {
                      checkIfCorrect(e.target.value)
                      handleChange?.(e)
                      setValue(e.target.value)
                    }}
                    onBlur={(e) => {
                      if (e.target.value.trim() === '') {
                        setError(true)
                      }
                    }}
                  />
                  {((!filled && value === '') || error) && ErrorMessage()}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default TextField
