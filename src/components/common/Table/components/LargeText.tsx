import React from 'react'

interface LargeTextProps {
  primary: string
  secondary: string
}

function LargeText({ primary, secondary }: LargeTextProps) {
  return (
    <div>
      <b className="daily-cost dark:daily-cost-dark">{primary}</b>&nbsp;
      <span className="daily-cost-slc dark:daily-cost-slc-dark">
        {secondary}
      </span>
    </div>
  )
}

export default LargeText
