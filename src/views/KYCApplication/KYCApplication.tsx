import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import FilterTabs from '../../components/common/FilterTabs'
import Header from '../../components/common/header/Header'
import PopConfirm, {
  PopConfirmProps,
} from '../../components/common/pop-confirm/PopConfirm'
import SearchField from '../../components/common/SearchField'
import CarInsurance from '../../components/common/Table/components/CarInsurance'
import LargeText from '../../components/common/Table/components/LargeText'
import Status from '../../components/common/Table/components/Status'
import Table, { TableProps } from '../../components/common/Table/Table'
import Tabs from '../../components/common/Tabs'
import Popup from '../../components/templates/Popup'
import MarketStatus from '../Welcome/market-status/MarketStatus'
import StatusInfo from '../Welcome/StatusInfo'
import TableCard from '../../components/common/cards/TableCard/TableCard'
import { UserContext } from '../../App'
import Drawer from 'react-modern-drawer'
import Switch from '@mui/material/Switch'
import { Box } from '@mui/material'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import Alert from '../../components/common/Alert'
import AdminCard, { AdminCardProps } from '../Assessement/AdminCard'
import DecisionToggle from '../../components/common/decisionToggle'
import { useWeb3React } from '@web3-react/core'
import {
  assignMembershipApplication,
  get_applications,
  get_Reviewer_applications,
  getKycDetails,
  getKycReveiwerDetails,
  submitApplicationReviewResult,
  revertMembershipApplication,
  concludeMembershipApplication,
  concludeInsureproApplication,
  get_covers,
  getPolicyData,
  assignPolicyApplication,
  submitPolicyApplicationResult,
  concludePolicyAssesement,
  get_claims,
  getClaimData,
  assignClaimApplication,
} from '../../api'
import axios from 'axios'
import { addContractState, addKycReviewerState } from '../../utils/helpers'
import { useDispatch } from 'react-redux'
import {
  setKYCApplicants,
  setKYCReviewerApplicants,
  setCoverApplications,
  setClaimsApplications,
} from '../../redux/kyc'
import { getUserDetails, updateCoverState } from '../../database'
import {
  createChatRoom,
  updateVerificationState,
  insureProVerificationDone,
  updateInsureProVerificationState,
} from '../../database'
import { openAlert, closeAlert } from '../../redux/alerts'
import CountdownTimer from '../../components/common/CountdownTimer'
import { getUser } from '../../tableland'
import { doc, onSnapshot, getDocs, collection } from 'firebase/firestore'
import { db } from '../../database'
import TableOptions from '../../components/common/Table/TableOptions/TableOptions'

function KYCApplication() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  const { library, account } = useWeb3React()
  const [selectItem, setselectItem] = useState()
  const [membershipApplications, setMembershipApplications] = useState<any[]>(
    []
  )
  const [reviewerApplications, setReviewerApplications] = useState<any[]>([])
  const [policyApplications, setPolicyApplications] = useState<any[]>([])
  const [claimApplications, setClaimApplications] = useState<any[]>([])
  const [assignpopup, setAssignPopup] = useState(false)
  const [policyAssignpopup, setPolicyAssignPopup] = useState(false)
  const [claimAssignPopup, setClaimAssignPopup] = useState(false)
  const { width } = useWindowDimensions()
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const [isAdmin, setIsAdmin] = useState(false)
  const [acceptedKyc, setAcceptedKyc] = useState([])

  const handlerLink = (item: any) => {
    setselectItem(item)
  }

  const { theme } = React.useContext(UserContext)
  const [tabs, setTabs] = useState<number>(0)
  const [dateFilter, setDateFilter] = useState<number>(0)
  const [kycDecisionFunction, setKYCDecisionFunction] = useState<() => void>(
    () => {}
  )
  const [kycDecisionMade, setKycDecisionMade] = useState(false)
  const [kycReviewerDecisionMade, setKycReviewerDecisionMade] = useState(false)
  const [policyDecisionMade, setPolicyDecisionMade] = useState(false)
  const [claimDecisionMade, setClaimDecisionMade] = useState(false)
  const [kycDecision, setKycDecision] = useState(true)
  const [kycReviewerDecision, setKycReviewerDecision] = useState(true)
  const [policyDecision, setPolicyDecision] = useState(true)
  const [claimDecision, setClaimDecision] = useState(true)
  const [searchResults, setSearchResults] = useState<any>([])

  const makeKYCDecision = (decision: boolean) => {
    setKycDecisionMade(true)
    setKycDecision(decision)
  }

  const makeKYCReviewerDecision = (decision: boolean) => {
    setKycReviewerDecisionMade(true)
    setKycReviewerDecision(decision)
  }

  const makePolicyDecision = (decision: boolean) => {
    setPolicyDecisionMade(true)
    setPolicyDecision(decision)
  }

  const makeClaimDecision = (decision: boolean) => {
    setClaimDecisionMade(true)
    setClaimDecision(decision)
  }

  const getData = async () => {
    if (account) {
      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const applicantsKyc = await get_applications('NG')

      const axiosRequestsKyc = applicantsKyc.map(async (applicant) => {
        const response = await axios.get(applicant.data as string)
        const kyc_details = await getKycDetails(response.data.address, 'NG')
        const result = addContractState(response.data, kyc_details)
        const userFirebaseDetails = await getUserDetails(response.data.address)
        result.id = applicant.id
        result.canModifyKYC = userFirebaseDetails.canModifyKYC
        result.canModifyKYCReviewer = userFirebaseDetails.canModifyKYCReviewer
        result.kycVerificationState = userFirebaseDetails.kycVerificationState
        result.insureProVerificationState =
          userFirebaseDetails.insureProVerificationState
        result.ipfsHash = applicant.data
        result.kycReviewDone = userFirebaseDetails.kycReviewDone
        return result
      })

      // Wait for all axios requests to complete
      const membership_applicationsKyc = await Promise.all(axiosRequestsKyc)
      dispatch(setKYCApplicants({ data: membership_applicationsKyc }))
      setMembershipApplications(membership_applicationsKyc)
      // })

      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const applicantsReviewer = await get_Reviewer_applications('NG')

      const axiosRequestsReviewer = applicantsReviewer.map(
        async (applicant) => {
          const response = await axios.get(applicant.data as string)
          const kyc_details = await getKycReveiwerDetails(
            response.data.address,
            'NG'
          )
          const result = addKycReviewerState(response.data, kyc_details)
          const userFirebaseDetails = await getUserDetails(
            response.data.address
          )
          result.id = applicant.id
          result.canModifyKYCReviewer = userFirebaseDetails.canModifyKYCReviewer
          result.canModifyKYC = userFirebaseDetails.canModifyKYC
          result.ipfsHash = applicant.data
          result.kycReviewDone = userFirebaseDetails.kycReviewDone
          result.insureProVerificationState =
            userFirebaseDetails.insureProVerificationState
          return result
        }
      )

      // Wait for all axios requests to complete
      const membership_applicationsReviewer = await Promise.all(
        axiosRequestsReviewer
      )
      dispatch(
        setKYCReviewerApplicants({ data: membership_applicationsReviewer })
      )
      setReviewerApplications(membership_applicationsReviewer)
      // })

      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const covers = await get_covers('NG')
      const axiosRequestsCovers = covers.map(async (cover) => {
        const user = await getUser(cover.address)
        const response = await axios.get(user.data as string)
        var result = response.data
        var policyDetails = await getPolicyData(cover.address, cover.poolName)
        result = {
          ...result,
          ...cover,
          ...policyDetails,
          userData: user.data,
        }
        return result
      })
      const allCovers = await Promise.all(axiosRequestsCovers)
      dispatch(setCoverApplications({ data: allCovers }))
      setPolicyApplications(allCovers)
      // })

      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const claims = await get_claims('NG')
      const axiosRequests = claims.map(async (claim) => {
        const user = await getUser(claim.address)
        const response = await axios.get(user.data as string)
        var result = response.data
        const claim_details = await getClaimData(claim.poolName, claim.address)
        result = {
          ...result,
          ...claim,
          ...claim_details,
          userData: user.data,
        }
        return result
      })
      const allClaims = await Promise.all(axiosRequests)
      dispatch(setClaimsApplications({ data: allClaims }))
      setClaimApplications(allClaims)
      // })
    }
  }

  const checkClaim = (application: any) => {
    if (application.resultStatus !== 'pending') {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Claim is in Validation stage!',
            tag1: 'Claim has been Assesed!',
            tag2: 'this has already been assesed',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'realtime', 'applications'),
      (doc: any) => {
        console.log('This Ran!!!!!')
        getData()
      }
    )
    if (account && account === '0xC5E0a590daDc2129f591f2a539829Dd69b02Aef5') {
      setIsAdmin(true)
    }
  }, [])

  const [popup, setPopup] = useState<PopConfirmProps | null>(null)
  const popupHandle = (data?: PopConfirmProps) =>
    data ? setPopup(data) : setPopup(null)
  const myCoverPopup: PopConfirmProps = {
    title: 'Risk Pool Details',
    id: 5,
    cover: {
      card: {
        icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
        name: 'Car cover',
        subIcon:
          theme === 'dark'
            ? '/images/okicon.svg'
            : '/images/ShieldActiveFinance 1.svg',
      },
      purchase: '',
      id: 3,
      totalPolicies: '4551',
      totalPoliciesName: 'Purchase',
    },
    table: {
      rows: [
        {
          text: 'Available Capital',
          icon: true,
        },
        {
          text: 'APY',
          icon: true,
        },
        {
          text: 'Ongoing Claims',
          icon: false,
        },
      ],
      columns: ['6.660.00 USDC', '3,16%', '3658'],
    },
    prpInput: {
      infoText: {
        text: 'Total',
      },
      defaultValue: '',
      placeholder: '00.00',
      action: {
        text: 'USDC',
      },
    },
    inputMax: {
      placeholder: '00.00',
      action: true,
    },
    balance: '6.660.00 USDC',
    disclaimer:
      'Investment strategies carry risks due to market changes. Careful management is crucial for the protocol`s long-term success',
  }
  const riskManagementopup: PopConfirmProps = {
    title: 'Risk Pool Management',
    id: 20,
  }

  function capitalizeFirstLetter(inputString: any) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
  }

  const revert = async (address: string, region: string) => {
    const signer = library.getSigner(account)
    await revertMembershipApplication(signer, region, address)
    setTimeout(() => {
      getData()
    }, 10000)
  }

  function extractDate(timeString: string) {
    return timeString.split(' ')[0] + ' '
  }

  const kyc: TableProps = {
    title: 'kyc',
    data: membershipApplications,
    tabs: tabs,
    options: isAdmin
      ? [{ name: 'Revert', action: revert }, { name: 'Cancel' }]
      : [{ name: 'Chat' }, { name: 'Profile' }],
    columns: [
      {
        name: '',
        width: '',
      },
      {
        name: 'LEGAL NAME',
        width: 'w-[16%] ',
      },
      {
        name: 'BIRTH DATE',
        width: 'w-[19%] ',
      },
      {
        name: 'STATUS',
        width: 'w-[18%] ',
      },
      {
        name: 'DATE',
        width: 'w-[29%] ',
      },
      {
        name: 'DECISION',
        width: 'w-[19%] ',
      },
      {
        name: 'ACTION',
        width: 'w-[9%] ',
      },
    ],
    rows: membershipApplications.map((application: any, index: any) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions
            options={
              isAdmin
                ? [{ name: 'Revert', action: revert }, { name: 'Cancel' }]
                : [{ name: 'Chat' }, { name: 'Profile' }]
            }
          />
        </div>,
        <Link
          to={
            application.reviewer === account ||
            application.address === account ||
            isAdmin
              ? `/kyc-user-profile/${application.id}`
              : ''
          }
        >
          <span className="prp dark:prp-dark">{`${application.firstName} ${application.lastName}`}</span>
        </Link>,
        <span className="prp dark:prp-dark">{application.dob}</span>,
        <Status
          type={
            application.resultStatus === 'rejected'
              ? 'Declined'
              : capitalizeFirstLetter(application.resultStatus)
          }
          text={
            application.resultStatus === 'rejected'
              ? 'Declined'
              : capitalizeFirstLetter(application.resultStatus)
          }
        />,
        <span className="prp dark:prp-dark">
          {application.applicationStatus === 'assigned' ? (
            <>
              {extractDate(application.date)}
              <CountdownTimer
                timeLeftInSeconds={application.submit_time_left}
              />
            </>
          ) : (
            application.date
          )}
        </span>,
        <div>
          {application.resultStatus === 'approved' ||
          application.resultStatus === 'rejected' ? (
            <DecisionToggle
              makeDecision={makeKYCDecision}
              completed={true}
              decision={application.resultStatus === 'approved' ? true : false}
            />
          ) : application.applicationStatus === 'assigned' ? (
            <DecisionToggle makeDecision={makeKYCDecision} />
          ) : (
            <Box
              sx={{
                '.Mui-checked': {
                  color: `${
                    theme === 'dark' ? '#606166' : '#50ff7f'
                  } !important;`,
                },
                '.MuiSwitch-track': {
                  background: `${
                    theme === 'dark' ? '#606166' : 'rgba(148, 233, 63, 0.4)'
                  } !important;`,
                },
              }}
            >
              <Switch className="convert-switch" id="1" disabled />
            </Box>
          )}
        </div>,
        <div>
          {(application.resultStatus === 'approved' ||
            application.resultStatus === 'rejected') &&
          application.submit_time_left <= 0 ? (
            <Button
              disabled={
                application.applicationStatus === 'concluded' ? true : false
              }
              text="Conclude"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full ${
                application.applicationStatus === 'concluded'
                  ? 'disabled:opacity-10 disabled:pointer-events-none'
                  : ''
              }`}
              onClick={async () => {
                const hash = await concludeMembershipApplication(
                  application.address,
                  application.region
                )
                await updateVerificationState(application.address, 'verified')
                dispatch(
                  openAlert({
                    displayAlert: true,
                    data: {
                      id: 1,
                      variant: 'Successful',
                      classname: 'text-black',
                      title: 'Submission Successful',
                      tag1: 'KYC Review concluded',
                      tag2: 'View on etherscan',
                      hash: hash,
                    },
                  })
                )
                getData()
                setTimeout(() => {
                  dispatch(closeAlert())
                }, 10000)
              }}
            />
          ) : application.resultStatus === 'approved' ||
            application.resultStatus === 'rejected' ? (
            <Button
              // onClick={() => popupHandle(myCoverPopup)}
              disabled
              text="Submit"
              btnText="table-action"
              endIcon={'/images/126.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full disabled:opacity-10 disabled:pointer-events-none`}
            />
          ) : application.applicationStatus === 'assigned' ? (
            <Button
              // onClick={() => popupHandle(myCoverPopup)}
              text="Submit"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full`}
              onClick={async () => {
                if (kycDecisionMade) {
                  const hash = await submitApplicationReviewResult(
                    application.address,
                    application.region,
                    application.ipfsHash,
                    policyDecision
                  )
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 1,
                        variant: 'Successful',
                        classname: 'text-black',
                        title: 'Submission Successful',
                        tag1: 'KYC Review submitted',
                        tag2: 'View on etherscan',
                        hash: hash,
                      },
                    })
                  )
                  getData()
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
                        title: 'Transaction Failed',
                        tag1: 'A decision has not been made',
                        tag2: 'View on etherscan',
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                }
              }}
            />
          ) : (
            <Button
              onClick={async () => {
                if (application.address === account) {
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 2,
                        variant: 'Failed',
                        classname: 'text-black',
                        title: 'Transaction Failed',
                        tag1: "Can't self assign application",
                        tag2: 'View on etherscan',
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                } else {
                  setAssignPopup(true)
                }
              }}
              text="Assign"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full`}
            />
          )}
        </div>,
        <Popup
          visible={assignpopup}
          onClose={() => {
            setAssignPopup(false)
          }}
        >
          <div className="px-[30px] pb-[40px] pt-[30px] dark:bg-white w-[345px] sm:w-[310px]">
            <div className="flex justify-end">
              <img
                role={'button'}
                className="w-2.5"
                src="/images/Group 158.svg"
                alt=""
                onClick={() => {
                  setAssignPopup(false)
                }}
              />
            </div>

            <div className="flex flex-col items-center mb-[32px]">
              <img
                className="mt-[10px] w-[25px] h-[27px]"
                src={
                  theme === 'dark'
                    ? '/images/x-logo-dark.svg'
                    : '/images/x-logo.svg'
                }
                alt=""
              />
              <h3 className="mt-[17px] fw-500 fs-16 lh-28">Lock To Assess</h3>
            </div>
            <div className="mt-[32px] rounded box-border-2x-light dark:box-border-2x-dark  dark:bg-[#F1F1F1] bg-[#2A2B31] h-[50px] min-w-[250px] px-[20px] py-[4px] flex justify-between items-center">
              <span className="fw-400 text-[24px] lh-42 text-[#FAFAFA] dark:text-dark-800">
                25
              </span>
              <div className="bg-[#3F4048] dark:bg-[#FFF] my-[6px] py-[6px] px-[18px] h-[30px]">
                <button className="fw-500 fs-16 lh-19">USDC</button>
              </div>
            </div>
            <div className="flex justify-end items-center mt-[10px] mb-[15px]">
              <span className="text-[#606166] fw-500 fs-12 lh-14"> ~ $25 </span>
            </div>
            <div className="mt-[14px]">
              <button
                type="button"
                className={` ${
                  theme === 'dark'
                    ? `dark:white dark:box-border`
                    : `greenGradient`
                } contained medium  font-medium px-8 w-full square button`}
                onClick={async () => {
                  const signer = library.getSigner(account)
                  const hash = await assignMembershipApplication(
                    signer,
                    application.address,
                    application.region
                  )
                  await createChatRoom(
                    'kyc',
                    application.region,
                    application.id,
                    {
                      [application.address]: application.firstName,
                      [account as string]: 'reviewer',
                    }
                  )
                  getData()
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 1,
                        variant: 'Successful',
                        classname: 'text-black',
                        title: 'Submission Successful',
                        tag1: 'KYC application assigned to you',
                        tag2: 'View on etherscan',
                        hash: hash,
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                  setAssignPopup(false)
                }}
              >
                <span>Submit</span>
                <img className="duration-150 " src="/images/125.svg" alt="" />
              </button>
            </div>
          </div>
        </Popup>,
      ]
    }),
  }

  const insurePro: TableProps = {
    tabs: tabs,
    data: reviewerApplications,
    options: [{ name: 'Deactivate' }, { name: 'Profile' }],
    columns: [
      {
        name: '',
        width: '',
      },
      {
        name: 'LEGAL NAME',
        width: 'w-[16%]',
      },
      {
        name: 'TYPE',
        width: 'w-[19%]',
      },
      {
        name: 'STATUS',
        width: 'w-[18%]',
      },
      {
        name: 'DATE',
        width: 'w-[17%]',
      },
      {
        name: 'DECISION',
        width: 'w-[8%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: reviewerApplications.map((application: any, index: number) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions
            options={[{ name: 'Deactivate' }, { name: 'Profile' }]}
          />
        </div>,
        <Link
          to={
            application.address === account || isAdmin
              ? `/insure-pro-user-profile/${application.id}`
              : ''
          }
        >
          <span className="prp dark:prp-dark">{`${application.firstName} ${application.lastName}`}</span>
        </Link>,
        <span className="prp dark:prp-dark">{application.workField}</span>,
        <Status
          type={
            application.kycReviewDone
              ? application.insureProVerificationState === 'verified'
                ? 'Accepted'
                : 'Declined'
              : 'Pending'
          }
          text={
            application.kycReviewDone
              ? application.insureProVerificationState === 'verified'
                ? 'Accepted'
                : 'Declined'
              : 'Pending'
          }
        />,
        <span className="prp dark:prp-dark">
          {application.date.split(' ')[0]}
        </span>,
        <div>
          {application.kycReviewDone ? (
            <DecisionToggle
              makeDecision={makeKYCReviewerDecision}
              completed={true}
              decision={
                application.insureProVerificationState === 'verified'
                  ? true
                  : false
              }
            />
          ) : (
            <DecisionToggle makeDecision={makeKYCReviewerDecision} />
          )}
        </div>,
        <div>
          {application.kycReviewDone ? (
            <Button
              // onClick={() => popupHandle(myCoverPopup)}
              disabled
              text="Submit"
              btnText="table-action"
              endIcon={'/images/126.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full disabled:opacity-10 disabled:pointer-events-none`}
            />
          ) : (
            <Button
              onClick={async () => {
                const hash = await concludeInsureproApplication(
                  application.address,
                  application.region,
                  application.workField,
                  kycReviewerDecision,
                  application.pool
                )
                await updateInsureProVerificationState(
                  application.address,
                  'verified'
                )
                await insureProVerificationDone(application.address)
                dispatch(
                  openAlert({
                    displayAlert: true,
                    data: {
                      id: 1,
                      variant: 'Successful',
                      classname: 'text-black',
                      title: 'Submission Successful',
                      tag1: `${application.workField} Review concluded`,
                      tag2: 'View on etherscan',
                      hash: hash,
                    },
                  })
                )
                getData()
                setTimeout(() => {
                  dispatch(closeAlert())
                }, 10000)
              }}
              text="Submit"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full`}
            />
          )}
        </div>,
      ]
    }),
  }

  const policies: TableProps = {
    tabs: tabs,
    data: policyApplications,
    options: [{ name: 'Revert' }, { name: 'Cancel' }],
    columns: [
      {
        name: '',
        width: '',
      },
      {
        name: 'LEGAL NAME',
        width: 'w-[16%] ',
      },
      {
        name: 'BIRTH DATE',
        width: 'w-[19%] ',
      },
      {
        name: 'STATUS',
        width: 'w-[18%] ',
      },
      {
        name: 'DATE',
        width: 'w-[29%] ',
      },
      {
        name: 'DECISION',
        width: 'w-[19%] ',
      },
      {
        name: 'ACTION',
        width: 'w-[9%] ',
      },
    ],
    rows: policyApplications.map((application: any, index: number) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions
            options={
              isAdmin
                ? [{ name: 'Revert', action: revert }, { name: 'Cancel' }]
                : [{ name: 'Chat' }, { name: 'Profile' }]
            }
          />
        </div>,
        <Link
          to={
            // application.reviewer === account ||
            application.address === account || isAdmin
              ? `/policy-risk-user-profile/${application.id}`
              : ''
          }
        >
          <span className="prp dark:prp-dark">{`${application.firstName} ${application.lastName}`}</span>
        </Link>,
        <span className="prp dark:prp-dark">{application.dob}</span>,
        <Status
          type={
            application.resultStatus === 'rejected'
              ? 'Declined'
              : capitalizeFirstLetter(application.resultStatus)
          }
          text={
            application.resultStatus === 'rejected'
              ? 'Declined'
              : capitalizeFirstLetter(application.resultStatus)
          }
        />,
        <span className="prp dark:prp-dark">
          {application.applicationStatus === 'assigned' ? (
            <>
              {extractDate(application.date)}
              <CountdownTimer
                timeLeftInSeconds={application.submit_time_left}
              />
            </>
          ) : (
            application.date
          )}
        </span>,
        <div>
          {application.resultStatus === 'approved' ||
          application.resultStatus === 'rejected' ? (
            <DecisionToggle
              makeDecision={makePolicyDecision}
              completed={true}
              decision={application.resultStatus === 'approved' ? true : false}
            />
          ) : application.applicationStatus === 'assigned' ? (
            <DecisionToggle makeDecision={makePolicyDecision} />
          ) : (
            <Box
              sx={{
                '.Mui-checked': {
                  color: `${
                    theme === 'dark' ? '#606166' : '#50ff7f'
                  } !important;`,
                },
                '.MuiSwitch-track': {
                  background: `${
                    theme === 'dark' ? '#606166' : 'rgba(148, 233, 63, 0.4)'
                  } !important;`,
                },
              }}
            >
              <Switch className="convert-switch" id="1" disabled />
            </Box>
          )}
        </div>,
        <div>
          {(application.resultStatus === 'approved' ||
            application.resultStatus === 'rejected') &&
          application.submit_time_left <= 0 ? (
            <Button
              disabled={
                application.applicationStatus === 'concluded' ? true : false
              }
              text="Conclude"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full ${
                application.applicationStatus === 'concluded'
                  ? 'disabled:opacity-10 disabled:pointer-events-none'
                  : ''
              }`}
              onClick={async () => {
                const hash = await concludePolicyAssesement(
                  application.poolName,
                  application.address
                )
                await updateCoverState(
                  application.address,
                  application.poolName,
                  application.resultStatus === 'approved'
                )
                dispatch(
                  openAlert({
                    displayAlert: true,
                    data: {
                      id: 1,
                      variant: 'Successful',
                      classname: 'text-black',
                      title: 'Submission Successful',
                      tag1: 'Policy Review concluded',
                      tag2: 'View on etherscan',
                      hash: hash,
                    },
                  })
                )
                getData()
                setTimeout(() => {
                  dispatch(closeAlert())
                }, 10000)
              }}
            />
          ) : application.resultStatus === 'approved' ||
            application.resultStatus === 'rejected' ? (
            <Button
              // onClick={() => popupHandle(myCoverPopup)}
              disabled
              text="Submit"
              btnText="table-action"
              endIcon={'/images/126.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full disabled:opacity-10 disabled:pointer-events-none`}
            />
          ) : application.applicationStatus === 'assigned' ? (
            <Button
              text="Submit"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full`}
              onClick={async () => {
                if (policyDecisionMade) {
                  const hash = await submitPolicyApplicationResult(
                    application.poolName,
                    application.address,
                    application.reviewer,
                    application.data,
                    application.userData,
                    policyDecision,
                    application
                  )
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 1,
                        variant: 'Successful',
                        classname: 'text-black',
                        title: 'Submission Successful',
                        tag1: 'Policy Review submitted',
                        tag2: 'View on etherscan',
                        hash: hash,
                      },
                    })
                  )
                  getData()
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
                        title: 'Transaction Failed',
                        tag1: 'A decision has not been made',
                        tag2: 'View on etherscan',
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                }
              }}
            />
          ) : (
            <Button
              onClick={async () => {
                if (application.address === account) {
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 2,
                        variant: 'Failed',
                        classname: 'text-black',
                        title: 'Transaction Failed',
                        tag1: "Can't self assign application",
                        tag2: 'View on etherscan',
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                } else {
                  setPolicyAssignPopup(true)
                }
              }}
              text="Assign"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full`}
            />
          )}
        </div>,
        <Popup
          visible={policyAssignpopup}
          onClose={() => {
            setPolicyAssignPopup(false)
          }}
        >
          <div className="px-[30px] pb-[40px] pt-[30px] dark:bg-white w-[345px] sm:w-[310px]">
            <div className="flex justify-end">
              <img
                role={'button'}
                className="w-2.5"
                src="/images/Group 158.svg"
                alt=""
                onClick={() => {
                  setPolicyAssignPopup(false)
                }}
              />
            </div>

            <div className="flex flex-col items-center mb-[32px]">
              <img
                className="mt-[10px] w-[25px] h-[27px]"
                src={
                  theme === 'dark'
                    ? '/images/x-logo-dark.svg'
                    : '/images/x-logo.svg'
                }
                alt=""
              />
              <h3 className="mt-[17px] fw-500 fs-16 lh-28">Lock To Assess</h3>
            </div>
            <div className="mt-[32px] rounded box-border-2x-light dark:box-border-2x-dark  dark:bg-[#F1F1F1] bg-[#2A2B31] h-[50px] min-w-[250px] px-[20px] py-[4px] flex justify-between items-center">
              <span className="fw-400 text-[24px] lh-42 text-[#FAFAFA] dark:text-dark-800">
                25
              </span>
              <div className="bg-[#3F4048] dark:bg-[#FFF] my-[6px] py-[6px] px-[18px] h-[30px]">
                <button className="fw-500 fs-16 lh-19">USDC</button>
              </div>
            </div>
            <div className="flex justify-end items-center mt-[10px] mb-[15px]">
              <span className="text-[#606166] fw-500 fs-12 lh-14"> ~ $25 </span>
            </div>
            <div className="mt-[14px]">
              <button
                type="button"
                className={` ${
                  theme === 'dark'
                    ? `dark:white dark:box-border`
                    : `greenGradient`
                } contained medium  font-medium px-8 w-full square button`}
                onClick={async () => {
                  const hash = await assignPolicyApplication(
                    application.poolName,
                    application.address,
                    application.region
                  )
                  await createChatRoom(
                    'policy',
                    application.region,
                    application.id,
                    {
                      [application.address]: application.firstName,
                      [account as string]: 'reviewer',
                    }
                  )
                  getData()
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 1,
                        variant: 'Successful',
                        classname: 'text-black',
                        title: 'Submission Successful',
                        tag1: 'Policy application assigned to you',
                        tag2: 'View on etherscan',
                        hash: hash,
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                  setPolicyAssignPopup(false)
                }}
              >
                <span>Submit</span>
                <img className="duration-150 " src="/images/125.svg" alt="" />
              </button>
            </div>
          </div>
        </Popup>,
      ]
    }),
  }

  const claims: TableProps = {
    tabs: tabs,
    options: [{ name: 'Hide' }, { name: 'Rewards' }],
    data: claimApplications,
    columns: [
      {
        name: '',
        width: '',
      },
      {
        name: 'POLICY TYPE',
        width: 'w-[16%]',
      },
      {
        name: 'STATUS',
        width: 'w-[19%]',
      },
      {
        name: 'CLAIM ID',
        width: 'w-[18%]',
      },
      {
        name: 'DATE',
        width: 'w-[18%]',
      },
      {
        name: 'STAGE',
        width: 'w-[13%]',
      },
      {
        name: 'CLAIM AMOUNT',
        width: 'w-[12%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: claimApplications.map((application: any, index: number) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Hide' }, { name: 'Rewards' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" />,
        <span>{application.claimId}</span>,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <span>{application.stage}</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          {application.reviewer ===
          '0x0000000000000000000000000000000000000000' ? (
            <Button
              onClick={async () => {
                if (application.address === account) {
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 2,
                        variant: 'Failed',
                        classname: 'text-black',
                        title: 'Transaction Failed',
                        tag1: "Can't self assign application",
                        tag2: 'View on etherscan',
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                } else {
                  setClaimAssignPopup(true)
                }
              }}
              text="Assign"
              btnText="table-action"
              endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
              className={`${
                theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
              } px-[19.5px] py-[11.5px] w-full`}
            />
          ) : (
            <Button
              to={
                application.address === account
                  ? `/claim-view-user/${application.claimId}`
                  : application.reviewer === account
                  ? application.resultStatus === 'pending'
                    ? `/claim-view/${application.claimId}`
                    : undefined
                  : undefined
              }
              className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
              text="View"
              onClick={() => checkClaim(application)}
              btnText="table-action"
              endIcon={
                theme === 'dark'
                  ? '/images/light-btn-icon.svg'
                  : '/images/dark-btn-icon.svg'
              }
            />
          )}
        </div>,
        <Popup
          visible={claimAssignPopup}
          onClose={() => {
            setClaimAssignPopup(false)
          }}
        >
          <div className="px-[30px] pb-[40px] pt-[30px] dark:bg-white w-[345px] sm:w-[310px]">
            <div className="flex justify-end">
              <img
                role={'button'}
                className="w-2.5"
                src="/images/Group 158.svg"
                alt=""
                onClick={() => {
                  setClaimAssignPopup(false)
                }}
              />
            </div>

            <div className="flex flex-col items-center mb-[32px]">
              <img
                className="mt-[10px] w-[25px] h-[27px]"
                src={
                  theme === 'dark'
                    ? '/images/x-logo-dark.svg'
                    : '/images/x-logo.svg'
                }
                alt=""
              />
              <h3 className="mt-[17px] fw-500 fs-16 lh-28">Lock To Assess</h3>
            </div>
            <div className="mt-[32px] rounded box-border-2x-light dark:box-border-2x-dark  dark:bg-[#F1F1F1] bg-[#2A2B31] h-[50px] min-w-[250px] px-[20px] py-[4px] flex justify-between items-center">
              <span className="fw-400 text-[24px] lh-42 text-[#FAFAFA] dark:text-dark-800">
                25
              </span>
              <div className="bg-[#3F4048] dark:bg-[#FFF] my-[6px] py-[6px] px-[18px] h-[30px]">
                <button className="fw-500 fs-16 lh-19">USDC</button>
              </div>
            </div>
            <div className="flex justify-end items-center mt-[10px] mb-[15px]">
              <span className="text-[#606166] fw-500 fs-12 lh-14"> ~ $25 </span>
            </div>
            <div className="mt-[14px]">
              <button
                type="button"
                className={` ${
                  theme === 'dark'
                    ? `dark:white dark:box-border`
                    : `greenGradient`
                } contained medium  font-medium px-8 w-full square button`}
                onClick={async () => {
                  const hash = await assignClaimApplication(
                    application.poolName,
                    application.address,
                    account as string
                  )
                  await createChatRoom(
                    'claim',
                    application.region,
                    application.id,
                    {
                      [application.address]: application.firstName,
                      [account as string]: 'reviewer',
                    }
                  )
                  getData()
                  dispatch(
                    openAlert({
                      displayAlert: true,
                      data: {
                        id: 1,
                        variant: 'Successful',
                        classname: 'text-black',
                        title: 'Submission Successful',
                        tag1: 'Claim application assigned to you',
                        tag2: 'View on etherscan',
                        hash: hash,
                      },
                    })
                  )
                  setTimeout(() => {
                    dispatch(closeAlert())
                  }, 10000)
                  setClaimAssignPopup(false)
                }}
              >
                <span>Submit</span>
                <img className="duration-150 " src="/images/125.svg" alt="" />
              </button>
            </div>
          </div>
        </Popup>,
      ]
    }),
  }

  const riskPool: TableProps = {
    tabs: tabs,
    options: [{ name: 'Pause' }, { name: 'Accounting' }],
    columns: [
      {
        name: 'NAME',
        width: 'w-[25%]',
      },
      {
        name: 'STATUS',
        width: 'w-[16%]',
      },
      {
        name: 'UR',
        width: 'w-[25%]',
      },
      {
        name: 'SCR',
        width: 'w-[25%]',
      },
      {
        name: 'FEE',
        width: 'w-[25%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <CarInsurance />,
        <Status type="Active" text="Active" />,
        <span
          className="prp dark:prp-dark"
          onClick={() => popupHandle(riskManagementopup)}
        >
          100%
        </span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <LargeText primary="94.000" secondary="USDC" />,
        <div>
          <Button
            onClick={() => popupHandle(myCoverPopup)}
            text="Manage"
            btnText="table-action"
            endIcon={
              theme === 'dark'
                ? '/images/action-btn-logo.svg'
                : '/images/011.svg'
            }
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
      [
        <CarInsurance />,
        <Status type="Declined" text="Inactive" />,
        <span
          className="prp dark:prp-dark"
          onClick={() => popupHandle(riskManagementopup)}
        >
          100%
        </span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <LargeText primary="94.000" secondary="USDC" />,
        <div>
          <Button
            onClick={() => popupHandle(myCoverPopup)}
            text="Manage"
            btnText="table-action"
            endIcon={
              theme === 'dark'
                ? '/images/action-btn-logo.svg'
                : '/images/011.svg'
            }
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
    ],
  }

  const searchTable: TableProps = {
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[15.52%] xl:w-[14%]',
      },
      {
        name: 'COVER TYPE',
        width: 'w-[16%]',
      },
      {
        name: 'STATUS',
        width: 'w-[15%]',
      },
      {
        name: 'PRP',
        width: 'w-[15%]',
      },
      {
        name: 'TOTAL PREMIUM',
        width: 'w-[15%]',
      },
      {
        name: 'Claim History',
        width: 'w-[15%]',
      },
      {
        name: 'STATUS',
        width: 'w-[9%]',
      },
    ],
    rows: searchResults.map((result: any, index: number) => {
      return [
        <Link
          to={
            // application.reviewer === account ||
            result.address === account || isAdmin
              ? `/policy-risk-user-profile/${result.id}`
              : ''
          }
        >
          <span className="prp dark:prp-dark">{`${result.firstName} ${result.lastName}`}</span>
        </Link>,
        <CarInsurance />,
        <Status
          type={
            result.resultStatus === 'rejected'
              ? 'Declined'
              : capitalizeFirstLetter(result.resultStatus)
          }
          text={
            result.resultStatus === 'rejected'
              ? 'Declined'
              : capitalizeFirstLetter(result.resultStatus)
          }
        />,
        <span>20%</span>,
        <LargeText primary={result.premiumQuote} secondary="USDC" />,
        <span className="claim-history">9</span>,
        <div>
          <Button
            to="/new-claim"
            className="dark:bg-white dark:box-border w-[120px]"
            text="View"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
            btnText="table-action"
            color={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
          />
        </div>,
      ]
    }),
  }
  const verify = {
    id: 3,
    options: [],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[16%]',
      },
      {
        name: 'BIRTH DATE',
        width: 'w-[20%]',
      },
      {
        name: 'STATUS',
        width: 'w-[25%]',
      },
      {
        name: 'COVER TYPE',
        width: 'w-[20%]',
      },
      {
        name: 'VERIFY STATUS',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <span>Natacha Nilson</span>,
        <span>2000/06/01</span>,
        <div className="flex gap-[5px] items-center">
          <Status /> <span className="status-text"> since 17/01/2022</span>
        </div>,
        <CarInsurance margin="ml-[10px]" />,
        <div className="flex justify-center">
          <img
            src={
              theme === 'dark'
                ? '/images/dark-verify.svg'
                : '/images/green-verify.svg'
            }
          />
        </div>,
      ],
    ],
  }

  const Tabkyc = {
    id: 0,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'PRP',
        data: '2000',
      },
      {
        title: 'Daily Cost',
        data: '2562 USDC',
      },
      {
        title: 'Policy Balance',
        data: '2560 USDC',
      },
    ],
    drawerTitle: 'Cover Options',
    drawerData: ['Submit Claim', 'Pause Cover', 'Cancel Cover'],
    btnText: 'Manage',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Claim' }, { name: 'Pause' }],
  }

  const TabInsurePro = {
    id: 1,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/white-dots.svg' : '/images/grey-dots.svg',
    data: [
      {
        title: 'Date',
        data: '2022/06/01 10:26:20',
      },
      {
        title: 'Stage',
        data: 'Vote',
      },
      {
        title: 'Claim Amount',
        data: '256,00 USDC',
      },
    ],
    drawerTitle: 'Claim Options',
    drawerData: ['Cancel Cover', 'Appeal'],
    btnText: 'View',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Claim' }, { name: 'Appeal' }],
  }

  const TabPolicies = {
    id: 2,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'APR',
        data: '2%',
      },
      {
        title: 'ENTRY DATE',
        data: '2022/06/01/ 10:26:20',
      },
      {
        title: 'Capital',
        data: '2560 USDC',
      },
    ],
    drawerTitle: 'LIQUIDITY Options',
    drawerData: ['Withdraw', 'deposit'],
    btnText: 'Manage',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Deposit' }, { name: 'Withdraw' }],
  }

  const TabClaims = {
    id: 3,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'Verdict',
        data: 'Yes',
      },
      {
        title: 'Stage',
        data: 'Payout',
      },
      {
        title: 'Claim Amount',
        data: '2560,00 USDC',
      },
    ],
    drawerTitle: 'Cover Options',
    drawerData: ['Claim Rewards', 'Hide'],
    btnText: 'view',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Hide' }, { name: 'Rewards' }],
  }

  const TabRiskPool = {
    id: 4,
    tabId: tabs,
    title: 'Car Cover',
    status: 'Declined',
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    btnIcon: theme === 'dark' ? '/images/126.svg' : '/images/125.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'Claim Amount',
        data: {
          type: 'text',
          value: 'Convert',
        },
      },
      {
        title: 'Request Date',
        data: {
          type: 'text',
          value: '2022/06/01  10:26:20',
        },
      },
      {
        title: 'Convert',
        data: {
          type: 'switch',
          value: false,
        },
      },
    ],
    drawerTitle: 'Cover Options',
    drawerData: ['Claim Rewards', 'Hide'],
    btnText: 'Claim',
    options: [{ name: 'Cancel Request' }, { name: 'Claim Rewards' }],
  }

  const overfiewCards: AdminCardProps[] = [
    {
      key: 45,
      name: 'TOTAL SCR',
      score: '180,948,020',
      chart: [
        40, 33, 44, 36, 20, 42, 24, 28, 15, 60, 12, 50, 30, 40, 10, 70, 40, 80,
      ],
      percentage: +0.58,
      volume: 1487,
      status: 'up',
      usd: true,
    },
    {
      key: 54,
      name: 'Total POLICIES',
      score: 19948,
      chart: [
        20, 10, 35, 30, 35, 10, 15, 12, 50, 20, 50, 30, 60, 57, 64, 55, 60, 75,
        40, 43,
      ],
      percentage: +1.08,
      volume: 487,
      status: 'up',
    },
    {
      key: 42,
      name: 'Total CLAIMS',
      score: 19748,
      chart: [10, 20, 20, 40, 15, 15, 50, 45, 50, 20, 15, 30, 40, 5],
      percentage: -0.98,
      volume: 68487,
      status: 'down',
    },
    {
      key: 43,
      name: 'PREMIUMS',
      score: '19,948,000',
      chart: [20, 10, 14, 18, 24, 26, 26, 30, 30, 40, 35, 38],
      percentage: +0.48,
      volume: 48754,
      status: 'up',
      usd: true,
    },
  ]
  const TabVerify = {
    id: 3,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/white-dots.svg' : '/images/grey-dots.svg',
    data: [
      {
        title: 'Legal Name',
        data: 'Natacha Nilson',
      },
      {
        title: 'Birth Date',
        data: '02/01/2000',
      },
      {
        title: 'Status',
        data: 'Valid until 02/20/2023',
      },
    ],
    drawerTitle: 'Filter Options',
    drawerData: ['All', 'Active', 'Recent'],
    btnText: 'View',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    selectOption: 'radio',
    endicon:
      theme === 'dark'
        ? '/images/light-btn-icon.svg'
        : '/images/dark-btn-icon.svg',
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
  }
  const TabSearch = {
    id: 2,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/white-dots.svg' : '/images/grey-dots.svg',
    data: [
      {
        title: 'Legal Name',
        data: 'Natacha Nilson',
      },
      {
        title: 'Claim History',
        data: '2',
      },
      {
        title: 'PRP',
        data: '2000',
      },
    ],
    drawerTitle: 'Filter Options',
    drawerData: ['All', 'Active', 'Recent'],
    btnText: 'View',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    selectOption: 'radio',
    endicon:
      theme === 'dark'
        ? '/images/light-btn-icon.svg'
        : '/images/dark-btn-icon.svg',
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
  }
  const empty: TableProps = {
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[15.52%] xl:w-[14%]',
      },
      {
        name: 'COVER TYPE',
        width: 'w-[16%]',
      },
      {
        name: 'STATUS',
        width: 'w-[15%]',
      },
      {
        name: 'PRP',
        width: 'w-[15%]',
      },
      {
        name: 'TOTAL PREMIUM',
        width: 'w-[15%]',
      },
      {
        name: 'Claim History',
        width: 'w-[15%]',
      },
      {
        name: 'STATUS',
        width: 'w-[9%]',
      },
    ],
    rows: [],
  }

  function searchArray(array: any, searchString: string) {
    const lowerCaseSearchString = searchString.toLowerCase()
    return array.filter((item: any) => {
      return (
        item.firstName.toLowerCase().includes(lowerCaseSearchString) ||
        item.lastName.toLowerCase().includes(lowerCaseSearchString) ||
        item.country.toLowerCase().includes(lowerCaseSearchString) ||
        item.coverId.toString().toLowerCase().includes(lowerCaseSearchString)
      )
    })
  }

  const [search, setSearch] = useState('')
  const handlerSearch = (text: any) => {
    setSearch(text)
    const results = searchArray(policyApplications, text)
    setSearchResults(results)
  }

  return (
    <div className="z-10">
      <Header name="InsurePro" overview={true} />

      <div className="mb-14">
        <div className="flex justify-between  items-center  sm:flex  sm:gap-9  max-[900px]:flex max-[900px]:flex-col">
          <Tabs
            currentTab={tabs}
            changeTab={setTabs}
            tabs={[
              'KYC',
              'InsurePro',
              'Policies',
              'Claims',
              'Risk Pool',
              'Search',
              'Verify',
            ]}
          />
          <FilterTabs
            tabs={['ALL', 'ACTIVE', 'RECENT']}
            currentTab={dateFilter}
            changeTab={setDateFilter}
          />
        </div>

        <div className="block max-[1200px]:hidden">
          {tabs === 0 && <Table {...kyc} />}
          {tabs === 1 && <Table {...insurePro} />}
          {tabs === 2 && <Table {...policies} />}
          {tabs === 3 && <Table {...claims} />}
          {tabs === 4 && (
            <>
              <div className="grid  gap-[15px] sm:gap-[20px] grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 mt-4">
                {overfiewCards.map(({ key, ...rest }) => (
                  <AdminCard key={key} {...rest} />
                ))}
              </div>
              <Table {...riskPool} />
            </>
          )}
          {tabs === 5 && (
            <>
              <div className="py-5">
                <div className="flex w-[265px] mb-5 sm:mb-0 ">
                  <SearchField
                    width={'w-full'}
                    text="Search ..."
                    onSearch={handlerSearch}
                  />{' '}
                  <button
                    type="button"
                    className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end sm:hidden"
                  >
                    Filter
                  </button>
                </div>
              </div>
              {search ? (
                <>
                  <Table {...searchTable} />
                </>
              ) : (
                <>
                  <div className="py-5">
                    <div className="flex mt-[20px]">
                      <div className="flex text-3xl font-amaranth flex-grow items-center">
                        <div>
                          <p className="mb-5 verify-title">
                            You can use Search feature to find any policy, the
                            following criteria apply:
                          </p>
                          <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                            {[
                              <span className="verify-content">
                                {' '}
                                Restricted to only to the InsurePro community.
                              </span>,
                              <span className="verify-content">
                                Policyholders can view these policies
                              </span>,
                            ].map((value, index) => (
                              <li>{value}</li>
                            ))}
                          </ul>

                          <Link
                            to="/"
                            className="mb-7 block policy-line learn-more-link"
                          >
                            Learn more about Search feature
                          </Link>
                        </div>
                      </div>
                      <div className="hidden md:flex">
                        <img src="/images/search.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {tabs === 6 && (
            <>
              <>
                <div className="flex w-[265px] py-5">
                  <SearchField
                    width={'w-full'}
                    text="Policy ID..."
                    onSearch={handlerSearch}
                  />{' '}
                  <button
                    type="button"
                    className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end sm:hidden"
                  >
                    Filter
                  </button>
                </div>
                {search ? (
                  <>
                    <div className="mb-10">
                      <Table {...verify} />
                    </div>
                  </>
                ) : (
                  <> </>
                )}
                <div>
                  {!search ? (
                    <>
                      <div className="flex mt-[20px] py-5">
                        <div className="text-3xl font-amaranth flex-grow">
                          <p className="mb-5 verify-title">
                            You can also use certificate verification feature on
                            your phone
                          </p>
                          <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                            {[
                              <div className="flex gap-[10px]">
                                {' '}
                                <span className="verify-content">
                                  {' '}
                                  Open your wallet browser and search
                                  www.app.solace.io
                                </span>{' '}
                                <img src="/images/fox-light.svg" alt="" />
                              </div>,
                              <div className="flex gap-[10px]">
                                {' '}
                                <span className="verify-content">
                                  {' '}
                                  Open the menu screen tab
                                </span>
                                <img
                                  src={
                                    theme === 'dark'
                                      ? '/images/light-menu.svg'
                                      : '/images/dark-menu.svg'
                                  }
                                  alt=""
                                />
                              </div>,
                              <div className="flex gap-[10px]">
                                {' '}
                                <span className="verify-content">
                                  {' '}
                                  Open the QR reader and scan the QR code of the
                                  insurance certificate
                                </span>
                                <img
                                  src={
                                    theme === 'dark'
                                      ? '/images/dark-qr.svg'
                                      : '/images/light-qr.svg'
                                  }
                                  alt=""
                                />
                              </div>,
                            ].map((value, index) => (
                              <li>{value}</li>
                            ))}
                          </ul>
                          <Link to="/" className="mb-7 block policy-line">
                            Learn more about verifing a policy
                          </Link>
                          <p className="mb-5 download-now">
                            Don’t have a wallet browser on your phone?
                            <br />
                            Download now:
                          </p>
                          <div className="flex gap-2.5 max-w-[900px] flex-cols">
                            <a href="#">
                              <img src="/images/Group (6).svg" alt="" />
                            </a>
                            <a href="#">
                              <img src="/images/Group (7).svg" alt="" />
                            </a>
                          </div>
                        </div>
                        <div className="hidden md:flex">
                          <img
                            src={
                              theme === 'dark'
                                ? '/images/man-dark.svg'
                                : '/images/Group (8).svg'
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            </>
          )}
        </div>

        <div className="hidden max-[1200px]:block">
          {tabs === 0 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <div key={index}>
                          <TableCard
                            id={Tabkyc.id}
                            title={Tabkyc.title}
                            icon={Tabkyc.icon}
                            status={item}
                            subIcon={Tabkyc.subIcon}
                            menuIcon={Tabkyc.menuIcon}
                            data={Tabkyc.data}
                            btnText={Tabkyc.btnText}
                            btnIcon={Tabkyc.btnIcon}
                            drawerTitle={Tabkyc.drawerTitle}
                            option={Tabkyc.options}
                            //   popupData={myCoverPopup}
                            index={index}
                          />
                        </div>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 1 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <div key={index}>
                          <TableCard
                            id={TabInsurePro.id}
                            title={TabInsurePro.title}
                            icon={TabInsurePro.icon}
                            status={item}
                            subIcon={TabInsurePro.subIcon}
                            menuIcon={TabInsurePro.menuIcon}
                            data={TabInsurePro.data}
                            btnText={TabInsurePro.btnText}
                            btnIcon={TabInsurePro.btnIcon}
                            drawerTitle={TabInsurePro.drawerTitle}
                            option={TabInsurePro.options}
                          />
                        </div>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 2 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>

              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabPolicies.id}
                              title={TabPolicies.title}
                              icon={TabPolicies.icon}
                              status={item}
                              subIcon={TabPolicies.subIcon}
                              menuIcon={TabPolicies.menuIcon}
                              data={TabPolicies.data}
                              btnText={TabPolicies.btnText}
                              btnIcon={TabPolicies.btnIcon}
                              drawerTitle={TabPolicies.drawerTitle}
                              option={TabPolicies.options}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 3 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabClaims.id}
                              title={TabClaims.title}
                              icon={TabClaims.icon}
                              status={item}
                              subIcon={TabClaims.subIcon}
                              menuIcon={TabClaims.menuIcon}
                              data={TabClaims.data}
                              btnText={TabClaims.btnText}
                              btnIcon={TabClaims.btnIcon}
                              drawerTitle={TabClaims.drawerTitle}
                              option={TabClaims.options}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}

          {tabs === 4 && (
            <>
              <div className="grid  gap-[15px] sm:gap-[20px] grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 mt-4">
                {overfiewCards.map(({ key, ...rest }) => (
                  <AdminCard key={key} {...rest} />
                ))}
              </div>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabSearch.id}
                              title={TabSearch.title}
                              icon={TabSearch.icon}
                              status={item}
                              subIcon={TabSearch.subIcon}
                              menuIcon={TabSearch.menuIcon}
                              data={TabSearch.data}
                              btnText={TabSearch.btnText}
                              btnIcon={TabSearch.btnIcon}
                              drawerTitle={TabSearch.drawerTitle}
                              option={TabSearch.options}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 5 && (
            <>
              <div className=" py-5">
                <div className="flex w-[265px] mb-5 sm:mb-0 ">
                  <SearchField
                    width={'w-full'}
                    text="Search ..."
                    onSearch={handlerSearch}
                  />{' '}
                  <button
                    type="button"
                    className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end sm:hidden"
                  >
                    Filter
                  </button>
                </div>
              </div>
              {search ? (
                <>
                  <div className="flex w-full table-search-bar">
                    <SearchField width={'w-full'} />{' '}
                    <button
                      type="button"
                      className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                      onClick={toggleDrawer}
                    >
                      Filter
                    </button>
                  </div>

                  <React.Fragment>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                        (item: any, index) => {
                          return (
                            <>
                              <div>
                                <TableCard
                                  id={TabVerify.id}
                                  title={TabVerify.title}
                                  icon={TabVerify.icon}
                                  status={item}
                                  subIcon={TabVerify.subIcon}
                                  menuIcon={TabVerify.menuIcon}
                                  data={TabVerify.data}
                                  btnText={TabVerify.btnText}
                                  btnIcon={TabVerify.btnIcon}
                                  drawerTitle={TabVerify.drawerTitle}
                                  option={TabVerify.options}
                                />
                              </div>
                            </>
                          )
                        }
                      )}
                    </div>
                  </React.Fragment>
                  <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="bottom"
                    className="bottom-drawer dark:bottom-drawer-dark"
                  >
                    <div>
                      <div className="flex justify-center items-center mb-[20px]">
                        <img
                          src={
                            theme === 'dark'
                              ? '/images/drawer-line2.svg'
                              : '/images/drawer-line1.svg'
                          }
                          alt=""
                        />
                      </div>
                      <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                        Filter Options
                      </span>
                      <div className="mt-[40px]">
                        {['All', 'Active', 'Recent'].map((item: any) => {
                          return (
                            <>
                              <div
                                className="flex justify-between drawer-item dark:drawer-item-dark"
                                onClick={() => handlerLink(item)}
                                role="button"
                              >
                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <>
                                        <span className="text-[#000000]">
                                          {item}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-dark-500">
                                          {item}
                                        </span>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <>
                                          <span className="text-[#50ff7f]">
                                            {item}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="text-[#FFFFFF]">
                                            {item}
                                          </span>
                                        </>
                                      )}
                                    </>
                                  </>
                                )}

                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <img src="images/3333.svg" alt="" />
                                    ) : (
                                      <img src="images/4444.svg" alt="" />
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <img src="images/1111.svg" alt="" />
                                      ) : (
                                        <img src="images/2222.svg" alt="" />
                                      )}
                                    </>
                                  </>
                                )}
                              </div>
                              <hr
                                className="my-[10px] drawer-item-line"
                                style={{
                                  color: '#43444B',
                                  backgroundColor: '#43444B',
                                  height: 0.5,
                                  borderColor: '#43444B',
                                }}
                              />
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </Drawer>
                </>
              ) : (
                <>
                  <div className=" py-5">
                    <div className="flex mt-[20px]">
                      <div className="flex text-3xl font-amaranth flex-grow items-center">
                        <div>
                          <p className="mb-5 verify-title">
                            You can use Search feature to find any policy, the
                            following criteria apply:
                          </p>
                          <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                            {[
                              <span className="verify-content">
                                {' '}
                                Restricted to only to the InsurePro community.
                              </span>,
                              <span className="verify-content">
                                Policyholders can view these policies
                              </span>,
                            ].map((value, index) => (
                              <li>{value}</li>
                            ))}
                          </ul>

                          <Link
                            to="/"
                            className="mb-7 block policy-line learn-more-link"
                          >
                            Learn more about Search feature
                          </Link>
                        </div>
                      </div>
                      <div className="hidden md:flex">
                        <img src="/images/search.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {tabs === 6 && (
            <>
              <div className="flex table-search-bar w-full">
                <SearchField
                  width={'w-full'}
                  text="Search ..."
                  onSearch={handlerSearch}
                />{' '}
                <button
                  role="button"
                  type="button"
                  className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end"
                  onClick={toggleDrawer}
                >
                  Filter
                </button>
              </div>
              {search ? (
                <>
                  <React.Fragment>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                        (item: any, index) => {
                          return (
                            <>
                              <div>
                                <TableCard
                                  id={TabInsurePro.id}
                                  title={TabInsurePro.title}
                                  icon={TabInsurePro.icon}
                                  status={item}
                                  subIcon={TabInsurePro.subIcon}
                                  menuIcon={TabInsurePro.menuIcon}
                                  data={TabInsurePro.data}
                                  btnText={TabInsurePro.btnText}
                                  btnIcon={TabInsurePro.btnIcon}
                                  drawerTitle={TabInsurePro.drawerTitle}
                                  option={TabInsurePro.options}
                                />
                              </div>
                            </>
                          )
                        }
                      )}
                    </div>
                  </React.Fragment>
                  <Table {...empty} />
                  <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="bottom"
                    className="bottom-drawer dark:bottom-drawer-dark"
                  >
                    <div>
                      <div className="flex justify-center items-center mb-[20px]">
                        <img
                          src={
                            theme === 'dark'
                              ? '/images/drawer-line2.svg'
                              : '/images/drawer-line1.svg'
                          }
                          alt=""
                        />
                      </div>
                      <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                        Filter Options
                      </span>
                      <div className="mt-[40px]">
                        {['All', 'Active', 'Recent'].map((item: any) => {
                          return (
                            <>
                              <div
                                className="flex justify-between drawer-item dark:drawer-item-dark"
                                onClick={() => handlerLink(item)}
                                role="button"
                              >
                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <>
                                        <span className="text-[#000000]">
                                          {item}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-dark-500">
                                          {item}
                                        </span>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <>
                                          <span className="text-[#50ff7f]">
                                            {item}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="text-[#FFFFFF]">
                                            {item}
                                          </span>
                                        </>
                                      )}
                                    </>
                                  </>
                                )}

                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <img src="images/3333.svg" alt="" />
                                    ) : (
                                      <img src="images/4444.svg" alt="" />
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <img src="images/1111.svg" alt="" />
                                      ) : (
                                        <img src="images/2222.svg" alt="" />
                                      )}
                                    </>
                                  </>
                                )}
                              </div>
                              <hr
                                className="my-[10px] drawer-item-line"
                                style={{
                                  color: '#43444B',
                                  backgroundColor: '#43444B',
                                  height: 0.5,
                                  borderColor: '#43444B',
                                }}
                              />
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </Drawer>
                </>
              ) : (
                <>
                  <div className="flex">
                    <div className="text-3xl font-amaranth flex-grow">
                      <p className="mb-5 verify-title">
                        You can use Search feature to find any policy, the
                        following criteria apply:
                      </p>
                      <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                        {[
                          <span className="verify-content">
                            {' '}
                            Restricted to the adjuster in charge of assessing
                            your claim
                          </span>,
                          <span className="verify-content">
                            Policyholders can view these policies
                          </span>,
                        ].map((value, index) => (
                          <li>{value}</li>
                        ))}
                      </ul>

                      <Link to="/" className="mb-7 block policy-line">
                        Learn more about verifing a policy
                      </Link>
                      <p className="mb-5 download-now">
                        Don’t have a wallet browser on your phone?
                        <br />
                        Download now:
                      </p>
                      <div className="flex gap-2.5 max-w-[900px] flex-cols">
                        <a href={'/'}>
                          <img src="/images/Group (6).svg" alt="" />
                        </a>
                        <a href={'/'}>
                          <img src="/images/Group (7).svg" alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="hidden md:flex">
                      <img src="/images/search.svg" alt="" />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {popup !== null && (
        <Popup onClose={() => popupHandle()} visible maxWidth="max-w-[860px]">
          <PopConfirm onClose={() => popupHandle()} {...popup} />
        </Popup>
      )}
    </div>
  )
}

export default KYCApplication
