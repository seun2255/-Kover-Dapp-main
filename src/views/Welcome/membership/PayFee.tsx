import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'
import AccountTransactions from '../../../components/common/account-transactions/AccountTransactions'
import Agreament from '../../../components/common/Agreament'
import Button from '../../../components/common/Button'
import DecisionField from '../../../components/common/DecisionField'
import FormAgreament from '../../../components/common/FormAgreament'
import useWindowDimensions from '../../../components/global/UserInform/useWindowDimensions'
import Popup from '../../../components/templates/Popup'

function PayFee() {
  const [account, setAccount] = useState(false)
  const toggleAccount = () => setAccount((v) => !v)
  const { theme } = React.useContext(UserContext)
  const { width } = useWindowDimensions()
  const [value, setValue] = useState()
  const [checkbox, setCheckbox] = useState(true)
  const [terms, setTerms] = useState<boolean>(false)
  const toggleTerms = () => setTerms((v) => !v)
  const popupTerms = ['Terms of Use']

  var model = []
  if (theme === 'dark') {
    model = ['/images/black_ok_icon.svg', '/images/empty_box_icon.svg']
  } else {
    model = ['/images/Group 220 (1).svg', '/images/Group 220.svg']
  }

  return (
    <>
      <div className=" bg-dark-600 dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-white bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
        <DecisionField
          button={{ text: 'ETH' }}
          infoText={{ text: 'FEE' }}
          inputProps={{ defaultValue: '0.0020' }}
          tildeValue={3.09}
          icon={true}
        />

        <FormAgreament
          agreeURL="/"
          mainClass="flex justify-between py-[15px] px-[20px] sm:px-[30px] flex-col sm:flex-row"
          variety="checkbox"
          agree="DAO Members' Agreemen"
          bntText="Pay Membership Fees"
          item1Class="w-full sm:w-fit flex gap-[11px] items-center"
          item2Class="w-full sm:w-fit sm:mt-[0px]  mt-[10px]"
          btn="sm:w-fit w-full"
          endIcon={'/images/71.svg'}
          endIconDark={'/images/72.svg'}
          onClick={() => {
            setAccount(true)
          }}
        />
      </div>
      <Popup
        onClose={toggleAccount}
        visible={account}
        maxWidth="max-w-[400px] w-full"
      >
        <AccountTransactions onClose={toggleAccount} />
      </Popup>
    </>
  )
}

export default PayFee
