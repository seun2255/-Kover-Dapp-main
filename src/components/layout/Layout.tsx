import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector } from 'react-redux'
import StartKYC from '../../views/Welcome/membership/StartKYC'
import MarketStatus from '../../views/Welcome/market-status/MarketStatus'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import { useNavigate } from 'react-router-dom'
import TermOfUsePopup from '../global/TermOfUsePopup'
import Popup from '../templates/Popup'
import Dashboard from '../../views/Dashboard/Dashboard'
import { useWeb3React } from '@web3-react/core'
import { getUserDetails } from '../../database'
import axios from 'axios'

function Layout() {
  const { width } = useWindowDimensions()
  const { kycModal } = useSelector((state: any) => state.app)
  const [userVerificationState, setUserVerificationState] =
    useState('unverified')
  const { account } = useWeb3React()
  const navigate = useNavigate()
  const [terms, setTerms] = useState<boolean>(false)
  const toggleTerms = () => setTerms((v) => !v)
  const [canDisplay, setCanDisplay] = useState(false)
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

  const setup = async (account: string) => {
    const user = await getUserDetails(account)
    console.log(user)
    setCanDisplay(true)
  }

  useEffect(() => {
    var agreed = localStorage.getItem('agreed')
    if (!agreed || agreed !== 'true') {
      setTerms(true)
    }
    if (!account) {
      navigate('/')
      setCanDisplay(true)
    } else {
      setup(account)
      getData()
    }
  }, [])

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
                    <div className="flex flex-col gap-[20px] mt-[2px]">
                      <MarketStatus currencyData={currencyData} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>{canDisplay ? <Outlet /> : <></>}</>
            )}
          </div>
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
    </>
  )
}
export default Layout
