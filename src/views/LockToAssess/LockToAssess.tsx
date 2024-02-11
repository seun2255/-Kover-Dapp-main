import React, { useState } from 'react'
import { UserContext } from '../../App'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import Popup from '../../components/templates/Popup'

function LockToAssess() {
  const [popup, setPopup] = useState(false)
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <Header name={'Lock To Assess'} showBackAero={true} />

      <button
        onClick={() => {
          setPopup(true)
        }}
        className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark"
      >
        Click Here for lock to assess
      </button>
      <Popup
        visible={popup}
        onClose={() => {
          setPopup(false)
        }}
      >
        <div className="px-[30px] pb-[40px] pt-[30px] dark:bg-white w-[345px] sm:w-[310px]">
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

          <div className="flex flex-col items-center mb-[32px]">
            <img
              className="mt-[10px] w-[25px] h-[27px]"
              src={
                theme === 'dark'
                  ? '/images/x-logo-dark.svg'
                  : '/images/x-logo.svg'
              }
              alt=""
            />
            <h3 className="mt-[17px] fw-500 fs-16 lh-28">Lock To Assess</h3>
          </div>
          <div className="mt-[32px] rounded box-border-2x-light dark:box-border-2x-dark  dark:bg-[#F1F1F1] bg-[#2A2B31] h-[50px] min-w-[250px] px-[20px] py-[4px] flex justify-between items-center">
            <span className="fw-400 text-[24px] lh-42 text-[#FAFAFA] dark:text-dark-800">
              2540
            </span>
            <div className="bg-[#3F4048] dark:bg-[#FFF] my-[6px] py-[6px] px-[18px] h-[30px]">
              <button className="fw-500 fs-16 lh-19">USDC</button>
            </div>
          </div>
          <div className="flex justify-end items-center mt-[10px] mb-[15px]">
            <span className="text-[#606166] fw-500 fs-12 lh-14"> ~ $2540 </span>
          </div>
          <div className="mt-[14px]">
            <button
              type="button"
              className={` ${
                theme === 'dark'
                  ? `dark:white dark:box-border`
                  : `greenGradient`
              } contained medium  font-medium px-8 w-full square button`}
            >
              <span>Submit</span>
              <img className="duration-150 " src="/images/125.svg" alt="" />
            </button>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default LockToAssess
