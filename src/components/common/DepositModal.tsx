import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Agreament from './Agreament'
import Button, { ButtonProps } from './Button'
import StatusCardContent, {
  StatusCardContentProps,
} from './cards/StatusCard/StatusCardContent'
import InfoText from './InfoText'
import Input, { InputProps } from './pop-confirm/Input'
import InputMax, { InputMaxProps } from './pop-confirm/InputMax'
import { UserContext } from '../../App'
import useWindowDimensions from '../global/UserInform/useWindowDimensions'
import PopupAgreament from './PopupAgreament'
import Scrollbars from 'react-custom-scrollbars-2'
import RiskPoolManagement from '../../views/KYCApplication/RiskPoolManagement'
import RiskPolicyUserProfile from '../../views/PolicyRiskUserPofile/PolicyRiskUserPofile'
import RiskMnagamentCar from '../../views/RiskMnagament/RiskMnagamentCar'
import RiskMnagamentMotorbike from '../../views/RiskMnagament/RiskMnagamentMotorbike'
import WeightRow from './WeightRow'
import WeightTitle from './WeightTitle'
import moment from 'moment'
import { getPolicyData } from '../../api'
import { useWeb3React } from '@web3-react/core'
import TransactionProgress from './TransactionProgress'

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
      text: 'Certificate',
      icon: true,
    },
    {
      text: 'Daily Cost',
      icon: true,
    },
    {
      text: 'Daily Discount',
      icon: false,
    },
  ],
  columns: ['Download', '0 USDC', '0 USDC'],
}

export type PopConfirmProps = CommonPopConfirmProps & (NormalProps | TabProps)
function DepositModal(props: PopConfirmProps) {
  const { theme } = React.useContext(UserContext)
  var { datam, title, onClose, defaultTab, coverDetails } = props
  const [id, setId] = useState(6)
  const [tab, setTab] = useState<number>(defaultTab || 0)

  const { dayTab, cover, prpInput, inputMax, balance, disclaimer } =
    datam?.data?.[tab] || props
  const { width } = useWindowDimensions()

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
  const [transferring, setTransferring] = useState(false)
  const [amountApproved, setAmountApproved] = useState(false)

  useEffect(() => {
    const getData = async () => {
      if (coverDetails.status !== 'in review' && account) {
        const policyDetails = await getPolicyData(
          account,
          coverDetails.poolName
        )
        setPolicyData(policyDetails)
        setFields({
          date: now
            .add(durations[policyDetails.coverDuration as string])
            .format('DD/MM/YYYY'),
          premium: policyDetails.premiumQuote,
          fees: policyDetails.fee,
          discount: '-',
          cost: policyDetails.premiumQuote,
        })
      }
    }
    getData()
  }, [])

  const handleClick = async () => {}

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
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[600px] overflow-auto no-scrollbar">
          <div className="flex flex-col gap-5 md:cover-popup-right-content">
            <div className="dark:box-border  border border-dark-75 coverbox-padding md:w-[360px]">
              <StatusCardContent
                dayTab={dayTab}
                table={table}
                cover={cover}
                title={title}
              />
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
                  <Link to={'/new-claim'}>
                    <Button
                      color={
                        theme === 'dark'
                          ? 'dark-btn-transparent'
                          : 'btn-transparent'
                      }
                      className="w-[130px] h-[30px] fs-500 bg-[#3F4048]"
                      text="Make Claim"
                      onClick={async () => {
                        console.log(coverDetails)
                        localStorage.setItem(
                          'claimPoolName',
                          coverDetails.poolName
                        )
                      }}
                    />
                  </Link>
                </div>
              </>
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
                <>
                  <InfoText
                    className="mb-[20px] margin-top"
                    variant="large"
                    color={theme === 'dark' ? 'dark' : 'white'}
                    text={'Deposit'}
                    icon={true}
                  />
                </>
              </div>
              <InputMax
                setDepositAmount={setDepositAmount}
                {...inputMax}
                setAmountApproved={setAmountApproved}
                poolName={coverDetails.poolName}
                action={true}
              />

              <div className="flex flex-col mt-[15px]">
                <div className="flex justify-between font-poppins">
                  <span className="balance-text">Balance</span>
                  <span className="balance-no dark:balance-no-dark">
                    {balance}
                  </span>
                </div>

                {transferring ? (
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
                  active={true}
                  setTransferring={setTransferring}
                  amountApproved={amountApproved}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DepositModal
