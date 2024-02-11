import React from 'react'

interface StatusProps {
  type?:
    | 'Active'
    | 'Inactive'
    | 'Accepted'
    | 'Declined'
    | 'Ongoing'
    | 'Active'
    | 'Withdrawn'
    | 'Pending'
  text?: String
}

function Status({ type, text }: StatusProps) {
  let icon: string = '/images/Mask (9).svg'
  switch (type) {
    case 'Active':
    case 'Accepted':
    case 'Active':
      icon = '/images/Mask (9).svg' // up arrow - green
      break
    case 'Declined':
      icon = '/images/Mask (dd2).svg' // down arrow - red
      break
    case 'Ongoing':
    case 'Inactive':
    case 'Withdrawn':
      icon = '/images/Group 282.svg' // down arrow - yellow
      break
  }

  return (
    <div className="flex gap-[15.67px] justify-self-end sm: items-center gap-4">
      <img src={icon} className="w-4" alt="" />
      <span className="status-table dark:status-table-dark">
        {text || type}
      </span>
    </div>
  )
}

export default Status
