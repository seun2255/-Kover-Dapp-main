import React, { useState } from 'react'
import { UserContext } from '../../App'
interface NotesProps {}
function Notes({}: NotesProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <div className=" box-border-2x-light dark:box-border-2x-dark rounded w-full bg-[#1D2024] dark:bg-[#F1F1F1] sm:pt-[20px] sm:pb-[35px] sm:pr-[30px] sm:pl-[20px] px-[15px] pt-[20px] pb-[30px]">
        <div className="flex gap-[10px]">
          <img className="" src="/images/82.svg" alt="" />
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-[5px]">
              <span className="note-user-name">Jav</span>
              <span className="text-[#85858A] note-user-id dark:text-dark-900">
                0x95e441....
              </span>
            </div>
            <span className="text-[#85858A] note-date-sm sm:note-date-lg hidden sm:flex dark:text-dark-800">
              2022/06/01 10:26:20 AM
            </span>
            <span className="text-[#85858A] note-date-sm sm:note-date-lg flex sm:hidden dark:text-dark-800">
              10/02/2023 11:46 AM
            </span>
          </div>
        </div>
        <div className="pl-[43px]">
          <p className="sm:note-lg note-sm dark:text-dark-75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            magna a malesuada bibendum, augue ex viverra eros, a eleifend urna
            massa ut nibh. Fusce id erat euismod, congue risus ac, bibendum
            risus. Curabitur non mauris euismod, vestibulum est id, tincidunt
            nisl.
          </p>
        </div>
      </div>
    </>
  )
}
export default Notes
