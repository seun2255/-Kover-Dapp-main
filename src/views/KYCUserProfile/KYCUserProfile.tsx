import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import SelectField from '../../components/common/TextField/SelectField'
import TextField from '../../components/common/TextField'
import InsureProUserInfom from '../../components/global/InsureProUserInfom/InsureProUserInfom'
import { UserContext } from '../../App'
import Score from '../Dashboard/Score'
import Attachment from '../../components/common/Attachment'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import { useNavigate, useParams } from 'react-router-dom'
import TextFieldS from '../../components/common/TextFieldS'
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import Popup from '../../components/templates/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { createDateString } from '../../utils/dateTime'

function KYCUserProfile() {
  const { theme } = React.useContext(UserContext)
  const { kycApplicants } = useSelector((state: any) => state.kyc)
  const [popup, setPopup] = useState(false)
  const togglePopup = () => setPopup((v) => !v)
  const [currentIcon, setcurrentIcon] = useState('')
  let { userId } = useParams()
  let navigate = useNavigate()
  const applicant = kycApplicants[0]
  const [canModify, setCanModify] = useState(false)
  const [formState, setFormState] = useState(applicant)
  const [formFilled, setFormFilled] = useState(true)

  const handleDobChange = (value: any) => {
    const dateString = createDateString(value)
    setFormState((prevState: any) => ({
      ...prevState,
      dob: dateString,
    }))
  }

  // Generic change handler for all inputs
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function areAllValuesFilled(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === '') {
        return false // If any value is not an empty string, return false
      }
    }
    return true // All values are empty strings
  }

  useEffect(() => {}, [])

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
          <InsureProUserInfom variant="personal" user={applicant} />
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
                    initialValue={applicant.firstName}
                    disabled={!canModify}
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                  <TextField
                    label="Last Name"
                    labelIcon={false}
                    initialValue={applicant.lastName}
                    disabled={!canModify}
                    outline={true}
                    placeholder="Resheteev"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>

                <SelectField
                  labelIcon={false}
                  initialValue={applicant.dob}
                  disabled={!canModify}
                  label="Date of Birth"
                  placeholder={['Month', 'Day', 'Year']}
                />

                <TextField
                  label="Email"
                  labelIcon={false}
                  initialValue={applicant.email}
                  disabled={!canModify}
                  variant="outlined"
                  placeholder="nik.resheteev@gmail.com"
                  verify={true}
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
                  initialValue={applicant.state}
                  disabled={!canModify}
                  placeholder="e.g. California"
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <TextField
                    label="Address Line 1"
                    labelIcon={false}
                    initialValue={applicant.address1}
                    disabled={!canModify}
                    placeholder="e.g. 645 EShaw Ave"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                  <TextField
                    label="Address Line 2"
                    labelIcon={false}
                    initialValue={applicant.address2}
                    disabled={!canModify}
                    placeholder="e.g.  Fresco, ca 93710"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <TextField
                    label="City"
                    labelIcon={false}
                    initialValue={applicant.city}
                    disabled={!canModify}
                    placeholder="e.g. New York"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                  <TextField
                    label="Post Code"
                    labelIcon={false}
                    initialValue={applicant.postCode}
                    disabled={!canModify}
                    placeholder="e.g.  4450"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <div className="flex gap-[5px] items-center mb-[10px] ">
                  <b className="font-normal text-3xl mb-2.5 block">
                    Identity Details
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
                <p className="text-lg text-dark-650 ">
                  Your identity is never shared with other users.
                </p>
              </div>
              <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                <SelectField
                  label="Issuing Country/Region"
                  initialValue={applicant.country}
                  disabled={!canModify}
                  labelIcon={false}
                  placeholder="Please Select"
                />

                <SelectField
                  label="Identity Type"
                  initialValue={applicant.identityType}
                  disabled={!canModify}
                  labelIcon={true}
                  placeholder="Please Select"
                />

                <TextField
                  label="National ID Number"
                  labelIcon={false}
                  initialValue={applicant.nationalID}
                  disabled={!canModify}
                  placeholder="e.g. 5589855455"
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
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
                            setPopup(true)
                          }}
                          className={`${
                            theme === 'dark'
                              ? 'font-bold text-[#606166] hover:text-[#000000]'
                              : 'text-white hover:text-[#50ff7f]'
                          } file-name `}
                          to={''}
                        >
                          Id_front.png
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
          </div>
        </div>
      </div>

      <Popup visible={popup} onClose={togglePopup} maxWidth="max-w-[824px]">
        <AttachmentPreview
          attachmentName="Id_front.png"
          onClose={togglePopup}
        />
      </Popup>
    </>
  )
}
export default KYCUserProfile
