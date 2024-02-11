import React from 'react'
import { UserContext } from '../../App'
export interface ProgressProps {
  current: number
  color?: string
  className?: string
}

function Progress({ current, color = '', className = '' }: ProgressProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <div
        className={`bg-dark-350 bg-opacity-50 rounded w-[] p-1 ${className}`}
      >
        <div className="h-2.5 bg-[#4C4D55] overflow-hidden progress-bar">
          <span
            className="h-[20rem] translate-x-2 -translate-y-[8rem] block -rotate-[20deg]"
            style={{
              width: `${current}%`,
              backgroundColor: color || '#50ff7f',
            }}
          />
        </div>
      </div>
    </>
  )
}
export default Progress
