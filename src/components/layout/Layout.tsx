import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector } from 'react-redux'
import StartKYC from '../../views/Welcome/membership/StartKYC'
import MarketStatus from '../../views/Welcome/market-status/MarketStatus'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'

function Layout() {
  const { width } = useWindowDimensions()
  const { kycModal } = useSelector((state: any) => state.app)
  const [userVerificationState, setUserVerificationState] =
    useState('unverified')

  return (
    <>
      <Navbar />
      <div className="mx-[15px] layout-side-width">
        <div className="layout-left-margin relative lg:mr-[50px]">
          <div className="max-w-[600px]:layout-space">
            {kycModal ? (
              <div className="pb-5">
                <div className=" flex mb-10 gap-[20px] flex-wrap">
                  <div className="flex-grow flex flex-col w-[400px]">
                    <div className="mt-[24px]">
                      <StartKYC
                        verificationState={'unverified'}
                        setUserVerificationState={setUserVerificationState}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-[20px] claim-side-data mt-[22px]">
                    {/* {width > 600 ? (
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
                  )} */}
                    <div className="flex flex-col gap-[20px] mt-[2px]">
                      <MarketStatus />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Layout
