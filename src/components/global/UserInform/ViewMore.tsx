import React, { useState } from "react";
import { UserContext } from "../../../App";
import Button from "../../common/Button";

function ViewMore({btnClassName}:any) {
  const [veiwMore, setViewMore] = useState<boolean>(false);

  const [changeHistory, setChangeHistory] = useState(false);
  const toggleViewMore = () => setViewMore((v) => !v);
  const toggleChangeHistory = () => setChangeHistory((v) => !v);
  const { theme } = React.useContext(UserContext);
  console.log("");
  return (
    <>
      <div onClick={toggleChangeHistory}>
      <Button
        variant="outline"
        color="dark"
        text="View more"
        endIcon={theme === 'dark' ? "/images/Mask (14).svg" : "/images/Mask (20).svg"}
        iconRotate={veiwMore ? undefined : "rotate-[-180deg]"}
        onClick={toggleViewMore}
        className={`${btnClassName} w-full` || ""}
      />

      {/* {changeHistory && (
        <div className="">
          <div
            onClick={toggleChangeHistory}
            className="fixed top-0 right-0 bottom-0 left-0 bg-transparent -z-10"
          />

          <div className="view-more-menu absolute left-0 right-0 bg-dark-800 rounded-b dark:bg-light-1100 dark:text-dark-800 justify-center z-40 w-[38%]">
            <div className="flex px-[10px] sm:px-[108px] py-[30px] gap-[20px]">
                <div className="flex flex-col gap-[20px] basis-1/3 sm:basis-1/2">
                    <span className="infotext-span font-normal lg:font-medium fw-400 tab-text">Date of Birth</span>   
                    <span className="infotext-span font-normal lg:font-medium fw-400 tab-text">Address</span>            
                </div>
                <div className="flex flex-col gap-[20px] basis-1/3 sm:basis-1/2">
                    <span className="font-medium text-lg">26/01/1993</span>
                    <span className="font-medium text-lg">26 av Louis Vito CH45 8  London UK</span>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
    </>
  );
}

export default ViewMore;
