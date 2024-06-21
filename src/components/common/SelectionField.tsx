import React from 'react'
import { UserContext } from '../../App'
interface RadioFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  setIsYes: any
  action: boolean
  variety?: 'checkbox' | 'radio'
  toggle?: () => void
}

function SelectionField({
  toggle,
  variety,
  setIsYes,
  action,
  ...rest
}: RadioFieldProps) {
  const { theme } = React.useContext(UserContext)
  var model = []

  if (theme === 'dark') {
    model = ['/images/input_radio_btn_2.svg', '/images/input_radio_btn_1.svg']
  } else {
    model = ['/images/Frame 453.svg', '/images/Ellipse 2.svg']
  }

  if (variety === 'checkbox') {
    if (theme === 'dark') {
      model = ['/images/black_ok_icon.svg', '/images/empty_box_icon.svg']
    } else {
      model = ['/images/Group 220 (1).svg', '/images/Group 220.svg']
    }
  }

  const handleClick = () => {
    setIsYes(action)
    toggle?.()
  }

  return (
    <label className="selection-box">
      <input type={variety || 'radio'} {...rest} />
      <div onClick={handleClick} className="selection-assets z-1">
        <img
          src={model[0]}
          className="checked-selection"
          alt=""
          width={20}
          height={20}
        />
        <img
          src={model[1]}
          className="unchecked-selection"
          alt=""
          width={20}
          height={20}
        />
      </div>
    </label>
  )
}

export default SelectionField
