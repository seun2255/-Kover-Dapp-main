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
import { UserContext } from '../../App'
import SearchField from '../../components/common/SearchField'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import TableCard from '../../components/common/cards/TableCard/TableCard'
import ClaimsCard from '../../components/common/cards/ClaimsCard'
import Pagination from '../../components/common/Pagination'
import Drawer from 'react-modern-drawer'
import StakingPopup from './StakePopup'
import TableOptions from '../../components/common/Table/TableOptions/TableOptions'
import { getUsersStake } from '../../api'
import { useWeb3React } from '@web3-react/core'

function Staking() {
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
  const [stakingPools, setStakingPools] = useState<any[]>([])

  const stakingPoolsDetails = [
    {
      name: 'KVER Pool',
      interestRate: '10%',
      entryDate: '------------------',
      capital: '0',
      action: 'Stake',
      active: true,
      iconLight: '/images/light-diamond.svg',
      iconDark: '/images/logo-start.svg',
    },
    {
      name: 'KVER Pool',
      interestRate: '10%',
      entryDate: '------------------',
      capital: '0',
      action: 'Stake',
      active: false,
      iconLight: '/images/58.svg',
      iconDark: '/images/59.svg',
    },
    {
      name: 'KVER Pool',
      interestRate: '10%',
      entryDate: '------------------',
      capital: '0',
      action: 'Stake',
      active: false,
      iconLight: '/images/light-diamond.svg',
      iconDark: '/images/logo-start.svg',
    },
    {
      name: 'KVER Pool',
      interestRate: '10%',
      entryDate: '------------------',
      capital: '0',
      action: 'Stake',
      active: false,
      iconLight: '/images/58.svg',
      iconDark: '/images/59.svg',
    },
  ]

  const getData = async () => {
    const stake = await getUsersStake(account as string)

    if (stake.amount !== '0.0') {
      stakingPoolsDetails[0].capital = stake.amount
      stakingPoolsDetails[0].entryDate = stake.date
      stakingPoolsDetails[0].active = false
      stakingPoolsDetails[0].action = 'Unstake'
    }

    setStakingPools(stakingPoolsDetails)
  }

  useEffect(() => {
    getData()
  }, [])

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
      <Header name="Staking" showBackAero={false} overview={true} />
      <div className="flex items-center justify-between mb-5">
        <span className="claim-title">
          Earn extra rewards by Staking KOVER Tokens
        </span>

        <Link
          to="/"
          className="hidden text-lg font-bold text-brand-300 sm:block"
        >
          How it works
        </Link>
      </div>

      {/* Moblie */}
      <div className="mb-5">
        {width >= 1000 ? (
          <>
            <div className="block max-[1000px]:hidden">
              <Table {...validatorTable} />
            </div>
          </>
        ) : (
          <>
            <div className="hidden max-[1000px]:block mt-[20px]">
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
                  icon={theme === 'dark' ? '/images/59.svg' : '/images/58.svg'}
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
                  icon={theme === 'dark' ? '/images/59.svg' : '/images/58.svg'}
                />
              </>
            </div>
          </>
        )}
      </div>
      <Popup
        maxWidth="max-w-[900px]"
        onClose={toggleStake}
        visible={Boolean(stake)}
      >
        <StakingPopup
          defaultTab={stake === 2 ? 1 : 0}
          onClose={toggleStake}
          {...stakePopup}
          action={getData}
        />
      </Popup>
    </div>
  )
}

export default Staking
