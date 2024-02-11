import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Header from '../header/Header'
import QRConnector from '../QRConnector'
import SelectField from '../TextField/SelectField'
import TextField from '../TextField'
import TextFieldS from '../TextFieldS'
import { UserContext } from '../../../App';
import { Tooltip as ReactTooltip } from "react-tooltip";
import InfoText from '../InfoText';
import ProgressWeight from '../progress-weight/ProgressWeight';
import Rules from '../FileUpload/Rules';
import UploadingFile from '../FileUpload/UploadingFile';
import DownloadBox from '../DownloadBox';
import FormAgreament from '../FormAgreament'
import { useNavigate } from 'react-router-dom'
import WeightRow from '../WeightRow'
import WeightTitle from '../WeightTitle'
import CastYourVote from '../../../components/global/CastYourVote'

interface popupProps {
    onClose?: () => void
  }
function ValidateClaim( {
    onClose,
  }: popupProps,
  props: any
) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState("");
  return (
    <div>
    <div className="dark:text-dark-800 dark:text-primary-100 dark:bg-white wallet-popup">
      <div className="flex justify-end mb-2.5">
        <button type="button" onClick={onClose}>
          <img className="w-2.5 h-2.5" src="/images/Group 144.svg" alt="" />
        </button>
      </div>
      <div className="flex flex-col items-center text-center">
        <img
          src={
            theme === 'dark'
              ? '/images/Frame.svg'
              : '/images/Frame.svg'
          }
          alt=""
        />
        <b className="wallet-title dark:wallet-title-dark mt-[17px]">Validate Claim</b>
        <p className="valClaim-sub-title mt-[2px]">To get extra rewards</p>
       
      </div>
      <div className='mt-[18px]'>
        <p className='valClaim-text'>How would you rate your overall satisfaction with the assessment of The claim?</p>
      </div>
      <div className="grid grid-cols-4 max-[320px]:grid-cols-2 max-[375px]:grid-cols-2 md:grid-cols-4 gap-4 mt-[2px]">
        <button type="button" className="min-w-[100px] general-text-12 flex gap-[10px] valClaim-Btn" >
            <img
                className="w-6 md:w-auto wallet-sub-button-icon"
                src="/images/emoji _face with cold sweat.png"
                alt=""
            />
            <span className="valClaim-Btn-text"> Terrible </span>
        </button>
        <button type="button" className="min-w-[100px] general-text-12 flex gap-[10px] valClaim-Btn active" >
            <img
                className="w-6 md:w-auto wallet-sub-button-icon"
                src="/images/Group 26.png"
                alt=""
            />
            <span className="valClaim-Btn-text"> Bad </span>
        </button>
        <button type="button" className="min-w-[100px] general-text-12 flex gap-[10px] valClaim-Btn" >
            <img
                className="w-6 md:w-auto wallet-sub-button-icon"
                src="/images/emoji _slightly smiling face_.png"
                alt=""
            />
            <span className="valClaim-Btn-text"> Good </span>
        </button>
        <button type="button" className="min-w-[100px] general-text-12 flex gap-[10px] valClaim-Btn" >
            <img
                className="w-6 md:w-auto wallet-sub-button-icon"
                src="/images/Group 12.png"
                alt=""
            />
            <span className="valClaim-Btn-text"> Amazing </span>
        </button>
     </div>
     <div>
        <WeightRow
        className='mt-[15px]'
        name="Lock to Vote"
        valuePrefix=" Balance"
        value=" 24.00 KOVER"
        titleclassname="fs-13 text-light fw-500"
        textclassname="fs-13 text-light fw-500"
        valuePrefixClassName="fs-13 text-dark fw-500"
        />
     </div>
     <div className="bg-dark-800 rounded py-2.5 px-5 flex justify-between gap-2 items-center mb-4 dark:bg-light-200 h-[50px] mt-[15px]">
        <input maxLength={5} type="text" placeholder="00.00"
        className={`placeholder:text-dark-300 dark:text-dark-800 text-6xl max-w-none min-w-0 w-[72px] flex-grow dark:placeholder:text-dark-300 fw-400 lh-42 input-value
        "text-[#42434B] dark:tex-light-800" : "text-[#FFFFFF] dark:tex-light-800"} `}/>
        <div className="flex gap-4 items-center">
        <Button color={theme === "dark" ? "dark:bg-white" : " bg-[#3F4048]"} className="h-[30px]" text="MAX" />
        </div>
    </div>
    <div>
        <WeightRow
            className='mt-[15px]'
            name="Cast Your Vote"
            titleclassname="fs-13 text-light fw-500"
            />
    </div>
    <div className="mt-[10px] popupvoteagre">
        <CastYourVote
        headline
        view="moblie"
        firsttext="By voting, I accept Kover's"
        />
    </div>
    
    </div>
    </div>
  )
}
export default ValidateClaim
