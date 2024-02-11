import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../../App'
import Alert from '../../common/Alert'
import IconButton from '../../common/IconButton'
import Logo from '../../common/Logo'
import Pages from './pages/Pages'

function Navbar() {
  const { theme } = React.useContext(UserContext)
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
  return (
    <React.Fragment>
      <nav className="w-[164px] bg-dark-600 fixed left-0 top-0 bottom-0 desktop-menu">
        <Scrollbars
          className="flex flex-col justify-between w-full h-screen track-vertical"
          renderThumbVertical={({ style, ...props }) => (
            <div {...props} className="w-full bg-white rounded bg-opacity-20" />
          )}
        >
          <div className="flex sm:flex gap-[157px] flex-col h-full dark:text-dark-800 dark:text-primary-100 dark:bg-light-200">
            <div className="">
              <div className="flex ml-[2px] sm:flex justify-center my-9 mt-[40px]">
                <Logo />
              </div>
              <div>
                <Pages />
              </div>
            </div>
            <div className="flex justify-center p-9" onClick={showToast}>
              <IconButton
                badge={1}
                className={
                  theme === 'dark'
                    ? 'dark:bg-dark-400 dark:hover:bg-dark-400'
                    : 'bg-dark-400 hover:bg-dark-500'
                }
                icon="/images/Group 165.svg"
              />
            </div>
          </div>
        </Scrollbars>
      </nav>
      <ToastContainer autoClose={false} draggablePercent={60} limit={5} />
    </React.Fragment>
  )
}
export default Navbar
