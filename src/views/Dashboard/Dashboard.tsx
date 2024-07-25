import React, { useState, useEffect } from 'react'
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
import Insured from './Insured'
import Score from './Score'
import Rewardstag from './Rewardstag'
import TableCard from '../../components/common/cards/TableCard/TableCard'
import { UserContext } from '../../App'
import Drawer from 'react-modern-drawer'
import Switch from '@mui/material/Switch'
import { Box } from '@mui/material'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import Alert from '../../components/common/Alert'
import { useWeb3React } from '@web3-react/core'
import {
  get_covers,
  getPolicyData,
  get_claims,
  getClaimData,
  getTokenBalance,
  getPolicyBalanceDetails,
  getPremiumContractInstance,
  getStakeRewards,
} from '../../api'
import { getUser } from '../../tableland'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { openAlert, closeAlert } from '../../redux/alerts'
import TableOptions from '../../components/common/Table/TableOptions/TableOptions'
import { getVotes } from '../../database'
import NewClaim from '../NewClaim/NewClaim'
import DepositModal from '../../components/common/DepositModal'
import getCurrencyData from '../../utils/currencyApi'
import Skeleton from 'react-loading-skeleton'
import TableSkeleton from '../../components/common/Table/TableSkeleton'

function Dashboard() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const [isOpen, setIsOpen] = React.useState(false)
  const { library, account } = useWeb3React()
  const [selectItem, setselectItem] = useState()
  const { width } = useWindowDimensions()
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const [selectedCover, setSelectedCover] = useState(6)

  const handlerLink = (item: any) => {
    setselectItem(item)
  }

  const { theme } = React.useContext(UserContext)
  const [tabs, setTabs] = useState<number>(0)
  const [dateFilter, setDateFilter] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const [popup, setPopup] = useState<PopConfirmProps | null>(null)
  const [covers, setCovers] = useState<any[]>([])
  const [claims, setClaims] = useState<any[]>([])
  const [votes, setVotes] = useState<any[]>([])
  const [claimForm, setClaimForm] = useState(false)
  const toggleForm = () => setClaimForm((v) => !v)
  const [balance, setBalance] = useState<any>(0)
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState<any>({
    activeCovers: 0,
    usdcData: {
      priceUSD: '---',
      priceEUR: '---',
      priceBTC: '---',
      percentChange: 0,
    },
    ethData: {
      priceUSD: '---',
      priceEUR: '---',
      priceBTC: '---',
      percentChange: 0,
    },
    btcData: {
      priceUSD: '---',
      priceEUR: '---',
      priceBTC: '---',
      percentChange: 0,
    },
  })

  const popupHandle = (data: any) => {
    setSelectedCover(data)
    data === null ? setPopup(null) : setPopup(myCoverPopup)
  }

  const closeForm = () => {
    setClaimForm(false)
  }

  const getData = async () => {
    if (account) {
      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const covers = await get_covers('NG')
      const axiosRequestsCovers = covers.map(async (cover) => {
        if (cover.address === account.toLowerCase()) {
          console.log('Here')
          const user = await getUser(cover.address)
          const response = await axios.get(user.data as string)
          var result = response.data
          var policyDetails = await getPolicyData(cover.address, cover.poolName)
          result = {
            ...result,
            ...cover,
            ...policyDetails,
            userData: user.data,
          }
          return result
        }
      })
      var allCovers = await Promise.all(axiosRequestsCovers)
      if (allCovers[0] === undefined) allCovers = []
      setCovers(allCovers)
      // })

      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const everyClaim: any = []
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
        everyClaim.push(result)
        if (claim.address === account.toLowerCase()) {
          return result
        }
      })
      var allClaims = await Promise.all(axiosRequests)
      if (allClaims[0] === undefined) allClaims = []
      setClaims(allClaims)
      console.log(allClaims)
      // })

      const myVotes: any[] = []
      everyClaim.map(async (claim: any) => {
        try {
          const allVotes = await getVotes(claim.claimId)
          console.log('ALL VOTES: ', allVotes)
          console.log(account)
          allVotes.map((vote: any) => {
            if (vote.voter === account) {
              myVotes.push(vote)
            }
          })
          setVotes(myVotes)
        } catch {
          console.log('Claim has no votes')
        }
      })

      const tokenBalance = await getTokenBalance(account)
      setBalance(Math.round(parseFloat(tokenBalance)))

      // const apiData = await axios.get('http://localhost:4000/get-crypto-rates')

      const policyBalances = await getPolicyBalanceDetails(
        account,
        'Car Insurance'
      )

      const rewards = await getStakeRewards(account)
      console.log('Rewards: ', rewards)

      const details = {
        activeCovers: allCovers.length,
        activeClaims: allClaims.length,
        usdcData: {
          priceUSD: '1.00',
          priceEUR: '0.9185',
          priceBTC: '0.0000',
          percentChange: '+0.0090',
        },
        ethData: {
          priceUSD: '3514.5930',
          priceEUR: '3227.9510',
          priceBTC: '0.0525',
          percentChange: '+0.8982',
        },
        btcData: {
          priceUSD: '66939.15',
          priceEUR: '61479.7470',
          priceBTC: 1,
          percentChange: '-0.5012',
        },
        policyBalance: policyBalances.policyBalance,
        premiumsPaid: policyBalances.premiumsPaid,
        rewards: rewards,
      }
      setUserDetails(details)
      setLoading(false)
    }
  }

  const attachListeners = async () => {
    // const premiumContract = await getPremiumContractInstance('Car Insurance')
    // console.log('attaching listener')
    // premiumContract.on('overnightAccounting', () => {
    //   console.log('Performed Overnight Accounting')
    //   alert('Was Triggered')
    //   getData()
    // })
    setInterval(() => {
      console.log('Performed Overnight Accounting')
      getData()
    }, 60000)
    console.log('Listener attached')
  }

  function capitalizeFirstLetter(inputString: any) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
  }

  const checkClaim = (application: any) => {
    if (application.resultStatus === 'pending') {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Claim is being Assesed',
            tag1: 'Claim has not been Assesed!',
            tag2: 'wait for the adjuster to asses the claim',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
    }
  }

  useEffect(() => {
    getData()
    attachListeners()
  }, [])

  //Policy State
  const policyState: { [key: string]: string } = {
    active: 'Policy Activated',
    inactive: 'Policy Inactive',
    user_decision_pending: 'Decision Pending',
    funds_pending: 'Funds Pending',
    paused: 'Policy Paused',
  }

  const myCover: TableProps = {
    tabs: tabs,
    options: [{ name: 'Claim' }, { name: 'Pause' }],
    data: covers,
    columns: [
      {
        name: '',
        width: '',
      },
      {
        name: 'NAME',
        width: 'w-[16%] ',
      },
      {
        name: 'STATUS',
        width: 'w-[19%] ',
      },
      {
        name: 'PRP',
        width: 'w-[18%] ',
      },
      {
        name: 'STAGE',
        width: 'w-[18%] ',
      },
      {
        name: 'POLICY SCR',
        width: 'w-[19%] ',
      },
      {
        name: 'ACTION',
        width: 'w-[9%] ',
      },
    ],
    rows: covers.map((cover, index) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions
            options={[
              {
                name: 'Claim',
                action: () => {
                  setClaimForm(true)
                },
              },
              { name: 'Pause' },
            ]}
          />
        </div>,
        <CarInsurance />,
        <Status type="Active" text="Active" />,
        <span className="prp dark:prp-dark">{cover.PRP}%</span>,
        <span className="prp dark:prp-dark">
          {policyState[cover.policyStatus]}
        </span>,
        <LargeText primary={cover.src} secondary="USDC" />,
        <div>
          <Button
            onClick={() => popupHandle(cover)}
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
      ]
    }),
  }

  const myClaims: TableProps = {
    tabs: tabs,
    options: [{ name: 'Claim' }, { name: 'Appeal' }],
    columns: [
      {
        name: '',
        width: '',
      },
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
        width: 'w-[17%]',
      },
      {
        name: 'STAGE',
        width: 'w-[8%]',
      },
      {
        name: 'CLAIM AMOUNT',
        width: 'w-[15%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: claims.map((application: any, index: number) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Claim' }, { name: 'Appeal' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" />,
        <span>{application.claimId}</span>,
        <span className="prp dark:prp-dark">{application.date}</span>,
        <span>{application.stage}</span>,
        <LargeText
          primary={application.estimatedLossAmount}
          secondary="USDC"
        />,
        <div>
          <Button
            to={
              application.stage === 'validation'
                ? `/claim-assessment/${application.claimId}`
                : application.resultStatus !== 'pending'
                ? `/claim-view-user/${application.claimId}`
                : undefined
            }
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            text="View"
            onClick={() => checkClaim(application)}
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

  const myBonds: TableProps = {
    tabs: tabs,
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
        name: 'STATUS',
        width: 'w-[19%]',
      },
      {
        name: 'APR',
        width: 'w-[18%]',
      },
      {
        name: 'ENTRY DATE',
        width: 'w-[29%]',
      },
      {
        name: 'CAPITAL',
        width: 'w-[19%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Deposit' }, { name: 'Withdraw' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" />,
        <span>10%</span>,
        <span>2022/06/01 10:26:20</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          <Button
            btnText="table-action"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            to="/bond"
            text="Manage"
            endIcon={theme === 'dark' ? '/images/logo3.svg' : '/images/011.svg'}
          />
        </div>,
      ],
      [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Deposit' }, { name: 'Withdraw' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Withdrawn" />,
        <span>10%</span>,
        <span>2022/06/01 10:26:20</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          <Button
            btnText="table-action"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            to="/bond"
            text="Manage"
            endIcon={theme === 'dark' ? '/images/logo3.svg' : '/images/011.svg'}
          />
        </div>,
      ],
      [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Deposit' }, { name: 'Withdraw' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" />,
        <span>10%</span>,
        <span>2022/06/01 10:26:20</span>,
        <LargeText primary="9.4000" secondary="USDC" />,
        <div>
          <Button
            btnText="table-action"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            to="/bond"
            text="Manage"
            endIcon={theme === 'dark' ? '/images/logo3.svg' : '/images/011.svg'}
          />
        </div>,
      ],
    ],
  }

  const myVotes: TableProps = {
    tabs: tabs,
    options: [{ name: 'Hide' }, { name: 'Rewards' }],
    columns: [
      {
        name: '',
        width: '',
      },
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
        name: 'STAGE',
        width: 'w-[13%]',
      },
      {
        name: 'CLAIM AMOUNT',
        width: 'w-[12%]',
      },
      {
        name: 'VERDICT',
        width: 'w-[10%]',
      },
      {
        name: 'FINAL VERDICT',
        width: 'w-[12%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: votes.map((vote: any, index: number) => {
      return [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Hide' }, { name: 'Rewards' }]} />
        </div>,
        <CarInsurance />,
        <Status type={vote.status === 'rejected' ? 'Declined' : 'Accepted'} />,
        <span>{vote.id}</span>,
        <span>{vote.stage}</span>,
        <LargeText primary={vote.claimAmount} secondary="USDC" />,
        <span>{vote.verdict ? 'Yes' : 'No'}</span>,
        <span>{vote.finalVerdict}</span>,
        <div>
          <Button
            to={`/claim-assessment/${vote.id}`}
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

  const WithdrawalRequests: TableProps = {
    tabs: tabs,
    options: [{ name: 'Cancel' }, { name: 'Claim' }],
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
        name: 'STATUS',
        width: 'w-[19%]',
      },
      {
        name: 'REQUEST DATE',
        width: 'w-[18%]',
      },
      {
        name: 'CLAIM AMOUNT',
        width: 'w-[20%]',
      },
      {
        name: 'CONVERT',
        width: 'w-[10%]',
      },
      {
        name: 'ACTION',
        width: 'w-[9%]',
      },
    ],
    rows: [
      [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Cancel' }, { name: 'Claim' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" text="Withdrawn" />,
        <span>2022/06/01 10:26:20</span>,
        <div>
          <div>
            <b className="daily-cost dark:daily-cost-dark">9.4000</b>&nbsp;
            <span className="">USDC</span>
          </div>
        </div>,

        // <LargeText primary="9.4000" secondary="USDC" />,

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
                  theme === 'dark' ? '#606166' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="1" />
          </Box>
        </div>,
        <>
          <Button
            btnText="table-action"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            to="/"
            text="Claim"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
          />
        </>,
      ],
      [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Cancel' }, { name: 'Claim' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" text="Ready" />,
        <span>2022/06/01 10:26:20</span>,
        <div>
          <div>
            <b className="daily-cost dark:daily-cost-dark">9.4000</b>&nbsp;
            <span className="">USDC</span>
          </div>
        </div>,
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
                  theme === 'dark' ? '#606166' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            <Switch className="convert-switch" id="2" />
          </Box>
        </div>,
        <>
          <Button
            btnText="table-action"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            to="/bond"
            text="Claim"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
          />
        </>,
      ],
      [
        <div className="w-6 -mr-6 min-w-[1.5rem]">
          <TableOptions options={[{ name: 'Cancel' }, { name: 'Claim' }]} />
        </div>,
        <CarInsurance />,
        <Status type="Active" text="Pending" />,
        <span>2022/06/01 10:26:20</span>,
        <div>
          <div>
            <b className="daily-cost dark:daily-cost-dark">9.4000</b>&nbsp;
            <span className="">USDC</span>
          </div>
        </div>,
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
                  theme === 'dark' ? '#606166' : 'rgba(148, 233, 63, 0.4)'
                } !important;`,
              },
            }}
          >
            {' '}
            <Switch className="convert-switch" id="3" />
          </Box>
        </div>,
        <>
          <Button
            btnText="table-action"
            className={theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'}
            to="/bond"
            text="Claim"
            endIcon={theme === 'dark' ? '/images/126.svg' : '/images/125.svg'}
          />
        </>,
      ],
    ],
  }

  const myCoverPopup: PopConfirmProps = {
    title: 'Cover ID 2565365...',
    id: 3,
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
      totalPolicies: '12/10/2022',
      totalPoliciesName: 'Purchase',
    },
    table: {
      rows: [
        {
          text: 'Certificate',
          icon: true,
        },
        {
          text: 'Daily Cost',
          icon: true,
        },
        {
          text: 'Cover Details',
          icon: false,
        },
      ],
      columns: ['Download', '0 USDC', <Link to="/">learn more</Link>],
    },
    prpInput: {
      infoText: {
        text: 'PRP',
      },
      defaultValue: '1500',
      placeholder: '00.00',
      action: {
        text: 'Edit',
      },
    },
    inputMax: {
      placeholder: '00.00',
      poolName: 'cake',
    },
    balance: '10.42 USDC',
    disclaimer:
      'Please ensure that the information you provide is correct, as any inaccurate or incomplete information may invalidate the policy and result in your claims being rejected or not paid in full',
  }

  const TabmyCover = {
    id: 1,
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

  const TabClaims = {
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

  const TabBonds = {
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

  const TabVotes = {
    id: 4,
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

  const TabWithdrawalRequests = {
    id: 5,
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

  return (
    <div className="z-10">
      <Header name="Dashboard" overview={true} />
      {/* {/* <Alert id={2} variant={"Failed"} classname={"text-black"} title={"Transaction Failed"} tag1={"Deposit 50 USDC Cancelled"} tag2={"View on etherscan"}/>  */}

      <div className="grid xl:grid-cols-[24.10%_50%_22.94%] lg:grid-cols-[24.10%_50%_22.94%] md:[100%] sm:[100%] md:mb-[30px] mb-[20px] gap-[20px] lg:gap-[20px]">
        <div>
          <h5 className="hidden sm:flex overview mb-[24px]">Overview</h5>
          <div className="flex flex-col gap-5 h-[305px]">
            {loading ? (
              <Skeleton height={'298px'} />
            ) : (
              <StatusInfo
                className="statusInfo"
                height="h-full"
                userDetails={userDetails}
              />
            )}
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-[24px]">
            <h5 className="my-rewards dark:my-rewards-dark">My rewards</h5>
            <Link to={'/insurance'}>
              <h5 className="get-insured dark:get-insured-dark hover:no-underline">
                Get insured
              </h5>
            </Link>
          </div>

          {width >= 600 ? (
            <>
              <div className="hidden  sm:grid grid-cols-[36.17%_61.16%] lg:grid-cols-[36.17%_60%] xl:grid-cols-[36.17%_60.1%] xxl:grid-cols-[36.17%_61.16%] gap-[20px]">
                <Rewardstag loading={loading} details={userDetails} />
                {loading ? (
                  <Skeleton height={'167px'} width={'260px'} />
                ) : (
                  <Score size="w-[90px]" />
                )}
                {loading ? (
                  <Skeleton height={'167px'} width={'440px'} />
                ) : (
                  <Insured />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex sm:hidden flex-col gap-[20px]">
                <Rewardstag loading={loading} details={userDetails} />
                <Score size="w-[100%]" />
                <Insured />
              </div>
            </>
          )}
        </div>

        <div className="lg:mt-[43px] xxl:w-[102.15%] xl:w-[100%] lg:w-[98%]">
          <div className="gap-5">
            {loading ? (
              <Skeleton height={'300px'} width={'338px'} />
            ) : (
              <MarketStatus currencyData={userDetails} />
            )}
          </div>
        </div>
      </div>
      <div className="block sm:hidden mb-[10px] sm:mb-[20px]">
        <span className="overview-sm">Overview</span>
      </div>

      <div className="mb-14">
        <div className="flex justify-between  items-center  sm:flex  sm:gap-9  max-[900px]:flex max-[900px]:flex-col">
          <Tabs
            currentTab={tabs}
            changeTab={setTabs}
            tabs={[
              'My Cover',
              'My Claims',
              'My Liquidity',
              'My Votes',
              'Withdrawal Requests',
            ]}
          />
          <FilterTabs
            tabs={['ALL', 'ACTIVE', 'RECENT']}
            currentTab={dateFilter}
            changeTab={setDateFilter}
          />
        </div>

        <div className="block max-[1200px]:hidden">
          {loading ? (
            <TableSkeleton {...myCover} tableId={0} />
          ) : (
            <>
              {tabs === 0 && <Table {...myCover} tableId={0} />}
              {tabs === 1 && <Table {...myClaims} />}
              {tabs === 2 && <Table {...myBonds} />}
              {tabs === 3 && <Table {...myVotes} />}
              {tabs === 4 && <Table {...WithdrawalRequests} />}
            </>
          )}
        </div>

        {/*<div className="hidden max-[1200px]:block">
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
                              id={TabmyCover.id}
                              title={TabmyCover.title}
                              icon={TabmyCover.icon}
                              status={item}
                              subIcon={TabmyCover.subIcon}
                              menuIcon={TabmyCover.menuIcon}
                              data={TabmyCover.data}
                              btnText={TabmyCover.btnText}
                              btnIcon={TabmyCover.btnIcon}
                              drawerTitle={TabmyCover.drawerTitle}
                              option={TabmyCover.options}
                              popupData={myCoverPopup}
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
                              id={TabBonds.id}
                              title={TabBonds.title}
                              icon={TabBonds.icon}
                              status={item}
                              subIcon={TabBonds.subIcon}
                              menuIcon={TabBonds.menuIcon}
                              data={TabBonds.data}
                              btnText={TabBonds.btnText}
                              btnIcon={TabBonds.btnIcon}
                              drawerTitle={TabBonds.drawerTitle}
                              option={TabBonds.options}
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
                              id={TabVotes.id}
                              title={TabVotes.title}
                              icon={TabVotes.icon}
                              status={item}
                              subIcon={TabVotes.subIcon}
                              menuIcon={TabVotes.menuIcon}
                              data={TabVotes.data}
                              btnText={TabVotes.btnText}
                              btnIcon={TabVotes.btnIcon}
                              drawerTitle={TabVotes.drawerTitle}
                              option={TabVotes.options}
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
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/images/box_empty.svg"
                  width={137}
                  height={107}
                  alt=""
                  className="mt-[10px]"
                />
                <span className="text-dark-500 text-3xl font-amaranth mt-[15px]">
                  Oops ! No results found
                </span>

                <div className="flex justify-center w-full">
                  <h3 className="empty-tag-2 mt-[20px] text-center">
                    If you purchased a cover, make sure the correct wallet is
                    connected to the app.
                  </h3>
                </div>
              </div>
            </>
          )}
          {tabs === 5 && (
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
                  {['Ready', 'Ready', 'Ready', 'Ready'].map(
                    (item: any, index) => {
                      return (
                        <>
                          <div>
                            <TableCard
                              id={TabWithdrawalRequests.id}
                              title={TabWithdrawalRequests.title}
                              status={item}
                              menuIcon={TabWithdrawalRequests.menuIcon}
                              data={TabWithdrawalRequests.data}
                              btnText={TabWithdrawalRequests.btnText}
                              btnIcon={TabWithdrawalRequests.btnIcon}
                              drawerTitle={TabWithdrawalRequests.drawerTitle}
                              option={TabWithdrawalRequests.options}
                              endicon={TabWithdrawalRequests.btnIcon}
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
                    Withdrawal Options
                  </span>
                  <div className="mt-[40px]">
                    {['Cancel Request', 'Claim Rewards'].map((item: any) => {
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
                                  <img
                                    src="images/right-aero-dark.svg"
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src="images/right-aero-dark-active.svg"
                                    alt=""
                                  />
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {selectItem === item ? (
                                    <img
                                      src="images/right-aero-active.svg"
                                      alt=""
                                    />
                                  ) : (
                                    <img src="images/right-aero.svg" alt="" />
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
        </div>*/}
      </div>
      {popup !== null && (
        <Popup
          onClose={() => popupHandle(null)}
          visible
          maxWidth="max-w-[860px]"
        >
          <DepositModal
            warning={popup.warning}
            dayTab={popup.dayTab}
            cover={popup.cover}
            prpInput={popup.prpInput}
            inputMax={popup.inputMax}
            balance={balance}
            disclaimer={popup.disclaimer}
            title={popup.title}
            onClose={() => popupHandle(null)}
            coverDetails={selectedCover}
          />
        </Popup>
      )}

      <Popup visible={claimForm} onClose={toggleForm} maxWidth="max-w-[910px]">
        <div className="kyc-popup">
          <div className="flex gap-5 mb-3.5">
            <div>
              <NewClaim onClose={closeForm} poolName="Car Insurance" />
            </div>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default Dashboard
