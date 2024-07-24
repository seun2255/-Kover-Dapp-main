import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Rewards from './Rewards'
import Claim from './Claim'
import Slider from 'react-slick'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import Button from '../../components/common/Button'
import Skeleton from 'react-loading-skeleton'

interface RewardsStagProps {
  loading: boolean
  details: any
}

function Rewardstag({ loading, details }: RewardsStagProps) {
  const { width } = useWindowDimensions()
  const settings = {
    className: 'slider variable-width slick-list slick-slide ',
    centerMode: true,
    infinite: true,
    padding: '350px',
    slidesToShow: 1,
    centerPadding: '15px',
    arrows: false,
    speed: 500,
  }

  let [viewPort, setViewPort] = useState(false)

  useEffect(() => {
    if (width <= 600) {
      setViewPort(true)
    } else {
      setViewPort(false)
    }
  }, [width, viewPort])
  if (!viewPort) {
    return (
      <>
        {loading ? (
          <Skeleton height={'107px'} width={'261px'} />
        ) : (
          <Rewards details={details} />
        )}
        <Claim loading={loading} />
      </>
    )
  }

  return (
    <div className="inline sm:hidden grid grid-cols-1">
      <Slider {...settings} className="gap-5">
        <div className="pr-[15px]">
          <Rewards details={details} />
        </div>
        <div className="pr-[15px] box-gap min-w-min justify-start h-[110px] dark:box-border p-4 bg-dark-600 rounded flex-grow dark:text-dark-800 dark:text-primary-100 dark:bg-white">
          <div className="flex justify-between gap-1 items-center mb-3">
            <span className="premium-no dark:premium-no-dark">0</span>

            <Link
              to={'/claims'}
              className="view-claim-btn dark:view-claim-btn-dark"
            >
              View Claims
            </Link>

            {/* <Button
                            size="small"
                            color="dark"
                            variant="outline"
                            text="View Claims"
                            shape="circle" /> */}
          </div>
          <span className="font-medium text-lg text-dark-500">
            Active claims
          </span>
        </div>
        <div className="pr-[15px] box-gap min-w-min justify-end h-[110px] dark:box-border p-4 bg-dark-600 rounded flex-grow dark:text-dark-800 dark:text-primary-100 dark:bg-white">
          <h5 className="flex gap-1.5 font-light text-7xl mb-3">
            <span className="claim-amount dark:claim-amount-dark">0,000</span>
            <span className="font-bold text-lg text-dark-50">USD</span>
          </h5>
          <span className="font-medium text-lg text-dark-500">
            Total claimed
          </span>
        </div>
      </Slider>
    </div>
  )
}
export default Rewardstag
