
import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
interface UploadButton {
  className?: string;
  titleShow?: boolean;
}

function UploadButton({ className, titleShow }: UploadButton) {
  const [currentIcon, setcurrentIcon] = useState(""); 
  return (
    <div>
      {titleShow === true ?
        <>
          <div className="hidden sm:block">
            <div className="flex gap-2 pt-2">
              <p>Insured's Documents</p>
              <img 
                        id={"Insured's-Documents-004"}
                        src={`${currentIcon === "Insured's-Documents-004" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}
                        width={12} 
                        alt="" 
                        onMouseEnter={()=>{
                            setcurrentIcon("Insured's-Documents-004");
                        }} onMouseLeave={()=>{
                            setcurrentIcon("");
                        }}
                        />
                     <>
                     <ReactTooltip
                        className={`my-tool-tip z-500`}
                        anchorId={"Insured's-Documents-004"}
                        place="bottom"
                        content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached." />
                     </>
            </div>
          </div><div className="py-2 hidden sm:block">
            <span className="text-base my-2 text-dark-200"> Drag & drop one or multiple files (Max size: 1Mb) </span>
          </div>
        </> : ''
      }
      <label className={`flex justify-center w-full  transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full h-[40px]  ${className || ""}`}>
        <span className="flex items-center space-x-2">
          <img src="/images/uploadAeroBlack.svg" alt=""/>
          <span className="font-medium text-gray-600">
            Upload
          </span>
        </span>
        <input type="file" name="file_upload" className="hidden" />
      </label>
    </div>
  );
}
export default UploadButton;