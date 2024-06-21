import React, { useState } from 'react'
import { UserContext } from '../../App'
interface NotesProps {
  note: any
}

function shortenAddress(address: string) {
  if (typeof address !== 'string' || address.length < 10) {
    throw new Error('Invalid address')
  }
  return `${address.slice(0, 7)}...`
}

function Notes({ note }: NotesProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <div className=" box-border-2x-light dark:box-border-2x-dark rounded w-full bg-[#1D2024] dark:bg-[#F1F1F1] sm:pt-[20px] sm:pb-[35px] sm:pr-[30px] sm:pl-[20px] px-[15px] pt-[20px] pb-[30px]">
        <div className="flex gap-[10px]">
          <img className="" src="/images/82.svg" alt="" />
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-[5px]">
              <span className="note-user-name">{note.name}</span>
              <span className="text-[#85858A] note-user-id dark:text-dark-900">
                {shortenAddress(note.address)}
              </span>
            </div>
            <span className="text-[#85858A] note-date-sm sm:note-date-lg hidden sm:flex dark:text-dark-800">
              {note.date}
            </span>
            <span className="text-[#85858A] note-date-sm sm:note-date-lg flex sm:hidden dark:text-dark-800">
              {note.date}
            </span>
          </div>
        </div>
        <div className="pl-[43px]">
          <p className="sm:note-lg note-sm dark:text-dark-75">{note.text}</p>
        </div>
      </div>
    </>
  )
}
export default Notes
