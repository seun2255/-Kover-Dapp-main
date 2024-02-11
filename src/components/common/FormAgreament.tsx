import { Button } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import TermOfUsePopup from '../global/TermOfUsePopup'
import Popup from '../templates/Popup'
import SelectionField from './SelectionField'
import { UserContext } from '../../App'

export interface FormAgreamentProps {
  mainClass?: String
  classname?: String
  agree: string
  agreeURL: string
  textClasss?: string
  text?: string
  variety?: string
  checked?: boolean
  bntText?: string
  item1Class?: string
  item2Class?: string
  btn?: string
  endIcon?: string
  endIconDark?: string
  onClick?: () => void
  checkboxIcon?: string
  handleSubmit?: Function
}

function FormAgreament({
  mainClass,
  classname = '',
  handleSubmit,
  agree,
  agreeURL,
  text,
  variety,
  checked,
  textClasss,
  bntText,
  item1Class,
  item2Class,
  btn,
  endIcon,
  endIconDark,
  checkboxIcon = '',
}: FormAgreamentProps) {
  const [value, setValue] = useState(checked)
  const [checkbox, setCheckbox] = useState(true)
  const toggleChecked = () => setValue((v) => !v)
  const [terms, setTerms] = useState<boolean>(false)
  const toggleTerms = () => setTerms((v) => !v)
  const popupTerms = ['Terms of Use']
  const { theme } = React.useContext(UserContext)

  var model = []
  if (theme === 'dark') {
    model = ['/images/black_ok_icon.svg', '/images/empty_box_icon.svg']
  } else {
    model = ['/images/Group 220 (1).svg', '/images/Group 220.svg']
  }
  return (
    <Fragment>
      <div
        className={`${
          mainClass ||
          'flex sm:justify-between items-center flex-col sm:flex-row'
        }`}
      >
        <div
          className={` ${item1Class || 'flex gap-[12px] items-center w-full'} `}
        >
          <div
            className=""
            onClick={() => {
              checkbox ? setCheckbox(false) : setCheckbox(true)
            }}
          >
            {checkbox ? (
              <img
                src={model[1]}
                className={`checked-selection ${checkboxIcon}`}
                alt=""
                width={20}
                height={20}
              />
            ) : (
              <img
                src={model[0]}
                className={`checked-selection ${checkboxIcon}`}
                alt=""
                width={20}
                height={20}
              />
            )}
          </div>
          <span className={`${classname} agreament-text`}>
            {text || "I accept Kover's"}&nbsp;
            {popupTerms.indexOf(agree) >= 0 ? (
              <span
                onClick={toggleTerms}
                role="button"
                className={`text-brand-400 font-bold no-underline dark:text-dark-600 ${
                  textClasss || ''
                }`}
              >
                {agree}
              </span>
            ) : (
              <span
                onClick={toggleTerms}
                role="button"
                className={`text-brand-400 dark:text-dark-800 font-bold`}
              >
                {' '}
                {agree}
              </span>
            )}
          </span>
        </div>
        <div
          className={` ${
            item2Class ||
            'flex gap-[12px] items-center sm:mt-0 mt-[25px] w-full sm:w-[127px]'
          }`}
        >
          {checkbox ? (
            <>
              <button
                onClick={() => handleSubmit?.()}
                type="button"
                disabled
                className={`${
                  theme === 'dark'
                    ? 'dark:bg-light-1100 dark:box-border'
                    : 'form-submit-btn'
                } contained medium  font-medium px-8 w-full sm:w-fit square button ${btn}`}
              >
                <span>{bntText || 'Submit'}</span>
                <img
                  className="duration-150"
                  src={endIconDark || '/images/126.svg'}
                  alt=""
                />
              </button>
            </>
          ) : (
            <button
              onClick={() => handleSubmit?.()}
              type="button"
              className={`${
                theme === 'dark'
                  ? 'dark:white dark:box-border '
                  : 'greenGradient'
              } contained medium  font-medium px-8 w-full sm:w-fit square button ${btn}`}
            >
              <span>{bntText || 'Submit'}</span>
              <img
                className="duration-150 "
                src={endIcon || '/images/125.svg'}
                alt=""
              />
            </button>
          )}
        </div>
      </div>

      <Popup
        onClose={toggleTerms}
        visible={terms}
        width="w-[641px]"
        height="h-[616px]"
      >
        <TermOfUsePopup accept={toggleTerms} decline={toggleTerms} />
      </Popup>
    </Fragment>
  )
}

export default FormAgreament
