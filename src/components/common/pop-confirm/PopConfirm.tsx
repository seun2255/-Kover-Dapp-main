import React, { useState } from 'react'
import Agreament from '../Agreament'
import Button, { ButtonProps } from '../Button'
import StatusCardContent, {
  StatusCardContentProps,
} from '../cards/StatusCard/StatusCardContent'
import InfoText from '../InfoText'
import Input, { InputProps } from './Input'
import InputMax, { InputMaxProps } from './InputMax'
import { UserContext } from '../../../App'
import useWindowDimensions from '../../global/UserInform/useWindowDimensions'
import PopupAgreament from '../PopupAgreament'
import Scrollbars from 'react-custom-scrollbars-2'
import RiskPoolManagement from '../../../views/KYCApplication/RiskPoolManagement'
import WeightRow from '../WeightRow'
import WeightTitle from '../WeightTitle'

interface CommonPopConfirmProps {
  id?: Number
  title: string
  balance?: string
  onClose?: () => void
  defaultTab?: number
  data?: string
}

interface GlobalProps {
  id?: Number
  balance?: string
  warning?: string
  disclaimer?: string
  prpInput?: InputProps
  inputMax?: InputMaxProps
}

interface TabProps {
  datam?: {
    tabs: ButtonProps[]
    data: (GlobalProps & StatusCardContentProps)[]
  }
  balance?: never
  warning?: never
  disclaimer?: never
  prpInput?: never
  inputMax?: never
  table?: never
  cover?: never
  dayTab?: never
}

type NormalProps = GlobalProps &
  StatusCardContentProps & {
    datam?: never
  }

export type PopConfirmProps = CommonPopConfirmProps & (NormalProps | TabProps)
function PopConfirm(props: PopConfirmProps) {
  const { theme } = React.useContext(UserContext)
  var { datam, title, onClose, defaultTab, id } = props
  const [tab, setTab] = useState<number>(defaultTab || 0)
  const titleClassNameDark = 'summary-dark-title'
  const textClassNameDark = 'summary-dark-text'
  const titleClassNameLight = 'summary-light-title'
  const textClassNameLight = 'summary-light-text'


  const [day, setDay] = useState(1)
  const {
    warning,
    table,
    dayTab,
    cover,
    prpInput,
    inputMax,
    balance,
    disclaimer,
  } = datam?.data?.[tab] || props
  const { width } = useWindowDimensions()
  const changeDay = (index: number) => {
    setDay(index)
  }

  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: `white`,
      opacity: 0.2,
    }

    return <div style={{ ...thumbStyle }} />
  }

  return (
    <>
      <div className={`sm:popup-3 mx-[15px] my-[20px] ${id === 4 ? '' : ''}`}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <div className="justify-start block sm:hidden" onClick={onClose}>
              <img
                src={
                  theme === 'dark'
                    ? '/images/leftAeroBlack.svg'
                    : '/images/leftBackWhiteAero.svg'
                }
                alt=""
              />
            </div>
            <span className="sm:ml-[0px] ml-[23.5px] popup-main-title dark:popup-main-title-dark">
              {title}
            </span>
          </div>
          <button type="button" onClick={onClose} className="hidden sm:block">
            <img className="w-2.5" src="/images/Group 158.svg" alt="" />
          </button>
        </div>
        {/* id 20 used for risk pool management form */}
        {id === 20 ? (
          <RiskPoolManagement/>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[600px] overflow-auto no-scrollbar">
            <div className="flex flex-col gap-5 md:cover-popup-right-content">
              <div className="dark:box-border  border border-dark-75 coverbox-padding md:w-[360px]">
                <StatusCardContent
                  dayTab={dayTab}
                  table={table}
                  cover={cover}
                  title={title}
                />
                {id === 3 ? (
                  <>
                    <div className="flex justify-between gap-5 mt-[31px]">
                      <Button
                        color={
                          theme === 'dark'
                            ? 'dark-btn-transparent'
                            : 'btn-transparent'
                        }
                        className="w-[130px] h-[30px] fs-500"
                        text="Cancel"
                      />
                      <Button
                        color={
                          theme === 'dark'
                            ? 'dark-btn-transparent'
                            : 'btn-transparent'
                        }
                        className="w-[130px] h-[30px] fs-500 bg-[#3F4048]"
                        text="Pause"
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
                {id === 4 ? (
                  <>
                    {tab === 0 ? (
                      <>
                        {width > 900 ? (
                          <>
                            {/* <div className="my-[25px] flex justify-center ">
                              <img
                                src={
                                  theme === 'dark'
                                    ? '/images/012.svg'
                                    : '/images/hr_svg.svg'
                                }
                                alt=""
                              />
                            </div> */}
                             <hr className="mt-[25px] mb-[25px]" />
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="flex justify-between gap-[16px] md:mt-0 mt-[15px]">
                          <button
                            className={`stake-popup-btn dark:stake-popup-btn-dark ${
                              day === 1
                                ? `${
                                    theme === 'dark'
                                      ? 'bg-[#dddddd]'
                                      : 'bg-[#3F4048]'
                                  }`
                                : `${
                                    theme === 'dark'
                                      ? 'bg-[#f3f3f3]'
                                      : 'bg-[#2A2B31]'
                                  }`
                            }`}
                            onClick={() => {
                              changeDay(1)
                            }}
                          >
                            <span className=""> 14 DAYS </span>
                          </button>
                          <button
                            className={`stake-popup-btn dark:stake-popup-btn-dark ${
                              day === 2
                                ? `${
                                    theme === 'dark'
                                      ? 'bg-[#dddddd]'
                                      : 'bg-[#3F4048]'
                                  }`
                                : `${
                                    theme === 'dark'
                                      ? 'bg-[#f3f3f3]'
                                      : 'bg-[#2A2B31]'
                                  }`
                            }`}
                            onClick={() => {
                              changeDay(2)
                            }}
                          >
                            <span className=""> 30 DAYS </span>
                          </button>
                          <button
                            className={`stake-popup-btn dark:stake-popup-btn-dark ${
                              day === 3
                                ? `${
                                    theme === 'dark'
                                      ? 'bg-[#dddddd]'
                                      : 'bg-[#3F4048]'
                                  }`
                                : `${
                                    theme === 'dark'
                                      ? 'bg-[#f3f3f3]'
                                      : 'bg-[#2A2B31]'
                                  }`
                            }`}
                            onClick={() => {
                              changeDay(3)
                            }}
                          >
                            <span className=""> 60 DAYS </span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  ''
                )}
                {id === 5 ? (
                  <>
                    <div className="flex justify-between gap-5 mt-[31px]">
                      <Button
                        color={
                          theme === 'dark'
                            ? 'dark-btn-transparent'
                            : 'btn-transparent'
                        }
                        className="w-[130px] h-[30px] fs-500"
                        text="Accounting"
                      />
                      <Button
                        color={
                          theme === 'dark'
                            ? 'dark-btn-transparent'
                            : 'btn-transparent'
                        }
                        className="w-[130px] h-[30px] fs-500 bg-[#3F4048]"
                        text="More Options"
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
              {prpInput && (
                <Input
                  {...prpInput}
                  className={id === 1 || id === 3 || id === 5 ? 'input-border' : ''}
                />
              )}
            </div>
            <div className="md:cover-popup-left-content md:cover-center-border md:mt-0 mt-[20px] top-border">
              <div className='dark:box-border  border border-dark-75 coverbox-padding'>
                <div>
                  {datam ? (
                    <>
                      <div className="my-2">
                        <div className="flex items-center w-full   justify-center gap-[40px]">
                          {datam.tabs.map(({ ...rest }, index) => (
                            <Button
                              className={
                                width > 600
                                  ? `${
                                      index === tab
                                        ? `md-pop-tag-btn-active dark:md-pop-tag-btn-active-dark py-[10px] px-[40px]`
                                        : `md-pop-tag-btn dark:md-pop-tag-btn-dark py-[10px] px-[40px]`
                                    } mb-[10px]`
                                  : `${
                                      index === tab
                                        ? `sm-pop-tab-btn-active dark:sm-pop-tab-btn-active-dark`
                                        : `sm-pop-tab-btn dark:sm-pop-tab-btn`
                                    }`
                              }
                              btnText="mobile-tab-bar-text"
                              {...rest}
                              onClick={() => setTab(index)}
                            />
                          ))}
                        </div>
                        <hr className="flex sm:hidden" />
                      </div>
                    </>
                  ) : (
                    <>
                      { id === 6 ? (
                        <InfoText
                          className="mb-[20px] margin-top"
                          variant="large"
                          color={theme === 'dark' ? 'dark' : 'white'}
                          text="Summary"
                          icon={true}
                        />
                      ) : (
                        <InfoText
                          className="mb-[20px] margin-top"
                          variant="large"
                          color={theme === 'dark' ? 'dark' : 'white'}
                          text={ id === 5 ? "Reinsurance" : "Deposit"}
                          icon={true}
                        />
                      ) }
                    </>
                  )}
                </div>
                {id === 6 ? (
                  <>
                  <WeightRow
                    name="Expiration Date"
                    value="-"
                    titleclassname={titleClassNameDark}
                    textclassname={textClassNameDark}
                  />
                  <WeightRow
                    name="Estimated Premium"
                    value="-"
                    titleclassname={titleClassNameDark}
                    textclassname={textClassNameDark}
                  />
                  <WeightRow
                    name="Policy Fees"
                    value="-"
                    titleclassname={titleClassNameDark}
                    textclassname={textClassNameDark}
                  />
                  <WeightRow
                    name="Estimated Discount"
                    value="-"
                    titleclassname={titleClassNameDark}
                    textclassname={textClassNameDark}
                  />
                  <WeightRow
                    name="Estimated Cost"
                    value="-"
                    titleclassname={titleClassNameLight}
                    textclassname={textClassNameLight}
                  />
                  </>
                ) : (
                  <InputMax {...inputMax} />
                )}
                

                
                <div className="flex flex-col mt-[15px]">
                  <div className="flex justify-between font-poppins">
                    <span className="balance-text">Balance</span>
                    <span className="balance-no dark:balance-no-dark">
                      {balance}
                    </span>
                  </div>
                  {id === 2 ? (
                    <div className="flex items-center gap-[8px] mb-[20px] mt-[22px]">
                      <img src="/images/alert-icon.svg" alt="" />
                      <span className="alert-text dark:alert-text-dark">
                        Funds cannot be withdrawn until end of the lock period
                      </span>
                    </div>
                  ) : (
                    ``
                  )}

                  {warning ? (
                    <div className="flex items-center gap-2.5 md:mb-[20px] md:mt-[22px] mb-[15px] mt-[18px]">
                      <img src="/images/Group 283.svg" alt="" />
                      <p className="text-dark-500 font-medium text-md leading-[15px]">
                        {warning}
                      </p>
                    </div>
                  ) : (
                    <span />
                  )}

                  <div
                    className={`text-center mt-[35px] mb-[30px] ${
                      id === 1 || id === 3 ? 'mt-[35px]' : ''
                    } `}
                  >
                    <span className="disclaimer-title">Disclaimer</span>
                    {/* <div className="my-2.5 flex justify-center">
                      <img
                        src={
                          theme === 'dark'
                            ? '/images/012.svg'
                            : '/images/hr_svg.svg'
                        }
                        alt=""
                      />
                    </div> */}
                    <hr className="my-[10px]" />
                    <div className="mx-4 sm:mx-2">
                      <p className="disclaimer-text">{disclaimer}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <PopupAgreament
                    agreeURL="/"
                    variety="checkbox"
                    agree="Terms of Use"
                    bntText="Confirm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default PopConfirm
