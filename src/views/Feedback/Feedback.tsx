import React, { useState } from 'react'
import { UserContext } from '../../App'
import FormAgreament from '../../components/common/FormAgreament'
import Header from '../../components/common/header/Header'
import Popup from '../../components/templates/Popup'
function Feedback() {
  const { theme } = React.useContext(UserContext)
  const [popup, setPopup] = useState(false)
  const [select, setSelect] = useState(2)
  return (
    <>
      <Header name="Feed back" overview={true} />
      <button
        onClick={() => {
          setPopup(true)
        }}
        className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark"
      >
        Click Here for Feedback
      </button>
      <Popup
        visible={popup}
        onClose={() => {
          setPopup(false)
        }}
      >
        <div className="px-[30px] pb-[40px] pt-[30px] dark:bg-white max-w-[510px] min-w-[345px]">
          <div className="flex justify-end">
            <img
              role={'button'}
              className="w-2.5"
              src="/images/Group 158.svg"
              alt=""
              onClick={() => {
                setPopup(false)
              }}
            />
          </div>

          <div className="flex flex-col items-center mb-[11px]">
            <img
              className="mt-[10px] w-[25px] h-[27px]"
              src={
                theme === 'dark'
                  ? '/images/x-logo-dark.svg'
                  : '/images/x-logo.svg'
              }
              alt=""
            />

            <h3 className="mt-[17px] fw-500 fs-16 lh-28">Give Feedback</h3>
            <h5 className="my-[16px] fw-500 fs-14 lh-24 text-[#606166]">
              To get extra rewards
            </h5>
            <p className="fw-500 text-lg text-[13px] lh-15">
              How would you rate your overall satisfaction with the assessment
              of Your claim?
            </p>
          </div>

          <div className="row">
            <div className="grid md:grid-cols-4 grid-cols-2  gap-[15px]">
              {[
                { title: 'Terrible', img: '/images/terrible.svg' },
                { title: 'Bad', img: '/images/bad.svg' },
                { title: 'Good', img: '/images/good.svg' },
                { title: 'Amazing', img: '/images/amazing.svg' },
              ].map((item, index) => {
                return (
                  <>
                    <div
                      className={`flex md:flex-col md:gap-[10px]  gap-[15px] flex-row justify-center items-center md:items-center md:py-[20px] py-[10px] 
                      ${
                        theme === 'dark'
                          ? `${
                              index === select
                                ? 'feedback-item-active-dark'
                                : 'feedback-item-dark'
                            }`
                          : `${
                              index === select
                                ? 'feedback-item-active'
                                : 'feedback-item'
                            }`
                      } `}
                      role="button"
                      key={index}
                      onClick={() => {
                        setSelect(index)
                      }}
                    >
                      <img
                        className="md:w-[30px] w-[20px]"
                        src={item.img}
                        alt=""
                      />
                      <span>{item.title}</span>
                    </div>
                  </>
                )
              })}
            </div>
          </div>

          <div className="py-[15px]">
            <p className="fw-500 text-lg text-[13px] lh-15">
              What are the main reasons for your rating?
            </p>
          </div>

          <div>
            <textarea
              className="box-border-2x-light dark:box-border-2x-dark bg-dark-800 dark:bg-light-800 py-4 px-5 rounded placeholder:text-dark-650 text-white dark:text-dark-600 text-lg h-[82px] w-full"
              placeholder="Type here ..."
            ></textarea>
          </div>

          <FormAgreament
            text={'I may be contacted about this feedback.'}
            agree={'Privacy Policy'}
            agreeURL={'/'}
            mainClass="flex flex-col mt-[21px]"
            variety="checkbox"
            bntText="Submit Feedback"
            item1Class="w-full flex gap-[12px] sm:items-center items-start"
            item2Class="w-full mt-[10px] flex justify-end"
            btn="sm:w-[50%] w-full"
            checkboxIcon="checkbox-margin-4"
          />
        </div>
      </Popup>
    </>
  )
}

export default Feedback
