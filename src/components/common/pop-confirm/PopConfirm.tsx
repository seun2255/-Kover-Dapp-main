import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import RiskPolicyUserProfile from '../../../views/PolicyRiskUserPofile/PolicyRiskUserPofile'
import RiskMnagamentCar from '../../../views/RiskMnagament/RiskMnagamentCar'
import RiskMnagamentMotorbike from '../../../views/RiskMnagament/RiskMnagamentMotorbike'
import WeightRow from '../WeightRow'
import WeightTitle from '../WeightTitle'
import moment from 'moment'
import { getPolicyData, getTokenBalance } from '../../../api'
import { useWeb3React } from '@web3-react/core'
import TransactionProgress from '../TransactionProgress'
import DepositModal from '../DepositModal'
import Popup from '../../../components/templates/Popup'
import CarInsurance from '../../../components/common/PolicyRiskForms/carRisk'

interface CommonPopConfirmProps {
  id?: Number
  title: string
  balance?: string
  onClose?: () => void
  defaultTab?: number
  coverDetails?: any
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

let durations: { [key: string]: any } = {
  '2 weeks': moment.duration(2, 'weeks'),
  '30 days': moment.duration(30, 'days'),
  '90 days': moment.duration(90, 'days'),
  '180 days': moment.duration(180, 'days'),
  '365 days': moment.duration(365, 'days'),
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

const table = {
  rows: [
    {
      text: 'Pool status',
      icon: true,
    },
    {
      text: 'UR',
      icon: true,
    },
    {
      text: 'Cover Details',
      icon: false,
    },
  ],
  columns: [
    'Active',
    '80%',
    <Link to="/" className="dark:text-dark-600">
      Learn more
    </Link>,
  ],
}

export type PopConfirmProps = CommonPopConfirmProps & (NormalProps | TabProps)
function PopConfirm(props: PopConfirmProps) {
  const { theme } = React.useContext(UserContext)
  var { datam, title, onClose, defaultTab, coverDetails } = props
  const [id, setId] = useState(6)
  const [tab, setTab] = useState<number>(defaultTab || 0)
  const titleClassNameDark = 'summary-dark-title'
  const textClassNameDark = 'summary-dark-text'
  const titleClassNameLight = 'summary-light-title'
  const textClassNameLight = 'summary-light-text'
  const [balance, setBalance] = useState<any>(0)
  const [riskForm, setRiskForm] = useState(false)
  const toggleForm = () => setRiskForm((v) => !v)

  const [day, setDay] = useState(1)
  const { warning, dayTab, cover, prpInput, inputMax, disclaimer } =
    datam?.data?.[tab] || props
  const { width } = useWindowDimensions()
  const changeDay = (index: number) => {
    setDay(index)
  }
  const { account } = useWeb3React()
  let now = moment()
  const [fields, setFields] = useState({
    date: '-',
    premium: '-',
    fees: '-',
    discount: '-',
    cost: '-',
  })
  const [depositAmount, setDepositAmount] = useState<any>(0)
  const [policyData, setPolicyData] = useState<any>()
  const [stage, setStage] = useState(1)
  const [policyActive, setPolicyActive] = useState(false)
  const [amountApproved, setAmountApproved] = useState(false)

  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: `white`,
      opacity: 0.2,
    }

    return <div style={{ ...thumbStyle }} />
  }

  useEffect(() => {
    const getData = async () => {
      if (coverDetails.status !== 'in review' && account) {
        const policyDetails = await getPolicyData(
          account,
          coverDetails.poolName
        )
        setPolicyData(policyDetails)
        if (policyDetails.policyStatus === 'active') {
          setPolicyActive(true)
        }
        setFields({
          date: now
            .add(durations[policyDetails.coverDuration as string])
            .format('DD/MM/YYYY'),
          premium: policyDetails.premiumQuote,
          fees: policyDetails.fee,
          discount: '-',
          cost: policyDetails.premiumQuote,
        })
        const tokenBalance = await getTokenBalance(account)
        setBalance(Math.round(parseFloat(tokenBalance)))
      }
    }
    getData()
  }, [])

  return policyActive ? (
    <DepositModal
      warning={warning}
      dayTab={dayTab}
      cover={cover}
      prpInput={prpInput}
      inputMax={inputMax}
      balance={balance}
      disclaimer={disclaimer}
      title={title}
      onClose={onClose}
      coverDetails={coverDetails}
    />
  ) : (
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
          // <RiskPoolManagement/>
          <RiskMnagamentMotorbike />
        ) : (
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
                  className={
                    id === 1 || id === 3 || id === 5 ? 'input-border' : ''
                  }
                />
              )}
            </div>
            <div className="md:cover-popup-left-content md:cover-center-border md:mt-0 mt-[20px] top-border">
              <div className="dark:box-border  border border-dark-75 coverbox-padding">
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
                      {id === 6 ? (
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
                          text={id === 5 ? 'Reinsurance' : 'Deposit'}
                          icon={true}
                        />
                      )}
                    </>
                  )}
                </div>
                {id === 6 ? (
                  <>
                    <WeightRow
                      name="Expiration Date"
                      value={fields.date}
                      titleclassname={titleClassNameDark}
                      textclassname={textClassNameDark}
                    />
                    <WeightRow
                      name="Estimated Premium"
                      value={fields.premium}
                      titleclassname={titleClassNameDark}
                      textclassname={textClassNameDark}
                    />
                    <WeightRow
                      name="Policy Fees"
                      value={fields.fees}
                      titleclassname={titleClassNameDark}
                      textclassname={textClassNameDark}
                    />
                    <WeightRow
                      name="Estimated Discount"
                      value={fields.discount}
                      titleclassname={titleClassNameDark}
                      textclassname={textClassNameDark}
                    />
                    <WeightRow
                      name="Estimated Cost"
                      value={fields.cost + fields.fees}
                      titleclassname={titleClassNameLight}
                      textclassname={textClassNameLight}
                    />
                  </>
                ) : (
                  <InputMax
                    setDepositAmount={setDepositAmount}
                    {...inputMax}
                    action={true}
                    setAmountApproved={setAmountApproved}
                    poolName={coverDetails.poolName}
                  />
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

                  {id === 1 ? (
                    <TransactionProgress stage={stage} />
                  ) : (
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
                  )}
                </div>

                <div>
                  <PopupAgreament
                    agreeURL="/"
                    variety="checkbox"
                    agree="Terms of Use"
                    bntText="Confirm"
                    setId={setId}
                    id={id}
                    coverDetails={policyData}
                    depositAmount={depositAmount}
                    setStage={setStage}
                    active={false}
                    amountApproved={amountApproved}
                    onClose={onClose}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <Popup visible={riskForm} onClose={toggleForm}>
          <div className="kyc-popup">
            <div className="flex gap-5 mb-3.5">
              <div>
                <CarInsurance
                  onClose={toggleForm}
                  poolName={coverDetails.poolName}
                />
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </>
  )
}

export default PopConfirm
