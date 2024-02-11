import React from 'react'
import Button from '../../components/common/Button'
import Slider from 'react-slick'
import Rewards from '../../views/Dashboard/Rewards'
import Claim from '../../views/Dashboard/Claim'
import { UserContext } from '../../App'
function RewardMobileSlider() {
  const settings = {
    className: 'slider variable-width',
    centerMode: true,
    infinite: true,
    padding: '350px',
    slidesToShow: 2,
    arrows: false,
    speed: 500,
  }
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <Slider {...settings} className="flex gap-[15px]">
        <Rewards />
        <div className="p-3 rounded bg-primary-700 dark:text-dark-800 dark:text-primary-100 dark:bg-light-200 dark:bg-white">
          <div className="flex items-center justify-between gap-1 mb-3">
            <span className="text-lg font-bold text-primary-800 dark:text-dark-800">
              REWARDS
            </span>
            {theme === 'dark' ? (
              <img className="w-9" src="/images/logo-new.svg" alt="" />
            ) : (
              <img className="w-9" src="/images/logo-new.svg" alt="" />
            )}
          </div>
          <div className="flex items-end justify-between gap-1 pb-2">
            <button onClick={() => alert('this is button')}>
              {' '}
              <span className="text-3xl text-black">Claim</span>{' '}
            </button>
            <span className="text-black xl:text-6xl sm:text-3xl md:text-3xl lg:text-4xl ">
              0.221746
            </span>
          </div>
        </div>
        <div className="flex-grow p-4 rounded dark:box-border bg-dark-600 dark:text-dark-800 dark:text-primary-100 dark:bg-white">
          <div className="flex items-center justify-between gap-1 mb-3">
            <span className="font-light text-7xl">0</span>
            <Button
              size="small"
              color="dark"
              variant="outline"
              text="View Claims"
              shape="circle"
            />
          </div>
          <span className="text-lg font-medium text-dark-500">
            Active claims
          </span>
        </div>
        <div className="flex-grow p-4 rounded dark:box-border bg-dark-600 dark:text-dark-800 dark:text-primary-100 dark:bg-white">
          <h5 className="flex gap-1.5 font-light text-7xl mb-3">
            <span className="premium-no dark:premium-no-dark">0,000</span>
            <span className="usd">USD</span>
          </h5>
          <span className="total-claimed">Total claimed</span>
        </div>
      </Slider>
    </>
  )
}
export default RewardMobileSlider
