import React from "react";
import rules from "./rules.json";
import { UserContext } from "../../../App";
export interface ruleProps {
  className?: string;
  space?: string;
  padding?: string
}

function Rules(props: ruleProps) {
  const { className='' ,space ='',padding =''} = props;
  const { theme } = React.useContext(UserContext);
  return (
    <div className={`${className}`}>
      <div className={`flex flex-col gap-[15px] dark:box-border dark-light-box-border ${padding || "pl-[20px] pr-[10px] py-[20px]"}`}>
        {rules.map((value, index) => (
          <div key={index} className="flex">
            <img src={theme === 'dark' ? "/images/grey-ok-icon.svg" : "/images/Remove (3).svg"} alt="" />
            <span className={`rule ml-[20px] w-full ${space}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Rules;