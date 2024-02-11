import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import TextFieldS from '../../components/common/TextFieldS'
import { Tooltip as ReactTooltip } from "react-tooltip";
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'
import Popup from "../../components/templates/Popup";

function InsureProUserProfile() {
  const { theme } = React.useContext(UserContext);
  const [currentIcon, setcurrentIcon] = useState("");
  const [popup, setPopup] = useState(false);
  const togglePopup = () => setPopup((v) => !v)
  let navigate = useNavigate()
  return (
    <>
      <Header name="InsurePro" showBackAero={true} />
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
                    Professional Details
                </b>
                <p className="text-lg text-dark-650 ">
                    Your professional information is never to other users.
                </p>
              </div>
              {/* text-dark-650 flex-grow 
              text-white bg-dark-800 rounded h-[40px] text-lg py-3 w-full px-5 */}
              <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                

                <SelectField
                  labelIcon={true}
                  label="Work Area"
                  placeholder="Please Select"
                />
                <SelectField
                  labelIcon={true}
                  label="Work Field"
                  placeholder="Domain"
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
                          setPopup(true);
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
export default InsureProUserProfile
