import React, { useState, useEffect } from 'react'
import Button from '../Button'
import { UserContext } from '../../../App'
import { approveKoverToStake, getTokenBalance } from '../../../api'
import { useWeb3React } from '@web3-react/core'
import { approvePoolToSpend } from '../../../api'
import { useDispatch } from 'react-redux'
import { openAlert, closeAlert } from '../../../redux/alerts'

export interface InputMaxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  setDepositAmount?: any
  action?: boolean
  setAmountApproved?: any
  isStake?: boolean
  poolName?: string
}

function InputMax({
  action,
  setDepositAmount,
  setAmountApproved,
  poolName,
  isStake,
  ...rest
}: InputMaxProps) {
  const [amount, setAmount] = useState(false)
  const [value, setValue] = useState('')
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (rest.defaultValue === '00.00' || '50.00') {
      setAmount(true)
    } else {
      setAmount(false)
    }
  }, [rest.defaultValue])

  const handleChange = (e: any) => {
    if (e.target.value === amount) {
      setAmount(true)
      setValue(e.target.value)
      setDepositAmount?.(parseInt(e.target.value))
    } else {
      setAmount(false)
      setValue(e.target.value)
      setDepositAmount?.(parseInt(e.target.value))
    }
  }

  const handleMaxClick = async () => {
    setAmount(false)
    const maxBalance = await getTokenBalance(account)
    setValue(parseInt(maxBalance).toString())
    setDepositAmount?.(parseInt(maxBalance))
  }

  const handleApprove = async () => {
    if (poolName) {
      if (value !== '') {
        const approved = await approvePoolToSpend(
          poolName,
          parseInt(value),
          dispatch
        )
        if (approved) {
          setAmountApproved(true)
          dispatch(
            openAlert({
              displayAlert: true,
              data: {
                id: 1,
                variant: 'Successful',
                classname: 'text-black',
                title: 'Amount Approved',
                tag1: 'approved token use',
                tag2: 'amount can now be deposited',
              },
            })
          )
          setTimeout(() => {
            dispatch(closeAlert())
          }, 10000)
        }
      } else {
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 2,
              variant: 'Failed',
              classname: 'text-black',
              title: 'Invalid value',
              tag1: `Please input a valid amount`,
              tag2: '',
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
      }
    } else if (isStake) {
      const approved = await approveKoverToStake(value, dispatch)
      if (approved) {
        setAmountApproved(true)
        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 1,
              variant: 'Successful',
              classname: 'text-black',
              title: 'Amount Approved',
              tag1: 'approved token use',
              tag2: 'amount can now be deposited',
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
      }
    }
  }

  const { theme } = React.useContext(UserContext)
  return (
    <div className="bg-dark-800 rounded py-2.5 px-5 flex justify-between gap-2 items-center mb-4 dark:bg-light-200 h-[50px]">
      <input
        maxLength={8}
        value={value}
        type="number"
        placeholder={rest.placeholder}
        defaultValue={rest.defaultValue}
        className={`placeholder:text-dark-300 dark:text-dark-800 text-6xl max-w-none min-w-0 w-[72px] flex-grow dark:placeholder:text-dark-300 fw-400 lh-42 input-value
      ${
        amount
          ? 'text-[#42434B] dark:tex-light-800'
          : 'text-[#FFFFFF] dark:tex-light-800'
      } `}
        onChange={handleChange}
      />
      <div className="flex gap-4 items-center">
        <button onClick={handleMaxClick} className="max-btn">
          MAX
        </button>
        {action && (
          <Button
            color={theme === 'dark' ? 'dark:bg-white' : ' bg-[#3F4048]'}
            className="h-[30px]"
            text="Approve"
            onClick={handleApprove}
          />
        )}
      </div>
    </div>
  )
}
export default InputMax
