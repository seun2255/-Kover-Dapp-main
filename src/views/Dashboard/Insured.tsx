import { Tooltip as ReactTooltip } from "react-tooltip";
import { useState } from "react";
function Insured() {
  const [currentIcon, setcurrentIcon] = useState("");
  return (
    <div className="block flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="box-border-2x-light dark:box-border-2x-dark bg-dark-800 rounded col-span-2 dark:text-dark-800 dark:text-primary-100 dark:bg-white rounded-sm insured-card min-h-[170px]">
          <div className="flex justify-between">
            <div>
              <div className="flex flex-col items-start mb-1">
                <div className="flex mb-[5px]">
                  <span className="invest-no dark:invest-no-dark">2,345</span>
                  <span className="usd ml-[6px]">USD</span>
                </div>
                <span className="total-invested">Total invested</span>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex mb-[5px]">
                  <span className="total-invest-no dark:total-invest-no-dark ml-[10px]">
                    3.4330
                  </span>
                  <span className="usd ml-[6px]">USD</span>
                </div>
                <span className="total-available">Total available</span>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="rounded bg-dark-900 p-4 text-center dark:text-dark-800 dark:text-primary-100 dark:bg-white dark:bg-light-200 ">
                <span className="apr-no dark:apr-no-dark">81%</span>
                <div className="flex justify-center gap-[5px] items-center mt-[5px]">
                  <span className="apr">APR</span>
                  <img
                    src={`${currentIcon === "Insured" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}
                    id={"Insured"}
                    width={10}
                    height={10}
                    onMouseEnter={() => {
                      setcurrentIcon("Insured");
                    }}
                    onMouseLeave={() => {
                      setcurrentIcon("");
                    }}
                    alt=""
                  />
                  <ReactTooltip
                    className="my-tool-tip z-500"
                    anchorId={"Insured"}
                    place="bottom"
                    content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                  />
                </div>
              </div>
              <button className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark">
                Invest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insured;
