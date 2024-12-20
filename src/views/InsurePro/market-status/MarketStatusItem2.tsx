import React from "react";

function MarketStatusItem() {

  return (
    <div className="group">
      <div className="grid grid-cols-12 col-span-7">
        <div className="flex flex-col col-span-5">
          <div className="flex justify-between gap-2">
            <span className="font-bold text-md text-dark-500 mb-1 block">ETH/EUR</span>
            <span className="market-rate">1.75%</span>
          </div>
          <div className="flex items-center justify-between gap-1">
            <span className="market-price dark:market-price-dark">11,435.18 </span>
            <span className="market-currency dark:market-currency-dark">EUR</span>
          </div>
        </div>
        <div className="col-span-7 flex justify-end">
          <img className="chart" src="/images/Path 6.svg" alt="" />
        </div>
      </div>
      {/* <hr className="border-dark-50 block my-4 group-last:hidden" /> */}
    </div>
  );
}

export default MarketStatusItem

