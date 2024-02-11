import React, { useState } from 'react'
import { UserContext } from '../../App'
import Header from '../../components/common/header/Header'
import SearchField from '../../components/common/SearchField'
import Popup from '../../components/templates/Popup'

function MyRewards() {
  const [popup, setPopup] = useState(false)
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <Header name={'My Rewards'} showBackAero={true} />
      <button
        onClick={() => {
          setPopup(true)
        }}
        className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark"
      >
        Click Here for claim rewards
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
            <h3 className="mt-[17px] fw-500 fs-16 lh-28">My Rewards</h3>
          </div>

          <div className="mt-[42px] flex flex-col justify-center items-center">
            <span className="unclaimed-rewards">Unclaimed Rewards</span>
            <div className="flex gap-[10px] justify-center items-center my-2.5">
              <input
                type="text"
                maxLength={5}
                className="w-[60px] fw-400 fs-20 lh-42 placeholder:text-[#606166]"
                placeholder="00.00"
              />
              <span className="fw-400 fs-20 lh-42">USDC</span>
            </div>
            <span className="total-rewards">$7,000.5</span>
          </div>

          <div className="mt-[53px] flex justify-between items-center">
            <span className="totalrewards-claimed">Total rewards claimed</span>
            <span className="text-[#606166] total-rewards">7,000.5 USDC</span>
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

export default MyRewards
