import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../../App'
import IconButton from '../../common/IconButton'
import Logo from '../../common/Logo'
import Pages from './pages/Pages'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Navbar() {
  const { theme } = React.useContext(UserContext)
  const { user, connected } = useSelector((state: any) => state.user)

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
            <Link to={connected ? '/notification' : '/'}>
              <div className="flex justify-center p-9">
                <IconButton
                  badge={user.notifications.length}
                  className={
                    theme === 'dark'
                      ? 'dark:bg-dark-400 dark:hover:bg-dark-400'
                      : 'bg-dark-400 hover:bg-dark-500'
                  }
                  icon="/images/Group 165.svg"
                />
              </div>
            </Link>
          </div>
        </Scrollbars>
      </nav>
    </React.Fragment>
  )
}
export default Navbar
