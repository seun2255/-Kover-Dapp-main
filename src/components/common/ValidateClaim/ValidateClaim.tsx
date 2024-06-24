import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Header from '../header/Header'
import QRConnector from '../QRConnector'
import SelectField from '../TextField/SelectField'
import TextField from '../TextField'
import TextFieldS from '../TextFieldS'
import { UserContext } from '../../../App'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import InfoText from '../InfoText'
import ProgressWeight from '../progress-weight/ProgressWeight'
import Rules from '../FileUpload/Rules'
import UploadingFile from '../FileUpload/UploadingFile'
import DownloadBox from '../DownloadBox'
import FormAgreament from '../FormAgreament'
import { useNavigate } from 'react-router-dom'
import WeightRow from '../WeightRow'
import WeightTitle from '../WeightTitle'
import CastYourVote from '../../../components/global/CastYourVote'
import {
  submitClaimAssesmentDecision,
  validateClaim,
  getTokenBalance,
} from '../../../api'
import { useDispatch } from 'react-redux'
import { openAlert, closeAlert } from '../../../redux/alerts'
import { useWeb3React } from '@web3-react/core'

interface popupProps {
  onClose?: () => void
  type: 'assesment' | 'validation'
  claimDetails: any
  onComplete?: () => void
}

const ratings: { [key: string]: number } = {
  Terrible: 25,
  Bad: 50,
  Good: 75,
  Amazing: 100,
}

const ratingValues = ['Terrible', 'Bad', 'Good', 'Amazing']

function ValidateClaim(
  { onClose, type, claimDetails, onComplete }: popupProps,
  props: any
) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  const [isYes, setIsYes] = useState<boolean>()
  const [rating, setRating] = useState<number>()
  const [displayAmount, setDisplayAmount] = useState<string>('')
  const [lockAmount, setLockAmount] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [balance, setBalance] = useState(0)
  const { account } = useWeb3React()

  const handleRate = (ratingText: string) => {
    setRating(ratings[ratingText])
  }

  const handleMaxClick = async () => {
    const maxBalance = await getTokenBalance(account)
    setDisplayAmount(parseInt(maxBalance).toString())
    setLockAmount(parseInt(maxBalance))
  }

  const handleInputChange = (e: any) => {
    setDisplayAmount(e.target.value)
    setLockAmount(parseInt(e.target.value))
  }

  const handleSubmit = async () => {
    if (type === 'validation') {
      if (lockAmount === 0) {
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 2,
              variant: 'Failed',
              classname: 'text-black',
              title: 'Transaction Failed',
              tag1: 'Enter a valid amount!',
              tag2: 'please input approved payout',
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
      } else if (rating === undefined) {
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 2,
              variant: 'Failed',
              classname: 'text-black',
              title: 'Transaction Failed',
              tag1: 'Adjuster assesement not rated!',
              tag2: 'please leave a rating',
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
      } else if (isYes === undefined) {
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 2,
              variant: 'Failed',
              classname: 'text-black',
              title: 'Transaction Failed',
              tag1: 'Vote not cast',
              tag2: 'please cast a vote',
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
      } else {
        const hash = await validateClaim(
          claimDetails.poolName,
          claimDetails.address,
          lockAmount.toString(),
          isYes,
          rating
        )
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 1,
              variant: 'Successful',
              classname: 'text-black',
              title: 'Submission Successful',
              tag1: 'Claim validation Decision submitted',
              tag2: 'View on etherscan',
              hash: hash,
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
        onClose?.()
        onComplete?.()
      }
    } else {
      if (rating === undefined) {
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 2,
              variant: 'Failed',
              classname: 'text-black',
              title: 'Transaction Failed',
              tag1: 'Adjuster assesement not rated!',
              tag2: 'please leave a rating',
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
      } else if (isYes === undefined) {
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 2,
              variant: 'Failed',
              classname: 'text-black',
              title: 'Transaction Failed',
              tag1: 'Vote not cast',
              tag2: 'please cast a vote',
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
      } else {
        console.log('Claim Details: ', claimDetails)
        const hash = await submitClaimAssesmentDecision(
          claimDetails.poolName,
          claimDetails.address,
          isYes,
          rating
        )
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 1,
              variant: 'Successful',
              classname: 'text-black',
              title: 'Submission Successful',
              tag1: 'Claim assesment Decision submitted',
              tag2: 'View on etherscan',
              hash: hash,
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
        navigate(-1)
      }
    }
  }

  useEffect(() => {
    const getBalance = async () => {
      const balance = await getTokenBalance(account)
      setBalance(parseInt(balance))
    }

    getBalance()
  }, [])

  return (
    <div>
      <div className="dark:text-dark-800 dark:text-primary-100 dark:bg-white wallet-popup">
        <div className="flex justify-end mb-2.5">
          <button type="button" onClick={onClose}>
            <img className="w-2.5 h-2.5" src="/images/Group 144.svg" alt="" />
          </button>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            src={theme === 'dark' ? '/images/Frame.svg' : '/images/Frame.svg'}
            alt=""
          />
          <b className="wallet-title dark:wallet-title-dark mt-[17px]">
            Validate Claim
          </b>
          <p className="valClaim-sub-title mt-[2px]">To get extra rewards</p>
        </div>
        <div className="mt-[18px]">
          <p className="valClaim-text">
            How would you rate your overall satisfaction with the assessment of
            The claim?
          </p>
        </div>
        <div className="grid grid-cols-4 max-[320px]:grid-cols-2 max-[375px]:grid-cols-2 md:grid-cols-4 gap-4 mt-[2px]">
          {ratingValues.map((ratingValue: string) => {
            return (
              <button
                type="button"
                className={`min-w-[100px] general-text-12 flex gap-[10px] valClaim-Btn ${
                  rating === ratings[ratingValue] ? 'active' : ''
                }`}
                onClick={() => handleRate(ratingValue)}
              >
                <img
                  className="w-6 md:w-auto wallet-sub-button-icon"
                  src="/images/Group 12.png"
                  alt=""
                />
                <span className="valClaim-Btn-text"> {ratingValue} </span>
              </button>
            )
          })}
        </div>
        {type === 'validation' && (
          <>
            <div>
              <WeightRow
                className="mt-[15px]"
                name="Lock to Vote"
                valuePrefix=" Balance"
                value={` ${balance} KOVER`}
                titleclassname="fs-13 text-light fw-500"
                textclassname="fs-13 text-light fw-500"
                valuePrefixClassName="fs-13 text-dark fw-500"
              />
            </div>
            <div className="bg-dark-800 rounded py-2.5 px-5 flex justify-between gap-2 items-center mb-4 dark:bg-light-200 h-[50px] mt-[15px]">
              <input
                maxLength={5}
                type="text"
                placeholder="00.00"
                className={`placeholder:text-dark-300 dark:text-dark-800 text-6xl max-w-none min-w-0 w-[72px] flex-grow dark:placeholder:text-dark-300 fw-400 lh-42 input-value
        "text-[#42434B] dark:tex-light-800" : "text-[#FFFFFF] dark:tex-light-800"} `}
                value={displayAmount}
                onChange={handleInputChange}
              />
              <div className="flex gap-4 items-center">
                <Button
                  color={theme === 'dark' ? 'dark:bg-white' : ' bg-[#3F4048]'}
                  className="h-[30px]"
                  text="MAX"
                  onClick={handleMaxClick}
                />
              </div>
            </div>
          </>
        )}
        <div>
          <WeightRow
            className="mt-[15px]"
            name="Cast Your Vote"
            titleclassname="fs-13 text-light fw-500"
          />
        </div>
        <div className="mt-[10px] popupvoteagre">
          <CastYourVote
            headline
            view="moblie"
            firsttext="By voting, I accept Kover's"
            setIsYes={setIsYes}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
export default ValidateClaim
