import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import SelectField from '../../components/common/TextField/SelectField'
import TextField from '../../components/common/TextField'
import UserInform from '../../components/global/UserInform/UserInform'
import { UserContext } from '../../App'
import Score from '../Dashboard/Score'
import Attachment from '../../components/common/Attachment'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import { useNavigate } from 'react-router-dom'
import TextFieldS from '../../components/common/TextFieldS'
function Profile() {
  const { theme } = React.useContext(UserContext)
  let navigate = useNavigate()
  return (
    <>
      <Header name="Profile" showBackAero={true} />
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
          <UserInform variant="personal" />
          <div className="flex-grow mb-[50px] mt-[20px]">
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                  Personal Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your personal information is never shared with other users.
                </p>
              </div>
              {/* text-dark-650 flex-grow 
              text-white bg-dark-800 rounded h-[40px] text-lg py-3 w-full px-5 */}
              <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
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
                    outline={true}
                    placeholder="Resheteev"
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
                  variant="outlined"
                  placeholder="nik.resheteev@gmail.com"
                  verify={true}
                />
                <div className="sm:grid sm:grid-cols-[100px_auto] sm:gap-5 max-[640px]:grid  max-[640px]:grid-cols-[100px_auto] max-[640px]:gap-2 ">
                  <SelectField
                    label="Phone"
                    labelIcon={false}
                    placeholder="+331"
                  />
                  <div className="mt-[25px]">
                    <TextField
                      verify={true}
                      variant="outlined"
                      placeholder="654875236"
                      outerClass="justify-end"
                      classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
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
                  } box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]`}
                />
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                  Address Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your personal information is never shared with other users.
                </p>
              </div>
              <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                <TextField
                  label="State/ Province"
                  labelIcon={false}
                  placeholder="e.g. California"
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <TextField
                    label="ADDRESS LINE 1"
                    labelIcon={false}
                    placeholder="e.g. 645 EShaw Ave"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                  <TextField
                    label="ADDRESS LINE 2"
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
                    : 'greenGradient'
                }`}
                text="Next Step"
                color={theme === 'dark' ? 'btn-white' : 'greenGradient'}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center hidden sm:flex">
          <div className="flex flex-col gap-5  sm:w-[285px] max-[640px]:w-full ">
            <h6 className="text-dark-300">Overview</h6>
            <div>
              <div
                className={`dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-white bg-dark-800  rounded flex flex-col md:flex-row md:justify-between md:flex-wrap box-border-2x-light dark:box-border-2x-dark h-[288px] rounded-sm px-5 py-[18px] w-full`}
              >
                <div className="flex justify-between w-full ">
                  <div className="sm:w-[50%]">
                    <div className="flex gap-[6px] mb-[5px] ">
                      <span className="premium-no dark:premium-no-dark">
                        2,345
                      </span>
                      <b className="usd">USD</b>
                    </div>
                    <span className="mb-1 total-premium">Total Premium</span>
                  </div>
                  <div className="  bg-dark-900 pt-[10px] px-[12px] pb-[15px] text-center dark:text-dark-800 dark:text-primary-100 dark:bg-light-200">
                    <h5 className="mb-[10px] active-cover-no dark:active-cover-no-dark">
                      5
                    </h5>
                    <span className="active-cover">Active Covers</span>
                  </div>
                </div>

                <div className="mt-[19px]">
                  <span className="mb-[10px] current-policy ">
                    Current policy balance
                  </span>
                  <div className="flex gap-[6px] ml-[10px]">
                    <h4 className="policy-balance dark:policy-balance-dark">
                      3.4330
                    </h4>
                    <b className="usd">USD</b>
                  </div>
                </div>
                <div className="status-info-sub-info">
                  <span className="slc-usd">USDC/USD</span>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex justify-start mt-[5px]">
                      <b className="ml-[10px] slc-usd-no dark:slc-usd-no-dark">
                        2.7995 USD
                      </b>
                      &nbsp;
                      <b className="slc-usd-pulse dark:slc-usd-pulse-dark">
                        {' '}
                        +12%
                      </b>
                    </div>
                    <button className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <Score size="w-[140px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile
