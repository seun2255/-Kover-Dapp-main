import React from 'react'
import { UserContext } from '../../App'

function Rewards() {
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <div
        className={`${
          theme === 'dark'
            ? 'dark:bg-light-200 dark:bg-white'
            : 'claim-btn-greenGradient'
        } rounded dark:text-dark-800 dark:text-primary-100  box-border-2x-light dark:box-border-2x-dark sm:px-[15px] sm:pt-[10px] sm:pb-[20px] pt-[10px] pb-[20px] sm:py-[20px] px-[30px] rounded-sm  `}
      >
        <div className="flex items-center justify-between gap-1">
          <span className="rewards dark:rewards-dark">REWARDS</span>
          {theme === 'dark' ? (
            <img className="w-[35px]" src="/images/logo-new.svg" alt="" />
          ) : (
            <img className="w-[35px]" src="/images/logo-new.svg" alt="" />
          )}
        </div>
        <div className="flex items-end gap-1 justify-between mt-[12px]">
          <button onClick={() => alert('this is button')}>
            <span className="claim">Claim</span>
          </button>
          <span className="claim-no">0.221746</span>
        </div>
      </div>
    </>
  )
}

export default Rewards
