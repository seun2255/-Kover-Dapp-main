import React, { useState } from 'react'
import { UserContext } from '../../App'
import IconButton from '../../components/common/IconButton'
import { Link } from 'react-router-dom'

const options = [
  {
    id: 435,
    icon: '/images/user_dark.svg',
    text: 'View profile',
    Link: '',
  },
  {
    id: 364,
    icon: '/images/notification_off_dark.svg',
    text: 'Notifications Off',
    link: '',
  },
  {
    id: 364,
    icon: '/images/warning_dark.svg',
    text: 'Report User',
    link: '',
  },
]

interface HeaderProps {
  roomID: any
}

function HeadOptions({ roomID }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false)
  const toggle = () => setOpen((v) => !v)
  const { theme } = React.useContext(UserContext)

  const id = roomID.split('-')[2]
  const userLink = `/kyc-user-profile/${id}`
  options[0].link = userLink

  return (
    <div>
      <IconButton
        onClick={toggle}
        icon={theme === 'dark' ? '/images/dark-icon.svg' : '/images/Icon.svg'}
      />
      {open && (
        <div className="relative z-[1]">
          <div
            onClick={toggle}
            className="fixed top-0 bottom-0 left-0 right-0 bg-transparent -z-10"
          />
          <div className="absolute right-0 py-3 rounded top-7 bg-dark-800 w-max dark:bg-light-800">
            {options.map(({ id, icon, text, link }) => (
              <Link to={link as string}>
                <button
                  key={id}
                  type="button"
                  className="flex w-full gap-2.5 items-center py-2 px-5 "
                  onClick={toggle}
                >
                  <img src={icon} className="w-[14px] h-[14px]" alt="" />
                  <span className="text-lg font-medium hover:text-[#727272]">
                    {text}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HeadOptions
