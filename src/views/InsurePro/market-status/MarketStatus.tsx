import React, { useState, useEffect } from 'react'
import { UserContext } from '../../../App'
import FilterTabs from '../../../components/common/FilterTabs'
import MarketStatusItem from './MarketStatusItem'
import axios from 'axios'

interface MarketStatusProps {
  currencyData: any
}

function processData(data: any) {
  const priceArray = data.map((item: any) => item.price_close)

  const firstPrice = priceArray[0]
  const lastPrice = priceArray[priceArray.length - 1]

  const percentChange = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(
    2
  )

  return {
    priceArray,
    percentChange,
    currentPriceUSD: lastPrice.toFixed(2),
    currentPriceEUR: (lastPrice / 1.108).toFixed(2),
    currentPriceBTC: (lastPrice / 60214.71).toFixed(2),
  }
}

const getMarketData = async () => {
  try {
    const today = new Date()

    // Calculate yesterday's date
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    // Format the date as required by CoinAPI (YYYY-MM-DDTHH:MM:SS)
    const formattedDate = yesterday.toISOString().slice(0, 19)

    // Eth
    const response1 = await axios.get(
      `https://rest.coinapi.io/v1/ohlcv/BINANCE_SPOT_ETH_USDT/history?period_id=1HRS&time_start=${formattedDate}`,
      {
        headers: {
          'X-CoinAPI-Key': process.env.REACT_APP_MARKET_API_KEY,
        },
      }
    )

    const ETHdata = processData(response1.data)

    // Kov
    const response2 = await axios.get(
      `https://rest.coinapi.io/v1/ohlcv/BINANCE_SPOT_USDC_USDT/history?period_id=1HRS&time_start=${formattedDate}`,
      {
        headers: {
          'X-CoinAPI-Key': process.env.REACT_APP_MARKET_API_KEY,
        },
      }
    )

    const KOVdata = processData(response2.data)

    // BTC
    const response3 = await axios.get(
      `https://rest.coinapi.io/v1/ohlcv/BINANCE_SPOT_BTC_USDT/history?period_id=1HRS&time_start=${formattedDate}`,
      {
        headers: {
          'X-CoinAPI-Key': process.env.REACT_APP_MARKET_API_KEY,
        },
      }
    )

    var BTCdata = processData(response3.data)
    BTCdata.currentPriceBTC = '1.00'

    const result = {
      ETH: ETHdata,
      KOV: KOVdata,
      BTC: BTCdata,
    }

    console.log(result)
    return result
  } catch {
    return undefined
  }
}

function MarketStatus({ currencyData }: MarketStatusProps) {
  const [currency, setCurrency] = React.useState<number>(1)
  const { theme } = React.useContext(UserContext)
  const [selctedCurrency, setSelectedCurrency] = useState('EUR')
  const [marketData, setMarketData] = useState<any>({
    ETH: undefined,
    KOV: undefined,
    BTC: undefined,
  })

  useEffect(() => {
    // getMarketData().then((result: any) => {
    //   console.log('Result: ', result)
    //   setMarketData(result)
    // })
    setTimeout(() => {
      setMarketData({
        ETH: {
          priceArray: [
            2416.12, 2416.57, 2416.93, 2417.79, 2419.63, 2425.45, 2425.58,
            2420.09, 2416.79, 2418.66, 2421.15, 2422.9, 2415.4, 2412.78,
            2409.63, 2406.86, 2410.81, 2410.4, 2411.79, 2408.71, 2388.16,
            2383.36, 2380.61, 2382.8,
          ],
          percentChange: '-1.38',
          currentPriceUSD: '2382.80',
          currentPriceEUR: '2150.54',
          currentPriceBTC: '0.04',
        },
        KOV: {
          priceArray: [
            0.9998, 0.9996, 0.9997, 0.9997, 0.9997, 0.9997, 0.9997, 0.9996,
            0.9996, 0.9997, 0.9997, 0.9997, 0.9997, 0.9998, 0.9998, 0.9998,
            0.9997, 0.9998, 0.9998, 0.9997, 0.9998, 0.9998, 0.9998, 0.9998,
          ],
          percentChange: '0.00',
          currentPriceUSD: '1.00',
          currentPriceEUR: '0.90',
          currentPriceBTC: '0.00',
        },
        BTC: {
          priceArray: [
            60024.01, 60036, 60006.97, 59993.03, 60025.95, 60235.22, 60238.01,
            60155.93, 60117.99, 60160, 60164.01, 60196, 60069.99, 60016,
            59991.3, 60000.51, 60104.39, 60189.98, 60279.52, 60335.41, 59950.05,
            59814.07, 59971.09, 60051.99,
          ],
          percentChange: '0.05',
          currentPriceUSD: '60051.99',
          currentPriceEUR: '54198.55',
          currentPriceBTC: '1.00',
        },
      })
    }, 200)
  }, [])

  return (
    <>
      <div className="bg-dark-800 rounded sm:min-h-[301px] dark:text-dark-800 dark:text-primary-100 dark:bg-white rounded-sm dark:box-border  general-box-border market-status">
        <div className="flex justify-between gap-4 sm:mb-[44px] mb-[21px]">
          <span className="market dark:market-dark">Markets</span>
          <FilterTabs
            currentTab={currency}
            changeTab={setCurrency}
            tabs={['USD', 'EUR', 'BTC']}
            showinmobile={true}
            setCurrency={setSelectedCurrency}
          />
        </div>
        <div className="flex flex-col gap-1">
          <MarketStatusItem
            token="BTC"
            currency={selctedCurrency}
            tokenData={marketData.BTC}
            id={1}
          />
          <img
            className="mt-[12px] mb-[17px]"
            src={`${
              theme === 'dark' ? '/images/012.svg' : '/images/line-2.svg'
            }`}
            alt=""
          />
          <MarketStatusItem
            token="ETH"
            currency={selctedCurrency}
            tokenData={marketData.ETH}
            id={2}
          />
          <img
            className="mt-[12px] mb-[17px]"
            src={`${
              theme === 'dark' ? '/images/012.svg' : '/images/line-2.svg'
            }`}
            alt=""
          />
          <MarketStatusItem
            token="KOV"
            currency={selctedCurrency}
            tokenData={marketData.KOV}
            id={3}
          />
        </div>
      </div>
    </>
  )
}

export default MarketStatus
