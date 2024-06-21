import { Box, Switch } from '@mui/material'
import React, { useState } from 'react'
import { UserContext } from '../../../App'
import Status from './components/Status'
import { TableColumnsProps } from './TableColumns'
import TableOptions, { TableOptionsProps } from './TableOptions/TableOptions'
import Button from '../../../components/common/Button'
import CarInsurance from './components/CarInsurance'
import LargeText from './components/LargeText'
export interface TableRowsProps extends TableOptionsProps, TableColumnsProps {
  tableId?: number
  tabs?: number
  rows: JSX.Element[][]
  data?: any
  title?: string
}

function TableRows({
  rows,
  options,
  columns,
  tableId,
  tabs,
  data,
  title,
}: TableRowsProps) {
  const totalItem = columns.length - 1
  const { theme } = React.useContext(UserContext)
  const [claimSwitch, setClaimSwitch] = useState([
    {
      id: 1,
      carInsurance: <CarInsurance />,
      status: <Status type="Active" text="Withdrawn" />,
      date: `2022/06/01 10:26:20`,
      value: '',
      switch: false,
    },
    {
      id: 2,
      carInsurance: <CarInsurance />,
      status: <Status type="Active" text="Withdrawn" />,
      date: `2022/06/01 10:26:20`,
      value: '',
      switch: false,
    },
    {
      id: 3,
      carInsurance: <CarInsurance />,
      status: <Status type="Active" text="Withdrawn" />,
      date: `2022/06/01 10:26:20`,
      value: '',
      switch: true,
    },
  ])

  const updateState = (index: number) => {
    setClaimSwitch((prev: any) => {
      const newState = [...prev]
      console.log(newState[index])
      newState[index] = {
        ...(newState[index] as any),
        switch: !newState[index].switch,
      }
      return newState
    })
  }

  return (
    <React.Fragment>
      <div className="flex-col hidden gap-5 sm:flex">
        {rows.length <= 0 ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <img
                src="/images/box_empty.svg"
                width={137}
                height={107}
                alt=""
                className="mt-[30px]"
              />
              <span className="text-dark-500 text-3xl font-amaranth mt-[15px]">
                Oops ! No results found
              </span>

              {/* <div className="flex justify-center w-full">
                    <span className="empty-tag-2 mt-[20px]">
                      If you purchased a cover, make sure the correct wallet is
                      connected to the app.
                    </span>
                </div> */}
            </div>
          </>
        ) : (
          <>
            {tabs == 5 ? (
              <>
                {}
                {claimSwitch.map((item, index) => (
                  <div className="flex items-center gap-6 py-5 rounded dark:box-border bg-dark-800 px-7 dark:text-dark-800 dark:text-primary-100 dark:bg-white general-box-border">
                    <div className="">
                      <TableOptions
                        options={options}
                        data={data[index]}
                        index={data[index].id}
                      />
                    </div>

                    <div className={columns[0].width}> {item.carInsurance}</div>
                    <div className={columns[1].width}> {item.status}</div>
                    <div className={columns[2].width}> {item.date}</div>
                    <div className={columns[3].width}>
                      {' '}
                      <div>
                        <b className="daily-cost dark:daily-cost-dark">
                          9.4000
                        </b>
                        &nbsp;
                        <span className="daily-cost-slc dark:daily-cost-slc-dark">
                          USDC
                        </span>
                      </div>
                    </div>
                    <>
                      <div className={columns[4].width}>
                        <Box
                          sx={{
                            '.MuiBox-root': {
                              width: `${columns[4].width} !important`,
                            },
                            '.Mui-checked': {
                              color: `${
                                theme === 'dark' ? '#606166' : '#50ff7f'
                              } !important;`,
                            },
                            '.MuiSwitch-track': {
                              background: `${
                                theme === 'dark'
                                  ? '#606166'
                                  : 'rgba(148, 233, 63, 0.4)'
                              } !important;`,
                            },
                          }}
                        >
                          <Switch
                            className="convert-switch"
                            checked={item.switch}
                            onClick={() => {
                              updateState(index)
                            }}
                          />
                        </Box>
                      </div>
                    </>
                    <>
                      <Button
                        btnText={`table-action ${
                          item.switch ? 'text-[#000000]' : 'text-[#78797E]'
                        }`}
                        className={`${columns[5].width} ${
                          theme === 'dark'
                            ? `${
                                item.switch
                                  ? `whiteBgBtn`
                                  : `bg-[#F1F1F1] border-2 border-solid border-[#F0F0F0]`
                              }`
                            : `${
                                item.switch ? `greenGradient` : `grey-gradient`
                              }`
                        }`}
                        to="/"
                        text="Claim"
                        endIcon={
                          theme === 'dark'
                            ? item.switch
                              ? '/images/126.svg'
                              : '/images/125.svg'
                            : item.switch
                            ? '/images/125.svg'
                            : '/images/131.svg'
                        }
                      />
                    </>
                  </div>
                ))}
              </>
            ) : (
              <>
                {rows.map((rowDatam, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 py-5 rounded bg-dark-800 px-7 dark:text-dark-800 dark:text-primary-100 dark:bg-white dark:box-border general-box-border"
                  >
                    {/* <div className="w-6 -mr-6 min-w-[1.5rem]">
                      {options.length > 0 ? (
                        <>
                          <TableOptions
                            options={options}
                            title={title}
                            data={data[index]}
                            index={data[index].id}
                          />
                        </>
                      ) : (
                        <> </>
                      )}
                    </div> */}
                    {rowDatam.map((value, index) => (
                      <div
                        key={index}
                        className={`${columns[index]?.width}
               ${
                 tableId === 3
                   ? `${
                       totalItem === index ? 'justify-center' : 'justify-center'
                     }`
                   : ``
               } `}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      {/* <div className="block sm:hidden">
        {rows.map((_rowDatam, index) => (
          <div
            key={index}
            className="items-center block gap-6 py-5 rounded bg-dark-800 px-7"
          >
            <div className="w-6 -mr-6 min-w-[1.5rem]">
              <TableOptions
                options={options}
                data={data[index]}
                index={data[index].id}
              />
            </div>
          </div>
        ))}
      </div> */}
    </React.Fragment>
  )
}
export default TableRows
