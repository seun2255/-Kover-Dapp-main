import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CoverCard from '../../components/common/cards/StatusCard/StatusCard'
import FilterTabs from '../../components/common/FilterTabs'
import Header from '../../components/common/header/Header'
import PopConfirm, {
  PopConfirmProps,
} from '../../components/common/pop-confirm/PopConfirm'
import SearchField from '../../components/common/SearchField'
import Popup from '../../components/templates/Popup'
import { UserContext } from '../../App'
import useWindowDimensions from '../../../src/components/global/UserInform/useWindowDimensions'
import Drawer from 'react-modern-drawer'
import Card from '../../components/common/cards/StatusCard/Card'

function Insurance() {
  const { theme } = React.useContext(UserContext)
  const { width } = useWindowDimensions()
  const [selectItem, setselectItem] = useState()
  const handlerLink = (item: any) => {
    setselectItem(item)
  }

  const coverCard = {
    cover: {
      card: {
        icon: `${
          theme === 'dark' ? '/images/whiteCar.svg' : '/images/lodgo.svg'
        }`,
        name: 'Car cover',
        subIcon:
          theme === 'dark'
            ? '/images/okicon.svg'
            : '/images/ShieldActiveFinance 1.svg',
      },
      id: 1,
      purchase: '',
      totalPolicies: '4551',
      totalPoliciesName: 'Total Policies',
    },
    table: {
      rows: [
        {
          text: 'Pool status',
          icon: true,
        },
        {
          text: 'Daily Cost',
          icon: true,
        },
        {
          text: 'Cover Details',
          icon: false,
        },
      ],
      columns: [
        'Active',
        '0 USDC',
        <Link
          to="/"
          className="text-white sm:text-primary-700 dark:text-dark-600"
        >
          Learn more
        </Link>,
      ],
    },
  }

  const selectInsurance: PopConfirmProps = {
    id: 6,
    title: 'Cover Details',
    cover: {
      card: {
        icon: `${
          theme === 'dark' ? '/images/whiteCar.svg' : '/images/lodgo.svg'
        }`,
        name: 'Car cover',
        subIcon:
          theme === 'dark'
            ? '/images/okicon.svg'
            : '/images/ShieldActiveFinance 1.svg',
      },
      id: 1,
      purchase: '',
      totalPolicies: '4551',
      totalPoliciesName: 'Total Policies',
    },
    table: {
      rows: [
        {
          text: 'Pool status',
          icon: true,
        },
        {
          text: 'UR',
          icon: true,
        },
        {
          text: 'Cover Details',
          icon: false,
        },
      ],
      columns: [
        'Active',
        '80%',
        <Link to="/" className="dark:text-dark-600">
          Learn more
        </Link>,
      ],
    },
    prpInput: {
      infoText: {
        text: 'PRP',
      },
      placeholder: '00.00',
      defaultValue: '00.00',
      action: {
        text: 'Edit',
        to: '/risk-mnagament-home',
      },
    },
    
    disclaimer:
      'Please ensure that the information you provide is correct, as any inaccurate or incomplete information may invalidate the policy and result in your claims being rejected or not paid in full',
  }


  const insuranceData = [
    {
      id: 1,
      title: 'Pool status',
      icon: true,
      value: 'Active',
    },
    {
      id: 2,
      title: 'Utilization Ratio',
      icon: true,
      value: '80 %',
    },
    {
      id: 3,
      title: 'Cover Details',
      icon: false,
      value: 'learn more ',
    },
  ]

  const [status, setStatus] = React.useState<number>(0)
  const [select, setSelect] = useState(false)
  const toggleSelect = () => setSelect((v) => !v)
  const [isOpen, setIsOpen] = React.useState(false)
  const [bondPopup, serbondPopup] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className="pb-6 sm:pb-6">
      <Header name="Insurance" overview={true} />
      <div className="hidden sm:flex justify-between items-center mb-5">
        <span className="hidden sm:block text-dark-300">Overview</span>
        <FilterTabs
          changeTab={setStatus}
          currentTab={status}
          tabs={['ALL', 'ACTIVE']}
        />
      </div>

      <div className="desktop mobile mb-3">
        <div className="flex w-full">
          <SearchField />{' '}
          <button
            type="button"
            className="dark:bg-light-1100 font-bold bg-dark-800 uppercase text-base text-dark-500 ml-3 w-100 px-5 py-0 justify-self-end"
            onClick={toggleDrawer}
          >
            Filter
          </button>
        </div>
      </div>

      <div
        className={`grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 ${
          width > 1199 && width > 1302 ? 'grid-cols-2' : 'grid:cols-1'
        }`}
      >
        
          <Card
            index={0}
            coverName="Car Cover"
            data={insuranceData}
            selectButton={{ onClick: toggleSelect }}
          />
          <Card
            index={1}
            coverName="Motor Bike Cover"
            data={insuranceData}
            selectButton={{ onClick: toggleSelect }}
          />
          <Card
            index={2}
            coverName="Home Cover"
            data={insuranceData}
            selectButton={{ onClick: toggleSelect }}
          />
          <Card
            index={3}
            coverName="Pet Cover"
            data={insuranceData}
            selectButton={{ onClick: toggleSelect }}
          />
       

        <div className="border-dark-800 border-dashed rounded flex items-center justify-center text-center border-2">
          <button
            type="button"
            className="py-[50px] sm:text-center flex flex-col gap-7 items-center"
          >
            <img
              className="w-[50px]"
              src="/images/Combined Shape (15).svg"
              alt=""
            />
            <span className="text-dark-500">Add Pool</span>
          </button>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="bottom-drawer dark:bottom-drawer-dark"
      >
        <div>
          <div className="flex justify-center items-center mb-[20px]">
            <img
              src={
                theme === 'dark'
                  ? '/images/drawer-line2.svg'
                  : '/images/drawer-line1.svg'
              }
              alt=""
            />
          </div>
          <span className="bottom-drawer-title dark:bottom-drawer-title-dark">
            Filter Options
          </span>
          <div className="mt-[40px]">
            {['All', 'Active'].map((item: any) => {
              return (
                <>
                  <div
                    className="flex justify-between drawer-item dark:drawer-item-dark"
                    onClick={() => handlerLink(item)}
                    role="button"
                  >
                    {theme === 'dark' ? (
                      <>
                        {selectItem === item ? (
                          <>
                            <span className="text-[#000000]">{item}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-dark-500">{item}</span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <>
                          {selectItem === item ? (
                            <>
                              <span className="text-[#50ff7f]">{item}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-[#FFFFFF]">{item}</span>
                            </>
                          )}
                        </>
                      </>
                    )}

                    {theme === 'dark' ? (
                      <>
                        {selectItem === item ? (
                          <img src="images/3333.svg" alt="" />
                        ) : (
                          <img src="images/4444.svg" alt="" />
                        )}
                      </>
                    ) : (
                      <>
                        <>
                          {selectItem === item ? (
                            <img src="images/1111.svg" alt="" />
                          ) : (
                            <img src="images/2222.svg" alt="" />
                          )}
                        </>
                      </>
                    )}
                  </div>
                  <hr
                    className="my-[10px] drawer-item-line"
                    style={{
                      color: '#43444B',
                      backgroundColor: '#43444B',
                      height: 0.5,
                      borderColor: '#43444B',
                    }}
                  />
                </>
              )
            })}
          </div>
        </div>
      </Drawer>

      <Popup onClose={toggleSelect} visible={select} maxWidth="max-w-[860px]">
        <PopConfirm onClose={toggleSelect} {...selectInsurance} />
      </Popup>
      
    </div>
  )
}

export default Insurance
