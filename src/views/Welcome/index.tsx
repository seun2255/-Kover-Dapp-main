import React, { useEffect, useState } from 'react'
import Membership from './membership/Membership'
import StartKYC from './membership/StartKYC'
import VerifyIdentity from './membership/VerifyIdentity'
import StatusInfo from './StatusInfo'
import MarketStatus from './market-status/MarketStatus'
import Header from '../../components/common/header/Header'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import AdminCard, { AdminCardProps } from './AdminCard'
import Alert from '../../components/common/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../../database'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Welcome() {
  const { width } = useWindowDimensions()
  const { connected, verified, user } = useSelector((state: any) => state.user)
  const { account } = useWeb3React()
  const [userVerificationState, setUserVerificationState] =
    useState('unverified')
  const navigate = useNavigate()
  const [currencyData, setCurrencyData] = useState({
    usdcData: {
      priceUSD: '---',
      priceEUR: '---',
      priceBTC: '---',
      percentChange: '0',
    },
    ethData: {
      priceUSD: '---',
      priceEUR: '---',
      priceBTC: '---',
      percentChange: '0',
    },
    btcData: {
      priceUSD: '---',
      priceEUR: '---',
      priceBTC: 1,
      percentChange: '0',
    },
  })

  const getData = async () => {
    // const apiData = await axios.get('http://localhost:4000/get-crypto-rates')

    const details = {
      usdcData: {
        priceUSD: '1.00',
        priceEUR: '0.9185',
        priceBTC: '0.0000',
        percentChange: '+0.0090',
      },
      ethData: {
        priceUSD: '3514.5930',
        priceEUR: '3227.9510',
        priceBTC: '0.0525',
        percentChange: '+0.8982',
      },
      btcData: {
        priceUSD: '66939.15',
        priceEUR: '61479.7470',
        priceBTC: 1,
        percentChange: '-0.5012',
      },
    }
    setCurrencyData(details)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (account) {
      getUserDetails(account).then((user) => {
        if (user) {
          setUserVerificationState(user.kycVerificationState)
          if (user.insureProVerificationState === 'verified') {
            navigate('/kyc-application')
          }
          // Add this later
          // else if (user.kycVerificationState === 'verified') {
          //   navigate('/dashboard')
          // }
        }
      })
    }
  }, [account])

  const overfiewCards: AdminCardProps[] = [
    {
      key: 45,
      name: 'TOTAL SCR',
      score: '180,948,020',
      chart: [
        40, 33, 44, 36, 20, 42, 24, 28, 15, 60, 12, 50, 30, 40, 10, 70, 40, 80,
      ],
      percentage: 0.58,
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
      percentage: 1.08,
      volume: 487,
      status: 'up',
    },
    {
      key: 49,
      name: 'Total CLAIMS',
      score: 19748,
      chart: [10, 20, 20, 40, 15, 15, 50, 45, 50, 20, 15, 30, 40, 5],
      percentage: 0.98,
      volume: 68487,
      status: 'down',
    },
    {
      key: 41,
      name: 'PREMIUMS',
      score: '19,948,000',
      chart: [20, 10, 14, 18, 24, 26, 26, 30, 30, 40, 35, 38],
      percentage: 0.48,
      volume: 48754,
      status: 'up',
      usd: true,
    },
  ]
  return (
    <div className="pb-5">
      <Header name="Welcome" />

      <div className="mt-[15px] sm:mt-[40px] mb-[19px]">
        <p className="welcome-subtitle">
          {' '}
          As a member, you can purchase cover, earn rewards from risk pools,
          stake, participate in governance, &amp; validate claims.
        </p>
      </div>
      <div className="grid  gap-[15px] sm:gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-[30px]">
        {overfiewCards.map(({ key, ...rest }) => (
          <AdminCard key={key} {...rest} />
        ))}
      </div>
      <div className=" flex mb-10 gap-[20px] flex-wrap">
        <div className="flex-grow flex flex-col w-[400px]">
          <Membership />
          {/* <div className="mt-[10px]"> */}
          {/* <PayFee /> */}
          {/* </div> */}
          {!connected && (
            <div className="mt-[28px]">
              <VerifyIdentity />
            </div>
          )}
          {user.kycVerificationState !== 'verified' && connected && (
            <div className="mt-[24px]">
              <StartKYC
                verificationState={userVerificationState}
                setUserVerificationState={setUserVerificationState}
              />
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
            {/* <div>
              <div
                className={`dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-white bg-dark-800  rounded flex flex-col md:flex-row md:justify-between md:flex-wrap box-border-2x-light dark:box-border-2x-dark h-[288px] rounded-sm px-5 py-[18px]`}
                >
                <div className="flex justify-between w-full ">
                  <div className="sm:w-[50%]">
                    <div className="flex gap-[6px] mb-[5px] pt-[10px] pb-[15px]">
                      <span className=" premium-no dark:premium-no-dark">
                        234504
                      </span>
                    </div>
                    <span className="mb-1 total-premium">Total Members</span>
                  </div>
                  <div className="  bg-dark-900 pt-[10px] px-[12px] pb-[15px] text-center dark:text-dark-800 dark:text-primary-100 dark:bg-light-200">
                    <h5 className="mb-[10px] active-cover-no dark:active-cover-no-dark">
                      5000
                    </h5>
                    <span className="active-cover">Active Covers</span>
                  </div>
                </div>
                <div>
                  <div className="mt-[19px]">
                    <span className="mb-[10px] current-policy ">
                      Total Premium
                    </span>
                    <div className="flex gap-[0px] ml-[10px]">
                      <h4 className="text-[40px] policy-balance dark:policy-balance-dark gap-6">
                        3,430,003
                      </h4>
                      <b className="usd">USD</b>
                    </div>
                  </div>
                  <div className="status-info-sub-info">
                    <span className="slc-usd">USDC/USD</span>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex justify-start mt-[5px]">
                        <b className="ml-[10px] slc-usd-no dark:slc-usd-no-dark">
                          2.7995 USD
                        </b>
                        &nbsp;
                        <b className="slc-usd-pulse dark:slc-usd-pulse-dark">
                          {' '}
                          +12%
                        </b>
                      </div>
                      <button className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <MarketStatus currencyData={currencyData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
