import React, { useState } from "react";
import InfoText from "../../common/InfoText";
function ChangeHistory() {
  const [changeHistory, setChangeHistory] = useState(false);
  const toggleChangeHistory = () => setChangeHistory((v) => !v);
  return (
    <div>
      <div onClick={toggleChangeHistory} role="button" className="flex items-center gap-2.5">
        <span className="text-primary-700 font-medium text-md dark:text-dark-800">Change history</span>
        <img
          className={`duration-150 ${changeHistory ? "rotate-180" : ""}`}
          src="/images/Mask (21).svg"
          alt=""
        />
      </div>

      {/* {changeHistory && (
        <div className="">
          <div onClick={toggleChangeHistory} className="fixed top-0 right-0 bottom-0 left-0 bg-transparent -z-10"/>
          <div className="change-history absolute left-0 right-0 bg-dark-800 rounded-b py-[30px] px-[20px] lg:min-w-[452px] dark:bg-light-1100 dark:text-dark-800 z-41">
            <div className="grid grid-cols-2 gap-2 mx-auto">
              <div className="flex flex-col gap-5">
                <InfoText variant="small" color="dark-650" text="Change History"/>
                <InfoText variant="small" icon color="dark-650" text="Created"/>
                <InfoText variant="small" icon color="dark-650" text="Last Change"/>
              </div>
              <div className="flex flex-col gap-5 text-right">
                <span className="font-medium text-lg">3</span>
                <span className="font-medium text-lg">13/05/2022 20:58</span>
                <span className="font-medium text-lg">13/05/2022 20:58</span>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ChangeHistory;
