import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import FilterTabs from '../../components/common/FilterTabs'
import Header from '../../components/common/header/Header'
import PopConfirm, {
  PopConfirmProps,
} from '../../components/common/pop-confirm/PopConfirm'
import SearchField from '../../components/common/SearchField'
import CarInsurance from '../../components/common/Table/components/CarInsurance'
import LargeText from '../../components/common/Table/components/LargeText'
import Status from '../../components/common/Table/components/Status'
import Table, { TableProps } from '../../components/common/Table/Table'
import Tabs from '../../components/common/Tabs'
import Popup from '../../components/templates/Popup'
import MarketStatus from '../Welcome/market-status/MarketStatus'
import StatusInfo from '../Welcome/StatusInfo'
import TableCard from '../../components/common/cards/TableCard/TableCard'
import { UserContext } from '../../App'
import Drawer from 'react-modern-drawer'
import Switch from '@mui/material/Switch'
import { Box } from '@mui/material'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import Alert from '../../components/common/Alert'
import AdminCard, { AdminCardProps } from '../Assessement/AdminCard'
import { useWeb3React } from '@web3-react/core'
import { get_applications } from '../../api'
import axios from 'axios'

function KYCApplication() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const [isOpen, setIsOpen] = React.useState(false)
  const { library, account } = useWeb3React()
  const [selectItem, setselectItem] = useState()
  const [membershipApplications, setMembershipApplications] = useState<any[]>(
    []
  )
  const { width } = useWindowDimensions()
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handlerLink = (item: any) => {
    setselectItem(item)
  }

  const { theme } = React.useContext(UserContext)
  const [tabs, setTabs] = useState<number>(0)
  const [dateFilter, setDateFilter] = useState<number>(0)

  useEffect(() => {
    console.log('UseEffect reran')
    const getData = async () => {
      if (account) {
        const signer = library.getSigner(account)
        const applicants = await get_applications(signer)

        const axiosRequests = applicants.map(async (applicant) => {
          const response = await axios.get(applicant.data as string)
          return response.data
        })

        // Wait for all axios requests to complete
        const membership_applications = await Promise.all(axiosRequests)
        setMembershipApplications(membership_applications)
      }
    }
    getData()
  }, [account, library])

  const [popup, setPopup] = useState<PopConfirmProps | null>(null)
  const popupHandle = (data?: PopConfirmProps) =>
    data ? setPopup(data) : setPopup(null)
  const myCoverPopup: PopConfirmProps = {
    title: 'Risk Pool Details',
    id: 5,
    cover: {
      card: {
        icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
        name: 'Car cover',
        subIcon:
          theme === 'dark'
            ? '/images/okicon.svg'
            : '/images/ShieldActiveFinance 1.svg',
      },
      purchase: '',
      id: 3,
      totalPolicies: '4551',
      totalPoliciesName: 'Purchase',
    },
    table: {
      rows: [
        {
          text: 'Available Capital',
          icon: true,
        },
        {
          text: 'APY',
          icon: true,
        },
        {
          text: 'Ongoing Claims',
          icon: false,
        },
      ],
      columns: ['6.660.00 USDC', '3,16%', '3658'],
    },
    prpInput: {
      infoText: {
        text: 'Total',
      },
      defaultValue: '',
      placeholder: '00.00',
      action: {
        text: 'USDC',
      },
    },
    inputMax: {
      placeholder: '00.00',
      action: true,
    },
    balance: '6.660.00 USDC',
    disclaimer:
      'Investment strategies carry risks due to market changes. Careful management is crucial for the protocol`s long-term success',
  }
  const riskManagementopup: PopConfirmProps = {
    title: 'Risk Pool Management',
    id: 20,
  }

  const kyc: TableProps = {
    tabs: tabs,
    options: [{ name: 'Revert' }, { name: 'Cancel' }],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[16%] ',
      },
      {
        name: 'BIRTH DATE',
        width: 'w-[19%] ',
      },
      {
        name: 'STATUS',
        width: 'w-[18%] ',
      },
      {
        name: 'DATE',
        width: 'w-[29%] ',
      },
      {
        name: 'DECISION',
        width: 'w-[19%] ',
      },
      {
        name: 'ACTION',
        width: 'w-[9%] ',
      },
    ],
    rows: membershipApplications.map((applcation: any) => {
      return [
        <Link to="/kyc-user-profile">
          <span className="prp dark:prp-dark">{`${applcation.firstName} ${applcation.lastName}`}</span>
        </Link>,
        <span className="prp dark:prp-dark">{applcation.dob}</span>,
        <Status type="Withdrawn" text="Pending" />,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <div>
          <Box
            sx={{
              '.Mui-checked': {
                color: `${
                  theme === 'dark' ? '#606166' : '#ff9800'
                } !important;`,
              },
              '.MuiSwitch-track': {
                background: `${
                  theme === 'dark' ? '#606166' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" />
          </Box>
        </div>,
        <div>
          <Button
            // onClick={() => popupHandle(myCoverPopup)}
            text="Assign"
            btnText="table-action"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ]
    }),
  }

  const insurePro: TableProps = {
    tabs: tabs,
    options: [{ name: 'Deactivate' }, { name: 'Profile' }],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[16%]',
      },
      {
        name: 'TYPE',
        width: 'w-[19%]',
      },
      {
        name: 'STATUS',
        width: 'w-[18%]',
      },
      {
        name: 'DATE',
        width: 'w-[17%]',
      },
      {
        name: 'DECISION',
        width: 'w-[8%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <Link to="/insure-pro-user-profile">
          <span className="prp dark:prp-dark">Natacha Nilson</span>
        </Link>,
        <span className="prp dark:prp-dark">Kyc Reviewer</span>,
        <Status type="Withdrawn" text="Pending" />,
        <span className="prp dark:prp-dark">2022/06/01</span>,
        <div>
          <Box
            sx={{
              '.Mui-checked': {
                color: `${
                  theme === 'dark' ? '#606166' : '#ff9800'
                } !important;`,
              },
              '.MuiSwitch-track': {
                background: `${
                  theme === 'dark' ? '#ff9800' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" defaultChecked />
          </Box>
        </div>,
        <div>
          <Button
            // onClick={() => popupHandle(myCoverPopup)}
            text="Submit"
            btnText="table-action"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
      [
        <Link to="/insure-pro-user-profile">
          <span className="prp dark:prp-dark">Natacha Nilson</span>
        </Link>,
        <span className="prp dark:prp-dark">Kyc Reviewer</span>,
        <Status type="Accepted" text="Pending" />,
        <span className="prp dark:prp-dark">2022/06/01</span>,
        <div>
          <Box
            sx={{
              '.Mui-checked': {
                color: `${
                  theme === 'dark' ? '#606166' : '#50ff7f'
                } !important;`,
              },
              '.MuiSwitch-track': {
                background: `${
                  theme === 'dark' ? '#50ff7f' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" defaultChecked />
          </Box>
        </div>,
        <div>
          <Button
            // onClick={() => popupHandle(myCoverPopup)}
            text="Submit"
            btnText="table-action"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
      [
        <Link to="/insure-pro-user-profile">
          <span className="prp dark:prp-dark">Natacha Nilson</span>
        </Link>,
        <span className="prp dark:prp-dark">Kyc Reviewer</span>,
        <Status type="Declined" text="Pending" />,
        <span className="prp dark:prp-dark">2022/06/01</span>,
        <div>
          <Box
            sx={{
              '.Mui-checked': {
                color: `${
                  theme === 'dark' ? '#606166' : '#d0021b'
                } !important;`,
              },
              '.MuiSwitch-track': {
                background: `${
                  theme === 'dark' ? '#d0021b' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" defaultChecked />
          </Box>
        </div>,
        <div>
          <Button
            // onClick={() => popupHandle(myCoverPopup)}
            text="Submit"
            btnText="table-action"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
    ],
  }

  const policies: TableProps = {
    tabs: tabs,
    options: [{ name: 'Revert' }, { name: 'Cancel' }],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[16%] ',
      },
      {
        name: 'BIRTH DATE',
        width: 'w-[19%] ',
      },
      {
        name: 'STATUS',
        width: 'w-[18%] ',
      },
      {
        name: 'DATE',
        width: 'w-[29%] ',
      },
      {
        name: 'DECISION',
        width: 'w-[19%] ',
      },
      {
        name: 'ACTION',
        width: 'w-[9%] ',
      },
    ],
    rows: [
      [
        <Link to="/policy-risk-user-profile">
          <span className="prp dark:prp-dark">Natacha Nilson</span>
        </Link>,
        <span className="prp dark:prp-dark">2000/06/01</span>,
        <Status type="Withdrawn" text="Pending" />,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <div>
          <Box
            sx={{
              '.Mui-checked': {
                color: `${
                  theme === 'dark' ? '#606166' : '#ff9800'
                } !important;`,
              },
              '.MuiSwitch-track': {
                background: `${
                  theme === 'dark' ? '#ff9800' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" />
          </Box>
        </div>,
        <div>
          <Button
            // onClick={() => popupHandle(myCoverPopup)}
            text="Assign"
            btnText="table-action"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
      [
        <Link to="/policy-risk-user-profile">
          <span className="prp dark:prp-dark">Natacha Nilson</span>
        </Link>,
        <span className="prp dark:prp-dark">2000/06/01</span>,
        <Status type="Accepted" text="Pending" />,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <div>
          <Box
            sx={{
              '.Mui-checked': {
                color: `${
                  theme === 'dark' ? '#606166' : '#50ff7f'
                } !important;`,
              },
              '.MuiSwitch-track': {
                background: `${
                  theme === 'dark' ? '#50ff7f' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" />
          </Box>
        </div>,
        <div>
          <Button
            // onClick={() => popupHandle(myCoverPopup)}
            text="Assign"
            btnText="table-action"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
      [
        <Link to="/policy-risk-user-profile">
          <span className="prp dark:prp-dark">Natacha Nilson</span>
        </Link>,
        <span className="prp dark:prp-dark">2000/06/01</span>,
        <Status type="Declined" text="Pending" />,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <div>
          <Box
            sx={{
              '.Mui-checked': {
                color: `${
                  theme === 'dark' ? '#606166' : '#d0021b'
                } !important;`,
              },
              '.MuiSwitch-track': {
                background: `${
                  theme === 'dark' ? '#d0021b' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" />
          </Box>
        </div>,
        <div>
          <Button
            // onClick={() => popupHandle(myCoverPopup)}
            text="Assign"
            btnText="table-action"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
    ],
  }

  const claims: TableProps = {
    tabs: tabs,
    options: [{ name: 'Hide' }, { name: 'Rewards' }],
    columns: [
      {
        name: 'POLICY TYPE',
        width: 'w-[16%]',
      },
      {
        name: 'STATUS',
        width: 'w-[19%]',
      },
      {
        name: 'CLAIM ID',
        width: 'w-[18%]',
      },
      {
        name: 'DATE',
        width: 'w-[18%]',
      },
      {
        name: 'STAGE',
        width: 'w-[13%]',
      },
      {
        name: 'CLAIM AMOUNT',
        width: 'w-[12%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <CarInsurance />,
        <Status type="Active" />,
        <span>10</span>,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          <Button
            to="/new-claim"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            text="View"
            btnText="table-action"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
          />
        </div>,
      ],
      [
        <CarInsurance />,
        <Status type="Inactive" />,
        <span>10</span>,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          <Button
            to="/new-claim"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            text="View"
            btnText="table-action"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
          />
        </div>,
      ],
      [
        <CarInsurance />,
        <Status type="Declined" />,
        <span>10</span>,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          <Button
            to="/new-claim"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            text="View"
            btnText="table-action"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
          />
        </div>,
      ],
    ],
  }

  const riskPool: TableProps = {
    tabs: tabs,
    options: [{ name: 'Pause' }, { name: 'Accounting' }],
    columns: [
      {
        name: 'NAME',
        width: 'w-[25%]',
      },
      {
        name: 'STATUS',
        width: 'w-[16%]',
      },
      {
        name: 'UR',
        width: 'w-[25%]',
      },
      {
        name: 'SCR',
        width: 'w-[25%]',
      },
      {
        name: 'FEE',
        width: 'w-[25%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <CarInsurance />,
        <Status type="Active" text="Active" />,
        <span
          className="prp dark:prp-dark"
          onClick={() => popupHandle(riskManagementopup)}
        >
          100%
        </span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <LargeText primary="94.000" secondary="USDC" />,
        <div>
          <Button
            onClick={() => popupHandle(myCoverPopup)}
            text="Manage"
            btnText="table-action"
            endIcon={
              theme === 'dark'
                ? '/images/action-btn-logo.svg'
                : '/images/011.svg'
            }
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
      [
        <CarInsurance />,
        <Status type="Declined" text="Inactive" />,
        <span
          className="prp dark:prp-dark"
          onClick={() => popupHandle(riskManagementopup)}
        >
          100%
        </span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <LargeText primary="94.000" secondary="USDC" />,
        <div>
          <Button
            onClick={() => popupHandle(myCoverPopup)}
            text="Manage"
            btnText="table-action"
            endIcon={
              theme === 'dark'
                ? '/images/action-btn-logo.svg'
                : '/images/011.svg'
            }
            className={`${
              theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
            } px-[19.5px] py-[11.5px] w-full`}
          />
        </div>,
      ],
    ],
  }

  const searchTable: TableProps = {
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[15.52%] xl:w-[14%]',
      },
      {
        name: 'COVER TYPE',
        width: 'w-[16%]',
      },
      {
        name: 'STATUS',
        width: 'w-[15%]',
      },
      {
        name: 'PRP',
        width: 'w-[15%]',
      },
      {
        name: 'TOTAL PREMIUM',
        width: 'w-[15%]',
      },
      {
        name: 'Claim History',
        width: 'w-[15%]',
      },
      {
        name: 'STATUS',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <span>Natacha Nilson</span>,
        <CarInsurance />,
        <Status type="Declined" />,
        <span>2000</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <span className="claim-history">9</span>,
        <div>
          <Button
            to="/new-claim"
            className="dark:bg-white dark:box-border w-[120px]"
            text="View"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
            btnText="table-action"
            color={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
          />
        </div>,
      ],
      [
        <span>Natacha Nilson</span>,
        <CarInsurance />,
        <Status type="Active" />,
        <span>2000</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <span className="claim-history">9</span>,
        <div>
          <Button
            to="/new-claim"
            className=" dark:bg-white dark:box-border w-[120px]"
            text="View"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
            btnText="table-action"
            color={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
          />
        </div>,
      ],
      [
        <span>Natacha Nilson</span>,
        <CarInsurance />,
        <Status type="Declined" />,
        <span>2000</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <span className="claim-history">9</span>,
        <div>
          <Button
            to="/new-claim"
            className=" dark:bg-white dark:box-border w-[120px]"
            text="View"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
            btnText="table-action"
            color={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
          />
        </div>,
      ],
      [
        <span>Natacha Nilson</span>,
        <CarInsurance />,
        <Status type="Withdrawn" />,
        <span>2000</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <span className="claim-history">9</span>,
        <div>
          <Button
            to="/new-claim"
            className=" dark:bg-white dark:box-border w-[120px]"
            text="View"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
            btnText="table-action"
            color={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
          />
        </div>,
      ],
      [
        <span>Natacha Nilson</span>,
        <CarInsurance />,
        <Status type="Active" />,
        <span>2000</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <span className="claim-history">9</span>,
        <div>
          <Button
            to="/new-claim"
            className=" dark:bg-white dark:box-border w-[120px]"
            text="View"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
            btnText="table-action"
            color={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
          />
        </div>,
      ],
      [
        <span>Natacha Nilson</span>,
        <CarInsurance />,
        <Status type="Ongoing" />,
        <span>2000</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <span className="claim-history">9</span>,
        <div>
          <Button
            to="/new-claim"
            className=" dark:bg-white dark:box-border w-[120px]"
            text="View"
            endIcon={
              theme === 'dark'
                ? '/images/light-btn-icon.svg'
                : '/images/dark-btn-icon.svg'
            }
            btnText="table-action"
            color={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
          />
        </div>,
      ],
    ],
  }
  const verify = {
    id: 3,
    options: [],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[16%]',
      },
      {
        name: 'BIRTH DATE',
        width: 'w-[20%]',
      },
      {
        name: 'STATUS',
        width: 'w-[25%]',
      },
      {
        name: 'COVER TYPE',
        width: 'w-[20%]',
      },
      {
        name: 'VERIFY STATUS',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <span>Natacha Nilson</span>,
        <span>2000/06/01</span>,
        <div className="flex gap-[5px] items-center">
          <Status /> <span className="status-text"> since 17/01/2022</span>
        </div>,
        <CarInsurance margin="ml-[10px]" />,
        <div className="flex justify-center">
          <img
            src={
              theme === 'dark'
                ? '/images/dark-verify.svg'
                : '/images/green-verify.svg'
            }
          />
        </div>,
      ],
    ],
  }

  const Tabkyc = {
    id: 0,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'PRP',
        data: '2000',
      },
      {
        title: 'Daily Cost',
        data: '2562 USDC',
      },
      {
        title: 'Policy Balance',
        data: '2560 USDC',
      },
    ],
    drawerTitle: 'Cover Options',
    drawerData: ['Submit Claim', 'Pause Cover', 'Cancel Cover'],
    btnText: 'Manage',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Claim' }, { name: 'Pause' }],
  }

  const TabInsurePro = {
    id: 1,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/white-dots.svg' : '/images/grey-dots.svg',
    data: [
      {
        title: 'Date',
        data: '2022/06/01 10:26:20',
      },
      {
        title: 'Stage',
        data: 'Vote',
      },
      {
        title: 'Claim Amount',
        data: '256,00 USDC',
      },
    ],
    drawerTitle: 'Claim Options',
    drawerData: ['Cancel Cover', 'Appeal'],
    btnText: 'View',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Claim' }, { name: 'Appeal' }],
  }

  const TabPolicies = {
    id: 2,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'APR',
        data: '2%',
      },
      {
        title: 'ENTRY DATE',
        data: '2022/06/01/ 10:26:20',
      },
      {
        title: 'Capital',
        data: '2560 USDC',
      },
    ],
    drawerTitle: 'LIQUIDITY Options',
    drawerData: ['Withdraw', 'deposit'],
    btnText: 'Manage',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Deposit' }, { name: 'Withdraw' }],
  }

  const TabClaims = {
    id: 3,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'Verdict',
        data: 'Yes',
      },
      {
        title: 'Stage',
        data: 'Payout',
      },
      {
        title: 'Claim Amount',
        data: '2560,00 USDC',
      },
    ],
    drawerTitle: 'Cover Options',
    drawerData: ['Claim Rewards', 'Hide'],
    btnText: 'view',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    options: [{ name: 'Hide' }, { name: 'Rewards' }],
  }

  const TabRiskPool = {
    id: 4,
    tabId: tabs,
    title: 'Car Cover',
    status: 'Declined',
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    btnIcon: theme === 'dark' ? '/images/126.svg' : '/images/125.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/maskBlack.svg' : '/images/Mask (10).svg',
    data: [
      {
        title: 'Claim Amount',
        data: {
          type: 'text',
          value: 'Convert',
        },
      },
      {
        title: 'Request Date',
        data: {
          type: 'text',
          value: '2022/06/01  10:26:20',
        },
      },
      {
        title: 'Convert',
        data: {
          type: 'switch',
          value: false,
        },
      },
    ],
    drawerTitle: 'Cover Options',
    drawerData: ['Claim Rewards', 'Hide'],
    btnText: 'Claim',
    options: [{ name: 'Cancel Request' }, { name: 'Claim Rewards' }],
  }

  const overfiewCards: AdminCardProps[] = [
    {
      key: 45,
      name: 'TOTAL SCR',
      score: '180,948,020',
      chart: [
        40, 33, 44, 36, 20, 42, 24, 28, 15, 60, 12, 50, 30, 40, 10, 70, 40, 80,
      ],
      percentage: +0.58,
      volume: 1487,
      status: 'up',
      usd: true,
    },
    {
      key: 54,
      name: 'Total POLICIES',
      score: 19948,
      chart: [
        20, 10, 35, 30, 35, 10, 15, 12, 50, 20, 50, 30, 60, 57, 64, 55, 60, 75,
        40, 43,
      ],
      percentage: +1.08,
      volume: 487,
      status: 'up',
    },
    {
      key: 45,
      name: 'Total CLAIMS',
      score: 19748,
      chart: [10, 20, 20, 40, 15, 15, 50, 45, 50, 20, 15, 30, 40, 5],
      percentage: -0.98,
      volume: 68487,
      status: 'down',
    },
    {
      key: 45,
      name: 'PREMIUMS',
      score: '19,948,000',
      chart: [20, 10, 14, 18, 24, 26, 26, 30, 30, 40, 35, 38],
      percentage: +0.48,
      volume: 48754,
      status: 'up',
      usd: true,
    },
  ]
  const TabVerify = {
    id: 3,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/white-dots.svg' : '/images/grey-dots.svg',
    data: [
      {
        title: 'Legal Name',
        data: 'Natacha Nilson',
      },
      {
        title: 'Birth Date',
        data: '02/01/2000',
      },
      {
        title: 'Status',
        data: 'Valid until 02/20/2023',
      },
    ],
    drawerTitle: 'Filter Options',
    drawerData: ['All', 'Active', 'Recent'],
    btnText: 'View',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    selectOption: 'radio',
    endicon:
      theme === 'dark'
        ? '/images/light-btn-icon.svg'
        : '/images/dark-btn-icon.svg',
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
  }
  const TabSearch = {
    id: 2,
    title: 'Car Cover',
    status: 'Inactive', //Withdrawn Accepted Declined Active Inactive
    icon: theme === 'dark' ? '/images/white_car.svg' : '/images/lodgo.svg',
    subIcon:
      theme === 'dark'
        ? '/images/okicon.svg'
        : '/images/ShieldActiveFinance 1.svg',
    menuIcon:
      theme === 'dark' ? '/images/white-dots.svg' : '/images/grey-dots.svg',
    data: [
      {
        title: 'Legal Name',
        data: 'Natacha Nilson',
      },
      {
        title: 'Claim History',
        data: '2',
      },
      {
        title: 'PRP',
        data: '2000',
      },
    ],
    drawerTitle: 'Filter Options',
    drawerData: ['All', 'Active', 'Recent'],
    btnText: 'View',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    selectOption: 'radio',
    endicon:
      theme === 'dark'
        ? '/images/light-btn-icon.svg'
        : '/images/dark-btn-icon.svg',
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
  }
  const empty: TableProps = {
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
    columns: [
      {
        name: 'LEGAL NAME',
        width: 'w-[15.52%] xl:w-[14%]',
      },
      {
        name: 'COVER TYPE',
        width: 'w-[16%]',
      },
      {
        name: 'STATUS',
        width: 'w-[15%]',
      },
      {
        name: 'PRP',
        width: 'w-[15%]',
      },
      {
        name: 'TOTAL PREMIUM',
        width: 'w-[15%]',
      },
      {
        name: 'Claim History',
        width: 'w-[15%]',
      },
      {
        name: 'STATUS',
        width: 'w-[9%]',
      },
    ],
    rows: [],
  }
  const [search, setSearch] = useState('')
  const handlerSearch = (text: any) => {
    setSearch(text)
  }
  return (
    <div className="z-10">
      <Header name="InsurePro" overview={true} />

      <div className="mb-14">
        <div className="flex justify-between  items-center  sm:flex  sm:gap-9  max-[900px]:flex max-[900px]:flex-col">
          <Tabs
            currentTab={tabs}
            changeTab={setTabs}
            tabs={[
              'KYC',
              'InsurePro',
              'Policies',
              'Claims',
              'Risk Pool',
              'Search',
              'Verify',
            ]}
          />
          <FilterTabs
            tabs={['ALL', 'ACTIVE', 'RECENT']}
            currentTab={dateFilter}
            changeTab={setDateFilter}
          />
        </div>

        <div className="block max-[1200px]:hidden">
          {tabs === 0 && <Table {...kyc} />}
          {tabs === 1 && <Table {...insurePro} />}
          {tabs === 2 && <Table {...policies} />}
          {tabs === 3 && <Table {...claims} />}
          {tabs === 4 && (
            <>
              <div className="grid  gap-[15px] sm:gap-[20px] grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 mt-4">
                {overfiewCards.map(({ key, ...rest }) => (
                  <AdminCard key={key} {...rest} />
                ))}
              </div>
              <Table {...riskPool} />
            </>
          )}
          {tabs === 5 && (
            <>
              <div className="py-5">
                <div className="flex w-[265px] mb-5 sm:mb-0 ">
                  <SearchField
                    width={'w-full'}
                    text="Search ..."
                    onSearch={handlerSearch}
                  />{' '}
                  <button
                    type="button"
                    className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end sm:hidden"
                  >
                    Filter
                  </button>
                </div>
              </div>
              {search ? (
                <>
                  <Table {...searchTable} />
                </>
              ) : (
                <>
                  <div className="py-5">
                    <div className="flex mt-[20px]">
                      <div className="flex text-3xl font-amaranth flex-grow items-center">
                        <div>
                          <p className="mb-5 verify-title">
                            You can use Search feature to find any policy, the
                            following criteria apply:
                          </p>
                          <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                            {[
                              <span className="verify-content">
                                {' '}
                                Restricted to only to the InsurePro community.
                              </span>,
                              <span className="verify-content">
                                Policyholders can view these policies
                              </span>,
                            ].map((value, index) => (
                              <li>{value}</li>
                            ))}
                          </ul>

                          <Link
                            to="/"
                            className="mb-7 block policy-line learn-more-link"
                          >
                            Learn more about Search feature
                          </Link>
                        </div>
                      </div>
                      <div className="hidden md:flex">
                        <img src="/images/search.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {tabs === 6 && (
            <>
              <>
                <div className="flex w-[265px] py-5">
                  <SearchField
                    width={'w-full'}
                    text="Policy ID..."
                    onSearch={handlerSearch}
                  />{' '}
                  <button
                    type="button"
                    className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end sm:hidden"
                  >
                    Filter
                  </button>
                </div>
                {search ? (
                  <>
                    <div className="mb-10">
                      <Table {...verify} />
                    </div>
                  </>
                ) : (
                  <> </>
                )}
                <div>
                  {!search ? (
                    <>
                      <div className="flex mt-[20px] py-5">
                        <div className="text-3xl font-amaranth flex-grow">
                          <p className="mb-5 verify-title">
                            You can also use certificate verification feature on
                            your phone
                          </p>
                          <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                            {[
                              <div className="flex gap-[10px]">
                                {' '}
                                <span className="verify-content">
                                  {' '}
                                  Open your wallet browser and search
                                  www.app.solace.io
                                </span>{' '}
                                <img src="/images/fox-light.svg" alt="" />
                              </div>,
                              <div className="flex gap-[10px]">
                                {' '}
                                <span className="verify-content">
                                  {' '}
                                  Open the menu screen tab
                                </span>
                                <img
                                  src={
                                    theme === 'dark'
                                      ? '/images/light-menu.svg'
                                      : '/images/dark-menu.svg'
                                  }
                                  alt=""
                                />
                              </div>,
                              <div className="flex gap-[10px]">
                                {' '}
                                <span className="verify-content">
                                  {' '}
                                  Open the QR reader and scan the QR code of the
                                  insurance certificate
                                </span>
                                <img
                                  src={
                                    theme === 'dark'
                                      ? '/images/dark-qr.svg'
                                      : '/images/light-qr.svg'
                                  }
                                  alt=""
                                />
                              </div>,
                            ].map((value, index) => (
                              <li>{value}</li>
                            ))}
                          </ul>
                          <Link to="/" className="mb-7 block policy-line">
                            Learn more about verifing a policy
                          </Link>
                          <p className="mb-5 download-now">
                            Don’t have a wallet browser on your phone?
                            <br />
                            Download now:
                          </p>
                          <div className="flex gap-2.5 max-w-[900px] flex-cols">
                            <a href="#">
                              <img src="/images/Group (6).svg" alt="" />
                            </a>
                            <a href="#">
                              <img src="/images/Group (7).svg" alt="" />
                            </a>
                          </div>
                        </div>
                        <div className="hidden md:flex">
                          <img
                            src={
                              theme === 'dark'
                                ? '/images/man-dark.svg'
                                : '/images/Group (8).svg'
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            </>
          )}
        </div>

        <div className="hidden max-[1200px]:block">
          {tabs === 0 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={Tabkyc.id}
                              title={Tabkyc.title}
                              icon={Tabkyc.icon}
                              status={item}
                              subIcon={Tabkyc.subIcon}
                              menuIcon={Tabkyc.menuIcon}
                              data={Tabkyc.data}
                              btnText={Tabkyc.btnText}
                              btnIcon={Tabkyc.btnIcon}
                              drawerTitle={Tabkyc.drawerTitle}
                              option={Tabkyc.options}
                              //   popupData={myCoverPopup}
                              index={index}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 1 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabInsurePro.id}
                              title={TabInsurePro.title}
                              icon={TabInsurePro.icon}
                              status={item}
                              subIcon={TabInsurePro.subIcon}
                              menuIcon={TabInsurePro.menuIcon}
                              data={TabInsurePro.data}
                              btnText={TabInsurePro.btnText}
                              btnIcon={TabInsurePro.btnIcon}
                              drawerTitle={TabInsurePro.drawerTitle}
                              option={TabInsurePro.options}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 2 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>

              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabPolicies.id}
                              title={TabPolicies.title}
                              icon={TabPolicies.icon}
                              status={item}
                              subIcon={TabPolicies.subIcon}
                              menuIcon={TabPolicies.menuIcon}
                              data={TabPolicies.data}
                              btnText={TabPolicies.btnText}
                              btnIcon={TabPolicies.btnIcon}
                              drawerTitle={TabPolicies.drawerTitle}
                              option={TabPolicies.options}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 3 && (
            <>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabClaims.id}
                              title={TabClaims.title}
                              icon={TabClaims.icon}
                              status={item}
                              subIcon={TabClaims.subIcon}
                              menuIcon={TabClaims.menuIcon}
                              data={TabClaims.data}
                              btnText={TabClaims.btnText}
                              btnIcon={TabClaims.btnIcon}
                              drawerTitle={TabClaims.drawerTitle}
                              option={TabClaims.options}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}

          {tabs === 4 && (
            <>
              <div className="grid  gap-[15px] sm:gap-[20px] grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 mt-4">
                {overfiewCards.map(({ key, ...rest }) => (
                  <AdminCard key={key} {...rest} />
                ))}
              </div>
              <>
                <div className="flex w-full table-search-bar">
                  <SearchField width={'w-full'} />{' '}
                  <button
                    type="button"
                    className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </>
              <React.Fragment>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabSearch.id}
                              title={TabSearch.title}
                              icon={TabSearch.icon}
                              status={item}
                              subIcon={TabSearch.subIcon}
                              menuIcon={TabSearch.menuIcon}
                              data={TabSearch.data}
                              btnText={TabSearch.btnText}
                              btnIcon={TabSearch.btnIcon}
                              drawerTitle={TabSearch.drawerTitle}
                              option={TabSearch.options}
                            />
                          </div>
                        </>
                      )
                    }
                  )}
                </div>
              </React.Fragment>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="bottom-drawer dark:bottom-drawer-dark"
              >
                <div>
                  <div className="flex justify-center items-center mb-[20px]">
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/drawer-line2.svg'
                          : '/images/drawer-line1.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                    Filter Options
                  </span>
                  <div className="mt-[40px]">
                    {['All', 'Active', 'Recent'].map((item: any) => {
                      return (
                        <>
                          <div
                            className="flex justify-between drawer-item dark:drawer-item-dark"
                            onClick={() => handlerLink(item)}
                            role="button"
                          >
                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <>
                                    <span className="text-[#000000]">
                                      {item}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-dark-500">
                                      {item}
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <>
                                      <span className="text-[#50ff7f]">
                                        {item}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[#FFFFFF]">
                                        {item}
                                      </span>
                                    </>
                                  )}
                                </>
                              </>
                            )}

                            {theme === 'dark' ? (
                              <>
                                {selectItem === item ? (
                                  <img src="images/3333.svg" alt="" />
                                ) : (
                                  <img src="images/4444.svg" alt="" />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img src="images/1111.svg" alt="" />
                                  ) : (
                                    <img src="images/2222.svg" alt="" />
                                  )}
                                </>
                              </>
                            )}
                          </div>
                          <hr
                            className="my-[10px] drawer-item-line"
                            style={{
                              color: '#43444B',
                              backgroundColor: '#43444B',
                              height: 0.5,
                              borderColor: '#43444B',
                            }}
                          />
                        </>
                      )
                    })}
                  </div>
                </div>
              </Drawer>
            </>
          )}
          {tabs === 5 && (
            <>
              <div className=" py-5">
                <div className="flex w-[265px] mb-5 sm:mb-0 ">
                  <SearchField
                    width={'w-full'}
                    text="Search ..."
                    onSearch={handlerSearch}
                  />{' '}
                  <button
                    type="button"
                    className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end sm:hidden"
                  >
                    Filter
                  </button>
                </div>
              </div>
              {search ? (
                <>
                  <div className="flex w-full table-search-bar">
                    <SearchField width={'w-full'} />{' '}
                    <button
                      type="button"
                      className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                      onClick={toggleDrawer}
                    >
                      Filter
                    </button>
                  </div>

                  <React.Fragment>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                        (item: any, index) => {
                          return (
                            <>
                              <div>
                                <TableCard
                                  id={TabVerify.id}
                                  title={TabVerify.title}
                                  icon={TabVerify.icon}
                                  status={item}
                                  subIcon={TabVerify.subIcon}
                                  menuIcon={TabVerify.menuIcon}
                                  data={TabVerify.data}
                                  btnText={TabVerify.btnText}
                                  btnIcon={TabVerify.btnIcon}
                                  drawerTitle={TabVerify.drawerTitle}
                                  option={TabVerify.options}
                                />
                              </div>
                            </>
                          )
                        }
                      )}
                    </div>
                  </React.Fragment>
                  <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="bottom"
                    className="bottom-drawer dark:bottom-drawer-dark"
                  >
                    <div>
                      <div className="flex justify-center items-center mb-[20px]">
                        <img
                          src={
                            theme === 'dark'
                              ? '/images/drawer-line2.svg'
                              : '/images/drawer-line1.svg'
                          }
                          alt=""
                        />
                      </div>
                      <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                        Filter Options
                      </span>
                      <div className="mt-[40px]">
                        {['All', 'Active', 'Recent'].map((item: any) => {
                          return (
                            <>
                              <div
                                className="flex justify-between drawer-item dark:drawer-item-dark"
                                onClick={() => handlerLink(item)}
                                role="button"
                              >
                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <>
                                        <span className="text-[#000000]">
                                          {item}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-dark-500">
                                          {item}
                                        </span>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <>
                                          <span className="text-[#50ff7f]">
                                            {item}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="text-[#FFFFFF]">
                                            {item}
                                          </span>
                                        </>
                                      )}
                                    </>
                                  </>
                                )}

                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <img src="images/3333.svg" alt="" />
                                    ) : (
                                      <img src="images/4444.svg" alt="" />
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <img src="images/1111.svg" alt="" />
                                      ) : (
                                        <img src="images/2222.svg" alt="" />
                                      )}
                                    </>
                                  </>
                                )}
                              </div>
                              <hr
                                className="my-[10px] drawer-item-line"
                                style={{
                                  color: '#43444B',
                                  backgroundColor: '#43444B',
                                  height: 0.5,
                                  borderColor: '#43444B',
                                }}
                              />
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </Drawer>
                </>
              ) : (
                <>
                  <div className=" py-5">
                    <div className="flex mt-[20px]">
                      <div className="flex text-3xl font-amaranth flex-grow items-center">
                        <div>
                          <p className="mb-5 verify-title">
                            You can use Search feature to find any policy, the
                            following criteria apply:
                          </p>
                          <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                            {[
                              <span className="verify-content">
                                {' '}
                                Restricted to only to the InsurePro community.
                              </span>,
                              <span className="verify-content">
                                Policyholders can view these policies
                              </span>,
                            ].map((value, index) => (
                              <li>{value}</li>
                            ))}
                          </ul>

                          <Link
                            to="/"
                            className="mb-7 block policy-line learn-more-link"
                          >
                            Learn more about Search feature
                          </Link>
                        </div>
                      </div>
                      <div className="hidden md:flex">
                        <img src="/images/search.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {tabs === 6 && (
            <>
              <div className="flex table-search-bar w-full">
                <SearchField
                  width={'w-full'}
                  text="Search ..."
                  onSearch={handlerSearch}
                />{' '}
                <button
                  role="button"
                  type="button"
                  className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end"
                  onClick={toggleDrawer}
                >
                  Filter
                </button>
              </div>
              {search ? (
                <>
                  <React.Fragment>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {['Declined', 'Active', 'Withdrawn', 'Inactive'].map(
                        (item: any, index) => {
                          return (
                            <>
                              <div>
                                <TableCard
                                  id={TabInsurePro.id}
                                  title={TabInsurePro.title}
                                  icon={TabInsurePro.icon}
                                  status={item}
                                  subIcon={TabInsurePro.subIcon}
                                  menuIcon={TabInsurePro.menuIcon}
                                  data={TabInsurePro.data}
                                  btnText={TabInsurePro.btnText}
                                  btnIcon={TabInsurePro.btnIcon}
                                  drawerTitle={TabInsurePro.drawerTitle}
                                  option={TabInsurePro.options}
                                />
                              </div>
                            </>
                          )
                        }
                      )}
                    </div>
                  </React.Fragment>
                  <Table {...empty} />
                  <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="bottom"
                    className="bottom-drawer dark:bottom-drawer-dark"
                  >
                    <div>
                      <div className="flex justify-center items-center mb-[20px]">
                        <img
                          src={
                            theme === 'dark'
                              ? '/images/drawer-line2.svg'
                              : '/images/drawer-line1.svg'
                          }
                          alt=""
                        />
                      </div>
                      <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
                        Filter Options
                      </span>
                      <div className="mt-[40px]">
                        {['All', 'Active', 'Recent'].map((item: any) => {
                          return (
                            <>
                              <div
                                className="flex justify-between drawer-item dark:drawer-item-dark"
                                onClick={() => handlerLink(item)}
                                role="button"
                              >
                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <>
                                        <span className="text-[#000000]">
                                          {item}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-dark-500">
                                          {item}
                                        </span>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <>
                                          <span className="text-[#50ff7f]">
                                            {item}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="text-[#FFFFFF]">
                                            {item}
                                          </span>
                                        </>
                                      )}
                                    </>
                                  </>
                                )}

                                {theme === 'dark' ? (
                                  <>
                                    {selectItem === item ? (
                                      <img src="images/3333.svg" alt="" />
                                    ) : (
                                      <img src="images/4444.svg" alt="" />
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {selectItem === item ? (
                                        <img src="images/1111.svg" alt="" />
                                      ) : (
                                        <img src="images/2222.svg" alt="" />
                                      )}
                                    </>
                                  </>
                                )}
                              </div>
                              <hr
                                className="my-[10px] drawer-item-line"
                                style={{
                                  color: '#43444B',
                                  backgroundColor: '#43444B',
                                  height: 0.5,
                                  borderColor: '#43444B',
                                }}
                              />
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </Drawer>
                </>
              ) : (
                <>
                  <div className="flex">
                    <div className="text-3xl font-amaranth flex-grow">
                      <p className="mb-5 verify-title">
                        You can use Search feature to find any policy, the
                        following criteria apply:
                      </p>
                      <ul className="list-decimal mb-5 flex flex-col gap-2 px-6 text-dark-650">
                        {[
                          <span className="verify-content">
                            {' '}
                            Restricted to the adjuster in charge of assessing
                            your claim
                          </span>,
                          <span className="verify-content">
                            Policyholders can view these policies
                          </span>,
                        ].map((value, index) => (
                          <li>{value}</li>
                        ))}
                      </ul>

                      <Link to="/" className="mb-7 block policy-line">
                        Learn more about verifing a policy
                      </Link>
                      <p className="mb-5 download-now">
                        Don’t have a wallet browser on your phone?
                        <br />
                        Download now:
                      </p>
                      <div className="flex gap-2.5 max-w-[900px] flex-cols">
                        <a href={'/'}>
                          <img src="/images/Group (6).svg" alt="" />
                        </a>
                        <a href={'/'}>
                          <img src="/images/Group (7).svg" alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="hidden md:flex">
                      <img src="/images/search.svg" alt="" />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {popup !== null && (
        <Popup onClose={() => popupHandle()} visible maxWidth="max-w-[860px]">
          <PopConfirm onClose={() => popupHandle()} {...popup} />
        </Popup>
      )}
    </div>
  )
}

export default KYCApplication
