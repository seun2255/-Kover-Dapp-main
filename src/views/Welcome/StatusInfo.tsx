import React from 'react'
export interface StatusInfoPops {
  className?: string
  height?: string
  userDetails: any
}
function StatusInfo(props: StatusInfoPops) {
  const { className, height, userDetails } = props
  return (
    <div
      className={`dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-white bg-dark-800  rounded flex flex-col md:flex-row md:justify-between md:flex-wrap box-border-2x-light dark:box-border-2x-dark ${
        height || `h-[280px]`
      } rounded-sm ${className || `px-5 py-[18px]`}`}
    >
      <div className="flex justify-between w-full">
        <div className="">
          <div className="flex gap-[6px] mb-[5px]">
            <span className="premium-no dark:premium-no-dark">
              {userDetails.premiumsPaid}
            </span>
            <b className="usd">USD</b>
          </div>
          <span className="mb-1 total-premium">Total Premium</span>
        </div>
        <div className=" bg-dark-900 pt-[10px] pl-[12px] pr-[10px] pb-[15px] text-center dark:text-dark-800 dark:text-primary-100 dark:bg-light-200">
          <h5 className="mb-[10px] active-cover-no dark:active-cover-no-dark">
            {userDetails.activeCovers}
          </h5>
          <span className="active-cover">Active Covers</span>
        </div>
      </div>
      <div className="w-full">
        <div className="mt-[19px]">
          <span className="mb-[10px] current-policy ">
            Current policy balance
          </span>
          <div className="flex gap-[6px] ml-[10px]">
            <h4 className="policy-balance dark:policy-balance-dark">
              {userDetails.policyBalance}
            </h4>
            <b className="usd">USD</b>
          </div>
        </div>
        <div className="status-info-sub-info">
          <span className="slc-usd">USDC/USD</span>
          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-start mt-[5px]">
              <b className="ml-[10px] slc-usd-no dark:slc-usd-no-dark">
                {userDetails.usdcData.priceUSD} USD
              </b>
              &nbsp;
              <b className="slc-usd-pulse dark:slc-usd-pulse-dark">
                {' '}
                {userDetails.usdcData.percentChange}
              </b>
            </div>
            <a
              href="https://bitpay.com/buy-usd-coin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark">
                Buy
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StatusInfo
