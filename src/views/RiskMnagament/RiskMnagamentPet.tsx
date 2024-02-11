import React from 'react'
import { Link } from 'react-router-dom'
import Agreament from '../../components/common/Agreament'
import Header from '../../components/common/header/Header'
import ProgressWeight from '../../components/common/progress-weight/ProgressWeight'
import QRConnector from '../../components/common/QRConnector'
import TextField from '../../components/common/TextField'
import DownloadBox from '../../components/common/DownloadBox'
import SelectField from '../../components/common/TextField/SelectField'
import { UserContext } from '../../App'
import DragAndDropFile from '../../components/common/DragAndDropFile'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import Rules from '../../components/common/FileUpload/Rules'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import FormAgreament from '../../components/common/FormAgreament'

function RiskMnagamentPet() {
  const { theme } = React.useContext(UserContext)
  const { width } = useWindowDimensions()
  return (
    <>
      <Header name="Risk Management" showBackAero={true} />
      <div className="flex items-center justify-between mb-[20px]">
        <span className="text-dark-300">Pet cover PRP </span>
        <Link to="/" className="text-lg font-bold text-brand-300 work-title">
          How it works
        </Link>
      </div>
      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow">
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[55%] w-full">
              <div className="flex gap-[5px] items-center mb-[10px] ">
                <b className="block form-section-title dark:form-section-title-dark">
                  Pet Details
                </b>
              </div>
              <p className="form-section-subtitle">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-5 lg:pt-2">
              <TextField
                label="Pet Name"
                labelIcon={false}
                placeholder="Sonic"
                outline={true}
                classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
              />
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <SelectField
                  label="Pet Type"
                  labelIcon={false}
                  placeholder="Please select"
                />
                <SelectField
                  labelIcon={false}
                  label="Pet Sex"
                  placeholder="Please select"
                />
              </div>
              <SelectField label="Breed" placeholder="Sonic" />
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <SelectField
                  labelIcon={false}
                  label="Pet’s Age"
                  placeholder="  YYYY"
                />
                <SelectField label={false} placeholder="Months" />
                <div>
                  <SelectField
                    label={`Pre-existing Medical ${
                      width > 600 ? 'Conditions' : ''
                    } `}
                    placeholder="Please select"
                  />
                </div>
                <div>
                  <SelectField label="Microchipped" placeholder="Months" />
                </div>
                <div>
                  <SelectField
                    label="Neutered or Spayed"
                    placeholder="Please select"
                  />
                </div>
                <div>
                  <SelectField
                    label="Vaccinations or Boosters"
                    placeholder="Please select"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="my-[24px]" />
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[55%] w-full">
              <div className="flex gap-[5px] items-center mb-[10px] ">
                <b className="block form-section-title dark:form-section-title-dark">
                  Insured Details
                </b>
              </div>
              <p className="form-section-subtitle">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
              <SelectField label="Cover Type" placeholder="Please select" />
              <SelectField label="Travel Abroad" placeholder="Please select" />
              <SelectField label="Risk Address" placeholder="Please select" />
              <TextField
                label="Country/Region"
                placeholder="e.g. California"
                outline={true}
                classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
              />
              <TextField
                label="Estimated Loss Amount"
                placeholder="e.g. 5000"
                outline={true}
                classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
              />
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <TextField
                  labelIcon={false}
                  label="Address Line 1"
                  placeholder="e.g. 645 EShaw Ave"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <TextField
                  labelIcon={false}
                  label="Address Line 2"
                  placeholder="e.g.  Fresco, ca 93710"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <div>
                  <TextField
                    labelIcon={false}
                    label="City"
                    placeholder="e.g. New York"
                    outline={true}
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>
                <div>
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
            <DownloadBox classname="box-border-2x-light dark:box-border-2x-dark " />
          </div>
        </div>
      </div>
    </>
  )
}
export default RiskMnagamentPet
