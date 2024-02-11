import React, { useState } from 'react'
import { UserContext } from '../../App'
import { Tooltip as ReactTooltip } from 'react-tooltip'
export interface ScorePops {
  size?: string
  boxSize?: string
  text?: string
  imgDark?: string
  imgLight?: string
}
function Score(props: ScorePops) {
  const [currentIcon, setcurrentIcon] = useState('')
  const { theme } = React.useContext(UserContext)
  const { size, boxSize, text, imgDark, imgLight } = props

  return (
    <>
      <div
        className={`sm:flex hidden h-fit dark:box-border dark:text-dark-800 text-primary-100 dark:bg-white sm:inline-fle  bg-dark-600 rounded  items-center flex-col relative box-border-2x-light dark:box-border-2x-dark pt-[10px] px-[15px] pb-[18px] rounded-sm ${
          boxSize || ''
        }`}
      >
        <div className="flex gap-[5px] justify-end w-full">
          <span className="score-no dark:score-no-dark">+16%</span>
          <img
            src={
              theme === 'dark'
                ? '/images/score-chart.svg'
                : '/images/minichart.svg'
            }
            alt=""
          />
        </div>
        <div className="mt-[11px]">
          <img
            className={`block ${size}`}
            src={
              theme === 'dark'
                ? imgDark || '/images/CircleChart.svg'
                : imgLight || '/images/score.svg'
            }
            alt=""
          />
        </div>
        <div className="flex mt-[10px] gap-[5px]">
          <span className="score">{text || 'Score'}</span>
          <img
            src={`${
              currentIcon === 'score-1'
                ? '/images/info-green-icon.svg'
                : '/images/Mask (7).svg'
            }`}
            className="w-2.5"
            alt=""
            id={'score-1'}
            onMouseEnter={() => {
              setcurrentIcon('score-1')
            }}
            onMouseLeave={() => {
              setcurrentIcon('')
            }}
          />
          <ReactTooltip
            className="my-tool-tip z-500"
            anchorId={'score-1'}
            place="bottom"
            content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
          />
        </div>
      </div>

      <div className=" sm:hidden flex dark:box-border bg-dark-600 flex-row items-center gap-5 dark:text-dark-800 dark:text-primary-100 dark:bg-white box-border-2x-light dark:box-border-2x-dark justify-between rounded-sm py-[15px] px-[30px]">
        <div className="flex basis-3/5 justify-between gap-[11px]">
          <svg
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37 19.5C37 9.83502 29.165 2 19.5 2C9.83502 2 2 9.83502 2 19.5C2 29.165 9.83502 37 19.5 37V37"
              stroke={`${theme === 'dark' ? '#EAE8EB' : '#2A2B31'}`}
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M2 19.5C2 29.165 9.83502 37 19.5 37C29.165 37 37 29.165 37 19.5C37 9.83502 29.165 2 19.5 2"
              stroke="url(#paint0_radial_319_481)"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M17.2734 19.5859L16.1172 19.2891L16.6875 13.625H22.5234V14.9609H17.9141L17.5703 18.0547C17.7786 17.9349 18.0417 17.8229 18.3594 17.7188C18.6823 17.6146 19.0521 17.5625 19.4688 17.5625C19.9948 17.5625 20.4661 17.6536 20.8828 17.8359C21.2995 18.013 21.6536 18.2682 21.9453 18.6016C22.2422 18.9349 22.4688 19.3359 22.625 19.8047C22.7812 20.2734 22.8594 20.7969 22.8594 21.375C22.8594 21.9219 22.7839 22.4245 22.6328 22.8828C22.487 23.3411 22.2656 23.7422 21.9688 24.0859C21.6719 24.4245 21.2969 24.6875 20.8438 24.875C20.3958 25.0625 19.8672 25.1562 19.2578 25.1562C18.7995 25.1562 18.3646 25.0938 17.9531 24.9688C17.5469 24.8385 17.1823 24.6432 16.8594 24.3828C16.5417 24.1172 16.2812 23.7891 16.0781 23.3984C15.8802 23.0026 15.7552 22.5391 15.7031 22.0078H17.0781C17.1406 22.4349 17.2656 22.7943 17.4531 23.0859C17.6406 23.3776 17.8854 23.599 18.1875 23.75C18.4948 23.8958 18.8516 23.9688 19.2578 23.9688C19.6016 23.9688 19.9062 23.9089 20.1719 23.7891C20.4375 23.6693 20.6615 23.4974 20.8438 23.2734C21.026 23.0495 21.1641 22.7786 21.2578 22.4609C21.3568 22.1432 21.4062 21.7865 21.4062 21.3906C21.4062 21.0312 21.3568 20.6979 21.2578 20.3906C21.1589 20.0833 21.0104 19.8151 20.8125 19.5859C20.6198 19.3568 20.3828 19.1797 20.1016 19.0547C19.8203 18.9245 19.4974 18.8594 19.1328 18.8594C18.6484 18.8594 18.2812 18.9245 18.0312 19.0547C17.7865 19.1849 17.5339 19.362 17.2734 19.5859Z"
              fill={`${theme === 'dark' ? '#1D2024' : '#FAFAFA'} `}
            />
            <defs>
              <radialGradient
                id="paint0_radial_319_481"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(19.5 19.5) rotate(-90) scale(17.5)"
              >
                <stop
                  offset="1"
                  stop-color={`${theme === 'dark' ? '#4C4D55' : '#50ff7f'}`}
                />
              </radialGradient>
            </defs>
          </svg>

          <div className="flex flex-col justify-center">
            <div>
              <span className="total-score">
                <b>Total Score</b>
              </span>
            </div>
            <div>
              <span className="influence-measure">Influence Measure</span>
            </div>
          </div>
        </div>
        <div className="flex basis-2/5 justify-between gap-[11px]">
          <img
            src={
              theme === 'dark'
                ? '/images/score-chart.svg'
                : '/images/minichart.svg'
            }
            alt=""
          />

          <div>
            <span className="fw-500 fs-14 lh-40">+16%</span>
          </div>

          <img
            width={10}
            src={`${
              currentIcon === 'score-2'
                ? '/images/info-green-icon.svg'
                : '/images/Mask (7).svg'
            }`}
            alt=""
            id={'score-2'}
            onMouseEnter={() => {
              setcurrentIcon('score-2')
            }}
            onMouseLeave={() => {
              setcurrentIcon('')
            }}
          />

          <ReactTooltip
            className="my-tool-tip z-500"
            anchorId={'score-2'}
            place="bottom"
            content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
          />
        </div>
      </div>
    </>
  )
}
export default Score
