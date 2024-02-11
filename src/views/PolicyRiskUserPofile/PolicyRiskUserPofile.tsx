import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import SelectField from '../../components/common/TextField/SelectField'
import TextField from '../../components/common/TextField'
import InsureProUserInfom from '../../components/global/RiskPolicyUserInfom/RiskPolicyUserInfom'
import { UserContext } from '../../App'
import Score from '../Dashboard/Score'
import Attachment from '../../components/common/Attachment'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import { useNavigate } from 'react-router-dom'
import TextFieldS from '../../components/common/TextFieldS'
import { Tooltip as ReactTooltip } from "react-tooltip";
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'
import Popup from "../../components/templates/Popup";

function RiskPolicyUserProfile() {
  const { theme } = React.useContext(UserContext);
  const [popup, setPopup] = useState(false);
  const togglePopup = () => setPopup((v) => !v)
  const [currentIcon, setcurrentIcon] = useState("");
  let navigate = useNavigate()
  const titleClassName = 'fw-400 fs-13 lh-15 text-light-800 dark:text-dark-600'
  const textClassName = 'fw-500 fs-13 lh-15 text-light-800 dark:text-dark-600'
  return (
    <>
      <Header name="Policy Risk" showBackAero={true} />
      <div className="items-center justify-between hidden mb-5 sm:flex">
        <Button
          onClick={() => navigate(-1)}
          icon={
            theme === 'dark'
              ? '/images/leftBlackAero.svg'
              : '/images/Mask (2ss).svg'
          }
          className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800 black-btn"
          text="Back"
        />
        <Link
          to="/"
          className={
            theme === 'dark'
              ? 'text-lg font-bold text-dark-800'
              : 'text-lg font-bold text-brand-300'
          }
        >
          How it works
        </Link>
      </div>
      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow mb-[50px]">
          <InsureProUserInfom variant="customer" />
          <div className="flex-grow mb-[50px] mt-[20px]">
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                    Vehicule Details
                </b>
                <p className="text-lg text-dark-650 ">
                    Your personal information is never shared with other users.
                </p>
              </div>
              {/* text-dark-650 flex-grow 
              text-white bg-dark-800 rounded h-[40px] text-lg py-3 w-full px-5 */}
              <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                    <SelectField
                    labelIcon={false}
                    label="Make"
                    placeholder="Please Select"
                    />
                    <SelectField
                    labelIcon={false}
                    label="Model"
                    placeholder="Please Select"
                    />
                </div>
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                    <SelectField
                    labelIcon={false}
                    label="Year of Manufacture"
                    placeholder="YYYY"
                    />
                    <SelectField
                    labelIcon={false}
                    label="Type of Fuel "
                    placeholder="Please Select"
                    />
                </div>
                <SelectField
                labelIcon={true}
                label="Engine Size"
                placeholder="Please Select"
                />
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                    <SelectField
                    labelIcon={true}
                    label="Registration Number"
                    placeholder="e.g. 645BS45"
                    />
                    <SelectField
                    labelIcon={true}
                    label="Insurable Value"
                    placeholder="$ e.g. 5000"
                    />
                </div>
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                    <SelectField
                    labelIcon={true}
                    label="Estimated Annual Mileage"
                    placeholder="Please Select"
                    />
                    <SelectField
                    labelIcon={true}
                    label="Overnight Parking "
                    placeholder="Please Select"
                    />
                </div>


              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                Insured Details
                </b>
                <p className="text-lg text-dark-650 ">
                    Your personal information is never shared with other users.
                </p>
              </div>
              <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                <SelectField
                labelIcon={true}
                label="Cover Duration"
                placeholder="Please Select"
                />
                <SelectField
                labelIcon={true}
                label="Cover Type"
                placeholder="Please Select"
                />
                <SelectField
                labelIcon={true}
                label="Usage "
                placeholder="Please Select"
                />
                <SelectField
                labelIcon={true}
                label="Security Measures"
                placeholder="Please Select"
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                    <SelectField
                    labelIcon={true}
                    label="Driving Offences"
                    placeholder="Please Select"
                    />
                   <SelectField
                    labelIcon={true}
                    label="Claim History"
                    placeholder="Please Select"
                    />
                </div>
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                    <SelectField
                    labelIcon={false}
                    label="Year of Obtaining Licence"
                    placeholder="YYYY"
                    />
                    <SelectField
                    labelIcon={false}
                    label="Driving Licence Number"
                    placeholder="e.g. RJ5852"
                    />
                </div>
                <SelectField
                labelIcon={true}
                label="Risk Address"
                placeholder="Please Select"
                />
                <TextField
                label="Country/Region"
                labelIcon={false}
                placeholder="e.g. California"
                classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                    <TextField
                    label="Address Line 1"
                    labelIcon={false}
                    placeholder="e.g. 645 EShaw Ave"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    />
                    <TextField
                    label="Address Line 2"
                    labelIcon={false}
                    placeholder="e.g.  Fresco, ca 93710"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    />
                </div>
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                    <TextField
                    label="City"
                    labelIcon={false}
                    placeholder="e.g. New York"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    />
                    <TextField
                    label="Post Code"
                    labelIcon={false}
                    placeholder="e.g.  4450"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    />      
                </div>
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="flex justify-end">
              <Button
                className={`font-medium px-8 max-[640px]:w-full  ${
                  theme === 'dark'
                    ? 'dark:bg-light-1200 dark:box-border'
                    : 'grey-gradient form-submit-btn'
                }`}
                text="Save"
                color={theme === 'dark' ? 'btn-white' : 'grey-gradient'}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center hidden sm:flex">
          <div className="flex flex-col gap-5  sm:w-[285px] max-[640px]:w-full ">
            <h6 className="text-dark-300">Overview</h6>
            <div className="rounded bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <div className="mb-7">
                <WeightTitle title="Summary" />
              </div>
              <div className="flex items-center justify-between mb-7">
                <img
                  className="w-[35px] h-[35px]"
                  src={
                    theme === 'dark'
                      ? '/images/whiteCar.svg'
                      : '/images/lodgo.svg'
                  }
                  alt=""
                />
                <span className="font-medium text-dark-10 dark:text-dark-800">
                  Car insurance{' '}
                </span>
              </div>
              <div className="flex flex-col gap-[25px]">
                <WeightRow
                  name="Purchase"
                  value="13/05/2022 20:58"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Cover ID"
                  value="2ab256355df..."
                  valueStyle={{
                    color:
                      theme === 'dark'
                        ? 'text-[#6D6E76] hover:text-[#000]'
                        : 'hover:text-brand-400',
                  }}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Status"
                  value="Active"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim ID"
                  value="1250"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim Amount"
                  value="1250 USCD"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim History"
                  withInfo
                  value="1250 USCD"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="PRP"
                  withInfo
                  value="2000"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
              </div>
            </div>
            <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <WeightTitle title="Attachments" />
              <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                {[...Array(4)].map((value, index) => (
                  <>
                    <div className="flex justify-between">
                      <div className="flex basis-3/4 gap-[16px]">
                        <img src="/images/pin.svg" alt="" />
                        <Link
                         onClick={() => {
                          setPopup(true);
                           }}
                          className={`${
                            theme === 'dark'
                              ? 'font-bold text-[#606166] hover:text-[#000000]'
                              : 'text-white hover:text-[#50ff7f]'
                          } file-name `}
                          to={''}
                        >
                          Id_back.png
                        </Link>
                      </div>
                      <img
                        className="items-end w-[20px]"
                        src={
                          theme === 'dark'
                            ? '/images/downloadblack.svg'
                            : '/images/Remove (1).svg'
                        }
                        alt=""
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <WeightTitle title="Policy T&C" />
              <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                {[...Array(2)].map((value, index) => (
                  <>
                    <div className="flex justify-between">
                      <div className="flex basis-3/4 gap-[16px]">
                        <img src="/images/pin.svg" alt="" />
                        <Link
                         onClick={() => {
                          setPopup(true);
                           }}
                          className={`${
                            theme === 'dark'
                              ? 'font-bold text-[#606166] hover:text-[#000000]'
                              : 'text-white hover:text-[#50ff7f]'
                          } file-name block`}
                          to={''}
                        >
                          Essential IPID
                        </Link>
                      </div>
                      
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        visible={popup}
        onClose={togglePopup}
        maxWidth="max-w-[824px]"
      >
        <AttachmentPreview 
        attachmentName='Id_front.png'
        onClose={togglePopup}
        />
      </Popup>
    </>
  )
}
export default RiskPolicyUserProfile
