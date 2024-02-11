import React, { useState } from 'react'
import { ButtonProps } from '../../Button'
import { UserContext } from '../../../../App'
import 'react-modern-drawer/dist/index.css'
import { Link } from 'react-router-dom'
import TableOptions from '../../Table/TableOptions/TableOptions'
import Popup from '../../../templates/Popup'
import PopConfirm from '../../pop-confirm/PopConfirm'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { Box, Switch } from '@mui/material'
import Button from '../../../common/Button'

export interface TableCardProps {
  selectButton?: ButtonProps
  id: Number
  title: any
  icon?: String
  status: String
  subIcon?: String
  menuIcon?: String
  data?: any
  btnText: String
  btnIcon: String
  drawerTitle?: String
  endicon?: String
  option: any
  popupData?: any
  index?: any
}

function TableCard({
  id,
  title,
  icon,
  status,
  subIcon,
  menuIcon,
  data,
  btnText,
  btnIcon,
  drawerTitle,
  endicon,
  option,
  popupData,
  index,
}: TableCardProps) {
  const { theme } = React.useContext(UserContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectItem, setselectItem] = useState()
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handlerLink = (item: any) => {
    setselectItem(item)
  }
  const [select, setSelect] = useState(false)
  const toggleSelect = () => setSelect((v) => !v)
  const [currentIcon, setcurrentIcon] = useState('')
  const [tagIcon, settagIconIcon] = useState('')
  const cardIndex = index

  const [switchButton, setSwitchButton] = useState(true)

  const updateState = () => {
    console.log(switchButton)
    switchButton ? setSwitchButton(false) : setSwitchButton(true)
  }

  return (
    <>
      <div className="rounded sm:rounded bg-dark-600  dark:text-primary-100 dark:bg-white dark:box-border general-box-border mb-[15px] p-[20px] w-full">
        <div className="flex justify-between">
          <div className="flex justify-start items-center">
            {icon ? (
              <>
                <img src={`${icon}`} className="mr-[10px]" alt="" />
              </>
            ) : (
              <></>
            )}
            <span className="table-card-title dark:table-card-title-dark mr-[7.5px]">
              {title}
            </span>
            <img src={`${subIcon}`} onClick={toggleDrawer} alt="" />
          </div>
          <div className="flex justify-end items-center">
            <div className="mr-[5px]">
              {status === 'Inactive' ? (
                <img src="/images/yellowAero.svg" alt="" />
              ) : (
                ''
              )}
              {status === 'Withdrawn' ? (
                <img src="/images/yellowAero.svg" alt="" />
              ) : (
                ''
              )}
              {status === 'Accepted' ? (
                <img src="/images/greenAero.svg" alt="" />
              ) : (
                ''
              )}
              {status === 'Declined' ? (
                <img src="/images/redAero.svg" alt="" />
              ) : (
                ''
              )}
              {status === 'Ongoing' ? (
                <img src="/images/yellowAero.svg" alt="" />
              ) : (
                ''
              )}
              {status === 'Active' ? (
                <img src="/images/greenAero.svg" alt="" />
              ) : (
                ''
              )}
              {status === 'Ready' ? (
                <img src="/images/greenAero.svg" alt="" />
              ) : (
                ''
              )}
            </div>
            <span className="status-text dark:status-text-dark mr-[10px]">
              {status}
            </span>
            <TableOptions options={option} />
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="mt-[15px] mb-[10px]"
            src={theme === 'dark' ? '/images/012.svg' : '/images/hr_svg.svg'}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          {id === 5
            ? data.map((item: any, index: string) => {
                return (
                  <>
                    <div className=" flex justify-between  h-[13px]">
                      <div className="flex items-center gap-[3px]">
                        <span className="card-item-titles dark:card-item-titles">
                          {item.title}
                        </span>
                        {item.title === 'Convert' ? (
                          <img
                            className="img mt-[5px]"
                            src={
                              currentIcon === index
                                ? '/images/info-green-icon.svg'
                                : '/images/Mask (11).svg'
                            }
                            alt=""
                            width={10}
                            height={10}
                            id={`app-title-` + cardIndex + index}
                            onMouseEnter={() => {
                              setcurrentIcon(index)
                            }}
                            onMouseLeave={() => {
                              setcurrentIcon('')
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <span className="card-item-data dark:card-item-data">
                        {item.data.type === 'switch' ? (
                          <>
                            <Box
                              sx={{
                                '.Mui-checked': {
                                  color: `${
                                    theme === 'dark' ? '#606166' : '#50ff7f'
                                  } !important;`,
                                },
                                '.MuiSwitch-track': {
                                  background: `${
                                    theme === 'dark'
                                      ? '#606166'
                                      : 'rgba(148, 233, 63, 0.4)'
                                  } !important;`,
                                },
                              }}
                            >
                              {
                                <Switch
                                  className="convert-switch"
                                  size="small"
                                  // checked={}
                                  onChange={() => {
                                    updateState()
                                  }}
                                />
                              }
                            </Box>
                          </>
                        ) : (
                          item.data.value
                        )}
                      </span>
                    </div>

                    <ReactTooltip
                      className={`my-tool-tip z-500`}
                      anchorId={`app-title-` + cardIndex + index}
                      place="bottom"
                      content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                    />
                  </>
                )
              })
            : data.map((item: any, index: string) => {
                return (
                  <>
                    <div className="flex justify-between ">
                      <div className="flex items-center gap-[3px]">
                        <span className="card-item-titles dark:card-item-titles">
                          {item.title}
                        </span>
                        {item.title === 'PRP' ? (
                          <img
                            src={
                              currentIcon === index
                                ? '/images/info-green-icon.svg'
                                : '/images/Mask (11).svg'
                            }
                            alt=""
                            width={10}
                            height={10}
                            id={`app-title-` + cardIndex + index}
                            onMouseEnter={() => {
                              setcurrentIcon(index)
                            }}
                            onMouseLeave={() => {
                              setcurrentIcon('')
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <span className="card-item-data dark:card-item-data">
                        {item.data}
                      </span>
                    </div>
                    <ReactTooltip
                      className={`my-tool-tip z-500`}
                      anchorId={`app-title-` + cardIndex + index}
                      place="bottom"
                      content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                    />
                  </>
                )
              })}
        </div>

        <div className="mt-[21px]">
          {id === 5 ? (
            <>
              <Button
                btnText={`table-action ${
                  switchButton ? 'text-[#78797E]' : 'text-[#000000]'
                }`}
                disabled={switchButton ? true : false}
                className={` ${
                  theme === 'dark'
                    ? `${
                        switchButton
                          ? `whiteBgBtn`
                          : `bg-[#F1F1F1] border-2 border-solid border-[#F0F0F0]`
                      }`
                    : `${switchButton ? `grey-gradient` : ` greenGradient`}`
                }`}
                to="/"
                text="Claim"
                endIcon={
                  theme === 'dark'
                    ? switchButton
                      ? '/images/126.svg'
                      : '/images/125.svg'
                    : switchButton
                    ? '/images/131.svg'
                    : '/images/125.svg'
                }
              />
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSelect(true)
                }}
                type="button"
                className={`contained medium w-full square  button ${
                  theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
                }`}
              >
                <span className="fw-500">{btnText}</span>
                <img
                  className="duration-150"
                  src={`${endicon || '/images/011.svg'}`}
                  alt=""
                />
              </button>
            </>
          )}
        </div>
      </div>
      <Popup maxWidth="max-w-[820px]" onClose={toggleSelect} visible={select}>
        <PopConfirm onClose={toggleSelect} {...popupData} />
      </Popup>
    </>
  )
}
export default TableCard
