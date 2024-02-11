import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
function Logo() {
  const { theme } = React.useContext(UserContext)
  return (
    <div className="">
      <Link to="/">
        <img
          className="w-[36px] py-0 sm:w-[36px]"
          // src={theme === "dark" ? "/images/blackLogo.svg" : "/images/Combined Shape.svg"}
          src={
            theme === 'dark'
              ? '/images/blackLogo1.svg'
              : '/images/blackLogo1.svg'
          }
          alt=""
        />
      </Link>
    </div>
  )
}
export default Logo
