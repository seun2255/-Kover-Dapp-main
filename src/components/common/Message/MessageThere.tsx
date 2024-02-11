import React from "react";
import Avater from "../Avater";

interface MessageThereProps {
  text: string;
}

function MessageThere({ text }: MessageThereProps) {
  return (
    <div className="flex gap-1 justify-start" aria-label="message">
      <div>
        <Avater />
      </div>
      <div className="pl-2.5">
        <div className="bg-[#F1F1F1] rounded-md py-1 pr-2 pl-1.5 rounded-tl-none relative">
          <img className="absolute -left-[9px] top-0" src="/images/top-vector-tip.svg" alt="" />
          <div className="flex items-center gap-2.5 mb-1">
            <span className="font-medium text-dark-800">Jav</span>
            <span className="text-lg text-dark-650">0x95e441....</span>
          </div>
            <div className="flex gap-[8px]">
                <p className="text-dark-800 mb-3 leading-[20px] text-[13px] md:text-[14px]">{text}</p>
                <div className="flex items-end">
                    <div className="flex gap-1">
                        <span className="text-[10px] md:text-[12px] font-light text-dark-650 text-right block whitespace-nowrap">
                          11:35 AM
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MessageThere;
