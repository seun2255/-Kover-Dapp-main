import React from 'react'
import HeadOptions from './HeadOptions'
import { convertLinkToText } from '../../utils/helpers'

interface HeaderProps {
  roomId: any
}

function InfoHeader({ roomId }: HeaderProps) {
  const header = convertLinkToText(`/chat/${roomId}`)
  return (
    <div
      aria-label="chat header"
      className="rounded bg-dark-800 rounded-t flex items-center justify-between px-[20px] md:px-16 py-[16px] dark:bg-light-1100"
    >
      <div>
        <div className="flex">
          {['Group 220 (2).svg', 'Group 221.svg'].map((_, i) => (
            <img
              className="w-6 h-6 rounded-full"
              src={`/images/${_}`}
              alt=""
              key={i}
              style={{ transform: `translateX(-${i * 6}px)` }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 text-center ">
        <span className="font-medium">🦄 {header}</span>
        <span className="text-lg"></span>
      </div>
      <div className="flex justify-end">
        <HeadOptions roomID={roomId} />
      </div>
    </div>
  )
}

export default InfoHeader
