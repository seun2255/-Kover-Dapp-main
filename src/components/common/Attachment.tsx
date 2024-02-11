import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
interface AttachmentProps {
  icon: string
  name: string
  status: string
  fullWidth?: boolean
  width?: Number
  height?: Number
  gap?: Number
  className?: string
  button?: boolean
}

function Attachment({
  icon,
  name,
  status,
  fullWidth,
  width,
  height,
  gap,
  className,
  button,
}: AttachmentProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <>
      {
        <>
          <div
            className={`${
              fullWidth ? 'flex' : 'inline-flex'
            } justify-between gap-${gap || 4}`}
            role={button ? 'button' : ''}
          >
            <div className="flex gap-[10px]">
              <img
                width={`${width || 'w-full'} `}
                height={`${height || 'h-full'}`}
                src={icon}
                alt=""
              />
              <Link to="/">
                <span
                  className={`basis-1/2 flex-grow ${
                    className || 'font-medium text-lg'
                  }`}
                >
                  {name}
                </span>
              </Link>
            </div>
            <img
              src={status}
              className={`ml-4 ${
                theme === 'dark'
                  ? 'font-bold text-[#606166] hover:text-[#000000]'
                  : 'text-white hover:text-[#50ff7f]'
              } file-name `}
              width={`${width}`}
              height={`${height}`}
              alt=""
            />
          </div>
        </>
      }
    </>
  )
}

export default Attachment
