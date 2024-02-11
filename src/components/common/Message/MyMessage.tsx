import React from "react";
import { UserContext } from "../../../App";

interface MyMessageProps {
  text: string;
}

function MyMessage({ text }: MyMessageProps) {
  const { theme } = React.useContext(UserContext);
  return (
    <div aria-label="message" className="flex justify-end">
      <div className="pr-2.5">
        <div className="bg-brand-600 rounded-md py-1 pr-[6px] pl-[8px] rounded-tr-none relative dark:bg-light-1100">
          <img
            className="absolute -right-[9px] top-0"
            src={theme === 'dark' ? "/images/chat-t.svg" : "/images/top-vector-tip (1).svg"}
            alt=""
          />
          <div className="flex gap-[8px]">
            <p className="mb-3 leading-[20px] text-[13px] md:text-[14px]">{text}</p>
            <div className="flex items-end">
              <div className="flex gap-1 w-[65px] md:w-[73px]">
                <span className="text-[10px] md:text-[12px] font-light text-right block whitespace-nowrap">
                  11:35 AM
                </span>
                <img src={theme === 'dark' ? "/images/dark-readed.svg" : "/images/msg_read.svg"} className="w-[16px]" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyMessage;
