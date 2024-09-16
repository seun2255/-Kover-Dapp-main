import { Button } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import TermOfUsePopup from '../global/TermOfUsePopup'
import Popup from '../templates/Popup'
import SelectionField from './SelectionField'
import { UserContext } from '../../App'
import { applyForPolicy } from '../../api'
import {
  openAlert,
  closeAlert,
  openLoader,
  closeLoader,
} from '../..//redux/alerts'
import { useDispatch } from 'react-redux'
import { depositIntoPolicy } from '../../api'
import { disableCoverModify, setCoverBuyDate } from '../../database'

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
  filledForm?: boolean
}

function getCurrentDateTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${year}/${month}/${day} ${hours}:${minutes}`
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
  filledForm,
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
        console.log('It is stake')
        handleStake()
      } else if (active && depositAmount !== 0) {
        setTransferring(true)
        const hash = await depositIntoPolicy(
          coverDetails.poolName,
          depositAmount,
          dispatch
        )
        if (hash) {
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
          setTransferring(false)
        }
      } else {
        if (id === 1) {
          if (
            // coverDetails.resultStatus === 'approved' ||
            // coverDetails.resultStatus === 'rejected'
            true
          ) {
            setTransferring(true)
            // await approvePoolToSpend(
            //   coverDetails.poolName,
            //   coverDetails.premiumQuote + coverDetails.fee,
            //   dispatch
            // )
            // dispatch(
            //   openAlert({
            //     displayAlert: true,
            //     data: {
            //       id: 1,
            //       variant: 'Successful',
            //       classname: 'text-black',
            //       title: 'Amount Approved',
            //       tag1: 'approved token use',
            //       tag2: 'amount can now be deposited',
            //     },
            //   })
            // )
            // setTimeout(() => {
            //   dispatch(closeAlert())
            // }, 1000)

            // const hash = await acceptPolicy(
            //   coverDetails.poolName,
            //   coverDetails.data,
            //   coverDetails.address,
            //   depositAmount,
            //   dispatch
            // )
            const hash = await applyForPolicy(
              coverDetails.poolName,
              coverDetails.formData,
              1,
              coverDetails.premiumQuote + coverDetails.fee,
              coverDetails,
              dispatch
            )
            if (hash) {
              await setCoverBuyDate(
                coverDetails.address,
                coverDetails.poolName,
                getCurrentDateTime()
              )
              await disableCoverModify(
                coverDetails.address,
                coverDetails.poolName
              )
              setStage(2)
              setTimeout(() => {
                dispatch(closeLoader())
                setStage(3)
                dispatch(
                  openAlert({
                    displayAlert: true,
                    data: {
                      id: 1,
                      variant: 'Successful',
                      classname: 'text-black',
                      title: 'Cover bought!',
                      tag1: 'policy is now active',
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
            } else {
              setTransferring(false)
            }
          } else {
            if (filledForm) {
              dispatch(
                openAlert({
                  displayAlert: true,
                  data: {
                    id: 2,
                    variant: 'Failed',
                    classname: 'text-black',
                    title: 'Application still in review',
                    tag1: "can't accept a pending application",
                    tag2: 'wait for a policy reviewer to asses your application',
                  },
                })
              )
              setTimeout(() => {
                dispatch(closeAlert())
              }, 10000)
            } else {
              dispatch(
                openAlert({
                  displayAlert: true,
                  data: {
                    id: 2,
                    variant: 'Failed',
                    classname: 'text-black',
                    title: 'Risk data not submitted',
                    tag1: 'fill the risk data form',
                    tag2: 'click on edit to open the form',
                  },
                })
              )
              setTimeout(() => {
                dispatch(closeAlert())
              }, 10000)
            }
          }
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
              // if (id === 6) {
              if (active) {
                checkbox ? setCheckbox(false) : setCheckbox(true)
              } else {
                if (filledForm) {
                  // dispatch(
                  //   openAlert({
                  //     displayAlert: true,
                  //     data: {
                  //       id: 2,
                  //       variant: 'Failed',
                  //       classname: 'text-black',
                  //       title: 'Application still in review',
                  //       tag1: "can't accept a pending application",
                  //       tag2: 'wait for a policy reviewer to asses your application',
                  //     },
                  //   })
                  // )
                  // setTimeout(() => {
                  //   dispatch(closeAlert())
                  // }, 10000)
                  checkbox ? setCheckbox(false) : setCheckbox(true)
                } else {
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 2,
                        variant: 'Failed',
                        classname: 'text-black',
                        title: 'Risk data not submitted',
                        tag1: 'fill the risk data form',
                        tag2: 'click on edit to open the form',
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                }
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
