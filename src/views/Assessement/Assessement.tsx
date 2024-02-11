import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import TableCard from '../../components/common/cards/TableCard/TableCard'
import FilterTabs from '../../components/common/FilterTabs'
import Header from '../../components/common/header/Header'
import SearchField from '../../components/common/SearchField'
import CarInsurance from '../../components/common/Table/components/CarInsurance'
import LargeText from '../../components/common/Table/components/LargeText'
import Status from '../../components/common/Table/components/Status'
import Table, { TableProps } from '../../components/common/Table/Table'
import Tabs from '../../components/common/Tabs'
import AdminCard, { AdminCardProps } from './AdminCard'
import { UserContext } from '../../App'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import Drawer from 'react-modern-drawer'
function Assessement() {
  const { theme } = React.useContext(UserContext)
  const { width } = useWindowDimensions()

  const ClaimsCover = {
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
        data: 'Appeal',
      },
      {
        title: 'Claim Amount',
        data: '256,00 USDC',
      },
    ],
    drawerTitle: 'Filter Options',
    drawerData: ['All', 'Active', 'Recent'],
    btnText: 'View',
    btnIcon: theme === 'dark' ? '/images/logo3.svg' : '/images/images/011.svg',
    endicon:
      theme === 'dark'
        ? '/images/light-btn-icon.svg'
        : '/images/dark-btn-icon.svg',
    options: [{ name: 'Live Chat  ' }, { name: 'Report User' }],
  }

  const SearchCover = {
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

  const VerifyCover = {
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

  const claimsTable: TableProps = {
    options: [{ name: 'Assess' }, { name: 'Report User' }],
    columns: [
      {
        name: 'POLICY TYPE',
        width: 'w-[15.52%] xl:w-[16%]',
      },
      {
        name: 'STATUS',
        width: 'w-[15%]',
      },
      {
        name: 'CLAIM ID',
        width: 'w-[12.2%]',
      },
      {
        name: 'DATE',
        width: 'w-[16%]',
      },
      {
        name: 'STAGE',
        width: 'w-[14%]',
      },
      {
        name: 'CLAIM AMOUNT',
        width: 'w-[14%]',
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
        <span className="md:">2022/06/01 10:26:20</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div className="flex justify-end w-full">
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
        <CarInsurance />,
        <Status type="Inactive" />,
        <span>10</span>,
        <span>2022/06/01 10:26:20</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div className="flex justify-end w-full">
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
        <CarInsurance />,
        <Status type="Accepted" />,
        <span>10</span>,
        <span>2022/06/01 10:26:20</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div className="flex justify-end w-full">
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
        <CarInsurance />,
        <Status type="Declined" />,
        <span>10</span>,
        <span>2022/06/01 10:26:20</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div className="flex justify-end w-full">
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
        <CarInsurance />,
        <Status type="Ongoing" />,
        <span>10</span>,
        <span>2022/06/01 10:26:20</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div className="flex justify-end w-full">
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
        <CarInsurance />,
        <Status type="Active" />,
        <span>10</span>,
        <span>2022/06/01 10:26:20</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div className="flex justify-end w-full">
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
        <CarInsurance />,
        <Status type="Declined" />,
        <span>10</span>,
        <span>2022/06/01 10:26:20</span>,
        <span>Payout</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div className="flex justify-end w-full">
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

  const VerifyData = {
    id: 3,
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

  const [status, setStatus] = React.useState<number>(1)
  const [tabs, setTabs] = useState<number>(0)
  const [dateFilter, setDateFilter] = useState<number>(0)
  const [search, setSearch] = useState('')
  const [selectItem, setselectItem] = useState()
  const handlerSearch = (text: any) => {
    setSearch(text)
  }

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const handlerLink = (item: any) => {
    setselectItem(item)
  }

  return (
    <div>
      <Header name="Assessment" overview={false} />
      <div className="flex justify-between items-center mb-5">
        <div className="overviews-pc">
          <span className="text-dark-300">Overview</span>
        </div>
        <FilterTabs
          changeTab={setStatus}
          currentTab={status}
          tabs={['ALL', 'LAST 7 DAYS', '30 DAYS', '1 YEAR']}
        />
      </div>

      <div className="grid  gap-[15px] sm:gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-[30px]">
        {overfiewCards.map(({ key, ...rest }) => (
          <AdminCard key={key} {...rest} />
        ))}
      </div>

      <div className="block sm:hidden mb-[10px] sm:mb-[20px]">
        <span className="overview-sm">Overview</span>
      </div>

      <div className="mb-[50px]">
        <div className="flex justify-between gap-4 items-center mb-5">
          <Tabs
            currentTab={tabs}
            changeTab={setTabs}
            tabs={['Claims', 'Search', 'Verify']}
          />
          {tabs === 0 && (
            <FilterTabs
              tabs={['ALL', 'ASSIGNED', 'ACTIVE', 'CLOSED', 'RECENT']}
              currentTab={dateFilter}
              changeTab={setDateFilter}
            />
          )}
          {tabs === 1 && (
            <FilterTabs
              tabs={['ALL', 'ACTIVE', 'RECENT']}
              currentTab={dateFilter}
              changeTab={setDateFilter}
            />
          )}
        </div>

        <div className="block max-[900px]:hidden">
          {tabs === 0 && (
            <>
              <Table {...claimsTable} />
            </>
          )}

          {tabs === 1 && (
            <>
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
              {search ? (
                <>
                  <Table {...searchTable} />
                </>
              ) : (
                <>
                  <div className="flex mt-[20px]">
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
          {tabs === 2 && (
            <>
              <div className="flex w-[265px]">
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
                    <Table options={[]} {...VerifyData} />
                  </div>
                </>
              ) : (
                <> </>
              )}
              <div>
                {!search ? (
                  <>
                    <div className="flex mt-[20px]">
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
          )}
        </div>

        {/* Moblie */}
        <div className="hidden max-[900px]:block">
          {tabs === 0 && (
            <>
              <div className="flex table-search-bar w-full">
                <SearchField width={'w-full'} />{' '}
                <button
                  role="button"
                  type="button"
                  className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end"
                  onClick={toggleDrawer}
                >
                  Filter
                </button>
              </div>
              <React.Fragment>
                <TableCard
                  id={ClaimsCover.id}
                  title={ClaimsCover.title}
                  icon={ClaimsCover.icon}
                  status="Declined"
                  subIcon={ClaimsCover.subIcon}
                  menuIcon={ClaimsCover.menuIcon}
                  data={ClaimsCover.data}
                  btnText={ClaimsCover.btnText}
                  btnIcon={ClaimsCover.btnIcon}
                  drawerTitle={ClaimsCover.drawerTitle}
                  endicon={ClaimsCover.endicon}
                  option={ClaimsCover.options}
                />
                <TableCard
                  id={ClaimsCover.id}
                  title={ClaimsCover.title}
                  icon={ClaimsCover.icon}
                  status="Declined"
                  subIcon={ClaimsCover.subIcon}
                  menuIcon={ClaimsCover.menuIcon}
                  data={ClaimsCover.data}
                  btnText={ClaimsCover.btnText}
                  btnIcon={ClaimsCover.btnIcon}
                  drawerTitle={ClaimsCover.drawerTitle}
                  endicon={ClaimsCover.endicon}
                  option={ClaimsCover.options}
                />
                <TableCard
                  id={ClaimsCover.id}
                  title={ClaimsCover.title}
                  icon={ClaimsCover.icon}
                  status="Declined"
                  subIcon={ClaimsCover.subIcon}
                  menuIcon={ClaimsCover.menuIcon}
                  data={ClaimsCover.data}
                  btnText={ClaimsCover.btnText}
                  btnIcon={ClaimsCover.btnIcon}
                  drawerTitle={ClaimsCover.drawerTitle}
                  endicon={ClaimsCover.endicon}
                  option={ClaimsCover.options}
                />
                <TableCard
                  id={ClaimsCover.id}
                  title={ClaimsCover.title}
                  icon={ClaimsCover.icon}
                  status="Declined"
                  subIcon={ClaimsCover.subIcon}
                  menuIcon={ClaimsCover.menuIcon}
                  data={ClaimsCover.data}
                  btnText={ClaimsCover.btnText}
                  btnIcon={ClaimsCover.btnIcon}
                  drawerTitle={ClaimsCover.drawerTitle}
                  endicon={ClaimsCover.endicon}
                  option={ClaimsCover.options}
                />
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
                    {['All', 'Voted', 'Active', 'Closed'].map((item: any) => {
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
                    <TableCard
                      id={SearchCover.id}
                      title={SearchCover.title}
                      icon={SearchCover.icon}
                      status="Declined"
                      subIcon={SearchCover.subIcon}
                      menuIcon={SearchCover.menuIcon}
                      data={SearchCover.data}
                      btnText={SearchCover.btnText}
                      btnIcon={SearchCover.btnIcon}
                      drawerTitle={SearchCover.drawerTitle}
                      endicon={SearchCover.endicon}
                      option={ClaimsCover.options}
                    />
                    <TableCard
                      id={SearchCover.id}
                      title={SearchCover.title}
                      icon={SearchCover.icon}
                      status="Declined"
                      subIcon={SearchCover.subIcon}
                      menuIcon={SearchCover.menuIcon}
                      data={SearchCover.data}
                      btnText={SearchCover.btnText}
                      btnIcon={SearchCover.btnIcon}
                      drawerTitle={SearchCover.drawerTitle}
                      endicon={SearchCover.endicon}
                      option={ClaimsCover.options}
                    />
                    <TableCard
                      id={SearchCover.id}
                      title={SearchCover.title}
                      icon={SearchCover.icon}
                      status="Declined"
                      subIcon={SearchCover.subIcon}
                      menuIcon={SearchCover.menuIcon}
                      data={SearchCover.data}
                      btnText={SearchCover.btnText}
                      btnIcon={SearchCover.btnIcon}
                      drawerTitle={SearchCover.drawerTitle}
                      endicon={SearchCover.endicon}
                      option={ClaimsCover.options}
                    />
                    <TableCard
                      id={SearchCover.id}
                      title={SearchCover.title}
                      icon={SearchCover.icon}
                      status="Declined"
                      subIcon={SearchCover.subIcon}
                      menuIcon={SearchCover.menuIcon}
                      data={SearchCover.data}
                      btnText={SearchCover.btnText}
                      btnIcon={SearchCover.btnIcon}
                      drawerTitle={SearchCover.drawerTitle}
                      endicon={SearchCover.endicon}
                      option={ClaimsCover.options}
                    />
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
          {tabs === 2 && (
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
                    <TableCard
                      id={VerifyCover.id}
                      title={VerifyCover.title}
                      icon={VerifyCover.icon}
                      status="Declined"
                      subIcon={VerifyCover.subIcon}
                      menuIcon={VerifyCover.menuIcon}
                      data={VerifyCover.data}
                      btnText={VerifyCover.btnText}
                      btnIcon={VerifyCover.btnIcon}
                      drawerTitle={VerifyCover.drawerTitle}
                      endicon={VerifyCover.endicon}
                      option={VerifyCover.options}
                    />
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
                  <div className="flex">
                    <div className="text-3xl font-amaranth flex-grow">
                      {/* <p className="mb-5 verify-title">Or</p> */}
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
                              className="w-[24px]"
                              src="/images/dark-menu.svg"
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
                        <a href={'/'}>
                          <img src="/images/Group (6).svg" alt="" />
                        </a>
                        <a href={'/'}>
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
              )}
            </>
          )}

          {tabs === 2 && (
            <>
              {width > 600 ? (
                <></>
              ) : (
                <>
                  {/* <div className="flex table-search-bar w-full">
              <SearchField width={"w-full"} text="Search ..." onSearch={handlerSearch}/>{" "}
                <button role="button" type="button" className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end"  onClick={toggleDrawer}>
                  Filter
                </button>
              </div>  */}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Assessement
