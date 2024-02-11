import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../../App'
import MobileNav from '../../layout/navbar/MobileNav'
import Popup from '../../templates/Popup'
import Alert from '../Alert'
import Button from '../Button'
import ConnectWallet from '../connect-wallet/ConnectWallet'
import IconButton from '../IconButton'
import Logo from '../Logo'
import SearchField from '../SearchField'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { connectorsByName } from '../connect-wallet/connectors'
import Blockies from 'react-blockies'
import AccountTransactions from '../account-transactions/AccountTransactions'
import Web3 from 'web3'
import { getUser } from '../../../tableland'

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
  //   id: 34525,
  //   icon: '/images/Group-29.svg',
  //   text: 'HAR',
  //   chainId: '0x63564c40',
  // },
  {
    id: 34526,
    icon: '/images/Group-29.svg',
    text: 'ETH',
    chainId: '0x01',
  },
  {
    id: 34527,
    icon: '/images/Group (1).svg',
    text: 'MATIC',
    chainId: '0x89',
  },
  // {
  //   id: 34528,
  //   icon: '/images/Group-29.svg',
  //   text: 'RIN',
  //   chainId: '0x4',
  // },
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
  chainId: '0x01',
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
  blockExplorerUrls: ['https://etherscan.io/'],
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

interface HeaderProps {
  name: string
  showBackAero?: boolean
  overview?: boolean
}

function Header({ name, showBackAero, overview }: HeaderProps) {
  let navigate = useNavigate()
  showBackAero = showBackAero || false
  overview = overview || false
  const [connectWallet, setConnectWallet] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [walletErrorMessage, setWalletErrorMessage] = useState(false)
  const toggleConnectWallet = () => setConnectWallet((v) => !v)
  const toggleErrorAlert = () => setErrorMessage((v) => !v)
  const toggleWalletErrorAlert = () => setWalletErrorMessage((v) => !v)
  const [toogle, setToogle] = useState(false)
  const [languagetoogle, setLanguagetoogle] = useState(false)
  const [supportMenu, setsupportMenu] = useState(false)
  const [moreMenu, setmoreMenu] = useState(false)
  const ref = useRef<any>()
  const { activate, deactivate, active, chainId, account, connector, library } =
    useWeb3React()
  const [icon, setIcon] = useState(null)
  const [popAccount, setAccount] = useState(false)
  const toggleAccount = () => setAccount((v) => !v)
  const [balance, setBalance] = useState('')
  const [maticToken, setMaticToken] = useState('')
  const [isError, setIsError] = useState(false)
  const [isWalletError, setIsWalletError] = useState(false)
  const [walletName, setWalletName] = useState('')

  function truncateAddress(address: any) {
    const prefixLength = 6
    const suffixLength = 4
    const truncated = `${address.slice(0, prefixLength)}...${address.slice(
      -suffixLength
    )}`
    return truncated
  }

  useEffect(() => {
    if (account && library) {
      const web3 = new Web3(library.provider)
      web3.eth.getBalance(account).then((balance: any) => {
        const etherBalance = web3.utils.fromWei(balance, 'ether')
        setBalance(etherBalance)
      })
      if (chainId && chainId === 0x89) {
        setMaticToken('MATIC')
      }
      if (chainId && chainId === 0x38) {
        setMaticToken('BNB')
      }
      if (chainId && chainId === 0xa86a) {
        setMaticToken('AVAX')
      }
      if (chainId && chainId === 0x1) {
        setMaticToken('ETH')
      }
    }
  }, [account, library])

  const handleWalletDisconnect = () => {
    console.log(connector)
    deactivate()
  }

  // async function switchToNewNetwork(chainId: string) {
  //   switch (chainId) {
  //     case '0x63564c40':
  //       switchNetwork(harmony)

  //       console.log(chainId)
  //       console.log(window.ethereum.providerMap)
  //       break
  //     case '0x89':
  //       switchNetwork(polygonNetwork)
  //       console.log(account)
  //       break
  //     case '0x38':
  //       switchNetwork(binanceNetwork)
  //       console.log(account)
  //       console.log(library)
  //       break
  //     case '0xa86a':
  //       switchNetwork(avaxNetwork)
  //       console.log(account)
  //       break
  //     case '0x1':
  //       switchNetwork(ethereumNetwork)

  //       break
  //     case '0x4':
  //       switchNetwork(rinkeby)
  //       break

  //     default:
  //       throw new Error(`Unsupported wallet "${wallet}"`)
  //   }
  // }
  // const switchNetwork = async (networkDetails: NetworkDetails) => {
  //   try {
  //     console.log('switch started')
  //     console.log(networkDetails.chainId)
  //     await library.provider.request({
  //       method: 'wallet_switchEthereumChain',
  //       params: [{ chainId: networkDetails.chainId }],
  //     })
  //     console.log('switch end')
  //     console.log(library)
  //   } catch (switchError: any) {
  //     // 4902 error code indicates the chain is missing on the wallet
  //     console.log('switch error' + switchError.message)
  //     if (switchError.code === 4902) {
  //       console.log(switchError.code)
  //       try {
  //         console.log(library)

  //         await library.provider.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [networkDetails],
  //         })
  //       } catch (error: any) {
  //         console.error('not connected ' + error.message)
  //       }
  //     }
  //   }
  // }

  const { handleThemeSwitch, theme, connectwallet, connectWalletHandle } =
    React.useContext(UserContext)

  const handleSupportMenu = () => {
    setsupportMenu((prev) => !prev)
  }
  const handleAboutMenu = () => {
    setmoreMenu((prev) => !prev)
  }
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (supportMenu && ref.current && !ref.current.contains(e.target)) {
        setsupportMenu(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [supportMenu])

  useEffect(() => {
    const checkIfClickedOutsides = (e: any) => {
      if (moreMenu && ref.current && !ref.current.contains(e.target)) {
        setmoreMenu(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutsides)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutsides)
    }
  }, [moreMenu])

  const handleLanguage = () => {
    languagetoogle ? setLanguagetoogle(false) : setLanguagetoogle(true)
  }

  const showToast = () => {
    toast(
      <Alert
        id={1}
        variant={'Successful'}
        classname={'text-black z-99'}
        title={'Transaction Successful'}
        tag1={'50 USDC Deposited'}
        tag2={'View on etherscan'}
      />
    )
  }

  const location = useLocation()
  const clickDisconnet = () => handleWalletDisconnect()
  const truncatedAddress = truncateAddress(`${account}`)
  const handleChildComponentActivation = (isError: boolean) => {
    setIsError(isError)
    setErrorMessage(isError)
  }

  const handleWalletComponentActivation = (isWalletError: boolean) => {
    setIsWalletError(isWalletError)
    setWalletErrorMessage(isWalletError)
  }

  return (
    <React.Fragment>
      <Popup
        onClose={toggleErrorAlert}
        visible={errorMessage}
        maxWidth="max-w-[474px] w-full "
      >
        <Alert
          onClose={toggleErrorAlert}
          id={2}
          variant={'Failed'}
          classname={'text-black'}
          title={'Wallet Connection Rejected'}
          tag1={'Wallet Connection rejected'}
          tag2={''}
        />
      </Popup>

      <Popup
        onClose={toggleWalletErrorAlert}
        visible={walletErrorMessage}
        maxWidth="max-w-[474px] w-full "
      >
        <Alert
          onClose={toggleWalletErrorAlert}
          id={2}
          variant={'Failed'}
          classname={'text-black'}
          title={'Wallet Error'}
          tag1={`${walletName} wallet not installed!`}
          tag2={''}
        />
      </Popup>

      {toogle && <MobileNav setToogle={setToogle} toogle={toogle} />}
      <header className="items-center gap-10 mt-5 my-7 mobile-menu">
        <div className="block">
          <div className="flex justify-between">
            <Logo />
            <div className="grid grid-cols-2">
              <div onClick={showToast}>
                <IconButton
                  badge={2}
                  className="bg-dark-400 hover:bg-dark-500"
                  icon={
                    theme === 'dark'
                      ? '/images/message-light.svg'
                      : '/images/Group 165.svg'
                  }
                />
              </div>
              <img
                src={
                  theme === 'dark'
                    ? './images/menuToggle.svg'
                    : './images/menu toggle.svg'
                }
                className="mt-2 ml-3"
                alt=""
                onClick={() => {
                  setToogle(!toogle)
                }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between pt-6 ">
            <div className="flex flex-row">
              {showBackAero ? (
                <div className="flex justify-start mr-[24px]">
                  <img
                    onClick={() => navigate(-1)}
                    src={
                      theme === 'dark'
                        ? '/images/leftAeroBlack.svg'
                        : '/images/leftBackWhiteAero.svg'
                    }
                    alt=""
                  />
                </div>
              ) : (
                ''
              )}
              <div className="flex justify-start sm:px-3">
                <span className="text-6xl font-light">{name}</span>
              </div>
            </div>
            {overview ? (
              <div className="flex justify-end text-center justify-items-center">
                <h5 className="text-xl text-dark-300 w-max lg:block">
                  Overview
                </h5>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
      <header className="mt-[37px] mb-[40px] gap-10 justify-between items-center flex-wrap desktop-menu">
        <div className="flex items-center gap-5 justify-between max-w-[500px] flex-1">
          <span className="text-6xl font-light">{name}</span>
          {/* <div className="block">
            <SearchField width={'w-[250px]'} />
          </div> */}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative" ref={ref}>
            <Button
              className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800 w-[119px]"
              icon="/images/mask (6).svg"
              text="Support"
              btnText="support-btn"
              onClick={handleSupportMenu}
            />
            {supportMenu && (
              <div
                className={`bg-dark-800 absolute top-10 square z-10  dark:bg-light-1100 w-full`}
              >
                <div className="flex flex-col gap-3 px-6 py-4">
                  <Link to="/" className="block hover:no-underline">
                    <div className="flex flex-row gap-2 hover:text-[#606166]">
                      <img src="/images/Navbar-icon-b-1.svg" alt="" />{' '}
                      <span className="header-tag">Telegram </span>
                    </div>
                  </Link>
                  <Link to="/" className="block hover:no-underline">
                    <div className="flex flex-row gap-2 hover:text-[#606166]">
                      <img src="/images/Navbar-icon-b-2.svg" alt="" />{' '}
                      <span className="header-tag">Discord </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Button
            className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
            text="0 KVER"
            btnText="balance-btn"
          />
          {/* {location.pathname === "/claim-assessment" ? (
            <div className="flex items-center">
              <Button
                className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
                text="72.40 ETH"
                btnText="connect-wallet-btn"
              />
              <Button
                className="dark:text-primary-100 dark:bg-light-1100 bg-[#1D2024]"
                text="0xBBB6...e96e"
                btnText="connect-wallet-btn"
                endIcon="/images/60.svg"
              />
            </div>
          ) : (
            <>{ active===false && !connectWallet?(<Button
              className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
              text="Connect to Wallet"
              onClick={() => {
                toggleConnectWallet();
              }}
              btnText="connect-wallet-btn"
            />):(<Button
            className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
            text={`${account}`}
            onClick={() => clickDisconnet()}
            btnText="connect-wallet-btn"
          />)}
              
            </>
          )} */}
          {active === true ? (
            <div className="flex items-center">
              <Button
                className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
                text={`${balance} ${maticToken}`}
                btnText="connect-wallet-btn"
              />
              <Button
                className="dark:text-primary-100 dark:bg-light-1100 bg-[#1D2024] "
                text={`${truncatedAddress}`}
                onClick={() => setAccount(true)}
                btnText="connect-wallet-btn"
                avtIcon={`${account}`}

                // endIcon={`https://etherscan.io/address/${account}.svg`}
              />
              {/* <img src={`https://api.multiavatar.com/${account}.png`}  alt="Wallet Icon" /> */}
              {/* <img style={{width:"50px"}} src={`https://avatars.dicebear.com/api/identicon/${account}.svg`} /> */}
            </div>
          ) : (
            <>
              <Button
                className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
                text="Connect to Wallet"
                onClick={() => {
                  toggleConnectWallet()
                }}
                btnText="connect-wallet-btn"
              />
            </>
          )}

          {/* {theme === 'dark' ? (
            <Button
              className="dark:bg-light-1100"
              icon="/images/lite.svg"
              btnText="header-tab"
              onClick={() => handleThemeSwitch()}
            />
          ) : (
            <Button
              className="bg-dark-800"
              icon="/images/Vector (2).svg"
              btnText="header-tab"
              onClick={() => handleThemeSwitch()}
            />
          )} */}

          <div className="relative">
            {theme === 'dark' ? (
              <Button
                className="dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
                icon="/images/threedots.svg"
                onClick={handleAboutMenu}
              />
            ) : (
              <Button
                className="dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
                icon="/images/dot-more.svg"
                onClick={handleAboutMenu}
              />
            )}
            {moreMenu && (
              <div
                className={`bg-dark-800 absolute top-10 square z-11   dark:bg-light-1100 w-[120px] right-[2%]`}
              >
                <div className="flex flex-col gap-3 py-4 px-[20px]">
                  <Link to="/" className="block hover:no-underline">
                    <div className="flex flex-row gap-2 hover:text-[#606166]">
                      <img src="/images/About.svg" alt="" />
                      <span className="header-tag">About</span>
                    </div>
                  </Link>
                  <Link to="/" className="block hover:no-underline">
                    <div className="flex flex-row gap-2 hover:text-[#606166]">
                      <img src="/images/KYC.svg" alt="" />
                      <span className="header-tag">KYC</span>
                    </div>
                  </Link>
                  <Link
                    to="/"
                    className="block hover:no-underline"
                    onClick={() => {
                      handleLanguage()
                    }}
                  >
                    <div className="flex flex-row gap-2 hover:text-[#606166]">
                      <img src="/images/Language.svg" alt="" />
                      <span className="header-tag">Language</span>
                    </div>
                  </Link>
                  <Link to="/" className="block hover:no-underline">
                    <div className="flex flex-row gap-2 hover:text-[#606166]">
                      <img src="/images/Docs.svg" alt="" />
                      <span className="header-tag">Docs</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          {languagetoogle ? (
            <>
              {moreMenu && (
                <div
                  className={`bg-dark-800 absolute  square z-11   dark:bg-light-1100 w-[120px] top-[42px] right-[1px]`}
                >
                  <div className="flex flex-col gap-3 py-4 px-[20px]">
                    <Link
                      to="/"
                      className="block hover:no-underline"
                      onClick={() => {
                        handleLanguage()
                      }}
                    >
                      <div className="flex flex-row gap-2 hover:text-[#606166]">
                        <img
                          src={
                            theme === 'dark'
                              ? '/images/backAero.svg'
                              : '/images/dark-backAero.svg'
                          }
                          alt=""
                        />
                        <span className="header-tag">Back</span>
                      </div>
                    </Link>
                    <Link to="/" className="block hover:no-underline">
                      <div className="flex flex-row gap-2 hover:text-[#606166]">
                        <img src="/images/language_1.svg" alt="" />
                        <span className="header-tag hover:text-[#50ff7f] dark:hover:text-[#000]">
                          English
                        </span>
                      </div>
                    </Link>

                    <Link to="/" className="block hover:no-underline">
                      <div className="flex flex-row gap-2 hover:text-[#606166]">
                        <img src="/images/language_2.svg" alt="" />
                        <span className="header-tag hover:text-[#50ff7f] dark:hover:text-[#000]">
                          Spanish
                        </span>
                      </div>
                    </Link>

                    <Link to="/" className="block hover:no-underline">
                      <div className="flex flex-row gap-2 hover:text-[#606166]">
                        <img src="/images/language_3.svg" alt="" />
                        <span className="header-tag hover:text-[#50ff7f] dark:hover:text-[#000]">
                          French
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </header>

      <Popup
        onClose={toggleConnectWallet}
        visible={connectWallet}
        maxWidth="max-w-[474px] w-full "
      >
        <ConnectWallet
          walletName={walletName}
          setWalletName={setWalletName}
          onClose={toggleConnectWallet}
          onActivationChange={handleChildComponentActivation}
          onWalletConnect={handleWalletComponentActivation}
        />
      </Popup>
      <Popup
        onClose={toggleAccount}
        visible={popAccount}
        maxWidth="max-w-[400px] w-full"
      >
        <AccountTransactions onClose={toggleAccount} />
      </Popup>
    </React.Fragment>
  )
}

export default Header
