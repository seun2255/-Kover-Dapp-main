import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import QRConnector from '../../components/common/QRConnector'
import SelectField from '../../components/common/TextField/SelectField'
import TextField from '../../components/common/TextField'
import TextFieldS from '../../components/common/TextFieldS'
import ProgressWeight from '../../components/common/progress-weight/ProgressWeight'
import { UserContext } from '../../App'

function KYC() {
  const { theme } = React.useContext(UserContext)
  return (
    <div>
      <Header name="KYC" />
      <div className="flex items-center justify-between mb-5">
        <span className="text-dark-300">Submit KYC</span>
        <Link
          to="/"
          className="hidden text-lg font-bold text-brand-300 lg:block"
        >
          How it works
        </Link>
      </div>
      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow">
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[60%] w-full">
              <div className="flex gap-[5px] items-center mb-[10px] ">
                <b className="block form-section-title dark:form-section-title-dark">
                  Personal Details
                </b>
              </div>
              <p className="form-section-subtitle">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-5 lg:pt-2">
              <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
                <TextField
                  label="First Name"
                  labelIcon={false}
                  placeholder="Nikita"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <TextField
                  label="Last Name"
                  labelIcon={false}
                  placeholder="Resheteev"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
              </div>
              <SelectField
                labelIcon={false}
                label="Event Date"
                placeholder={['Month', 'Day', 'Year']}
              />
              <TextField
                label="Email"
                labelIcon={false}
                placeholder="nik.resheteev@gmail.com"
                classname="dark:bg-light-800 dark:box-border"
                verify={true}
              />

              <div className="sm:grid sm:grid-cols-[100px_auto]  max-[640px]:grid  max-[640px]:grid-cols-[100px_auto] sm:gap-5 gap-2.5">
                <SelectField
                  label="Phone"
                  labelIcon={false}
                  placeholder="+331"
                />
                <div className="mt-[25px]">
                  <TextField
                    verify={true}
                    placeholder="654875236"
                    outerClass="justify-end"
                  />
                </div>
              </div>

              <TextFieldS
                variant="outlined"
                label="OTP Code"
                labelIcon={false}
                placeholder="65487"
                outline={true}
                classname={`${
                  theme === 'dark'
                    ? 'otp-input-dark'
                    : 'otp-input bg-transparent'
                }`}
              />
            </div>
          </div>
          <hr className="my-[24px]" />
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[60%] w-full">
              <div className="flex gap-[5px] items-center mb-[10px] ">
                <b className="block form-section-title dark:form-section-title-dark">
                  Address Details
                </b>
              </div>
              <p className="form-section-subtitle">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
              <TextField
                label="State/ Province"
                outline={true}
                labelIcon={false}
                placeholder="e.g. California"
                classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"

                // classname="border-none"
              />
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <TextField
                  label="ADDRESS LINE 1"
                  outline={true}
                  labelIcon={false}
                  placeholder="e.g. 645 EShaw Ave"
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"

                  // classname={`${
                  //   theme === "dark" ? "otp-input-dark" : "otp-input"
                  // }`}
                />
                <TextField
                  label="ADDRESS LINE 2"
                  labelIcon={false}
                  placeholder="e.g.  Fresco, ca 93710"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
              </div>
              <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                <TextField
                  label="City"
                  labelIcon={false}
                  placeholder="e.g. New York"
                  outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <TextField
                  label="Post Code"
                  labelIcon={false}
                  placeholder="e.g.  4450"
                  outline={true}
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
                  : 'greenGradient'
              }`}
              text="Next Step"
              color={theme === 'dark' ? 'btn-white' : 'greenGradient'}
            />
          </div>
        </div>
        <div className="flex sm:justify-center">
          <div className="flex flex-col gap-5 sm:max-w-[285px] w-full pt-8">
            <QRConnector className="hidden sm:block" />
            <ProgressWeight
              name="KYC"
              subtitle="STEP 1 OF 2"
              current={53}
              classname="px-[40px] py-[46px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default KYC
