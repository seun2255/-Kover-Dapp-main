import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import FilterTabs from '../../components/common/FilterTabs'
import Header from '../../components/common/header/Header'
import PopConfirm, {
  PopConfirmProps,
} from '../../components/common/pop-confirm/PopConfirm'
import CarInsurance from '../../components/common/Table/components/CarInsurance'
import LargeText from '../../components/common/Table/components/LargeText'
import Status from '../../components/common/Table/components/Status'
import Table, { TableProps } from '../../components/common/Table/Table'
import Tabs from '../../components/common/Tabs'
import Popup from '../../components/templates/Popup'
import Adjustor from './Adjustor'
import { UserContext } from '../../App'
import SearchField from '../../components/common/SearchField'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import TableCard from '../../components/common/cards/TableCard/TableCard'
import ClaimsCard from '../../components/common/cards/ClaimsCard'
import Pagination from '../../components/common/Pagination'
import Drawer from 'react-modern-drawer'
import { get_claims, getClaimData } from '../../api'
import { getUser } from '../../tableland'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { openAlert, closeAlert } from '../../redux/alerts'
import StakingPopup from '../Staking/StakePopup'
import { getUserDetails } from '../../database'
import TableOptions from '../../components/common/Table/TableOptions/TableOptions'
import { getUsersStakes } from '../../api'
import { useWeb3React } from '@web3-react/core'
import TableSkeleton from '../../components/common/Table/TableSkeleton'

function Claims() {
  const [select, setSelect] = useState(false)
  const toggleSelect = () => setSelect((v) => !v)
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const { theme } = React.useContext(UserContext)
  const { width } = useWindowDimensions()
  const [tabs, setTabs] = useState<number>(0)
  const [dateFilter, setDateFilter] = useState<number>(0)
  const [stake, setStake] = useState<number>(0)
  const toggleStake = () => setStake((v) => (v === 0 ? 1 : 0))
  const [selectItem, setselectItem] = useState()
  const handlerLink = (item: any) => {
    setselectItem(item)
  }
  const { account } = useWeb3React()
  const [claims, setClaims] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [stakingPools, setStakingPools] = useState<any[]>([
    {
      name: 'KVER Pool',
      interestRate: '10%',
      releaseDate: '------------------',
      capital: '0',
      action: 'Stake',
      active: true,
      iconLight: '/images/light-diamond.svg',
      iconDark: '/images/logo-start.svg',
    },
  ])

  const getStakingData = async () => {
    const stakes = await getUsersStakes(account as string)
    var pools = [
      {
        name: 'KVER Pool',
        interestRate: '10%',
        releaseDate: '------------------',
        capital: '0',
        action: 'Stake',
        active: true,
        iconLight: '/images/light-diamond.svg',
        iconDark: '/images/logo-start.svg',
      },
    ]

    stakes.map((stake: any) => {
      var newStake = stake
      newStake.capital = stake.amount
      newStake.action = 'Unstake'
      newStake.iconLight = '/images/light-diamond.svg'
      newStake.iconDark = '/images/logo-start.svg'
      newStake.name = 'KVER Pool'
      newStake.interestRate = '10%'

      if (stake.dateObject < new Date()) {
        newStake.active = true
      } else {
        newStake.active = false
      }

      pools.push(newStake)
    })

    setStakingPools(pools)
    setLoading(false)
  }

  const getData = async () => {
    if (account) {
      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const claims = await get_claims('NG')
      const axiosRequests = claims.map(async (claim) => {
        const user = await getUser(claim.address)
        const response = await axios.get(user.data as string)
        var result = response.data
        console.log('Got here 10')
        const claim_details = await getClaimData(claim.poolName, claim.address)
        result = {
          ...result,
          ...claim,
          ...claim_details,
          userData: user.data,
        }
        return result
      })
      const allClaims = await Promise.all(axiosRequests)
      const validationClaims = allClaims.filter(
        (item) => item.stage === 'validation'
      )
      setClaims(validationClaims)
      // })
    }
  }

  useEffect(() => {
    getData()
    getStakingData()
  }, [])

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
        data: 'Vote',
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
    options: [{ name: 'Deposit' }, { name: 'Withdraw' }],
  }

  const claimsTable: TableProps = {
    options: [{ name: 'Vote' }, { name: 'Hide' }],
    columns: [
      {
        name: '',
        width: '',
      },
      {
        name: 'POLICY TYPE',
        width: 'w-[18.82%]',
      },
      {
        name: 'STATUS',
        width: 'w-[12.63%]',
      },
      {
        name: 'CLAIM ID',
        width: 'w-[7.87%]',
      },
      {
        name: 'DATE',
        width: 'w-[20.52%]',
      },
      {
        name: 'STAGE',
        width: 'w-[7.17%]',
      },
      {
        name: 'CLAIM AMOUNT',
        width: 'w-[15.78%]',
      },
      {
        name: 'ACTION',
        width: 'w-[121px]',
      },
    ],
    rows: claims.map((application: any, index: number) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Vote' }, { name: 'Hide' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" />,
        <span>{application.claimId}</span>,
        <span className="prp dark:prp-dark">2022/06/01 00:00:00</span>,
        <span>{application.stage}</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          <Button
            to={`/claim-assessment/${application.claimId}`}
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
      ]
    }),
  }

  const stakePopup: PopConfirmProps = {
    id: 4,
    title: 'Stake',
    datam: {
      tabs: [
        {
          text: 'Stake',
        },
        {
          text: 'Unstake',
        },
      ],
      data: [
        {
          cover: {
            id: 4,
            card: {
              icon: `${theme === 'dark' ? '/images/57.svg' : '/images/56.svg'}`,
              name: 'KVER Pool',
              subIcon: '/images/Group 284.svg',
            },
            purchase: '',
            totalPolicies: '4551',
            totalPoliciesName: 'Total Stakers',
          },
          table: {
            rows: [
              {
                text: 'TVL',
                icon: true,
              },
              {
                text: 'APR',
                icon: true,
              },
              {
                text: 'Lock Period',
                icon: false,
              },
            ],
            columns: ['$7,000,087.5 ', '3,16%', '---'],
          },
          dayTab: true,
          prpInput: {
            infoText: {
              text: 'Total',
            },
            placeholder: '00.00',
            action: {
              text: 'USDC',
            },
          },
          inputMax: {
            placeholder: '00.00',
            action: true,
          },
          warning: 'Funds cannot be withdrawn until end of the lock period',
          balance: '10.42 USDC',
          disclaimer:
            'Cryptocurrency prices are subject to high market risk and price volatility. You should only invest in products that you are familiar with and where you understand the associated risks.',
        },
        {
          cover: {
            id: 4,
            card: {
              icon: `${theme === 'dark' ? '/images/57.svg' : '/images/56.svg'}`,
              name: 'KVER Pool',
              subIcon: '/images/Group 284.svg',
            },
            purchase: '',
            totalPolicies: '4551',
            totalPoliciesName: 'Total Stakers',
          },
          table: {
            rows: [
              {
                text: 'TVL',
                icon: true,
              },
              {
                text: 'APR',
                icon: true,
              },
              {
                text: 'Lock Period',
                icon: false,
              },
            ],
            columns: ['$7,000,087.5 ', '3,16%', '14 days'],
          },
          dayTab: true,
          prpInput: {
            infoText: {
              text: 'Total',
            },
            placeholder: '00.00',
            action: {
              text: 'USDC',
            },
          },
          inputMax: {
            placeholder: '00.00',
          },
          warning: 'Your wallet is empty. Please purchase or transfer assets',
          balance: '10.42 USDC',
          disclaimer:
            'Cryptocurrency prices are subject to high market risk and price volatility. You should only invest in products that you are familiar with and where you understand the associated risks.',
        },
      ],
    },
  }

  const validatorTable: TableProps = {
    options: [{ name: 'Deposit' }, { name: 'Withdraw' }],
    columns: [
      {
        name: '',
        width: '',
      },
      {
        name: 'NAME',
        width: 'w-[16%]',
      },
      {
        name: 'CHAIN',
        width: 'w-[16%]',
      },
      {
        name: 'APR',
        width: 'w-[16%]',
      },
      {
        name: 'ENTRY DATE',
        width: 'w-[23%]',
      },
      {
        name: 'CAPITAL',
        width: 'w-[17%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: stakingPools.map((pool: any, index: number) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Deposit' }, { name: 'Withdraw' }]} />
        </div>,
        <CarInsurance
          text={pool.name}
          icon={
            theme === 'dark'
              ? '/images/logo-start.svg'
              : '/images/logo-start.svg'
          }
        />,
        <img src={theme === 'dark' ? pool.iconDark : pool.iconLight} alt="" />,
        <span>{pool.interestRate}</span>,
        <span>{pool.entryDate}</span>,
        <LargeText primary={pool.capital} secondary="USDC" />,
        <div>
          <Button
            className="gap-2.5 dark:bg-white dark:box-border w-[120px]"
            text={pool.action}
            endIcon={
              pool.action === 'Stake'
                ? theme === 'dark'
                  ? '/images/62.svg'
                  : '/images/61.svg'
                : theme === 'dark'
                ? '/images/63.svg'
                : '/images/grey-ok-circle-btn.svg'
            }
            onClick={toggleStake}
            color={
              pool.action === 'Stake' && pool.active === true
                ? theme === 'dark'
                  ? 'whiteBgBtn'
                  : 'greenGradient'
                : theme === 'dark'
                ? 'whiteBgBtn'
                : 'grey-gradient'
            }
            disabled={!pool.active}
            btnText="stake"
          />
        </div>,
      ]
    }),
  }

  return (
    <div>
      <Header name="Claims" showBackAero={false} overview={true} />
      <div className="flex items-center justify-between mb-5">
        <span className="claim-title">
          {tabs === 0 && (
            <>
              {' '}
              {width < 600
                ? 'Earn rewards by becoming a Claims Validator'
                : 'Overview'}{' '}
            </>
          )}
          {tabs === 1 && <> Earn rewards by becoming a Claims Validator </>}
          {tabs === 2 && <> Earn rewards by becoming a Claims Adjuster </>}
        </span>
        {(tabs === 1 || tabs === 2) && (
          <Link
            to="/"
            className="hidden text-lg font-bold text-brand-300 sm:block"
          >
            How it works
          </Link>
        )}
      </div>

      {/* Moblie */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-4">
          <Tabs
            currentTab={tabs}
            changeTab={setTabs}
            tabs={['Claims', 'Validator', 'Adjuster']}
          />
          {tabs === 0 && (
            <FilterTabs
              tabs={['ALL', 'VOTED', 'ACTIVE', 'CLOSED', 'RECENT']}
              currentTab={dateFilter}
              changeTab={setDateFilter}
            />
          )}
        </div>

        {width >= 1000 ? (
          <>
            <div className="block max-[1000px]:hidden">
              {tabs === 0 &&
                (loading ? (
                  <TableSkeleton {...claimsTable} />
                ) : (
                  <Table {...claimsTable} />
                ))}
              {tabs === 1 && <Table {...validatorTable} />}
              {tabs === 2 && <Adjustor />}
            </div>
          </>
        ) : (
          <>
            <div className="hidden max-[1000px]:block mt-[20px]">
              {tabs === 0 && (
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
                    <TableCard
                      id={ClaimsCover.id}
                      title={ClaimsCover.title}
                      icon={ClaimsCover.icon}
                      status="Ongoing"
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
                      status="Accepted"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                      status="Ongoing"
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
                        {['All', 'Voted', 'Active', 'Closed'].map(
                          (item: any) => {
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
                          }
                        )}
                      </div>
                    </div>
                  </Drawer>
                  <div className="flex justify-center">
                    <Pagination />
                  </div>
                </>
              )}

              {tabs === 1 && (
                <>
                  <div className="flex w-full table-search-bar">
                    <SearchField width={'w-full'} />{' '}
                    <button
                      type="button"
                      className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
                    >
                      Filter
                    </button>
                  </div>
                  <ClaimsCard
                    icon={
                      theme === 'dark'
                        ? '/images/dark-diamond.svg'
                        : '/images/light-diamond.svg'
                    }
                  />
                  <ClaimsCard
                    icon={
                      theme === 'dark' ? '/images/59.svg' : '/images/58.svg'
                    }
                  />
                  <ClaimsCard
                    icon={
                      theme === 'dark'
                        ? '/images/dark-diamond.svg'
                        : '/images/light-diamond.svg'
                    }
                  />
                  <ClaimsCard
                    button={true}
                    icon={
                      theme === 'dark' ? '/images/59.svg' : '/images/58.svg'
                    }
                  />
                </>
              )}

              {tabs === 2 && (
                <>
                  <Adjustor />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <Popup
        maxWidth="max-w-[900px]"
        onClose={toggleStake}
        visible={Boolean(stake)}
      >
        {/* <StakingPopup
          defaultTab={stake === 2 ? 1 : 0}
          onClose={toggleStake}
          {...stakePopup}
          action={getStakingData}
        /> */}
      </Popup>
    </div>
  )
}

export default Claims
