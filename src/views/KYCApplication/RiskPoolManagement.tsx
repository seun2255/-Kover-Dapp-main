import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Agreament from '../../components/common/Agreament'
import Header from '../../components/common/header/Header'
import ProgressWeight from '../../components/common/progress-weight/ProgressWeight'
import QRConnector from '../../components/common/QRConnector'
import TextField from '../../components/common/TextField'
import SelectField from '../../components/common/TextField/SelectField'
import { UserContext } from '../../App'
import DragAndDropFile from '../../components/common/DragAndDropFile'
import DownloadBox from '../../components/common/DownloadBox'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import Rules from '../../components/common/FileUpload/Rules'
import FormAgreament from '../../components/common/FormAgreament'
import { Tooltip as ReactTooltip } from 'react-tooltip'

function RiskPoolMnagament() {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  return (
    <div>
      <div
        className="scrollbar-customise bg-opacity-20 mt-[45px] mb-[45px]"
        id="style-1"
      >
        <div className="force-overflow">
          <div className="kyc-popup-form mb-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-dark-300">SafeDrive Insurance</span>
              <Link
                to="/"
                className="hidden how-it-work text-brand-300 sm:block"
              >
                Risk Pool Details
              </Link>
            </div>
            <div className="mb-10 lg:flex gap-[60px]">
              <div className="flex-grow">
                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%] w-full">
                    <div className="flex gap-[5px] items-center mb-[10px] ">
                      <b className="block form-section-title dark:form-section-title-dark">
                        Risk Pool Details
                      </b>
                    </div>
                    <p className="form-section-subtitle">
                      Your personal information is never shared with other
                      users.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6 pt-5 lg:pt-2">
                    <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                      <TextField
                        label="Pool Name"
                        field="$"
                        placeholder="Safe Drive"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <SelectField
                        labelIcon={true}
                        label="Status"
                        placeholder="Please select"
                      />
                    </div>
                    <SelectField
                      labelIcon={true}
                      label="Admin Address"
                      placeholder="e.g. 0xC5E0a590daDc2129f591f2a539829Dd69b02Aef5"
                    />
                    <TextField
                      label="Risk Module Address"
                      field="$"
                      labelIcon={true}
                      placeholder="e.g. 0xC5E0a590daDc2129f591f2a539829Dd69b02Aef5"
                      outline={true}
                      classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    />
                  </div>
                </div>
                <hr className="my-[24px]" />
                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%] w-full">
                    <div className="flex gap-[5px] items-center mb-[10px] ">
                      <b className="block form-section-title dark:form-section-title-dark">
                        Risk Pool Parameters
                      </b>
                    </div>
                    <p className="form-section-subtitle">
                      Your personal information is never shared with other
                      users.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6 pt-5 lg:pt-2">
                    <div className="grid grid-cols-2 sm:gap-6 gap-2.5">
                      <TextField
                        labelIcon={true}
                        label="Protocol Fee"
                        placeholder="e.g. 50%"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        labelIcon={true}
                        label="Pool Operator Fee"
                        placeholder="e.g. 50%"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <div>
                        <TextField
                          labelIcon={true}
                          label="Risk Module fee"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                      <div>
                        <TextField
                          labelIcon={true}
                          label="Policy Fee"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:gap-6 gap-2.5">
                      <TextField
                        labelIcon={true}
                        label="Policy Reviewer Fee"
                        placeholder="e.g. 50%"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        labelIcon={true}
                        label="Adjuster Fee"
                        placeholder="e.g. 50%"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <div>
                        <TextField
                          labelIcon={true}
                          label="Adjuster Efficiency"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                      <div>
                        <TextField
                          labelIcon={true}
                          label="Premium Penalty"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:gap-6 gap-2.5">
                      <SelectField
                        labelIcon={true}
                        label="Policy Days Allowed "
                        placeholder="Please select"
                      />

                      <SelectField
                        labelIcon={true}
                        label="Withdrawal Parameters"
                        placeholder="Please select"
                      />
                    </div>
                    <SelectField
                      labelIcon={true}
                      label="Enable Policy Duration"
                      placeholder="Please select"
                    />

                    <SelectField
                      labelIcon={true}
                      label="Rolling Average"
                      placeholder="Please select"
                    />
                    <div className="grid grid-cols-2 sm:gap-6 gap-2.5">
                      <TextField
                        labelIcon={true}
                        label="Safe UR"
                        placeholder="e.g. 50%"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        labelIcon={true}
                        label="Investment Fraction"
                        placeholder="e.g. 50%"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <div>
                        <TextField
                          labelIcon={true}
                          label="COC"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                      <div>
                        <TextField
                          labelIcon={true}
                          label="Reinsurance Parameters"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                      <div>
                        <TextField
                          labelIcon={true}
                          label="Risk Module fee"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                      <div>
                        <TextField
                          labelIcon={true}
                          label="Pemium Discount"
                          placeholder="e.g. 50%"
                          outline={true}
                          classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block lg:hidden">
                  <hr className="my-[24px]" />
                  <DragAndDropFile size="w-full h-[40px]" id={1} />
                  <div className="flex gap-[12px] flex-col mt-[20px]">
                    <UploadingFile progress={100} />
                    <UploadingFile progress={80} />
                  </div>
                  <Rules className="mt-[20px]" />
                </div>
                <hr className="my-[24px]" />

                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%] w-full">
                    <div className="flex gap-[5px] items-center mb-[10px] ">
                      <div className="flex gap-[5px] items-center">
                        <b className="block form-section-title dark:form-section-title-dark">
                          Terms & Conditions
                        </b>
                        <img
                          src={`${
                            currentIcon === 'kyc-Identity-Details'
                              ? '/images/info-green-icon.svg'
                              : '/images/Maskd (2).svg'
                          }`}
                          alt=""
                          width={14}
                          height={14}
                          id="kyc-Identity-Details"
                          className="mb-2.5"
                          onMouseEnter={() => {
                            setcurrentIcon('kyc-Identity-Details')
                          }}
                          onMouseLeave={() => {
                            setcurrentIcon('')
                          }}
                        />
                        {/* <img className="w-[14px] h-[14px]" src="/images/Mask (11).svg" alt="" /> */}
                        <ReactTooltip
                          className="my-tool-tip z-500"
                          anchorId={'kyc-Identity-Details'}
                          place="bottom"
                          content="This is the total amount available for  you to borrow. You can borrow based on your 		collateral and until the borrowcap is reached."
                        />
                      </div>
                    </div>
                    <p className="form-section-subtitle">
                      Drag and drop one or multiple files (Max size: 1Mb)
                    </p>
                  </div>
                  <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                    <SelectField
                      label="Enable Policy Duration"
                      placeholder="Please select"
                    />

                    <SelectField
                      label="Rolling Average"
                      placeholder="Please select"
                    />

                    <div className="flex sm:justify-center">
                      <div className="flex flex-col gap-5 sm:max-w-[285px] min-w-[100%] pt-8">
                        <DragAndDropFile
                          className="hidden lg:block"
                          size="w-full h-[80px]"
                          id={2}
                        />
                        <div className="hidden lg:block">
                          <div className="flex gap-[12px] flex-col">
                            <UploadingFile progress={100} />
                            <UploadingFile progress={80} />
                          </div>
                        </div>

                        <Rules className="hidden lg:block" space="10px" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="block lg:hidden">
                  <hr className="my-[24px]" />
                  <DragAndDropFile size="w-full h-[40px]" id={1} />
                  <div className="flex gap-[12px] flex-col mt-[20px]">
                    <UploadingFile progress={100} />
                    <UploadingFile progress={80} />
                  </div>
                  <Rules className="mt-[20px]" />
                </div> */}
                <hr className="my-[24px]" />

                <div className="lg:grid lg:grid-cols-2">
                  <div></div>
                  <div>
                    <FormAgreament
                      agreeURL="/"
                      mainClass="flex flex-col"
                      variety="checkbox"
                      agree="Terms of Use"
                      bntText="Submit"
                      item1Class="w-full flex gap-[12px] items-center"
                      item2Class="w-full mt-[10px] flex sm:justify-end"
                      btn="w-full sm:w-fit"
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

export default RiskPoolMnagament
