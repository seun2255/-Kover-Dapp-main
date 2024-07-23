import React, { useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { UserContext } from '../../../../App'
import InfoText, { InfoTextProps } from '../../InfoText'
import moment from 'moment'

export interface ActivePolicyStatusCardProps {
  index?: number
  title?: any
  cover?: {
    card: {
      icon: string
      name: string
      subIcon: string
    }
    id?: Number
    purchase?: string
    totalPolicies?: string
    totalPoliciesName?: string
  }
  table?: {
    rows: InfoTextProps[]
    columns: (string | JSX.Element)[]
  }
  dayTab?: boolean
  coverDetails: any
}

let durations: { [key: string]: any } = {
  '2 weeks': moment.duration(2, 'weeks'),
  '30 days': moment.duration(30, 'days'),
  '90 days': moment.duration(90, 'days'),
  '180 days': moment.duration(180, 'days'),
  '365 days': moment.duration(365, 'days'),
}

function ActivePolicyStatusCard({
  cover,
  table,
  dayTab,
  title,
  index,
  coverDetails,
}: ActivePolicyStatusCardProps) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  const [tagIcon, settagIconIcon] = useState('')
  var CardNo = index
  let now = moment()

  return (
    <>
      <div className="flex items-center justify-between flex-wrap status-card-center">
        <div className="flex items-center">
          <img
            src={cover?.card.icon}
            className="w-[35px] h-[35px] status-card-item-1"
            alt=""
          />
          <span className="cover-title dark:cover-title-dark status-card-item-2">
            {cover?.card.name}
          </span>
          <img
            src={cover?.card.subIcon}
            className="status-card-item-3"
            alt=""
          />
        </div>
        <div className={`flex flex-col items-end`}>
          <span
            className={`max-w-[800px]:mb-[5px] active-status-card-cover-no dark:active-status-card-cover-no-dark justify-end " ${
              cover?.id === 3 ? 'popup-date' : ''
            }`}
          >
            {now
              .add(durations[coverDetails.coverDuration as string])
              .format('DD/MM/YYYY')}
          </span>
          <>
            <div className="flex infotext flex justify-end small dark gap-[5px]">
              <span className=" infotext-span font-normal lg:font-medium fw-400 fw-500">
                Expiration
              </span>
              <img
                src={`${
                  currentIcon === `${index}`
                    ? '/images/info-green-icon.svg'
                    : '/images/Maskd (2).svg'
                }`}
                alt=""
                width={10}
                height={10}
                onMouseEnter={() => {
                  setcurrentIcon(`${index}`)
                }}
                onMouseLeave={() => {
                  setcurrentIcon('')
                }}
                id={'Card-' + index}
              />

              <ReactTooltip
                className="my-tool-tip z-500"
                anchorId={'Card-' + index}
                place="bottom"
                content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
              />
            </div>
          </>
        </div>
      </div>

      {/* <div className="flex justify-center card-hr">
        <img
          src={theme === "dark" ? "/images/012.svg" : "/images/hr_svg.svg"}
          alt=""
        />
      </div> */}
      <hr className="mt-[35px] mb-[25px]" />
      <div className="flex justify-between cover-content-x">
        <div>
          {table?.rows.map(({ ...rest }, index) => (
            <div
              className={`flex justify-start ${
                index === 0 ? 'mt-[0px]' : 'mt-[7px]'
              }`}
            >
              <InfoText
                key={index}
                {...rest}
                variant="small"
                index={`${index}-` + `${CardNo}1`}
              />
            </div>
          ))}
        </div>
        <div>
          {table?.columns.map((value, index) => (
            <div
              className={`flex justify-end ${
                index === 0 ? 'mt-[0px]' : 'mt-[7px]'
              }`}
            >
              <span
                key={index}
                className="cover-general-text-12 dark:cover-general-text-12-dark"
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between cover-content-z">
          {[...Array(3)].map((item, index) => (
            <>
              <div className="hidden sm:flex flex-col justify-center items-center">
                <div className="mb-[20px] flex gap-[5px]">
                  <span className="text-[#606166] fw-500 fs-12 lh-14">
                    {table?.rows[index].text}
                  </span>
                  {table?.rows[index].icon ? (
                    <>
                      <img
                        src={`${
                          currentIcon === `card-` + index
                            ? '/images/info-green-icon.svg'
                            : '/images/Maskd (2).svg'
                        }`}
                        alt="info-icon"
                        width="10"
                        height="10"
                        onMouseEnter={() => {
                          setcurrentIcon(`card-` + index)
                        }}
                        onMouseLeave={() => {
                          setcurrentIcon('')
                        }}
                        id={`card-` + index}
                      />
                      <ReactTooltip
                        className="my-tool-tip z-500"
                        anchorId={`card-` + index}
                        place="bottom"
                        content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <span className="fw-500 fs-12 lh-14">
                    {table?.columns[index]}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>

        {/* <div className={`mt-5 hidden flex-row  cover-content-y gap-2 justify-between px-1`}> 
          {table?.rows.map(({ ...rest }, index) => (
              <div className={`flex  justify-center`}>
                <InfoText key={index} {...rest} variant="small" index={`${index}-`+`${CardNo}3`}/>                
              </div> 
            ))}
          </div> */}

        {/* <div
            className={`hidden flex-row cover-content-y gap-2 justify-center`}
          >
            {table?.columns.map((value, index) => (
              <div className="mt-[20px] basis-2/6 flex justify-center">
                <span
                  key={index}
                  className={`cover-general-text-12 dark:cover-general-text-12-dark 
              ${
                cover?.id === 3
                  ? index === 0 || index === 2
                    ? "text-brand-400"
                    : ""
                  : ""
              }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div> */}
      </div>

      {/* {cover?.id === 4 ? (
        <>
          <div
            className={`hidden flex-row  cover-content-y gap-2 justify-between px-1`}
          >
            {table?.rows.map(({ ...rest }, index) => (
              <div
                className={`flex  justify-center ${
                  index === 1 ? "ml-[35px]" : ""
                }`}
              >
                <InfoText key={index} {...rest} variant="small" index={`${index}-`+`${CardNo}2`}/>
              </div>
            ))}
          </div>

          <div
            className={`hidden flex-row cover-content-y gap-2 justify-center`}
          >
            {table?.columns.map((value, index) => (
              <div
                className={`mt-[20px] basis-2/6 flex  ${
                  index === 0 && cover?.id === 4
                    ? "justify-start"
                    : "justify-center"
                }`}
              >
                <span
                  key={index}
                  className={`cover-general-text-12 dark:cover-general-text-12-dark 
              ${
                cover?.id === 3
                  ? index === 0 || index === 2
                    ? "text-brand-400"
                    : ""
                  : ""
              }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={`hidden flex-row  cover-content-y gap-2 justify-between px-1`}> 
          {table?.rows.map(({ ...rest }, index) => (
              <div className={`flex  justify-center`}>
                <InfoText key={index} {...rest} variant="small" index={`${index}-`+`${CardNo}3`}/>                
              </div> 
            ))}
          </div>

          <div
            className={`hidden flex-row cover-content-y gap-2 justify-center`}
          >
            {table?.columns.map((value, index) => (
              <div className="mt-[20px] basis-2/6 flex justify-center">
                <span
                  key={index}
                  className={`cover-general-text-12 dark:cover-general-text-12-dark 
              ${
                cover?.id === 3
                  ? index === 0 || index === 2
                    ? "text-brand-400"
                    : ""
                  : ""
              }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </>
      )} */}
    </>
  )
}

export default ActivePolicyStatusCard
