import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/common/Button'
import Header from '../../../components/common/header/Header'
import QRConnector from '../../../components/common/QRConnector'
import SelectField from '../../../components/common/TextField/SelectField'
import TextField from '../../../components/common/TextField'
import TextFieldS from '../../../components/common/TextFieldS'
import { UserContext } from '../../../App';
import { Tooltip as ReactTooltip } from "react-tooltip";
import InfoText from '../../../components/common/InfoText';
import ProgressWeight from '../../../components/common/progress-weight/ProgressWeight';
import Rules from '../../../components/common/FileUpload/Rules';
import UploadingFile from '../../../components/common/FileUpload/UploadingFile';
import DownloadBox from '../../../components/common/DownloadBox';
import FormAgreament from '../../../components/common/FormAgreament'
import { useNavigate } from 'react-router-dom'
interface popupProps {
  onClose?: () => void
}
function InsureProCommunity(
  {
  onClose,
}: popupProps,
props: any
) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState("");
  return (
    <div>
    
      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow">
        <div className="flex justify-between">
              <div className="flex gap-[10px] items-center">
              <p className="InsureProCommunity-title">InsurePro Community</p>  
              </div>
              <div className="flex items-center">
                  <div className="flex justify-end"><button type="button" onClick={onClose} ><img className="w-2.5 h-2.5" src="/images/Group 144.svg" alt="" /></button></div>
              </div>
          </div>
            
            <div className="scrollbar-customise bg-opacity-20 mt-[45px]" id="style-1">
              <div className="force-overflow">
                  <div className='kyc-popup-form'>
                      <div className=" w-full mb-[20px]">
                          <p className="welcome-subtitle">Submit InsurePro</p>
                      </div>
                      <div className="lg:grid lg:grid-cols-2">
                    <div className="sm:w-[60%]">
                      <b className="font-normal text-3xl mb-2.5 block">
                          Professional Details
                      </b>
                      <p className="text-lg text-dark-650 ">
                          Your professional information is never to other users.
                      </p>
                    </div>
                    {/* text-dark-650 flex-grow 
                    text-white bg-dark-800 rounded h-[40px] text-lg py-3 w-full px-5 */}
                    <div className="flex flex-col gap-5 pt-6 lg:pt-2">
                      

                      <SelectField
                        labelIcon={false}
                        label="Work Area"
                        placeholder="Please Select"
                      />
                      <SelectField
                        labelIcon={false}
                        label="Work Field"
                        placeholder="Domain"
                      />

                    </div>
                  </div>
                      <hr className="my-[24px]" />
                      <div className="lg:grid lg:grid-cols-2">
                      <div className="sm:w-[60%]">
                          <div className="flex gap-[5px] items-center">
                              <b className="font-normal text-3xl mb-2.5 block">Insured's Documents</b>
                              
                                  <img src={`${currentIcon === "kyc-Identity-Details" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}  alt="" width={14} height={14}
                                      id="kyc-Identity-Details"
                                      className='mb-2.5'
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
                              <p className="text-lg text-dark-650 ">
                              Drag and drop one or multiple files (Max size: 1Mb)
                              </p>
                          </div>
                      <div>
                          <label
                          className={`mb-[20px] mt-[15px] flex justify-center w-full  transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full h-[40px]`}
                          >
                          <span className="flex items-center space-x-2">
                              <img
                              className="w-[14px] h-[16px]"
                              src="/images/uploadAeroBlack.svg"
                              alt=""
                              />
                              <span className="upload-text dark:text-dark-800">
                              Upload
                              </span>
                          </span>
                          <input type="file" name="file_upload" className="hidden" />
                          </label>
                          <div className="mb-[5px]">
                          <UploadingFile progress={100} />
                          </div>
                          <div className="mb-[5px]">
                          <UploadingFile progress={45} />
                          </div>
                          <div className="my-[20px]">
                          <Rules padding="py-[20px] px-[20px]" space="ml-[20px]" />
                          </div>
                      </div>
                      </div>
                      <hr className="my-[24px]" />
                      <div className="lg:grid lg:grid-cols-2">
                          <div></div>
                          <div className="flex flex-col gap-2.5">
                              <FormAgreament
                              agreeURL="/"
                              mainClass="flex flex-col"
                              variety="checkbox"
                              agree="Terms of Use"
                              bntText="Submit"
                              item1Class="w-full flex gap-[12px] items-center"
                              item2Class="w-full mt-[10px] flex justify-end"
                              btn="sm:w-fit w-full"
                              />
                          </div>
                      </div>
                  </div>
              </div>
        
            </div>
        </div>
      </div>
   </div>
  )
}
export default InsureProCommunity
