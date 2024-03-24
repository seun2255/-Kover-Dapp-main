import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import RoutesList from './RoutesList'
import './styles/main.css'
import './styles/globals.css'
import { useSelector, useDispatch } from 'react-redux'
import Test from './Test'
import Assessement from './views/Assessement/Assessement'
import Bond from './views/Bond/Bond'
import Chat from './views/Chat/Chat'
import ClaimAssessment from './views/ClaimAssessment/ClaimAssessment'
import Claims from './views/Claims/Claims'
import ClaimView from './views/ClaimView/ClaimView'
import CustomerProfile from './views/CustomerProfile/CustomerProfile'
import Dashboard from './views/Dashboard/Dashboard'
import Insurance from './views/Insurance/Insurance'
import KYC from './views/KYC/KYC'
import NewClaim from './views/NewClaim/NewClaim'
import Notification from './views/Notification/Notification'
import Profile from './views/Profile/Profile'
import RiskMnagamentCar from './views/RiskMnagament/RiskMnagamentCar'
import RiskMnagamentHome from './views/RiskMnagament/RiskMnagamentHome'
import RiskMnagamentMotorbike from './views/RiskMnagament/RiskMnagamentMotorbike'
import RiskMnagamentPet from './views/RiskMnagament/RiskMnagamentPet'
import Welcome from './views/Welcome'
import Alert from './views/Alert/Alert'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { useState, useEffect } from 'react'
import KYCSubmit from './views/KYCSubmit/KYCSubmit'
import Qrcode from './views/Qrcode/Qrcode'
import ClaimViewUser from './views/Claims/ClaimViewUser'
import Feedback from './views/Feedback/Feedback'
import 'react-toastify/dist/ReactToastify.css'
import MyRewards from './views/MyRewards/MyRewards'
import LockToAssess from './views/LockToAssess/LockToAssess'
import { Scrollbars } from 'react-custom-scrollbars-2'
import Dialogbox from './views/Dialogbox/Dialogbox'
import Extrapage from './components/Extra/Extra'
import InsurePro from './views/InsurePro/InsurePro'
import KYCApplication from './views/KYCApplication/KYCApplication'
import KYCUserProfile from './views/KYCUserProfile/KYCUserProfile'
import InsureProUserProfile from './views/InsureProUserProfile/InsureProUserProfile'
import PolicyRiskUserPofile from './views/PolicyRiskUserPofile/PolicyRiskUserPofile'
import RiskPoolMnagamentHome from './views/RiskMnagament/RiskPoolMnagamentHome'
import Staking from './views/Staking/Staking'
import AlertModal from './components/common/Alert'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  get_applications,
  get_Reviewer_applications,
  getKycDetails,
  getKycReveiwerDetails,
} from './api'
import axios from 'axios'
import { addContractState, addKycReviewerState } from './utils/helpers'
import { setKYCApplicants, setKYCReviewerApplicants } from './redux/kyc'
import { updateUser } from './redux/user'
import { getUserDetails } from './database'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { getUserData } from './api'

export const routes = [
  {
    id: 343,
    route: 'dashboard',
    el: <Dashboard />,
  },
  {
    id: 765,
    route: 'insurance',
    el: <Insurance />,
  },
  {
    id: 856,
    route: 'bond',
    el: <Bond />,
  },
  {
    id: 974,
    route: 'new-claim',
    el: <NewClaim />,
  },
  {
    id: 764,
    route: 'claim-assessment',
    el: <ClaimAssessment />,
  },
  {
    id: 764,
    route: 'claim-view',
    el: <ClaimView />,
  },
  {
    id: 765,
    route: 'claims',
    el: <Claims />,
  },

  {
    id: 345,
    route: 'test',
    el: <Test />,
  },
  {
    id: 764,
    route: 'chat/:roomId',
    el: <Chat />,
  },
  {
    id: 5645,
    route: 'notification',
    el: <Notification />,
  },
  {
    id: 6787,
    route: 'kyc',
    el: <KYC />,
  },
  {
    id: 3457,
    route: 'customer-profile',
    el: <CustomerProfile />,
  },
  {
    id: 9675,
    route: 'profile',
    el: <Profile />,
  },
  {
    id: 7757,
    route: 'risk-mnagament-motorbike',
    el: <RiskMnagamentMotorbike />,
  },
  {
    id: 8756,
    route: 'risk-mnagament-home',
    el: <RiskMnagamentHome />,
  },
  {
    id: 8756,
    route: 'risk-pool-managament-home',
    el: <RiskPoolMnagamentHome />,
  },
  {
    id: 9423,
    route: 'risk-mnagament-car',
    el: <RiskMnagamentCar />,
  },
  {
    id: 8756,
    route: 'risk-mnagament-pet',
    el: <RiskMnagamentPet />,
  },
  {
    id: 84956,
    route: 'assessement',
    el: <Assessement />,
  },
  {
    id: 101,
    route: 'KYCSubmit',
    el: <KYCSubmit />,
  },
  {
    id: 102,
    route: 'Alert',
    el: <Alert />,
  },
  {
    id: 103,
    route: 'qrcode',
    el: <Qrcode />,
  },
  {
    id: 785,
    route: 'claim-view-user',
    el: <ClaimViewUser />,
  },
  {
    id: 1254,
    route: 'Feedback',
    el: <Feedback />,
  },
  {
    id: 23564,
    route: 'my-rewards',
    el: <MyRewards />,
  },
  {
    id: 123456,
    route: 'Lock To Assess',
    el: <LockToAssess />,
  },
  {
    id: 523647,
    route: 'Dialogbox',
    el: <Dialogbox />,
  },
  {
    id: 523647,
    route: 'Extrapage',
    el: <Extrapage />,
  },
  {
    id: 523648,
    route: 'insure-pro',
    el: <InsurePro />,
  },
  {
    id: 523649,
    route: 'kyc-application',
    el: <KYCApplication />,
  },
  {
    id: 523650,
    route: 'kyc-user-profile/:userId',
    el: <KYCUserProfile />,
  },
  {
    id: 523650,
    route: 'insure-pro-user-profile/:userId',
    el: <InsureProUserProfile />,
  },
  {
    id: 523650,
    route: 'policy-risk-user-profile',
    el: <PolicyRiskUserPofile />,
  },
  {
    id: 523650,
    route: 'staking',
    el: <Staking />,
  },
]

export const UserContext = React.createContext<{
  handleThemeSwitch: () => void
  connectWalletHandle: () => void
  theme: string
  connectwallet: string
}>({
  handleThemeSwitch: () => {},
  connectWalletHandle: () => {},
  theme: '',
  connectwallet: '',
})

function App() {
  const [theme, setTheme] = useState('')
  const [connectwallet, setConnectWallet] = useState('')
  const { displayAlert, alertData } = useSelector((state: any) => state.alerts)
  const { user } = useSelector((state: any) => state.user)
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    console.log('User changed somehow')
    fetch('https://ipinfo.io/json')
      .then((response) => response.json())
      .then(async (data) => {
        const applicants = await get_applications(data.country)

        const axiosRequests = applicants.map(async (applicant) => {
          const response = await axios.get(applicant.data as string)
          const kyc_details = await getKycDetails(
            response.data.address,
            data.country
          )
          const result = addContractState(response.data, kyc_details)
          const userFirebaseDetails = await getUserDetails(
            response.data.address
          )
          result.id = applicant.id
          result.canModifyKYC = userFirebaseDetails.canModifyKYC
          result.canModifyKYCReviewer = userFirebaseDetails.canModifyKYCReviewer
          result.ipfsHash = applicant.data
          result.kycReviewDone = userFirebaseDetails.kycReviewDone
          return result
        })

        // Wait for all axios requests to complete
        const membership_applications = await Promise.all(axiosRequests)
        dispatch(setKYCApplicants({ data: membership_applications }))
        // setMembershipApplications(membership_applications)
      })

    fetch('https://ipinfo.io/json')
      .then((response) => response.json())
      .then(async (data) => {
        const applicants = await get_Reviewer_applications(data.country)

        const axiosRequests = applicants.map(async (applicant) => {
          const response = await axios.get(applicant.data as string)
          const kyc_details = await getKycReveiwerDetails(
            response.data.address,
            data.country
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
          return result
        })

        // Wait for all axios requests to complete
        const membership_applications = await Promise.all(axiosRequests)
        dispatch(setKYCReviewerApplicants({ data: membership_applications }))
        // setReviewerApplications(membership_applications)
      })
  }, [dispatch, user])

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const connectWalletHandle = () => {
    if (connectwallet === '') {
      setConnectWallet('connected')
    } else {
      setConnectWallet('')
    }
  }

  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: `white`,
      opacity: 0.2,
    }

    return <div style={{ ...thumbStyle }} />
  }

  // const showToast = () => {
  //   toast(<Alert {...alertData} />)
  // }

  // useEffect(() => {
  //   if (displayAlert) {
  //     showToast()
  //   }
  // }, [displayAlert])

  return (
    <UserContext.Provider
      value={{ handleThemeSwitch, theme, connectwallet, connectWalletHandle }}
    >
      <Scrollbars
        style={{ width: '100%', height: '100vh' }}
        renderThumbVertical={renderThumb}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Welcome />} />
              {routes.map(({ route, el, id }) => (
                <Route key={id} path={route} element={el} />
              ))}
            </Route>
            <Route path="/routes" element={<RoutesList />} />
          </Routes>
          {displayAlert && (
            <div
              style={{ position: 'fixed', right: 30, top: 30, zIndex: 10000 }}
            >
              <AlertModal {...alertData} />
            </div>
          )}
          {/* <ToastContainer autoClose={false} draggablePercent={60} limit={1} /> */}
        </BrowserRouter>
      </Scrollbars>
    </UserContext.Provider>
  )
}

export default App
