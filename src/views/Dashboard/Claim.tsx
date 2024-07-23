import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

interface ClaimProps {
  loading: boolean
}

function Claim({ loading }: ClaimProps) {
  return (
    <>
      <div className="flex gap-[20px]">
        {loading ? (
          <Skeleton height={'107px'} width={'210px'} />
        ) : (
          <div className="basis-basis-4/12justify-start h-[110px] box-border-2x-light dark:box-border-2x-dark  bg-dark-600 rounded flex-grow dark:text-dark-800 dark:text-primary-100 dark:bg-white rounded-sm px-[15px] py-[20px]">
            <div className="flex justify-between gap-1 items-center mb-3">
              <span className="premium-no dark:premium-no-dark">0</span>
              <button>
                <Link
                  to={'/claims'}
                  className="view-claim-btn dark:view-claim-btn-dark"
                >
                  View Claims
                </Link>
              </button>
            </div>
            <span className="active-claim">Active claims</span>
          </div>
        )}
        {loading ? (
          <Skeleton height={'107px'} width={'210px'} />
        ) : (
          <div className="basis-3/12 w-fit justify-end h-[110px] box-border-2x-light dark:box-border-2x-dark p-4 bg-dark-600 rounded flex-grow dark:text-dark-800 dark:text-primary-100 dark:bg-white rounded-sm px-[15px] py-[20px]">
            <h5 className="flex gap-1.5 font-light text-7xl mb-3">
              <span className="premium-no dark:premium-no-dark">0,000</span>
              <span className="usd">USD</span>
            </h5>
            <span className="total-claimed">Total claimed</span>
          </div>
        )}
      </div>
    </>
  )
}
export default Claim
