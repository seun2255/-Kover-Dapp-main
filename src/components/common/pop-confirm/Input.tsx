import React, { useState } from 'react'
import Button, { ButtonProps } from '../Button'
import InfoText, { InfoTextProps } from '../InfoText'
import { UserContext } from '../../../App'
import { Tooltip as ReactTooltip } from 'react-tooltip'
export interface InputProps {
  action: ButtonProps
  infoText: InfoTextProps
  placeholder?: string
  value?: string | number | readonly string[]
  defaultValue?: string | number | readonly string[]
  className?: string
  editAction?: any
  editText?: string
}

function Input(props: InputProps) {
  const { action, infoText, defaultValue, className, editAction, editText } =
    props
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  return (
    <div className="border border-dark-75 p-[20px] md:p-[24px] dark:bg-white dark:box-border gap-1 md:w-[360px]">
      <div
        className={`dark:bg-light-200 flex bg-[#2A2B31] justify-between rounded py-2.5 px-5 items-center gap-4 flex-wrap ${className}`}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <span
            className={` prp-number-fix w-[60px] 
          ${
            defaultValue === '00.00'
              ? 'text-[#42434B]'
              : `${theme === 'dark' ? `text-dark-800` : `text-white`}`
          }
          `}
          >
            {' '}
            {defaultValue && defaultValue !== '00.00'
              ? `${defaultValue}%`
              : '00%'}
          </span>
          {/* <InfoText {...infoText} variant="medium"  titleclassname ="" /> */}
          <>
            <div className={`flex infotext medium dark gap-[5px]`}>
              <span className={` text-[#606166] fw-500 fs-12 lh-14`}>
                {infoText.text}
              </span>
              <>
                <img
                  src={`${
                    currentIcon === infoText.text
                      ? '/images/info-green-icon.svg'
                      : '/images/Maskd (2).svg'
                  }`}
                  alt=""
                  width={10}
                  height={10}
                  id={infoText.text}
                  onMouseEnter={() => {
                    setcurrentIcon(infoText.text)
                  }}
                  onMouseLeave={() => {
                    setcurrentIcon('')
                  }}
                />
                <>
                  <ReactTooltip
                    className={`my-tool-tip z-500`}
                    anchorId={infoText.text}
                    place="bottom"
                    content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                  />
                </>
              </>
            </div>
          </>
        </div>
        <div>
          <div
            className={`px-[16px] py-[5px] w-[80px] h-[30px] flex justify-center items-center cursor-pointer ${
              theme === 'dark'
                ? 'bg-white text-dark-800'
                : 'text-white bg-[#3F4048]'
            }`}
            onClick={() => editAction?.(true)}
          >
            {/* <span className="fw-500 fs-12 lh-14">{action.text}</span> */}
            <span className="fw-500 fs-12 lh-14">
              {editText ? editText : 'Edit'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Input
