import React, { useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from 'react-tooltip'
export interface TableColumnsProps {
  tableId?: number
  columns: {
    name: string
    width: string
  }[]
}

function TableColumns({ columns, tableId }: TableColumnsProps) {
  const [icon, seticon] = useState(-1)
  const [currentIcon, setcurrentIcon] = useState(-1)
  const totalItem = columns.length - 1
  return (
    <>
      <div className="hidden sm:flex gap-6 px-7 py-5">
        <span className="w-6 -mr-6 min-w-[1.5rem]" />
        {columns.map(({ name, width }, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 ${width}
            ${
              tableId === 3
                ? `${totalItem === index ? 'justify-center' : 'justify-start'}`
                : ``
            }`}
          >
            <span className="tab-title dark:tab-title-dark">{name}</span>
            <div>
              <div
                className="icon"
                onMouseEnter={() => {
                  setcurrentIcon(index)
                  seticon(index)
                }}
                onMouseLeave={() => {
                  setcurrentIcon(-1)
                  seticon(index)
                }}
              >
                <div className="App">
                  <img
                    id={'app-title' + index}
                    src={`${
                      index === currentIcon
                        ? '/images/info-green-icon.svg'
                        : '/images/Maskd (2).svg'
                    }`}
                    width={10}
                    height={10}
                    className="w-2.5 h-2.5 table-info-icon group"
                    alt=""
                  />
                </div>
                <ReactTooltip
                  className="my-tool-tip"
                  anchorId={'app-title' + index}
                  place="bottom"
                  content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TableColumns
