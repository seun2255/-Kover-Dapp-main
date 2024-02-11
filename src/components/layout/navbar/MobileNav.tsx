import { Scrollbars } from 'react-custom-scrollbars-2'
import Logo from '../../common/Logo'
import { Link } from 'react-router-dom'
import Pages from './pages/Pages'
import React, { useState, useEffect } from 'react'
import Button from '../../common/Button'
import Popup from '../../templates/Popup'
import Alert from '../../common/Alert'
import ConnectWallet from '../../common/connect-wallet/ConnectWallet'
import { UserContext } from '../../../App'
import { useLocation } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import AccountTransactions from '../../common/account-transactions/AccountTransactions'

interface MobileNavProps {
  setToogle: any
  toogle: any
}

function MobileNav({ toogle, setToogle }: MobileNavProps) {
  const { theme, handleThemeSwitch, connectwallet, connectWalletHandle } =
    React.useContext(UserContext)
  const { activate, deactivate, active, chainId, account, connector, library } =
    useWeb3React()
  const [errorMessage, setErrorMessage] = useState(false)
  const [walletErrorMessage, setWalletErrorMessage] = useState(false)
  const toggleErrorAlert = () => setErrorMessage((v) => !v)
  const toggleWalletErrorAlert = () => setWalletErrorMessage((v) => !v)
  const [isError, setIsError] = useState(false)
  const [isWalletError, setIsWalletError] = useState(false)
  const [walletName, setWalletName] = useState('')
  const [connectWallet, setConnectWallet] = useState(false)
  const [languagetoogle, setLanguagetoogle] = useState(false)
  const [balance, setBalance] = useState('')
  const [maticToken, setMaticToken] = useState('')
  const toggleConnectWallet = () => setConnectWallet((v) => !v)
  const [popAccount, setAccount] = useState(false)
  const toggleAccount = () => setAccount((v) => !v)
  const location = useLocation()
  const handleLanguage = () => {
    languagetoogle ? setLanguagetoogle(false) : setLanguagetoogle(true)
  }

  useEffect(() => {
    if (account && library) {
      const web3 = new Web3(library.provider)
      web3.eth.getBalance(account).then((balance:any) => {
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

  function truncateAddress(address: any) {
    const prefixLength = 6
    const suffixLength = 4
    const truncated = `${address.slice(0, prefixLength)}...${address.slice(
      -suffixLength
    )}`
    return truncated
  }

  const truncatedAddress = truncateAddress(`${account}`)

  const handleWalletDisconnect = () => {
    console.log(connector)
    deactivate()
  }
  const clickDisconnet = () => handleWalletDisconnect()

  const handleChildComponentActivation = (isError: boolean) => {
    setIsError(isError)
    setErrorMessage(isError)
  }

  const handleWalletComponentActivation = (isWalletError: boolean) => {
    setIsWalletError(isWalletError)
    setWalletErrorMessage(isWalletError)
  }

  return (
    <nav className="block w-[100%] z-[30000] bg-dark-600 fixed left-0 top-0 bottom-0 mobile-menu dark:bg-white">
      <Scrollbars
        className="h-screen w-full track-vertical flex flex-col justify-between"
        renderThumbVertical={({ style, ...props }) => (
          <div {...props} className="w-full rounded bg-white bg-opacity-20" />
        )}
      >
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
        <div className="flex justify-between flex-col mt-[35px]">
          <div className="px-[40px]">
            <button
              type="button"
              className="float-right"
              onClick={() => {
                setToogle(!toogle)
              }}
            >
              <img className="w-2.5" src="./images/Group 158.svg" alt="" />
            </button>
            <Logo />
          </div>
          <div
            className="px-[40px] flex justify-between items-center mt-[30px]"
            style={{
              background:
                'linear-gradient(90deg, #2A2B31 0%, rgba(42,43,49,0)42.13%)',
            }}
          >
            {/* <div className="w-[141px]">
              <span className="dark:text-white w-[141px]">
                {' '}
                {location.pathname === '/claim-assessment'
                  ? '72.40 USDC'
                  : '00.00 USDC'}{' '}
              </span>
            </div> */}

            {active === true ? (
              <>
                <Button
                  className={`${
                    theme === 'dark' ? 'dark:text-dark-800' : 'dark:text-white'
                  } rounded-[2px] mobile-connect-wallet-btn dark:mobile-connect-wallet-btn-dark w-[141px]`}
                  text={`${balance} ${maticToken}`}
                />

                <Button
                  className={`${
                    theme === 'dark' ? 'dark:text-dark-800' : 'dark:text-white'
                  } rounded-[2px] mobile-connect-wallet-btn dark:mobile-connect-wallet-btn-dark w-[141px]`}
                  text={`${truncatedAddress}`}
                  onClick={() => setAccount(true)}
                  avtIcon={`${account}`}
                />
              </>
            ) : (
              <>
                {' '}
                <Button
                  className={`${
                    theme === 'dark' ? 'dark:text-dark-800' : 'dark:text-white'
                  } rounded-[2px] mobile-connect-wallet-btn dark:mobile-connect-wallet-btn-dark w-[141px]`}
                />
                <Button
                  className={`${
                    theme === 'dark'
                      ? 'dark:text-dark-800  border'
                      : 'border border-[#50ff7f] dark:text-white'
                  } rounded-[2px] mobile-connect-wallet-btn dark:mobile-connect-wallet-btn-dark w-[141px]`}
                  text="Connect Wallet"
                  onClick={toggleConnectWallet}
                />
              </>
            )}
          </div>

          {languagetoogle ? (
            <>
              <div className="flex flex-col gap-[20px] py-[30px] px-[40px]">
                <Link
                  to="/"
                  className="block hover:no-underline"
                  onClick={() => {
                    handleLanguage()
                  }}
                >
                  <div
                    className="flex flex-row gap-2 hover:text-[#606166]"
                    onClick={() => {
                      handleLanguage()
                    }}
                  >
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
            </>
          ) : (
            <>
              <div>
                <Pages />
              </div>
              <hr className="mx-[40px] my-[24px]" />
              <div className="flex flex-col justify-between px-[40px] gap-[8px]">
                <Link to={'#'} className="hover:no-underline">
                  <p className="mobile-menu-tag dark:mobile-menu-tag-dark">
                    ABOUT
                  </p>
                </Link>

                <Link to={'#'} className="hover:no-underline">
                  <p className="mobile-menu-tag dark:mobile-menu-tag-dark">
                    KYC
                  </p>
                </Link>

                <Link
                  to={'#'}
                  className="hover:no-underline"
                  onClick={() => {
                    handleLanguage()
                  }}
                >
                  <p className="mobile-menu-tag dark:mobile-menu-tag-dark">
                    LANGUAGE
                  </p>
                </Link>

                <Link to={'#'} className="hover:no-underline">
                  <p className="mobile-menu-tag dark:mobile-menu-tag-dark">
                    DOCS
                  </p>
                </Link>

                <Link to={'#'} className="hover:no-underline">
                  <p className="mobile-menu-tag dark:mobile-menu-tag-dark">
                    VERIFY POLICY
                  </p>
                </Link>
              </div>

              <hr className="mx-[40px] my-[24px]" />

              <div className="flex px-[40px] gap-3 mb-[62px]">
                {theme === 'dark' ? (
                  <Button
                    className="fit-content"
                    icon="/images/lite.svg"
                    onClick={() => handleThemeSwitch()}
                  />
                ) : (
                  <Button
                    className="fit-content"
                    icon="/images/sun.svg"
                    onClick={() => handleThemeSwitch()}
                  />
                )}
                <span
                  className="general-text"
                  onClick={() => handleThemeSwitch()}
                >
                  SWITCH TO DARK MODE
                </span>
              </div>
            </>
          )}

          <Popup
            onClose={toggleConnectWallet}
            visible={connectWallet}
            maxWidth="max-w-[474px] w-full"
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
        </div>
      </Scrollbars>
    </nav>
  )
}
export default MobileNav
