import { Button } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import TermOfUsePopup from '../global/TermOfUsePopup'
import Popup from '../templates/Popup'
import SelectionField from './SelectionField'
import { UserContext } from '../../App'
import { acceptPolicy } from '../../api'
import { openAlert, closeAlert } from '../..//redux/alerts'
import { useDispatch } from 'react-redux'
import { depositIntoPolicy, stake } from '../../api'

export interface PopupAgreamentProps {
  mainClass?: String
  classname?: String
  onClose?: () => void
  agree: string
  agreeURL: string
  setId: any
  id: number
  setStage: any
  textClasss?: string
  active: boolean
  amountApproved: boolean
  text?: string
  variety?: string
  checked?: boolean
  bntText?: string
  item1Class?: String
  item2Class?: String
  coverDetails?: any
  depositAmount?: any
  setTransferring?: any
  isStake?: boolean
  handleStake?: any
}

function PopupAgreament({
  mainClass,
  classname,
  agree,
  agreeURL,
  text,
  variety,
  checked,
  textClasss,
  bntText,
  item1Class,
  item2Class,
  setId,
  id,
  coverDetails,
  depositAmount,
  setStage,
  active,
  setTransferring,
  amountApproved,
  isStake,
  handleStake,
  onClose,
}: PopupAgreamentProps) {
  const [value, setValue] = useState(checked)
  const [checkbox, setCheckbox] = useState(true)
  const toggleChecked = () => setValue((v) => !v)
  const [terms, setTerms] = useState<boolean>(false)
  const toggleTerms = () => setTerms((v) => !v)
  const popupTerms = ['Terms of Use']
  const { theme } = React.useContext(UserContext)
  const dispatch = useDispatch()

  const handleClick = async () => {
    if (depositAmount === 0 || amountApproved) {
      if (isStake) {
        handleStake()
      } else if (active) {
        setTransferring(true)
        const hash = await depositIntoPolicy(
          coverDetails.poolName,
          depositAmount
        )
        setStage(2)
        setTimeout(() => {
          setStage(3)
          dispatch(
            openAlert({
              displayAlert: true,
              data: {
                id: 1,
                variant: 'Successful',
                classname: 'text-black',
                title: 'Deposit Succesful',
                tag1: 'policy deposit process completetd',
                tag2: 'cover balance toped up',
                hash: hash,
              },
            })
          )
          onClose?.()
          setTimeout(() => {
            dispatch(closeAlert())
          }, 10000)
        }, 1000)
      } else {
        if (id === 1) {
          const hash = await acceptPolicy(
            coverDetails.poolName,
            coverDetails.data,
            coverDetails.address,
            depositAmount
          )
          setStage(2)
          setTimeout(() => {
            setStage(3)
            dispatch(
              openAlert({
                displayAlert: true,
                data: {
                  id: 1,
                  variant: 'Successful',
                  classname: 'text-black',
                  title: 'Policy Accepted',
                  tag1: 'policy purchase process completetd',
                  tag2: 'cover bought',
                  hash: hash,
                },
              })
            )
            onClose?.()
            setTimeout(() => {
              dispatch(closeAlert())
            }, 10000)
          }, 1000)
        } else if (id === 6) {
          setId(1)
        }
      }
    } else if (!amountApproved) {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Failed',
            tag1: 'Amount not approved',
            tag2: 'please first approve the required amount',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
    }
  }

  var model = []
  if (theme === 'dark') {
    model = ['/images/black_ok_icon.svg', '/images/empty_box_icon.svg']
  } else {
    model = ['/images/Group 220 (1).svg', '/images/Group 220.svg']
  }
  return (
    <Fragment>
      <div
        className={`${
          mainClass || 'flex sm:justify-between items-center flex-col'
        }`}
      >
        <div
          className={` ${item1Class || 'flex gap-[12px] items-center w-full'} `}
        >
          <div
            className=""
            onClick={() => {
              if (id === 6) {
                checkbox ? setCheckbox(false) : setCheckbox(true)
              }
            }}
          >
            {checkbox ? (
              <img
                src={model[1]}
                className="checked-selection"
                alt=""
                width={20}
                height={20}
              />
            ) : (
              <img
                src={model[0]}
                className="checked-selection"
                alt=""
                width={20}
                height={20}
              />
            )}
          </div>
          <span className={`${classname} agreament-text`}>
            {text || "I accept Kover's"}&nbsp;
            {popupTerms.indexOf(agree) >= 0 ? (
              <span
                onClick={toggleTerms}
                role="button"
                className={`text-brand-400 font-bold no-underline dark:text-dark-600 ${
                  textClasss || ''
                }`}
              >
                {agree}
              </span>
            ) : (
              <Link
                className={`text-brand-400 dark:text-dark-800 font-bold`}
                to={agreeURL}
              >
                {agree}
              </Link>
            )}
          </span>
        </div>
        <div
          className={` ${
            item1Class || 'flex gap-[12px] items-center mt-[25px] w-full'
          }`}
        >
          {checkbox ? (
            <button
              type="button"
              disabled
              className={`${
                theme === 'dark'
                  ? 'dark:bg-light-1100 dark:box-border'
                  : 'form-submit-btn'
              } contained medium  font-medium px-8 w-full square button`}
              onClick={handleClick}
            >
              <span>{bntText || 'Confirm'}</span>
              <img className="duration-150 " src="/images/126.svg" alt="" />
            </button>
          ) : (
            <button
              type="button"
              className={`${
                theme === 'dark'
                  ? 'dark:white dark:box-border '
                  : 'greenGradient'
              } contained medium  font-medium px-8 w-full square button`}
              onClick={handleClick}
            >
              <span>{bntText || 'Confirm'}</span>
              <img className="duration-150 " src="/images/125.svg" alt="" />
            </button>
          )}
        </div>
      </div>

      <Popup
        onClose={toggleTerms}
        visible={terms}
        width="w-[641px]"
        height="h-[616px]"
      >
        <TermOfUsePopup accept={toggleTerms} decline={toggleTerms} />
      </Popup>
    </Fragment>
  )
}

export default PopupAgreament
