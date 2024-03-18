import React, { useEffect, useState } from 'react'
import Membership from './membership/Membership'
import StartProcess from './membership/StartProcess'
import MarketStatus from './market-status/MarketStatus'
import Header from '../../components/common/header/Header'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import { useSelector, useDispatch } from 'react-redux'
import VerifyIdentity from './membership/VerifyIdentity'
import { useWeb3React } from '@web3-react/core'
import { getUserDetails } from '../../database'
import { useNavigate } from 'react-router-dom'

import Alert from '../../components/common/Alert'

function InsurePro() {
  const { width } = useWindowDimensions()
  const { connected, verified, user } = useSelector((state: any) => state.user)
  const { account } = useWeb3React()
  const [kycVerified, setKycVerified] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (account) {
      getUserDetails(account).then((user) => {
        if (user) {
          if (user.kycVerificationState === 'verified') {
            setKycVerified(true)
          }
          if (user.insureProVerificationState === 'verified') {
            navigate('/kyc-application')
          }
        }
      })
    }
  }, [account])

  return (
    <div className="pb-5">
      <Header name="InsurePro" />

      <div className="mt-[15px] sm:mt-[40px] mb-[19px]">
        <p className="welcome-subtitle">
          {' '}
          Earn rewards by becoming a KYC Reviewer, Policy Reviewer, Adjuster, or
          Actuary.
        </p>
      </div>

      <div className=" flex mb-10 gap-[20px] flex-wrap">
        <div className="flex-grow flex flex-col w-[400px]">
          <Membership />
          {!connected && (
            <div className="mt-[28px]">
              <VerifyIdentity />
            </div>
          )}
          {connected && (
            <div className="mt-[10px]">
              <StartProcess kycVerified={kycVerified} />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-[20px] claim-side-data">
          {width > 600 ? (
            <>
              <div>
                <h6 className="text-dark-300">Overview</h6>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="dashboard-sm">Dashboard</span>
                <span className="text-dark-300">Overview</span>
              </div>
            </>
          )}

          <div className="flex flex-col gap-[20px] mt-[2px]">
            <MarketStatus />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsurePro
