import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Agreament from '../../components/common/Agreament'
import Button, { ButtonProps } from '../../components/common/Button'
import StatusCardContent, {
  StatusCardContentProps,
} from '../../components/common/cards/StatusCard/StatusCardContent'
import InfoText from '../../components/common/InfoText'
import Input, { InputProps } from '../../components/common/pop-confirm/Input'
import InputMax, {
  InputMaxProps,
} from '../../components/common/pop-confirm/InputMax'
import { UserContext } from '../../App'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import PopupAgreament from '../../components/common/PopupAgreament'
import Scrollbars from 'react-custom-scrollbars-2'
import RiskPoolManagement from '../../views/KYCApplication/RiskPoolManagement'
import RiskPolicyUserProfile from '../../views/PolicyRiskUserPofile/PolicyRiskUserPofile'
import RiskMnagamentCar from '../../views/RiskMnagament/RiskMnagamentCar'
import RiskMnagamentMotorbike from '../../views/RiskMnagament/RiskMnagamentMotorbike'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import moment from 'moment'
import { getPolicyData, getStakeBalance, getTokenBalance } from '../../api'
import { useWeb3React } from '@web3-react/core'
import TransactionProgress from '../../components/common/TransactionProgress'
import DepositModal from '../../components/common/DepositModal'
import { stake } from '../../api'
import { useDispatch } from 'react-redux'
import { openAlert, closeAlert } from '../../redux/alerts'

interface CommonPopConfirmProps {
  id?: Number
  title: string
  balance?: string
  onClose?: () => void
  defaultTab?: number
  coverDetails?: any
  data?: string
  action: any
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
      text: 'TVL',
      icon: true,
    },
    {
      text: 'APR',
      icon: true,
    },
    {
      text: 'Lock Period',
      icon: false,
    },
  ],
  columns: ['$7,000,087.5 ', '3,16%', '---'],
}

export type PopConfirmProps = CommonPopConfirmProps & (NormalProps | TabProps)
function StakingPopup(props: PopConfirmProps) {
  const { theme } = React.useContext(UserContext)
  var { datam, title, onClose, defaultTab, action } = props
  const [id, setId] = useState(6)
  const [tab, setTab] = useState<number>(defaultTab || 0)
  const titleClassNameDark = 'summary-dark-title'
  const textClassNameDark = 'summary-dark-text'
  const titleClassNameLight = 'summary-light-title'
  const textClassNameLight = 'summary-light-text'

  const dispatch = useDispatch()

  const [day, setDay] = useState(1)
  const { warning, dayTab, cover, prpInput, inputMax, balance, disclaimer } =
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
  const [depositAmount, setDepositAmount] = useState(0)
  const [policyData, setPolicyData] = useState<any>()
  const [stage, setStage] = useState(1)
  const [policyActive, setPolicyActive] = useState(false)
  const [amountApproved, setAmountApproved] = useState(false)
  const [unstaking, setunstaking] = useState(false)
  const [koverBalance, setKoverBalance] = useState('0')
  const [stakeBalance, setStakeBalance] = useState('0')

  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: `white`,
      opacity: 0.2,
    }

    return <div style={{ ...thumbStyle }} />
  }

  const handleStake = async () => {
    const hash = await stake(depositAmount)
    await getData()
    await action()
    dispatch(
      openAlert({
        displayAlert: true,
        data: {
          id: 1,
          variant: 'Successful',
          classname: 'text-black',
          title: 'Stake Deposited!',
          tag1: 'succesfully staked an amount!',
          tag2: 'View on etherscan',
          hash: hash,
        },
      })
    )
    onClose?.()
    setTimeout(() => {
      dispatch(closeAlert())
    }, 10000)
  }

  const getData = async () => {
    const balanceKover = await getTokenBalance(account)
    const balanceStake = await getStakeBalance(account as string)

    setKoverBalance(balanceKover)
    setStakeBalance(balanceStake)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
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
      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[600px] overflow-auto no-scrollbar">
        <div className="flex flex-col gap-5 md:cover-popup-right-content">
          <div className="dark:box-border  border border-dark-75 coverbox-padding md:w-[360px]">
            <StatusCardContent
              dayTab={dayTab}
              table={table}
              cover={cover}
              title={title}
            />
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
                            theme === 'dark' ? 'bg-[#dddddd]' : 'bg-[#3F4048]'
                          }`
                        : `${
                            theme === 'dark' ? 'bg-[#f3f3f3]' : 'bg-[#2A2B31]'
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
                            theme === 'dark' ? 'bg-[#dddddd]' : 'bg-[#3F4048]'
                          }`
                        : `${
                            theme === 'dark' ? 'bg-[#f3f3f3]' : 'bg-[#2A2B31]'
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
                            theme === 'dark' ? 'bg-[#dddddd]' : 'bg-[#3F4048]'
                          }`
                        : `${
                            theme === 'dark' ? 'bg-[#f3f3f3]' : 'bg-[#2A2B31]'
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
          </div>
          {prpInput && (
            <Input
              {...prpInput}
              defaultValue={stakeBalance}
              className={id === 1 || id === 3 || id === 5 ? 'input-border' : ''}
            />
          )}
        </div>
        <div className="md:cover-popup-left-content md:cover-center-border md:mt-0 mt-[20px] top-border">
          <div className="dark:box-border  border border-dark-75 coverbox-padding">
            <div>
              <div className="my-2">
                <div className="flex items-center w-full   justify-center gap-[40px]">
                  {datam?.tabs.map(({ ...rest }, index) => (
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
            </div>
            <InputMax
              setDepositAmount={setDepositAmount}
              {...inputMax}
              action={tab === 0 ? true : false}
              setAmountApproved={setAmountApproved}
              isStake={true}
            />

            <div className="flex flex-col mt-[15px]">
              <div className="flex justify-between font-poppins">
                <span className="balance-text">Balance</span>
                <span className="balance-no dark:balance-no-dark">
                  {Number(koverBalance)} kover
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

              {/* Modify as appropriate */}
              {id === 1 ? (
                <TransactionProgress stage={stage} />
              ) : (
                <div
                  className={`text-center mt-[35px] mb-[30px] ${
                    id === 1 || id === 3 ? 'mt-[35px]' : ''
                  } `}
                >
                  <span className="disclaimer-title">Disclaimer</span>
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
                isStake={true}
                handleStake={handleStake}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakingPopup
