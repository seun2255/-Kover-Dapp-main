import { Link } from 'react-router-dom'
import React from 'react'
import Attachment from '../../components/common/Attachment'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import TextField from '../../components/common/TextField'
import SelectField from '../../components/common/TextField/SelectField'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import UserInform from '../../components/global/UserInform/UserInform'
import { UserContext } from '../../App'
import DownloadBox from '../../components/common/DownloadBox'
import { useNavigate } from 'react-router-dom'
function CustomerProfile() {
  const { theme } = React.useContext(UserContext)
  let navigate = useNavigate()

  const titleClassName = 'fw-400 fs-13 lh-15 text-light-800 dark:text-dark-600'
  const textClassName = 'fw-500 fs-13 lh-15 text-light-800 dark:text-dark-600'

  return (
    <div>
      <Header name="Customer Profile" showBackAero={true} />
      <div className="items-center justify-between hidden mb-5 sm:flex back-btn ">
        <Button
          onClick={() => navigate(-1)}
          icon={
            theme === 'dark'
              ? '/images/leftBlackAero.svg'
              : '/images/Mask (2ss).svg'
          }
          className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
          text="Back"
        />
        <Link to="/" className="text-lg font-bold text-brand-300">
          How it works
        </Link>
      </div>

      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow mb-[50px]">
          <UserInform variant="customer" />
          <div className="lg:grid lg:grid-cols-2 mt-[20px]">
            <div>
              <b className="font-normal text-3xl mb-2.5 block">
                Vehicule Details
              </b>
              <p className="text-lg text-dark-650 ">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-5 lg:pt-2">
              <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
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
              </div>
              <div></div>
              <SelectField
                labelIcon={false}
                label="Year of Manufacture"
                placeholder={['YYYY', 'Please select']}
              />
              <SelectField
                label="Engine Size"
                labelIcon={false}
                placeholder="Please select"
              />
              <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
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
              <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
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
            <div>
              <b className="font-normal text-3xl mb-2.5 block">
                Insured Details
              </b>
              <p className="text-lg text-dark-650 ">
                Your personal information is never shared with other users.
              </p>
            </div>
            <div className="flex flex-col sm:gap-5 gap-[10px] pt-5 lg:pt-2">
              <SelectField label="Cover Type" placeholder="Please select" />
              <SelectField label="Usage" placeholder="Please select" />
              <SelectField
                label="Security Measures"
                placeholder="Please select"
              />

              <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                <SelectField
                  label="Driving Offences"
                  placeholder="Please select"
                />
                <SelectField
                  label="Claim History"
                  placeholder="Please select"
                />
                <SelectField
                  labelIcon={false}
                  label="Year of Obtaining Licence"
                  placeholder="YYYY"
                />
                <TextField
                  labelIcon={false}
                  label="Driving Licence Number"
                  placeholder="e.g. RJ5852"
                />
              </div>
              <SelectField label="Risk Address" placeholder="Please select" />
              <TextField
                labelIcon={false}
                label="Country/Region"
                placeholder="e.g. California"
                outline={true}
                classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
              />
              <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
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
          <hr className="my-[24px]" />
          <div className="lg:grid lg:grid-cols-2">
            <div className="col-start-2">
              <div className="mb-2.5"></div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className={`contained medium max-[640px]:w-full px-[31px] square  button ${
                    theme === 'dark' ? 'dark:box-border' : 'button-disable'
                  }`}
                >
                  <span className="font-medium">Submit</span>
                  <img
                    className="duration-150 "
                    src="/images/grey-ok-icon.svg"
                    alt=""
                  />
                </button>
              </div>
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
              <div className="flex flex-col gap-6 mb-7">
                <WeightRow
                  name="Purchase"
                  value="13/05/2022 20:58"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Cover ID"
                  value="2ab256355df..."
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
                  withInfo
                  name="Claim History "
                  value="2"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  withInfo
                  name="PRP "
                  value="2000"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <button
                  type="button"
                  className={` medium dark  dark:bg-white  square  button focus:bg-[#4C4D55] focus:border-[#4C4D55] border-[#4C4D55] border-2`}
                >
                  <span className="">Cancel Cover</span>
                </button>
                <Button
                  to="/chat"
                  text="Contact User"
                  color={theme === 'dark' ? '' : 'dark'}
                  className="dark:bg-light-1100 focus:bg-[#4C4D55] "
                />
              </div>
            </div>
            <div className="rounded bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark ">
              <WeightTitle title="Attachments" />
              <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                {[...Array(2)].map((value, index) => (
                  <>
                    <div className="flex justify-between">
                      <div className="flex basis-3/4 gap-[16px]">
                        <img src="/images/pin.svg" alt="" />
                        <Link
                          className={`${
                            theme === 'dark'
                              ? 'font-bold text-[#606166] hover:text-[#000000]'
                              : 'text-white hover:text-[#50ff7f]'
                          } file-name `}
                          to={''}
                        >
                          Essential IPID
                        </Link>
                      </div>
                      <img
                        className="items-end w-[20px]"
                        src={
                          theme === 'dark'
                            ? '/images/downloadblack.svg'
                            : '/images/download.svg'
                        }
                        alt=""
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
