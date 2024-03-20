import React from 'react'
import { UserContext } from '../../App'
interface IconButtonProps {
  icon: string
  className?: string
  onClick?: () => void
  badge?: number
}

function IconButton({ icon, className, badge, onClick }: IconButtonProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <button
      onClick={onClick}
      type="button"
      className={`icon-button ${className || ''}`}
    >
      {badge !== 0 && badge !== undefined && (
        <span className={theme === 'dark' ? 'badge-light' : 'badge'}>
          {badge}
        </span>
      )}
      <img src={icon} className="" alt="" />
    </button>
  )
}

export default IconButton
