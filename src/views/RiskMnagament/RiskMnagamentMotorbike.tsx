import React from 'react'
import { Link } from 'react-router-dom'
import Agreament from '../../components/common/Agreament'
import Header from '../../components/common/header/Header'
import ProgressWeight from '../../components/common/progress-weight/ProgressWeight'
import QRConnector from '../../components/common/QRConnector'
import TextField from '../../components/common/TextField'
import SelectField from '../../components/common/TextField/SelectField'
import DownloadBox from '../../components/common/DownloadBox'
import DragAndDropFile from '../../components/common/DragAndDropFile'
import Rules from '../../components/common/FileUpload/Rules'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import { UserContext } from '../../App'
import FormAgreament from '../../components/common/FormAgreament'

function RiskMnagamentMotorbike() {
  const { theme } = React.useContext(UserContext)
  return (
    <div>
      <Header name="Risk Management" showBackAero={true} />
      <div className="flex items-center justify-between mb-5">
        <span className="text-dark-300">Motorbike cover PRP </span>
        <Link to="/" className="hidden how-it-work text-brand-300 sm:block">
          How it works
        </Link>
      </div>

      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow">
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[60%] w-full">
              <div className="flex gap-[5px] items-center mb-[10px] ">
                <b className="block form-section-title dark:form-section-title-dark">
                  Vehicule Details
                </b>
              </div>
              <p className="form-section-subtitle">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-5 lg:pt-2">
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <SelectField
                  label="Make"
                  labelIcon={false}
                  placeholder="Please select"
                />
                <SelectField
                  label="Model"
                  labelIcon={false}
                  placeholder="Please select"
                />
                <div>
                  <SelectField
                    labelIcon={false}
                    label="Year of Manufacture"
                    placeholder={['YYYY']}
                  />
                </div>
                <div>
                  <SelectField
                    labelIcon={false}
                    label="Type of Fuel "
                    placeholder="Please select"
                  />
                </div>
              </div>
              <SelectField label="Engine Size" placeholder="Please select" />
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <TextField
                  labelIcon={false}
                  label="Registration Number"
                  placeholder="654875236"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <TextField
                  label="Insurable Value"
                  field="$"
                  placeholder="e.g. 5000"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
              </div>
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <SelectField
                  label="Estimated Annual Mileage"
                  placeholder="Please select"
                />
                <SelectField
                  label="Overnight Parking "
                  placeholder="Please select"
                />
              </div>
            </div>
          </div>
          <hr className="my-[24px]" />
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[60%] w-full">
              <div className="flex gap-[5px] items-center mb-[10px] ">
                <b className="block form-section-title dark:form-section-title-dark">
                  Insured Details
                </b>
              </div>
              <p className="form-section-subtitle">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-5 lg:pt-2">
              <SelectField label="Cover Type" placeholder="Please select" />
              <SelectField label="Usage" placeholder="Please select" />
              <SelectField
                label="Security Measures"
                placeholder="Please select"
              />
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <SelectField
                  label="Driving Offences"
                  placeholder="Please select"
                />
                <SelectField
                  label="Claim History"
                  placeholder="Please select"
                />
                <div>
                  <SelectField
                    labelIcon={false}
                    label="Year of Obtaining Licence"
                    placeholder="YYYY"
                  />
                </div>
                <div>
                  <TextField
                    labelIcon={false}
                    label="Driving Licence Number"
                    placeholder="e.g. RJ5852"
                    outline={true}
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>
              </div>
              <SelectField label="Risk Address" placeholder="Please select" />
              <TextField
                labelIcon={false}
                label="Country/Region"
                placeholder="e.g. California"
                outline={true}
                classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
              />
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <TextField
                  labelIcon={false}
                  label="ADDRESS LINE 1"
                  placeholder="e.g. 645 EShaw Ave"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <TextField
                  labelIcon={false}
                  label="ADDRESS LINE 2"
                  placeholder="e.g.  Fresco, ca 93710"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <TextField
                  labelIcon={false}
                  label="City"
                  placeholder="e.g. New York"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <TextField
                  labelIcon={false}
                  label="Post Code"
                  placeholder="e.g.  4450"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
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
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 sm:w-[285px] max-[640px]:w-full pt-8">
            <QRConnector
              className="hidden lg:block"
              size="w-[279px] h-[249px]"
            />
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
            <ProgressWeight current={50} name="Claim" subtitle="Progress" />
            <DownloadBox />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskMnagamentMotorbike
