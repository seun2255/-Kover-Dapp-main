import React from "react";
import { UserContext } from "../../../App";
import FilterTabs from "../../../components/common/FilterTabs";
import MarketStatusItem from "./MarketStatusItem";
import MarketStatusItem1 from "./MarketStatusItem1";
import MarketStatusItem2 from "./MarketStatusItem2";
function MarketStatus() {
  const [currency, setCurrency] = React.useState<number>(1);
  const { theme } = React.useContext(UserContext);
  return (
    <>
      <div className="bg-dark-600 rounded sm:min-h-[301px] dark:text-dark-800 dark:text-primary-100 dark:bg-white rounded-sm dark:box-border  general-box-border market-status">
        <div className="flex justify-between gap-4 sm:mb-[44px] mb-[21px]">
          <span className="market dark:market-dark">Markets</span>
          <FilterTabs currentTab={currency} changeTab={setCurrency} tabs={["USD", "EUR", "BTC"]} showinmobile={true}/>
        </div>
        <div className="flex flex-col gap-1">
          <MarketStatusItem />
          <img className="mt-[12px] mb-[17px]" src={`${theme === "dark" ?'/images/012.svg' : '/images/line-2.svg'}`} alt="" />
          <MarketStatusItem />
          <img className="mt-[12px] mb-[17px]" src={`${theme === "dark" ?'/images/012.svg' : '/images/line-2.svg'}`}  alt="" />
          <MarketStatusItem2 />
        </div>
      </div>
    </>
  );
}

export default MarketStatus;