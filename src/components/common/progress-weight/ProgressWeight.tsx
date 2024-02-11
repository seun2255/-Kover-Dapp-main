import React from 'react'
import Progress, { ProgressProps } from '../Progress'
import { UserContext } from '../../../App'

interface ProgressWeightProps extends ProgressProps {
  name: string
  subtitle: string
  classname?: string
}

function ProgressWeight({
  name,
  subtitle,
  classname,
  current,
  ...rest
}: ProgressWeightProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <div
      className={`rounded  flex items-center px-[40px] py-[46px] flex flex-col text-center bg-[#2A2B31] dark:bg-white p-[30px] box-border-2x-light dark:box-border-2x-dark ${
        classname || ''
      } w-[200px]"`}
    >
      <span className="mx-[23px] progress-bar-title w-[200px]">
        Your {name} is {current}% complete
      </span>
      <Progress
        className="my-[18.5px] w-[200px]"
        current={current}
        {...rest}
        color={`${theme === 'dark' ? '#000000' : '#50ff7f'}`}
      />
      <span className="text-lg font-bold text-primary-700 dark:text-dark-800 progress-bar-value dark:progress-bar-value-dark">
        {subtitle}
      </span>
    </div>
  )
}

export default ProgressWeight
