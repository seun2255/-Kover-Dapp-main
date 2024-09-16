import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Chart } from 'chart.js'
import ChartRender from '../ChartRender'

interface MarketItem {
  token: string
  currency: string
  tokenData: any
  id: number
}

function MarketStatusItem({ token, currency, tokenData, id }: MarketItem) {
  // useEffect(() => {
  //   if (tokenData) {
  //     console.log('This is running')
  //     const canvas: any = document.getElementById(`myChart${id}`)
  //     const ctx = canvas.getContext('2d')

  //     const data = tokenData.priceArray

  //     const chartData = {
  //       labels: data.map((_: any, index: any) => index),
  //       datasets: [
  //         {
  //           label: 'Data',
  //           data: data,
  //           borderColor: 'red',
  //           fill: false,
  //           lineWidth: 0.000001, // Thin lines
  //         },
  //       ],
  //     }

  //     const chartOptions = {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       gridLines: false, // No gridlines
  //       scales: {
  //         x: {
  //           display: false, // Hide x-axis
  //           ticks: {
  //             display: false, // Hide x-axis labels and tick marks
  //           },
  //         },
  //         y: {
  //           display: false, // Hide y-axis
  //           ticks: {
  //             display: false, // Hide y-axis labels and tick marks
  //           },
  //           beginAtZero: true, // Start y-axis at zero
  //           // Optional: Set suggestedMax to magnify data differences
  //           // suggestedMax: Math.max(...data) * 1.1, // Example: 10% higher than max data value
  //         },
  //       },
  //       legend: {
  //         display: false, // Remove the legend
  //       },
  //     }

  //     const myChart = new Chart(ctx, {
  //       type: 'line',
  //       data: chartData,
  //       options: chartOptions,
  //     })
  //   }
  // }, [tokenData])

  return (
    <div className="group">
      {tokenData ? (
        <div className="grid grid-cols-12 col-span-7">
          <div className="flex flex-col col-span-5">
            <div className="flex justify-between gap-2">
              <span className="font-bold text-md text-dark-500 mb-1 block">
                {`${token}/${currency}`}
              </span>
              <span className="market-rate">{tokenData.percentChange}%</span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <span className="market-price dark:market-price-dark">
                {tokenData[`currentPrice${currency}`]}
              </span>
              <span className="market-currency dark:market-currency-dark">
                {currency}
              </span>
            </div>
          </div>
          <div className="col-span-7 flex flex-grow-0 justify-end">
            {/* <img className="chart" src="/images/Path 2.svg" alt="" /> */}
            <div className="p-0 m-0 pl-[14px] w-full relative top-[-5px]">
              <ChartRender
                color={
                  Number(tokenData.percentChange) >= 0 ? '#94E93F' : '#C11E0F'
                }
                datam={tokenData.priceArray}
                aspectRatio={4}
              />
            </div>
          </div>
        </div>
      ) : (
        <Skeleton height={'30px'} width={'210px'} />
      )}
    </div>
  )
}

export default MarketStatusItem
