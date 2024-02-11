import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
function FileUploadlist() {
    const { theme } = React.useContext(UserContext);
    return (
        <>
            <div className="flex justify-between">
                <div><img src={theme === "dark" ? "/images/006.svg" : "/images/001.svg"} alt="" /></div>
                <div><Link to="/"><p>img 001.png</p></Link></div>
                <div className="w-[100px]"><p className={theme === "dark" ? "font-bold" : "text-primary-700"} >Uploaded</p></div>
                <div className="w-[100px]"><img src={theme === "dark" ? "/images/008.svg" : "/images/004.svg"} alt="" /></div>
            </div>
            <div className="flex justify-between">
                <div><img src="/images/002.svg" alt="" /></div>
                <div><Link to="/"><p>doc 002.pdf</p></Link></div>
                <div><img className="py-[7px]" src="/images/009.svg" alt="" /></div>
                <div><img src="/images/003.svg" alt="" /></div>
            </div>
        </>
    );
}
export default FileUploadlist;
