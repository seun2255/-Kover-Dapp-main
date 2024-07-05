import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import pages from './pages.json'
import { UserContext } from '../../../../App'
import useWindowDimensions from '../../../global/UserInform/useWindowDimensions'
import { useSelector, useDispatch } from 'react-redux'
import { displayKycModal } from '../../../../redux/app'
import { useWeb3React } from '@web3-react/core'
import { getAdminAddress } from '../../../../api'

function Pages() {
  const location = useLocation()
  const path = location.pathname
  const dispatch = useDispatch()
  const { theme } = React.useContext(UserContext)
  const { connected, user } = useSelector((state: any) => state.user)
  const { width } = useWindowDimensions()
  const { account } = useWeb3React()
  const [admin, setAdmin] = useState('')

  useEffect(() => {
    const getData = async () => {
      const adminAdrress = await getAdminAddress()
      setAdmin(adminAdrress)
    }
    getData()
  })

  return (
    <ul
      className={`list-none flex-col gap-[1px] flex ${
        width > 699 ? 'mt-[85px]' : 'mt-[35px]'
      }`}
    >
      {pages.map(({ id, icon, url, name }, index) => {
        const current = index === 0 ? url === path : path.indexOf(url) >= 0
        var activeLink = connected ? url : '/'
        if (
          (url === '/dashboard' ||
            url === '/profile' ||
            url === '/insurance') &&
          account === admin
        ) {
          activeLink = '/'
        }

        return (
          <div key={index}>
            <li key={id} className="">
              <Link
                to={activeLink}
                onClick={() => {
                  connected &&
                  user.kycVerificationState === 'unverified' &&
                  account !== '0x0Af54e344C1DcC79B11C20768FDE1d79E99c6CC2'
                    ? dispatch(displayKycModal({ display: true }))
                    : dispatch(displayKycModal({ display: false }))
                }}
                className={`flex py-[18px] px-[40px] hover:no-underline items-center gap-3.5
                group uppercase dark:hover:side-selected-tab-light hover:side-selected-tab-dark
                ${
                  current
                    ? `${
                        theme === 'dark'
                          ? 'dark:side-selected-tab-light '
                          : 'side-selected-tab-dark'
                      }`
                    : 'menu-tag'
                }`}
              >
                {current === false && (
                  <img
                    src={theme === 'dark' ? icon[1] : icon[1]}
                    className="group-hover:hidden"
                    alt=""
                  />
                )}
                <img
                  src={theme === 'dark' ? icon[0] : icon[0]}
                  className={`svg-light-grey group-hover:block ${
                    current ? 'block' : 'hidden '
                  }`}
                  alt=""
                />

                {name}
              </Link>
            </li>
          </div>
        )
      })}
    </ul>
  )
}
export default Pages
