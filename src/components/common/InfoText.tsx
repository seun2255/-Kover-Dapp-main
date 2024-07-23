import { useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
export interface InfoTextProps {
  index?: string
  id?: Number
  text: string
  variant?: 'small' | 'semi' | 'medium' | 'large'
  icon?: boolean
  color?: 'dark' | 'white' | 'dark-650' | 'dark-600'
  textClassName?: string
  className?: string
  title?: String
  titleclassname?: String
}

function InfoText(props: InfoTextProps) {
  const {
    text,
    variant,
    className,
    icon,
    color,
    textClassName = '',
    title,
    id,
    titleclassname,
    index = '',
  } = props
  const sIcon = icon === undefined
  const [currentIcon, setcurrentIcon] = useState('')
  return (
    <>
      <div
        className={`flex infotext ${className || ''} ${variant || 'medium'} ${
          color || 'dark'
        } gap-[5px]`}
      >
        <span
          className={`${textClassName || ''}  text-[${
            color || '#606166'
          }] fw-500 'fs-12' lh-14 ${titleclassname || ''}`}
        >
          {text}
        </span>
        {icon ? (
          <>
            <img
              src={`${
                currentIcon === text
                  ? '/images/info-green-icon.svg'
                  : '/images/Maskd (2).svg'
              }`}
              alt=""
              width={10}
              height={10}
              id={index ? `app-title-` + text + index : `app-title-` + text}
              onMouseEnter={() => {
                setcurrentIcon(text)
              }}
              onMouseLeave={() => {
                setcurrentIcon('')
              }}
            />
            <>
              <ReactTooltip
                className={`my-tool-tip z-500`}
                anchorId={
                  index ? `app-title-` + text + index : `app-title-` + text
                }
                place="bottom"
                content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
              />
            </>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
export default InfoText
