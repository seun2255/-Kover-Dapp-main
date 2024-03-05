import React, { useState } from 'react'
import { UserContext } from '../../../../App'
import { Link } from 'react-router-dom'
import { is_kyc_reviewer } from '../../../../api'

export interface TableOptionsProps {
  options: { name: string; action?: () => void }[]
  title?: string
  index?: any
}
function TableOptions({ options, title, index }: TableOptionsProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(false)
  const toggle = () => setOpen((v) => !v)
  const { theme } = React.useContext(UserContext)

  const optionLinks: any = {
    // Chat: `/chat/${title}-${index}`,
    Chat: null,
    Profile: `/kyc-user-profile/${index}`,
    Revert: null,
    Cancel: null,
  }

  return (
    <React.Fragment>
      <div className="hidden sm:block">
        {theme === 'dark' ? (
          <>
            <img
              className="w-1"
              onClick={toggle}
              src={open ? `/images/dark-more-1.svg` : `/images/dark-more-2.svg`}
              alt=""
              role="button"
            />
          </>
        ) : (
          <>
            {' '}
            <img
              className="w-1"
              onClick={toggle}
              src={open ? `/images/Mask (10).svg` : `/images/more-grey.svg`}
              alt=""
              role="button"
            />{' '}
          </>
        )}
        {open && (
          <div className="absolute z-10">
            <div
              onClick={() => {
                toggle()
              }}
              className="fixed top-0 right-0 bottom-0 left-0 bg-transparent -z-[1]"
            />
            <div className="bg-dark-400 w-[88px] flex flex-col gap-[1px] rounded py-2 ml-2 mt-1 dark:text-dark-800 dark:text-primary-100  dark:bg-light-1100 absolute left-[0px]">
              {options.map(({ name, action }, index) => (
                <Link to={optionLinks[name]}>
                  <button
                    type="button"
                    className="font-medium text-lg pl-2.5 py-2 pr-8 hover:text-dark-550 after: duration-100 w-full whitespace-nowrap text-left"
                    onClick={() => {
                      toggle()
                      action?.()
                    }}
                  >
                    {name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative sm:hidden">
        <button
          type="button"
          onClick={() => {
            toggle()
          }}
        >
          {theme === 'dark' ? (
            <>
              <img
                className="w-1 float-right sm:hidden"
                src={
                  open ? `/images/dark-more-1.svg` : `/images/dark-more-2.svg`
                }
                alt=""
              />
            </>
          ) : (
            <>
              <img
                className="w-1 float-right sm:hidden"
                src={open ? `/images/Mask (10).svg` : `/images/more-grey.svg`}
                alt=""
              />
            </>
          )}
        </button>
        {open && (
          <div className="absolute z-10">
            <div
              onClick={toggle}
              className="fixed top-0 right-0 bottom-0 left-0 bg-transparent -z-[1] "
            />
            <div className="bg-dark-400 flex flex-col gap-[1px] rounded py-1 ml-2 mt-1 dark:text-dark-800 dark:text-primary-100  dark:bg-white absolute right-0">
              {options.map(({ name, action }, index) => (
                <Link to={optionLinks[name]}>
                  <button
                    type="button"
                    className="font-medium text-lg pl-2.5 py-2 pr-8 hover:text-dark-550 after:duration-100 w-full whitespace-nowrap text-left"
                    onClick={() => {
                      toggle()
                      action?.()
                    }}
                  >
                    {name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default TableOptions
