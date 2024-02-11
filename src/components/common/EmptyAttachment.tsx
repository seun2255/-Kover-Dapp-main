import React from 'react'

interface EmptyAttachmentProps {}

function EmptyAttachment({}: EmptyAttachmentProps) {
  return (
    <>
      {
        <>
          <div
            className={` bg-[#2A2B31] dark:bg-white p-[30px] rounded box-border-2x-light dark:box-border-2x-dark`}
          >
            <div className="flex items-center justify-between mb-6 ">
              <b className="text-[#F1F1F1] dark:text-dark-600 fw-500 fs-14 lh-16 ls-35">
                Attachment
              </b>
              <img src="/images/Frame 2937.svg" alt="" />
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/box_empty.svg" alt="" />
              <div className="mt-[18px]">
                <span className="no-attachment">Oops ! No attachments yet</span>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default EmptyAttachment
