import { Icon } from '@mui/material'
import Button, { type ButtonProps } from '../../../components/common/Button'
import InfoText, {
  type InfoTextProps,
} from '../../../components/common/InfoText'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import React, { Fragment, useState } from 'react'
import { UserContext } from '../../../App'
import ValidateClaim from '../../../components/common/ValidateClaim/ValidateClaim'
import Popup from '../../../components/templates/Popup'

interface CastVoteProps {
  claimDetails: any
}

function CastAssesment({ claimDetails }: CastVoteProps) {
  const [currentIcon, setcurrentIcon] = useState('')
  const { theme } = React.useContext(UserContext)
  const [popup, setPopup] = useState(false)
  const togglePopup = () => setPopup((v) => !v)

  return (
    <>
      <div>
        <div className="bg-dark-800 py-[3px] px-[20px] sm:px-[30px] h-[50px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark border-top-radius">
          <div className="flex justify-between items-center h-[100%]">
            <div className="flex gap-[10px] items-center">
              <span className="decision-no">Make Your Decision</span>

              <div className="flex gap-[5px]">
                <img
                  src={`${
                    currentIcon === 'test'
                      ? '/images/info-green-icon.svg'
                      : '/images/Maskd (2).svg'
                  }`}
                  alt=""
                  width={14}
                  height={14}
                  id={'test'}
                  onMouseEnter={() => {
                    setcurrentIcon('test')
                  }}
                  onMouseLeave={() => {
                    setcurrentIcon('')
                  }}
                />
                <>
                  <ReactTooltip
                    className={`my-tool-tip z-500`}
                    anchorId={'test'}
                    place="bottom"
                    content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                  />
                </>
              </div>
            </div>
            <div className="flex items-center">
              <span className="verification-require-text">Required</span>
            </div>
          </div>
        </div>
        <div className="bg-dark py-[23px] px-[30px] sm:px-[30px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 box-border-2x-light dark:box-border-2x-dark border-top-0 border-bottom-radiu">
          <div className="flex justify-between">
            <div className="flex gap-[10px] items-center">
              <img src={'/images/Group-360-red.svg'} alt="" />
              <span className="credential-info">
                Please carefully analyze the report before making a decision.
              </span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className={`${
                  theme === 'dark'
                    ? 'dark:bg-light-1100 dark:box-border'
                    : 'greenGradient'
                } contained medium  font-medium px-8 w-full sm:w-fit square button max-w-[141px]`}
                onClick={() => {
                  setPopup(true)
                }}
              >
                <span>Submit Decision</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Popup visible={popup} onClose={togglePopup}>
        <div className=" max-w-[510px]">
          <div className="flex gap-5 mb-3.5">
            <div>
              <ValidateClaim
                onClose={togglePopup}
                type="assesment"
                claimDetails={claimDetails}
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default CastAssesment
