import React from 'react'
interface AlertProps {
  text?: string
}

function UploadButton({ text }: AlertProps) {
  return (
    <>
      <div className="upload-btn-wrapper upload-text">
        <button className="px-[22px] py-[9px] flex gap-[10px] items-center dark:bg-light-1100 dark:border-[#E9E9E9] upload-btn">
          <img
            src={'/images/Group 220 (3).svg'}
            className="w-[14px] h-[17px]"
            alt=""
          />
          <span className="upload-text dark:text-dark-800">
            {text || 'Upload'}
          </span>
        </button>
      </div>
    </>
  )
}

export default UploadButton
