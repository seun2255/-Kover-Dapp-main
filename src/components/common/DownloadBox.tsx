import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import { UserContext } from '../../App'

export interface DownloadBoxProp {
  title?: string
  classname?: string
}

function DownloadBox({ classname, title }: DownloadBoxProp) {
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <div
        className={`rounded bg-dark-800 dark:bg-light-800 dark:text-dark-800  ${
          classname || ''
        } p-[30px]`}
      >
        <div className="flex justify-between sm:hidden">
          <span className="product-information dark:product-information-dark">{`${
            title || ' Product Information'
          }`}</span>
          <img src="/images/cross-line.svg" alt="" />
        </div>

        <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
          {[...Array(2)].map((value, index) => (
            <>
              <div className="flex justify-between">
                <div className="flex basis-3/4 gap-[16px]">
                  <img src="/images/pin.svg" alt="" />
                  <Link
                    className={`${
                      theme === 'dark'
                        ? 'font-bold text-[#606166] hover:text-[#000000]'
                        : 'text-white hover:text-[#50ff7f]'
                    } file-name `}
                    to={''}
                  >
                    Essential IPID
                  </Link>
                </div>
                <img
                  className="items-end w-[20px]"
                  src={
                    theme === 'dark'
                      ? '/images/downloadblack.svg'
                      : '/images/download.svg'
                  }
                  alt=""
                />
              </div>
            </>
          ))}

          {/* <div className="flex">
            <div className="flex basis-3/4 gap-[16px]">
              <img src="/images/pin.svg" alt=""/>
             <Link
                className={`text-white ${theme === "dark" ? "font-bold text-[#000000]" : "text-white"} file-name`} to={""}              >
                Essential IPID
              </Link>
            </div>
            <div className="basis-1/4">
              <img
                className="items-end w-[20px]"
                src={
                  theme === "dark"
                    ? "/images/downloadblack.svg"
                    : "/images/download.svg"
                }
                alt=""
              />
            </div>
          </div> */}

          {/* <div className="flex ">
            <div className="flex basis-3/4 gap-[16px]">
              <img src="/images/pin.svg" alt=""/>
              <span
                className={`${
                  theme === "dark" ? "font-bold" : "text-primary-700"
                } underline file-name`}>
                Essential IPID
              </span>
            </div>
            <div className="basis-1/4">
              <img
                className="items-end w-[20px]"
                src={
                  theme === "dark"
                    ? "/images/downloadblack.svg"
                    : "/images/download.svg"
                }
                alt=""
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
export default DownloadBox
