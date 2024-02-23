import React from 'react'
import { UserContext } from '../../App'
import InfoText from './InfoText'

interface TextFieldProps {
  label?: string | false
  labelIcon?: boolean
  placeholder?: string | string[]
  endElement?: JSX.Element
  variant?: 'contained' | 'outlined'
  field?: string
  outerClass?: string
  classname?: string
  verify?: boolean
  outline?: boolean
  handleChange?: Function
  initialValue?: string
  disabled?: boolean
}

function TextFieldS(props: TextFieldProps) {
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
    handleChange,
    initialValue,
    disabled,
  } = props
  const { theme } = React.useContext(UserContext)
  let variantStyle = 'bg-dark-800'
  if (variant === 'outlined') {
    variantStyle = 'border-2 border-dark-350'
  }

  interface InputProps
    extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}
  const Input = ({ className, ...rest }: InputProps) => (
    <div
      className={`rounded relative flex gap-3 items-center h-10 ${variantStyle}`}
    >
      {field && <span className="ml-5 inline-block -mr-2">{field}</span>}
      <input
        {...rest}
        defaultValue={initialValue}
        disabled={disabled}
        className={`placeholder:text-dark-650 flex-grow text-white text-lg py-3 w-full ${className} ${
          field ? '' : 'px-5'
        }`}
      />
      {endElement}
    </div>
  )

  return (
    <div className={`flex flex-col gap-2.5 ${outerClass || ''}`}>
      {label && (
        <InfoText variant="small" icon={labelIcon} text={label} color="white" />
      )}
      {label === false && <span className="h-3.5" />}
      {typeof placeholder === 'object' ? (
        <div className="flex gap-5 items-center justify-between">
          {placeholder.map((value, index) => (
            <Input
              placeholder={value}
              key={index}
              defaultValue={initialValue}
              disabled={disabled}
            />
          ))}
        </div>
      ) : (
        <>
          {verify ? (
            <>
              <div className="rounded relative flex gap-3 items-center h-10 bg-dark-800 dark:bg-[#F1F1F1]">
                <input
                  placeholder="654875236"
                  defaultValue={initialValue}
                  disabled={disabled}
                  className="placeholder:text-dark-650 flex-grow text-white dark:text-[#000000] text-lg py-3 w-full px-5 border-solid 1px"
                />
                <span className="font-medium text-lg text-primary-700 whitespace-nowrap cursor-pointer mr-4 dark:text-dark-800">
                  VERIFY
                </span>
              </div>
            </>
          ) : (
            <>
              {outline ? (
                <>
                  <input
                    placeholder={placeholder}
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
                        theme === 'dark' ? '#bbbbbb' : '#43444B'
                      }`,
                    }}
                    onChange={(e) => handleChange?.(e)}
                  />
                </>
              ) : (
                <>
                  <input
                    placeholder={placeholder}
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
                    onChange={(e) => handleChange?.(e)}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default TextFieldS
