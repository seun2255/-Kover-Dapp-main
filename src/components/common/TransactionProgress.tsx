import React from 'react'
interface AlertProps {
  stage: number
}

function TransactionProgress({ stage }: AlertProps) {
  return (
    <>
      <div className={`text-center mt-[35px] mb-[30px]`}>
        <span className="disclaimer-title">Transaction in progress...</span>
        <hr className="my-[10px]" />
        <div className="mx-4 sm:mx-2">
          <img
            src={`/images/progress-bar-${stage}.png`}
            alt=""
            width={300}
            height={80}
          />
        </div>
      </div>
    </>
  )
}

export default TransactionProgress
