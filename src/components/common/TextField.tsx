// import React, { useState } from "react";
// import InfoText from "./InfoText";
// import { UserContext } from "../../App";

// interface TextFieldProps {
//   label?: string | false;
//   labelIcon?: boolean;
//   placeholder?: string | string[];
//   endElement?: JSX.Element;
//   variant?: "contained" | "outlined";
//   field?: string;
//   outerClass?: string;
//   classname?: string;
//   wight?: string;
// }

// function TextField(props: TextFieldProps) {
//   const { label, placeholder, field, labelIcon, endElement, variant, outerClass, classname = '', wight} = props;

//   console.log(endElement,"endElement");

//   let variantStyle = "bg-dark-800";
//   if (variant === "outlined") {
//     // variantStyle = "border-2 border-dark-350";
//   }

//   interface InputProps
//     extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }
//   const Input = ({ className, ...rest }: InputProps) => (
//     <div className={`rounded relative flex gap-3 items-center h-10 dark:bg-light-1200 selection: ${variantStyle} z0`}>
//       {field && <span className="inline-block ml-5 -mr-2">{field}</span>}
//       <input
//         {...rest}
//         className={`placeholder:text-dark-650 flex-grow text-white text-lg py-3 w-full  dark:placeholder:text-dark-650 dark:text-dark-800 dark:bg-light-800 ${classname} ${field ? "" : "px-5"
//           }`} />
//       {endElement}
//     </div>
//   );
//   const { theme } = React.useContext(UserContext);
//   return (
//     <>
//     <div className={`flex flex-col gap-2.5 ${outerClass || ''} ${wight || ''}`}>
//       {label && <InfoText variant="small" icon={labelIcon} text={label} className={theme === 'dark' ? "dark:" : "white"} />}
//       {label === false && <span className="h-3.5 " />}
//       {typeof placeholder === "object" ? (
//         <div className="flex items-center justify-between gap-5">
//           {placeholder.map((value, index) => (
//             <input placeholder={`${placeholder}`} className="flex-grow w-full px-5 py-3 text-lg text-white placeholder:text-dark-650 bg-dark-800 dark:placeholder:text-dark-650 dark:text-dark-800 dark:bg-light-800 "></input>
//           ))}
//         </div>
//       ) : (
//           <input placeholder={`${placeholder}`} className="flex-grow w-full px-5 py-3 text-lg text-white placeholder:text-dark-650 bg-dark-800 dark:placeholder:text-dark-650 dark:text-dark-800 dark:bg-light-800 "></input>
//       )}
//     </div>
//     </>
//   );
// }

// export default TextField;

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
  } = props
  const { theme } = React.useContext(UserContext)
  const [error, setError] = useState(false)
  const checkIfCorrect = (text: any) => {
    // Use a regular expression to check for only alphabetical characters
    const regex = /^[a-zA-Z]+$/
    regex.test(text) ? setError(false) : setError(true)
  }
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
      style={{
        border: '1px solid white !important',
      }}
    >
      {field && <span className="inline-block ml-5 -mr-2">{field}</span>}
      <input
        {...rest}
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
        <div className="flex items-center justify-between gap-5 ">
          {placeholder.map((value, index) => (
            <Input placeholder={value} key={index} />
          ))}
        </div>
      ) : (
        <>
          {verify ? (
            <>
              <div className="rounded relative flex gap-3 items-center h-10 bg-dark-800 dark:bg-[#F1F1F1]  box-border-2x-light dark:box-border-2x-dark">
                <input
                  placeholder="654875236"
                  name={name}
                  onChange={(e) => handleChange?.(e)}
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
            </>
          ) : (
            <>
              {outline ? (
                name === 'state' ? (
                  <>
                    <input
                      placeholder={placeholder}
                      name={name}
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
                          error
                            ? 'red'
                            : theme === 'dark'
                            ? '#bbbbbb'
                            : '#43444B'
                        }`,
                      }}
                      onChange={(e) => {
                        checkIfCorrect(e.target.value)
                        handleChange?.(e)
                      }}
                    />
                    {error && endElement}
                  </>
                ) : (
                  <>
                    <input
                      placeholder={placeholder}
                      name={name}
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
                        border: `0px solid ${
                          theme === 'dark' ? '#bbbbbb' : '#43444B'
                        }`,
                      }}
                      onChange={(e) => handleChange?.(e)}
                    />
                  </>
                )
              ) : (
                <>
                  <input
                    placeholder={placeholder}
                    name={name}
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

export default TextField
