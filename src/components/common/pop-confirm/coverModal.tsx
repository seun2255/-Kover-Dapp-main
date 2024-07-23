import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Agreament from '../Agreament'
import Button, { ButtonProps } from '../Button'
import StatusCardContent, {
  StatusCardContentProps,
} from '../cards/StatusCard/StatusCardContent'
import InfoText from '../InfoText'
import Input, { InputProps } from '../pop-confirm/Input'
import InputMax, { InputMaxProps } from '../pop-confirm/InputMax'
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
import { getPolicyData } from '../../../api'
import { useWeb3React } from '@web3-react/core'
import TransactionProgress from '../TransactionProgress'
import Popup from '../../../components/templates/Popup'
import CarInsurance from '../../../components/common/PolicyRiskForms/carRisk'
import ModifyCarInsurance from '../PolicyRiskForms/modifyCarRisk'
import { getCoverDetails } from '../../../database'
import { useDispatch } from 'react-redux'

interface CommonPopConfirmProps {
  id?: Number
  title: string
  filled: boolean
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
      text: 'pool Ststus',
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
  columns: ['Active', '80%', 'Learn more'],
}

export type PopConfirmProps = CommonPopConfirmProps & (NormalProps | TabProps)
function CoverModal(props: PopConfirmProps) {
  const { theme } = React.useContext(UserContext)
  var { datam, title, onClose, defaultTab, coverDetails, filled } = props
  const [filledForm, setFilledForm] = useState(filled)
  const [id, setId] = useState(1)
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
    PRP: '00.00',
  })
  const [depositAmount, setDepositAmount] = useState(0)
  const [policyData, setPolicyData] = useState<any>()
  const [stage, setStage] = useState(1)
  const [transferring, setTransferring] = useState(false)
  const [amountApproved, setAmountApproved] = useState(false)

  const titleClassNameDark = 'summary-dark-title'
  const textClassNameDark = 'summary-dark-text'
  const titleClassNameLight = 'summary-light-title'
  const textClassNameLight = 'summary-light-text'

  const [riskForm, setRiskForm] = useState(false)
  const toggleForm = () => setRiskForm((v) => !v)
  const dispatch = useDispatch()

  const closeForm = () => {
    setRiskForm(false)
  }

  const onSubmit = () => {
    updateFields()
    setFilledForm(true)
    setRiskForm(false)
  }

  const updateFields = async () => {
    const policyDetails = await getPolicyData(account, coverDetails.poolName)
    // console.log('Details: ', policyDetails)
    // const policyDetails = await getCoverDetails(account, coverDetails.poolName)

    setPolicyData(policyDetails)
    setFields({
      date: now
        .add(durations[policyDetails.coverDuration as string])
        .format('DD/MM/YYYY'),
      premium: policyDetails.premiumQuote,
      fees: '5',
      discount: '0',
      cost: (
        Number(policyDetails.premiumQuote) +
        Number(policyDetails.fee) -
        0
      ).toString(),
      PRP: policyDetails.PRP,
    })
  }

  useEffect(() => {
    console.log(coverDetails)
    const getData = () => {
      if (filled && account) {
        // const policyDetails = await getPolicyData(
        //   account,
        //   coverDetails.poolName
        // )
        // console.log('Details: ', policyDetails)
        console.log('PRP: ', coverDetails.PRP)
        console.log('coverDetails')
        setPolicyData(coverDetails)
        setFields({
          date: now
            .add(durations[coverDetails.coverDuration as string])
            .format('DD/MM/YYYY'),
          premium: coverDetails.premiumQuote,
          fees: coverDetails.fee,
          discount: '0',
          cost: (
            Number(coverDetails.premiumQuote) +
            Number(coverDetails.fee) -
            0
          ).toString(),
          PRP: coverDetails.PRP,
        })
        console.log('Cover Details in Modal: ', coverDetails)
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
            </div>
            {prpInput && (
              <Input
                {...prpInput}
                defaultValue={fields.PRP}
                className={
                  id === 1 || id === 3 || id === 5 ? 'input-border' : ''
                }
                editAction={setRiskForm}
              />
            )}
          </div>
          <div className="md:cover-popup-left-content md:cover-center-border md:mt-0 mt-[20px] top-border">
            <div className="dark:box-border  border border-dark-75 coverbox-padding">
              <InfoText
                className="mb-[20px] margin-top"
                variant="large"
                color={theme === 'dark' ? 'dark' : 'white'}
                text={'Summary'}
                icon={true}
              />

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
                  value={fields.cost}
                  titleclassname={titleClassNameLight}
                  textclassname={textClassNameLight}
                />
              </>

              <div className="flex flex-col mt-[15px]">
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
                  id={1}
                  coverDetails={policyData}
                  filledForm={filledForm}
                  depositAmount={depositAmount}
                  setStage={setStage}
                  active={
                    false
                    // policyData ? policyData.policyStatus === 'active' : false
                  }
                  setTransferring={setTransferring}
                  amountApproved={amountApproved}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup visible={riskForm} onClose={toggleForm}>
        <div className="kyc-popup">
          <div className="flex gap-5 mb-3.5">
            <div>
              {filledForm ? (
                <ModifyCarInsurance
                  onClose={closeForm}
                  setFilledForm={setFilledForm}
                  poolName={coverDetails.poolName}
                  coverDetails={policyData}
                  onSubmit={onSubmit}
                />
              ) : (
                <CarInsurance
                  onClose={closeForm}
                  poolName={coverDetails.poolName}
                  onSubmit={onSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default CoverModal
