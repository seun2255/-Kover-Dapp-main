import React from 'react'
import { Link, To } from 'react-router-dom'
import Blockies from 'react-blockies'
import { useSelector } from 'react-redux'

export interface ButtonProps {
  icon?: string
  text?: string
  to?: To
  className?: string
  variant?: 'contained' | 'outline' | ''
  color?: string
  endIcon?: string
  iconRotate?: string
  size?: 'medium' | 'small' | 'large'
  onClick?: () => void
  disabled?: boolean
  shape?: 'square' | 'circle' | 'none'
  btnText?: string
  avtIcon?: string
}

function Button(props: ButtonProps) {
  const {
    btnText,
    icon,
    text,
    to,
    className,
    iconRotate,
    variant,
    endIcon,
    size,
    color,
    onClick,
    shape,
    avtIcon,
    ...rest
  } = props
  const { user } = useSelector((state: any) => state.user)
  const renderContent = (
    <>
      {icon && (
        <img
          className={`duration-150  ${iconRotate || ''}`}
          src={icon}
          alt=""
        />
      )}
      {text && <span className={`${btnText || ''}`}>{text}</span>}
      {endIcon && (
        <img
          className={`duration-150 ${iconRotate || ''}`}
          src={endIcon}
          alt=""
        />
      )}
      {avtIcon &&
        (user.dp === 'default' ? (
          <Blockies
            seed={avtIcon.toLowerCase()}
            size={6}
            scale={4}
            className="identicon wallet-icon"
          />
        ) : (
          <img
            width={24}
            height={24}
            src={user.dp}
            alt=""
            className="rounded-full w-[27px] h-[27px]"
            object-fit="cover"
          />
        ))}
    </>
  )

  // Append className
  const attributes = {
    className: `${variant || 'contained'} ${size || 'medium'} ${color || ''}  ${
      className || ''
    } ${shape || 'square'} ${!text ? 'only-icon-button' : ''} button`,
  }

  return to ? (
    <Link onClick={onClick} to={to} {...attributes}>
      {renderContent}
    </Link>
  ) : (
    <button onClick={onClick} {...rest} type="button" {...attributes}>
      {renderContent}
    </button>
  )
}
export default Button
