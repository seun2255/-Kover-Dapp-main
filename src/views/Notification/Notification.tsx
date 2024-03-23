import React from 'react'
import { UserContext } from '../../App'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import Rewards from '../Dashboard/Rewards'
import Score from '../Dashboard/Score'
import StatusInfo from '../Welcome/StatusInfo'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { convertLinkToText } from '../../utils/helpers'
import { updateNotifications } from '../../database'
import { useWeb3React } from '@web3-react/core'

function Notification() {
  const { theme } = React.useContext(UserContext)
  const { user } = useSelector((state: any) => state.user)
  const { account } = useWeb3React()

  interface Document {
    from: any
    link: string
    message: any
  }

  let navigate = useNavigate()

  function removeItemsWithLink(array: Document[], linkToRemove: string) {
    return array.filter((item) => item.link !== linkToRemove)
  }

  function truncateAddress(address: any) {
    const prefixLength = 6
    const suffixLength = 4
    const truncated = `${address.slice(0, prefixLength)}...${address.slice(
      -suffixLength
    )}`
    return truncated
  }

  return (
    <div>
      <Header name="Notification" showBackAero={true} overview={true} />
      <div className="mb-[20px] gap-[60px] hidden sm:flex black-btn black-btn">
        <div className="flex-grow">
          <Button
            onClick={() => navigate(-1)}
            icon={
              theme === 'dark'
                ? '/images/leftBlackAero.svg'
                : '/images/Mask (2ss).svg'
            }
            className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
            text="Back"
          />
        </div>

        <div className="flex items-end w-full max-w-[285px] hidden xl:flex">
          <h6 className="text-dark-300">Overview</h6>
        </div>
      </div>

      <div className="mb-10 lg:flex gap-[20px]">
        <div className="flex-grow">
          <div className="flex flex-col gap-5">
            {user.notifications.length === 0 && (
              <>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/images/box_empty.svg"
                    width={137}
                    height={107}
                    alt=""
                    className="mt-[30px]"
                  />
                  <span className="text-dark-500 text-3xl font-amaranth mt-[15px]">
                    Oops ! No results found
                  </span>
                </div>
              </>
            )}
            {user.notifications.map((notification: any, index: number) => (
              <>
                <div
                  className={` rounded px-[70px] py-[20px] hidden md:flex md:flex-col  box-border-2x-light dark:box-border-2x-dark bg-dark-600 dark:bg-white`}
                  key={index}
                >
                  <div className="flex gap-[18px] justify-between items-start">
                    <div className="flex gap-[18px]">
                      <div className="relative w-8 h-8">
                        {/* <img className="w-8 h-8" src={value.photo} alt="" /> */}
                        <img className="w-8 h-8" src="/images/83.svg" alt="" />
                        <img
                          className="absolute bottom-0 right-0"
                          src="/images/Group 223.svg"
                          alt=""
                        />
                      </div>
                      <div className="flex gap-[10px]">
                        <span className="notification-user-name">
                          {notification.from.name}
                          <span className=" ml-[10px] notification-comment">
                            {truncateAddress(notification.from.address)}
                          </span>{' '}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <span className="date-time">
                        {notification.message.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-[3px] ml-[50px]">
                    <p className="basis-2/5">{notification.message.text}</p>
                    <div className="flex items-end justify-end basis-2/5">
                      <span
                        className={`${
                          theme === 'dark'
                            ? 'notification-No-dark'
                            : 'notification-No'
                        } h-[16px] w-[16px]`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex mt-[20px] justify-between ml-[50px]">
                    <div className="flex gap-7">
                      {/* <button
                        className={`w-[120px] h-[35px] flex gap-[10px] items-center justify-center dark:bg-white bg-dark-600 dark:file-btn-dark ${
                          theme === 'dark'
                            ? `light-notification-btn`
                            : `photo-btn`
                        }`}
                      >
                        <img
                          className="w-[16.50px] h-[16.50px]"
                          src={value.icon1}
                          alt=""
                        />
                        <span className="file-btn-text">
                          {value.buttonText1}
                        </span>
                      </button> */}
                      <button
                        className={`w-[120px] h-[35px] flex gap-[10px] items-center justify-center dark:bg-white bg-dark-600 dark:file-btn-dark ${
                          theme === 'dark'
                            ? `light-notification-btn`
                            : `photo-btn`
                        }`}
                      >
                        <img
                          className="w-[16.50px] h-[16.50px]"
                          src="/images/delete.svg"
                          alt=""
                        />
                        <span className="file-btn-text">Decline</span>
                      </button>
                      <Link
                        to={notification.link}
                        onClick={() => {
                          console.log('This triggered')
                          var notifications = [...user.notifications]
                          const newNotifications = removeItemsWithLink(
                            notifications,
                            notification.link
                          )
                          console.log(newNotifications)
                          updateNotifications(account, newNotifications)
                        }}
                      >
                        <button
                          className={`w-[120px] h-[35px] photo-btn flex gap-[10px] items-center justify-center dark:bg-white  "bg-dark-600 dark:photo-btn-dark ${
                            theme === 'dark'
                              ? `light-notification-btn`
                              : `photo-btn`
                          }`}
                        >
                          <img
                            className="w-[16.50px] h-[16.50px]"
                            src="/images/three-line.svg"
                            alt=""
                          />
                          <span className="photo-btn-text">View</span>
                        </button>
                      </Link>
                    </div>

                    <div className="flex flex-col justify-end items-end gap-[10px]">
                      <p className="notification-claim-title">
                        {convertLinkToText(notification.link)}
                      </p>
                      {/* <p className="notification-claim-time"> {value.Time}</p> */}
                    </div>
                  </div>
                </div>

                <div
                  className={`flex md:hidden p-[15px] flex-col box-border-2x-light dark:box-border-2x-dark bg-dark-600 dark:bg-white`}
                >
                  {/* <div className="flex justify-between">
                    <span className="notification-claim-title">
                      Claim #{value.ClaimNo}
                    </span>
                    {/* <span className="notification-claim-time">
                      {value.Time}
                    </span> */}
                  {/* </div> */}
                  {/* <div className="flex mt-[15px] gap-[18px]">
                    <div className="flex justify-start">
                      <div className="relative w-8 h-8">
                        <img className="w-8 h-8" src={value.photo} alt="" />
                        <img
                          className="absolute bottom-0 right-0"
                          src="/images/Group 223.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="flex justify-center gap-[10px]">
                        <span className="notification-user-name">
                          {value.name}
                          <span className=" ml-[10px] notification-comment">
                            {value.claimTag}
                          </span>{' '}
                        </span>
                      </div>
                      <div>
                        <span className="notification-time">
                          {value.NotificationTime}
                        </span>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="flex gap-[18px] ">
                    <div className="mt-[16px] min-w-[32px] flex justify-center">
                      <span
                        className={`min-w-[16px] h-[16px] notification-no rounded-full dark:notification-no-dark ${
                          theme === 'dark'
                            ? 'notification-no-dark'
                            : 'notification-no'
                        }`}
                      >
                        {value.NotificationNo}
                      </span>
                    </div>
                    <div className="flex gap-[10px] mr-[30px]">
                      <p className="notification-commit">
                        {value.Notification}
                      </p>
                    </div>
                  </div> */}

                  {/* <div className="flex gap-[18px] mt-[20px] justify-end">
                    <button
                      className={`w-[120px] h-[35px] flex gap-[10px] items-center justify-center dark:bg-white bg-dark-600 dark:file-btn-dark ${
                        theme === 'dark'
                          ? `light-notification-btn`
                          : `photo-btn`
                      }`}
                    >
                      <img className="w-[16.50px]" src={value.icon1} alt="" />
                      <span className="file-btn-text">{value.buttonText1}</span>
                    </button>
                    <button
                      className={`w-[120px] h-[35px] photo-btn flex gap-[10px] items-center justify-center dark:bg-white  "bg-dark-600 dark:photo-btn-dark ${
                        theme === 'dark'
                          ? `light-notification-btn`
                          : `photo-btn`
                      }`}
                    >
                      <img className="w-[16.50px]" src={value.icon2} alt="" />
                      <span className="photo-btn-text">
                        {value.buttonText2}
                      </span>
                    </button>
                  </div> */}
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="hidden xl:flex flex-col gap-5 w-full max-w-[285px] sm:w-[285px] max-[640px]:w-full ">
          <StatusInfo />
          <Score
            size="w-[140px]"
            text="Response Time"
            imgDark="/images/102.svg"
            imgLight="/images/101.svg"
          />
          <Rewards />
        </div>
      </div>
    </div>
  )
}

export default Notification
