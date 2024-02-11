import React from 'react'
import Header from '../../components/common/header/Header'
import Alert from '../../components/common/Alert'
function Layout() {
  return (
    <>
      <Header name="Alert" />
      <div className="w-[358px] flex flex-col gap-5">
        <Alert
          id={1}
          variant={'Successful'}
          classname={'text-black'}
          title={'Transaction Successful'}
          tag1={'50 USDC Deposited'}
          tag2={'View on etherscan'}
        />
        <Alert
          id={2}
          variant={'Failed'}
          classname={'text-black'}
          title={'Transaction Failed'}
          tag1={'Deposit 50 USDC Cancelled'}
          tag2={'View on etherscan'}
        />
        <Alert
          id={3}
          variant={'Pending'}
          classname={'text-black'}
          title={'Transaction Pending'}
          tag1={'50 USDC Deposited'}
          tag2={'View on etherscan'}
        />
        <Alert
          id={4}
          variant={'Successful'}
          classname={'text-black'}
          title={'Submission Successful'}
          tag1={'50 USDC Deposited'}
          tag2={'View on etherscan'}
        />
        <Alert
          id={5}
          variant={'Failed'}
          classname={'text-black'}
          title={'Submission Failed'}
          tag1={'Oops ! Something Went Wrong'}
          tag2={'Get help'}
        />
      </div>
    </>
  )
}
export default Layout
