import React, { useState, useEffect } from 'react'
import { UserContext } from '../../../App'
import Button from '../Button'
import { useWeb3React } from '@web3-react/core'
import { connectorsByName } from './connectors'
import { useContext } from 'react'
import { createContext } from 'react'
import Web3 from 'web3'
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { useSelector, useDispatch } from 'react-redux'
import { login, updateUser } from '../../../redux/user'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../../tableland'
import { doc, onSnapshot, getDocs, collection } from 'firebase/firestore'
import {
  getUserDetails,
  db,
  createUser,
  checkIfUserExists,
} from '../../../database'
import { getUserData } from '../../../api'

import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import {
  ConnectorNames,
  testNetworkChainId,
  testNetworkRPC,
  mainNetworkChainId,
  mainNetworkRPC,
} from './constants'

export const Web3ProviderContext = createContext<IWeb3ProviderContext>({
  connectedAccount: '',
  balance: '',
})

declare global {
  interface Window {
    ethereum?: any
    BinanceChain?: any
    web3?: any
  }
}

interface NetworkDetails {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

interface User {
  canModifyKYC: boolean
  kycVerificationState: string
  notifications: Array<any>
}

// interface ConnectWalletProps {
//   onClose?: () => void
// }
const polygonNetwork = {
  chainId: '0x89',
  chainName: 'MATIC',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
}

const harmony = {
  chainId: '0x63564c40',
  rpcUrls: ['https://api.harmony.one'],
  chainName: 'Harmony Mainnet',
  nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
  blockExplorerUrls: ['https://explorer.harmony.one'],
  iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png'],
}

const avaxNetwork = {
  chainId: '0xa86a',
  chainName: 'Avalanche Mainnet',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
}
const binanceNetwork = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
}

const rinkeby = {
  chainId: '0x4',
  chainName: 'Rinkeby Test Network',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.ankr.com/eth_rinkeby'],
  blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
}

const ethereumNetwork = {
  chainId: '0x1',
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [`https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`],
  blockExplorerUrls: ['https://etherscan.io/'],
}

const localhostNetwork = {
  chainId: '0x7a69', // 0x539 is the hexadecimal representation of 1337
  chainName: 'Localhost',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['http://localhost:8545'], // Adjust the port if your Hardhat network uses a different port
  blockExplorerUrls: [], // Localhost doesn't usually have a block explorer
}

const goerliNetwork = {
  chainId: '0x5', // 0x539 is the hexadecimal representation of 1337
  chainName: 'Goerli',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli.infura.io/v3/feabfe61cc34425dae943b13d19d6f07'], // Adjust the port if your Hardhat network uses a different port
  blockExplorerUrls: ['https://goerli.etherscan.io/'], // Localhost doesn't usually have a block explorer
}

const sepoliaNetwork = {
  chainId: '0x66eee', // 0x539 is the hexadecimal representation of 1337
  chainName: 'Arbitrum Sepolia',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'], // Adjust the port if your Hardhat network uses a different port
  blockExplorerUrls: ['https://sepolia.arbiscan.io/'], // Localhost doesn't usually have a block explorer
}

const networks = [
  {
    id: 34523,
    icon: '/images/bsc.svg',
    text: 'BSC',
    chainId: '0x38',
  },
  {
    id: 34524,
    icon: '/images/Group.svg',
    text: 'AVAX',
    chainId: '0xa86a',
  },

  // {
  //   id: 34526,
  //   icon: '/images/Group-29.svg',
  //   text: 'ETH',
  //   chainId: '0x1',
  // },
  // {
  //   id: 34526,
  //   icon: '/images/Group-29.svg',
  //   text: 'LCH',
  //   chainId: '0x7a69',
  // },
  {
    id: 34526,
    icon: '/images/Group-29.svg',
    text: 'sepolia',
    chainId: '0x66eee',
  },
  {
    id: 34527,
    icon: '/images/Group (1).svg',
    text: 'MATIC',
    chainId: '0x89',
  },
]

const wallet = [
  {
    id: 4534,
    icon: '/images/Group 172.svg',
    text: 'Meta Mask',
  },
  {
    id: 4535,
    icon: '/images/Group 175.svg',
    text: 'Binance Wallet',
  },
  {
    id: 4536,
    icon: '/images/Group 173.svg',
    text: 'Wallet Connect',
  },
  {
    id: 4537,
    icon: '/images/Group 176.svg',
    text: 'Portis',
  },
  {
    id: 4538,
    icon: '/images/Group 174.svg',
    text: 'Trust Wallet',
  },
  {
    id: 4539,
    icon: '/images/Group 177.svg',
    text: 'Coinbase',
  },
]

interface ConnectWalletProps {
  walletName: any
  setWalletName: any
  onClose?: () => void
  onActivationChange: (isActive: boolean) => void
  onWalletConnect: (isActive: boolean) => void
}
interface IWeb3ProviderContext {
  connectedAccount: string
  balance: string
}

function ConnectWallet(
  {
    walletName,
    setWalletName,
    onClose,
    onActivationChange,
    onWalletConnect,
  }: ConnectWalletProps,
  props: any
) {
  const { activate, deactivate, active, chainId, account, connector } =
    useWeb3React()
  const navigate = useNavigate()
  const { connected } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const { library } = useWeb3React()
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [checkboxValue, setData] = useState('')
  const [activeButtonId, setActiveButtonId] = useState(null)
  const [newNetwork, setNetwork] = useState({})
  const [newChainId, setNewChainId] = useState('')
  const [title, setTitle] = useState(true)

  useEffect(() => {
    const storedSignature = localStorage.getItem('signature')
    if (active && account && library && !storedSignature) {
      const signMessage = async () => {
        const messageToSign = 'Welcome to Kover App' // replace with your own message
        setMessage(messageToSign)
        const signer = library.getSigner(account)

        try {
          const signature = await signer.signMessage(messageToSign)
          // handle signature...
          setSignature(signature)
          localStorage.setItem('signature', signature)
        } catch (error) {
          // show error message...
          onActivationChange(true)
          deactivate()
        }
        //const balance = await library.provider.getBalance(account)
      }

      signMessage()
    }
    // else {
    //   onClose?.()
    // }
  }, [active])

  useEffect(() => {
    if (account) {
      checkIfUserExists(account).then(async (exists) => {
        console.log(exists)
        if (!exists) {
          console.log('Started creating account: ', account)
          await createUser(account)
        }
        getUserDetails(account).then(async (user) => {
          var data = { ...user }
          if (user.kycVerificationState !== 'unverified') {
            const apiData = await getUserData(account)
            data = { ...apiData, ...data }
          }
          user
            ? dispatch(
                login({
                  verified: false,
                  data: {
                    address: account,
                    ...data,
                  },
                })
              )
            : dispatch(
                login({
                  verified: false,
                  data: {
                    address: account,
                  },
                })
              )

          const unsub = onSnapshot(
            doc(db, 'users', account.toLowerCase()),
            (doc) => {
              dispatch(
                updateUser({
                  data: { ...data, ...doc.data() },
                })
              )
            }
          )
          if (
            account === '0xCaB5F6542126e97b76e5C9D4cF48970a3B8AC0AD' ||
            user.insureProVerificationState === 'verified'
          ) {
            navigate('/kyc-application')
          }
        })
      })
      if (window.ethereum) {
        const ethereum = window.ethereum

        // Listen for wallet change events
        ethereum.on('accountsChanged', function (accounts: any) {
          window.location.href = '/'
        })
      }
    }
  }, [account])

  const handleButtonClick = (id: any, chainId: any) => {
    setActiveButtonId(id)
    switchToNewNetwork(chainId) // assuming this function is defined elsewhere
  }

  const handleWalletConnect = async (currentConnector: any) => {
    // onClose?.()
    setTitle(false)
    let provider
    switch (currentConnector.name) {
      case 'CoinBase':
        if (
          window.ethereum &&
          window.ethereum.providers &&
          window.ethereum.providers.length > 0
        ) {
          provider = window.ethereum.providers.find(
            ({ isCoinbaseWallet }: any) => isCoinbaseWallet
          )
          window.ethereum.setSelectedProvider(provider)
          await walletConnect(currentConnector)
        } else {
          await walletConnect(currentConnector)
        }
        break
      case 'Metamask':
        if (window.ethereum && window.ethereum.isMetaMask) {
          if (
            window.ethereum &&
            window.ethereum.providers &&
            window.ethereum.providers.length > 0
          ) {
            provider = window.ethereum.providers.find(
              ({ isMetaMask }: any) => isMetaMask
            )
            window.ethereum.setSelectedProvider(provider)

            await walletConnect(currentConnector)
          } else {
            await walletConnect(currentConnector)
          }
        } else {
          setWalletName('Metamask')
          onWalletConnect(true)
        }
        break
      case 'Trust Wallet':
        if (window.ethereum && window.ethereum.isTrust) {
          if (
            window.ethereum &&
            window.ethereum.providers &&
            window.ethereum.providers.length > 0
          ) {
            provider = window.ethereum.providers.find(
              ({ isTrust }: any) => isTrust
            )
            window.ethereum.setSelectedProvider(provider)

            await walletConnect(currentConnector)
          } else {
            await walletConnect(currentConnector)
          }
        } else {
          setWalletName('Trust')
          onWalletConnect(true)
        }
        break
      case 'Portis':
        try {
          await activate(currentConnector.connector)
        } catch (error) {
          console.error('Error connecting to wallet:', error)
          onActivationChange(true)
          onClose?.()
          // Display an error message to the user
        }
        // console.log(Portis)
        // provider = new Web3Provider(currentConnector.connector.provider);
        break
      case 'WalletConnect':
        try {
          const walletConnector = new WalletConnectConnector({
            // rpc: {
            //   [testNetworkChainId.binance]: testNetworkRPC.binance,
            //   [testNetworkChainId.polygon]: testNetworkRPC.polygon,
            //   [mainNetworkChainId.ethereum]: mainNetworkRPC.ethereum,
            //   [mainNetworkChainId.binance]: mainNetworkRPC.binance,
            //   [mainNetworkChainId.polygon]: mainNetworkRPC.polygon,
            //   [mainNetworkChainId.avax]: mainNetworkRPC.avax,
            //   [testNetworkChainId.avax]: testNetworkRPC.avax,
            // },
            // qrcodeModalOptions: {
            //   mobileLinks: ['metamask'],
            // },
          })

          activate(walletConnector)
        } catch (error) {
          console.error('Error connecting to wallet:', error)
          onActivationChange(true)
          onClose?.()
          // Display an error message to the user
        }

        break
      case 'Binance Wallet':
        try {
          if (window.BinanceChain) {
            await activate(currentConnector.connector)
          } else {
            setWalletName('Binance')
            onWalletConnect(true)
          }
        } catch (error) {
          console.error('Error connecting to wallet:', error)
          onActivationChange(true)
          onClose?.()
          // Display an error message to the user
        }
        break
    }
    onClose?.()
  }

  async function walletConnect(currentConnector: any) {
    try {
      await activate(currentConnector.connector)
    } catch (error) {
      console.log('Error Dey')
      console.error('Error connecting to wallet:', error)
      onActivationChange(true)
      onClose?.()
      return
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: newChainId }], // chainId must be in hexadecimal numbers
      })
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [newNetwork],
          })
        } catch (error: any) {
          console.error('not connected ' + error.message)
          onActivationChange(true)
          deactivate()
          return
        }
      } else {
        console.error('not connected ' + error.message)
        return
      }
    }
  }
  async function switchToNewNetwork(chainId: string) {
    if (window.ethereum) {
      window.ethereum.selectedProvider = undefined
    }
    switch (chainId) {
      case '0x63564c40':
        // switchNetwork(harmony)
        setNetwork(harmony)
        setNewChainId('0x63564c40')
        break
      case '0x89':
        //switchNetwork(polygonNetwork)
        setNetwork(polygonNetwork)
        setNewChainId('0x89')
        break
      case '0x38':
        //switchNetwork(binanceNetwork)
        setNetwork(binanceNetwork)
        setNewChainId('0x38')
        break
      case '0xa86a':
        //switchNetwork(avaxNetwork)
        setNetwork(avaxNetwork)
        setNewChainId('0xa86a')
        break
      case '0x1':
        //switchNetwork(ethereumNetwork)
        setNetwork(ethereumNetwork)
        setNewChainId('0x1')
        break
      case '0x7a69':
        setNetwork(localhostNetwork)
        setNewChainId('0x7a69')
        break
      case '0x66eee':
        setNetwork(sepoliaNetwork)
        setNewChainId('0x66eee')
        break
      case '0x4':
        // switchNetwork(rinkeby)
        setNetwork(rinkeby)
        setNewChainId('0x4')
        break

      default:
        throw new Error(`Unsupported wallet "${wallet}"`)
    }
  }

  const { theme } = React.useContext(UserContext)
  return (
    <div className="dark:text-dark-800 dark:text-primary-100 dark:bg-white wallet-popup">
      <div className="flex justify-end mb-2.5">
        <button type="button" onClick={onClose} title="close-button">
          <img className="w-2.5 h-2.5" src="/images/Group 144.svg" alt="" />
        </button>
      </div>
      <div className="flex flex-col items-center text-center">
        <img
          src={
            theme === 'dark'
              ? '/images/blackLogo1.svg'
              : '/images/blackLogo1.svg'
          }
          alt=""
        />
        <b className="wallet-title dark:wallet-title-dark mt-[17px]">
          Connect Wallet
        </b>
        {title ? (
          <p className="wallet-sub-title mt-[2px]">To start using Kover App</p>
        ) : (
          <div className="wallet-sub-title mt-[2px]">
            Connecting
            <span className="dot-pulse"></span>
          </div>
        )}
      </div>
      <div className="mt-[24px]">
        <p className="popup-title mb-[2px]">1. Choose Network</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] items-center">
          {networks.map(({ id, chainId, ...rest }) => (
            <Button
              onClick={() => handleButtonClick(id, chainId)}
              key={id}
              className={`  ${
                theme === 'dark'
                  ? `${
                      activeButtonId === id
                        ? 'active-btn-b'
                        : 'dark:light-btn dark:hover:light-btn-hover'
                    }   wallet-btn-text-dark `
                  : `${
                      activeButtonId === id
                        ? 'active-btn-g '
                        : 'pop-btn-border-dark dark-btn'
                    } wallet-btn-text  hover:dark-btn-hover `
              }  `}
              {...rest}
              btnText={'wallet-btn-text dark:wallet-btn-text-dark'}
            />
          ))}
        </div>
        <p className="popup-title mt-[19px]">2. Choose WALLET</p>

        <div className="grid grid-cols-2 max-[320px]:grid-cols-2 max-[375px]:grid-cols-2 md:grid-cols-2 gap-4 mt-[2px]">
          {connectorsByName.map((connector: any, key: number) => {
            const clickCallback = () => {
              handleWalletConnect(connector)
            }

            // const clickDisconnet=()=> handleWalletDisconnect()

            return checkboxValue ? (
              <button
                key={key}
                onClick={() => clickCallback()}
                type="button"
                className="h-[50px] min-w-[100px]  break-normal general-text-12 flex justify-between gap-[10px] items-center bg-dark-800 hover:bg-dark-100  duration-100 dark:light-btn-border dark:bg-white dark:hover:bg-light-1100 border-radius-2x choose-waller-btn"
              >
                <img
                  className="w-6 md:w-auto wallet-sub-button-icon"
                  src={connector.icon}
                  alt={connector.name}
                />
                <span className="flex-grow text-left wallet-sub-btn-text dark:wallet-sub-btn-text-dark">
                  {connector.name}
                </span>
                <img
                  className="popup-icon"
                  src={
                    theme === 'dark'
                      ? '/images/013.svg'
                      : '/images/Mask (13).svg'
                  }
                  alt=""
                />
              </button>
            ) : (
              <button
                key={key}
                onClick={() => clickCallback()}
                type="button"
                className="h-[50px] min-w-[100px]  break-normal general-text-12 flex justify-between gap-[10px] items-center bg-dark-800 hover:bg-dark-100  duration-100 dark:light-btn-border dark:bg-white dark:hover:bg-light-1100 border-radius-2x choose-waller-btn"
              >
                <img
                  className="w-6 md:w-auto wallet-sub-button-icon"
                  src={connector.icon}
                  alt={connector.name}
                />
                <span className="flex-grow text-left wallet-sub-btn-text dark:wallet-sub-btn-text-dark">
                  {connector.name}
                </span>
                <img
                  className="popup-icon"
                  src={
                    theme === 'dark'
                      ? '/images/013.svg'
                      : '/images/Mask (13).svg'
                  }
                  alt=""
                />
              </button>
            )
          })}
        </div>
        <div className=" mt-[20px] term-text dark:term-text-dark text-center ">
          {/* <Agreament
            variety="checkbox"
            agree="Terms of Use"
            agreeURL="/"
            text=" By connecting, I accept Kover's"
            classname="term-text dark:term-text-dark"
            updateData={updateData}
          /> */}
          <h3 className="text-brand-400">
            Need help connecting a <a href="/app">wallet?</a>
          </h3>

          <p className="fs-12">
            Wallets are provided by External Providers and by selecting you
            agree to Terms of those Providers. Your access to the wallet might
            be reliant on the External Provider being operational
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet
