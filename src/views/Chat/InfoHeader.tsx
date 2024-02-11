import React from 'react'
import HeadOptions from './HeadOptions'

function InfoHeader() {
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
        <span className="font-medium">🦄 Claim #1250</span>
        <span className="text-lg">last seen 45 minutes ago</span>
      </div>
      <div className="flex justify-end">
        <HeadOptions />
      </div>
    </div>
  )
}

export default InfoHeader
