import React, { useState } from "react";
import { Link } from "react-router-dom";
import Agreament from "../../components/common/Agreament";
import Button from "../../components/common/Button";
import Header from "../../components/common/header/Header";
import SelectField from "../../components/common/TextField/SelectField";
import ProgressWeight from "../../components/common/progress-weight/ProgressWeight";
import UploadButton from "../../components/common/FileUpload/UploadButton";
import Rules from "../../components/common/FileUpload/Rules";
import EmptyAttachment from "../../components/common/EmptyAttachment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import FormAgreament from "../../components/common/FormAgreament";
function KYCSubmit() {
    const [currentIcon, setcurrentIcon] = useState("");
    return (
        <>
            <div>
                <Header name="KYC" />
                <div className="flex items-center justify-between mb-5">
                    <span className="text-dark-300">Submit KYC</span>
                    <Link to="/" className="text-lg font-bold text-brand-300 hidden lg:block">
                        How it works
                    </Link>
                </div>
                <div className="mb-10 lg:flex gap-[60px]">
                    <div className="flex-grow">
                        <div className="lg:grid lg:grid-cols-2">
                            <div className="sm:w-[60%] w-full">
                                <div className="flex gap-[5px] items-center mb-[10px] ">
                                    <b className="form-section-title dark:form-section-title-dark block">Identity Details</b>
                                    <img src={`${currentIcon === "kyc-Identity-Details" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}  alt="" width={14} height={14}
                                       id="kyc-Identity-Details"
                                       onMouseEnter={()=>{ 
                                            setcurrentIcon("kyc-Identity-Details");
                                        }} onMouseLeave={()=>{
                                            setcurrentIcon("");
                                        }}
                                    />
                                    {/* <img className="w-[14px] h-[14px]" src="/images/Mask (11).svg" alt="" /> */}
                                    <ReactTooltip   
                                    className="my-tool-tip z-500"
                                    anchorId={"kyc-Identity-Details"}
                                    place="bottom"
                                    content="This is the total amount available for  you to borrow. You can borrow based on your 		collateral and until the borrowcap is reached."
                                />
                                </div>
                                <p className="form-section-subtitle">
                                    Your identity is never shared with other users.
                                </p>
                            </div>
                            <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                                <SelectField label="Issuing Country/Region" labelIcon={false} placeholder="Please select" />
                                <SelectField label="Identity Type" placeholder="Please select" />
                                <SelectField label="National ID Number" labelIcon={false} placeholder="e.g. 5589855455" />
                            </div>
                        </div>
                        <hr className="my-[24px]" />
                        <div className="lg:grid lg:grid-cols-2">
                            <div className="sm:w-[60%] w-full">
                                <div className="flex gap-[5px] items-center mb-[10px] ">
                                    <b className="form-section-title dark:form-section-title-dark block">Identity Documents</b>
                                    <img src={`${currentIcon === "kyc-Identity-Documents" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}  alt="" width={14} height={14}
                                      id="kyc-Identity-Documents"
                                       onMouseEnter={()=>{
                                        setcurrentIcon("kyc-Identity-Documents");
                                      }} onMouseLeave={()=>{
                                        setcurrentIcon("");
                                      }}
                                    />
                                    {/* <img className="w-[14px] h-[14px]" src="/images/Mask (11).svg" alt="" /> */}
                                    <ReactTooltip   
                                        className="my-tool-tip z-500"
                                        anchorId={"kyc-Identity-Documents"}
                                        place="bottom"
                                        content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                                    />
                                </div>
                                <p className="form-section-subtitle">
                                    Drag and drop one or multiple files (Max size: 1Mb)
                                </p>
                            </div>
                            <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                                <UploadButton />
                                <Rules space="ml-[20px]" padding="py-[22px] px-[40px]"/>
                            </div>
                        </div>
                        <hr className="my-[24px]" />
                        <div className="lg:grid lg:grid-cols-2">
                            <div>
                            </div>
                            <div>
                            <FormAgreament 
                                agreeURL="/"
                                mainClass="flex flex-col"
                                variety="checkbox"
                                agree="Terms of Use"
                                bntText="Submit" 
                                item1Class="w-full flex gap-[12px] items-center"
                                item2Class="w-full mt-[10px] flex justify-end"
                                btn="w-fit w-[100%] sm:w-fit"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex sm:justify-center">
                        <div className="flex flex-col gap-5 sm:max-w-[285px] min-w-[100%] pt-8">
                            <EmptyAttachment />
                            <ProgressWeight name="KYC" subtitle="STEP 2 OF 2" current={100} classname="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default KYCSubmit;