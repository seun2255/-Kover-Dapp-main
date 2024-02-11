import React from 'react'
import CarInsurance from '../Table/components/CarInsurance'
import Status from '../Table/components/Status'
import Button from '../Button'

function InfoCard() {
  return (
    <div className="block bg-dark-800 rounded py-5 px-7 mb-3 dark:text-dark-800 dark:bg-white dark:box-border">
      <div className="grid grid-cols-2">
        <CarInsurance text="Car Cover" />
        <Status />
      </div>
      <div className="py-3 flex justify-center">
        <img src="/images/hr_svg.svg" alt="hr" />
      </div>
      <div className="grid grid-cols-2 mb-3">
        <p className="font-medium text-lg text-dark-500">PRP</p>
        <p className="text-right">2000</p>
      </div>
      <div className="grid grid-cols-2 mb-3">
        <p className="font-medium text-lg text-dark-500">Daily Cost</p>
        <p className="text-right">
          <b>9.4000</b> USDC
        </p>
      </div>
      <div className="grid grid-cols-2 mb-3">
        <p className="font-medium text-lg text-dark-500">Policy Balance</p>
        <p className="text-right">
          <b>9.4000</b> USDC
        </p>
      </div>
      <div>
        <Button
          className="w-full"
          // onClick={() => popupHandle(myCoverPopup)}
          text="Manage"
          endIcon="/images/logo (2).svg"
          color="greenGradient"
        />
      </div>
    </div>
  )
}

export default InfoCard
