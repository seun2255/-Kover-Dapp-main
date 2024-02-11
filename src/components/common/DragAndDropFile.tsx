import React, { useState } from "react";
import { UserContext } from "../../App";
import InfoText from "./InfoText";
import { Tooltip as ReactTooltip } from "react-tooltip";

export interface draganddropProps {
    className?: string;
    size?: String
    id?: Number
}

function DragAndDropFile(props: draganddropProps) {
    const { className, size ,id} = props;
    const { theme } = React.useContext(UserContext);
    const [currentIcon, setcurrentIcon] = useState(""); 
    return (
        <>
            <div className={`max-w-xl ${className}`}>
                {/* <div className="flex gap-[5px]">
                    <p className="insured dark:insured-dark ">Insured's Documents</p>
                    <img 
                        src={`${currentIcon === "insu-doc" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}
                        className="w-[12px]"
                        alt="" 
                        width={12}
                        id={'insu-doc'+id}
                        onMouseEnter={()=>{
                         setcurrentIcon("insu-doc"); 
                        }} onMouseLeave={()=>{
                         setcurrentIcon("");
                        }}
                    />
                    <>
                        <ReactTooltip   
                            className="my-tool-tip z-500"
                            anchorId={'insu-doc'+id}
                            place="bottom"
                            content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                        />
                    </>
                </div> */}
                {/* <div className="mt-[10px]">
                    <span className="dragBox"> Drag & drop one or multiple files (Max size: 1Mb) </span>
                </div> */}
                <label className={`mt-[15px] flex justify-center w-full  transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color ${size}`}>
                    <span className="flex items-center space-x-2">
                        <img className="w-[14px] h-[16px]" src="/images/uploadAeroBlack.svg" alt="" />
                        <span className="upload-text dark:text-dark-800">
                            Upload
                        </span>
                    </span>
                    <input type="file" name="file_upload" className="hidden" />
                </label>
            </div>
        </>
    );
}
export default DragAndDropFile;