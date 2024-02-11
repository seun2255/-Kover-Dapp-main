import React from "react";
import { UserContext } from "../../App";
interface AddMoreProps {
  text?: string;
  title?: string;
  subtext?: boolean;
}

function AddMoreDocuments({ text,title,subtext }: AddMoreProps) {
  return (
    <>
        <span className="fw-500 fs-16 lh-19">{title || "Documents"}</span>
        {subtext ? 
          <>
            <p className="fw-400 fs-12 lh-14 text-[#85858A] mb-[5px] mt-[15px]">Drag and drop one or multiple files (Max size: 1Mb)</p>
          </>
           :
          <></> 
          }
        <div className="mt-[15px] flex justify-center gap-[10px] items-center sm:py-[60px] py-[13px] transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full">
         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3996 0H9.59961V9.6H0V10.4H9.59961V20H10.3996V10.4H20V9.6H10.3996V0Z" fill="#606166"/></svg>
          <span className="fw-400 fs-14 lh-16 ls-35 text-[#606166]">
            {text || "Add More Documents "}
          </span>
        </div>
    </>
  );
}

export default AddMoreDocuments;