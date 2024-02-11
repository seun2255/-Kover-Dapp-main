import React from 'react'
import ChartRender from './ChartRender'
import { UserContext } from '../../App'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'

export interface AdminCardProps {
  key?: number | string
  name: string
  score: number | string
  volume: number
  status: 'up' | 'down'
  chart: number[]
  percentage: number
  usd?: boolean
}

function AdminCard(props: AdminCardProps) {
  const { chart, name, score, status, volume, percentage, usd } = props
  const { theme } = React.useContext(UserContext)
  const { width } = useWindowDimensions()

  let getStatusColor = {
    text: 'text-[#D0021B]',
    chart: `${theme === 'dark' ? '#4C4D55' : '#C11E0F'}`,
  }

  if (status === 'up') {
    getStatusColor = {
      text: 'text-[#50ff7f]',
      chart: `${theme === 'dark' ? '#4C4D55' : '#50ff7f'}`,
    }
  }

  return (
    <div className="bg-dark-800 xbg-white rounded p-[20px] dark:border dark:border-dark-200 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
      {/*  */}

      {width > 900 ? (
        <>
          <span className="admin-card-title">{name}</span>
          <span className="block admin-card-no">
            {score}
            {usd && <span className="font-normal uppercase"> USD</span>}
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="admin-card-title">{name}</span>
            <span className="block admin-card-no">
              {score}
              {usd && <span className="font-normal uppercase"> USD</span>}
            </span>
          </div>
        </>
      )}
      <div className="my-[17px]">
        <ChartRender color={getStatusColor.chart} datam={chart} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1 font-medium">
          <span className="admin-card-valume text-[#606166]">Volume</span>
          <span className="admin-card-valume dark:text-[#000000]">
            {volume}
          </span>
          {usd && <span className="text-dark-500">USD</span>}
        </p>
        <span
          className={`admin-percentage dark:admin-percentage-dark ${getStatusColor.text}`}
        >
          {status === 'up'? '+' : '-' }{percentage}%
        </span>
      </div>
    </div>
  )
}

export default AdminCard
