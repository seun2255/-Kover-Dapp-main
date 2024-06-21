import React, { useState } from 'react'
import { UserContext } from '../../App'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import useWindowDimensions from '../global/UserInform/useWindowDimensions'

interface IncidentProps {
  data: any
}

function IncidentDetails({ data }: IncidentProps) {
  const { theme } = React.useContext(UserContext)
  const [hoverIcon, sethoverIcon] = useState('')
  const [icon, setIcon] = useState('')
  const { width } = useWindowDimensions()

  const Data = [
    {
      id: 1,
      title: 'Claim Type',
      value: data.claimType,
      icon: true,
    },
    {
      id: 2,
      title: 'Event Type',
      value: data.eventType,
      icon: true,
    },
    {
      id: 3,
      title: 'Event Date',
      value: data.eventDate,
      icon: false,
    },
    {
      id: 4,
      title: 'Event Time',
      value: '12:00 AM UTC+3',
      icon: false,
    },
  ]
  return (
    <>
      {width >= 600 ? (
        <>
          <div className="flex flex-col">
            <div className="">
              {' '}
              <span className="fw-500 fs-16 lh-19 text-[#F1F1F1] dark:text-dark-600 block ">
                Incident Type
              </span>
            </div>
            <div className="w-full px-[30px] py-[21px] flex justify-between gap-8 rounded dark:box-border dark:borderLight-border">
              {Data.map((item: any, _index: any) => (
                <div key={_index}>
                  <div className="flex gap-[5px] flex-row w-[114px]">
                    <span className="incident-title uppercase text-[#6D6E76]">
                      {item.title}
                    </span>
                    {item.icon ? (
                      <>
                        <img
                          width={10}
                          id={`Incident-` + _index}
                          src={`${
                            hoverIcon === `Incident-` + _index
                              ? '/images/info-green-icon.svg'
                              : '/images/Maskd (2).svg'
                          }`}
                          alt=""
                          onMouseEnter={() => {
                            sethoverIcon(`Incident-` + _index)
                          }}
                          onMouseLeave={() => {
                            sethoverIcon('')
                          }}
                        />
                        <ReactTooltip
                          className="my-tool-tip"
                          anchorId={`Incident-` + _index}
                          place="bottom"
                          content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* rounded dark:box-border dark:borderLight-border */}
            <div className="w-full bg-[#1D2024] rounded box-border-2x-light dark:box-border-2x-dark  w-full bg-[#1D2024] px-[30px] py-[21px] flex justify-between gap-8 dark:bg-[#F1F1F1] px-[30px] py-[21px] flex justify-between gap-8 dark:bg-[#F1F1F1]">
              {Data.map((item: any, _index: any) => (
                <div key={_index}>
                  <div className="flex flex-row w-[114px]">
                    <span className="incident-value"> {item.value}</span>{' '}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-[20px] py-[30px] bg-dark-600 rounded dark:bg-white box-border-2x-light dark:box-border-2x-dark">
            <div className="flex flex-col gap-3 width-fill-available">
              <div className="flex gap-[8px] mb-[10px]">
                <span className="fw-500 fs-16 lh-19 text-[#F1F1F1] dark:text-dark-600 block ">
                  Incident Details
                </span>
                <img
                  width={14}
                  id={`Incident-main`}
                  src={`${
                    icon === 'Incident-main'
                      ? '/images/info-green-icon.svg'
                      : '/images/Maskd (2).svg'
                  }`}
                  alt=""
                  onMouseEnter={() => {
                    setIcon('Incident-main')
                  }}
                  onMouseLeave={() => {
                    setIcon('')
                  }}
                />
                <ReactTooltip
                  className="my-tool-tip z-500"
                  anchorId={'Incident-main'}
                  place="bottom"
                  content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                />
              </div>

              <div className="flex flex-col gap-[15px]">
                {Data.map((item: any, _index: any) => (
                  <div key={_index}>
                    <div className="flex">
                      <div className="w-[150px] flex items-center gap-[8px]">
                        <span className="text-dark-200">{item.title}</span>
                        {item.icon ? (
                          <>
                            <img
                              width={10}
                              id={`${'Incident-Detail-' + _index}`}
                              src={`${
                                icon === `${'Incident-Detail-' + _index}`
                                  ? '/images/info-green-icon.svg'
                                  : '/images/Maskd (2).svg'
                              }`}
                              alt=""
                              onMouseEnter={() => {
                                setIcon(`${'Incident-Detail-' + _index}`)
                              }}
                              onMouseLeave={() => {
                                setIcon('')
                              }}
                            />
                            <ReactTooltip
                              className="my-tool-tip z-500"
                              anchorId={`${'Incident-Detail-' + _index}`}
                              place="bottom"
                              content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="flex items-center basis-1/3 ">
                        <span className="">{item.value}</span>
                      </div>
                    </div>
                    {_index === 3 ? (
                      <></>
                    ) : (
                      <>
                        <div className="min-w-full">
                          <img
                            className="min-w-full"
                            src="/images/line-2.svg"
                            alt=""
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default IncidentDetails
