import React, { useState } from 'react'
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
function Bond() {
  const { width } = useWindowDimensions()
  const { theme } = React.useContext(UserContext)
  const [selectItem, setselectItem] = useState()

  const [bondPopup, serbondPopup] = useState(false)

  const handlerLink = (item: any) => {
    setselectItem(item)
  }

  const coverCard = {
    id: 2,
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
      id: 2,
      purchase: '',
      totalPolicies: '4551',
      totalPoliciesName: 'Total Policies',
    },
    table: {
      rows: [
        {
          text: 'Total Capital',
        },
        {
          text: 'APR',
        },
        {
          text: 'Utilization Ratio',
        },
      ],
      columns: [
        '2560 USDC',
        '3,16%',
        '100 %',
        // <Link to="/" className="text-white sm:text-primary-700 dark:text-dark-600">
        //   learn more
        // </Link>,
      ],
    },
  }

  const BondData = [
    {
      id: 1,
      title: 'Total Capital',
      icon: true,
      value: '2560 USDC',
    },
    {
      id: 2,
      title: 'APR',
      icon: true,
      value: '3,16%',
    },
    {
      id: 3,
      title: 'Utilization Ratio',
      icon: true,
      value: '100 %',
    },
  ]

  const selectBond: PopConfirmProps = {
    id: 2,
    title: 'Liquidity Details',
    datam: {
      tabs: [
        {
          text: 'Supply',
        },
        {
          text: 'Withdraw',
        },
      ],
      data: [
        {
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
            id: 2,
            purchase: '',
            totalPolicies: '4551',
            totalPoliciesName: 'Total Policies',
          },
          table: {
            rows: [
              {
                text: 'Total Capital',
                icon: true,
              },
              {
                text: 'APR',
                icon: true,
              },
              {
                text: 'Utilization Ratio',
                icon: true,
              },
            ],
            columns: ['2560 USDC', '3,16%', '80%'],
          },
          prpInput: {
            infoText: {
              text: 'Total',
            },
            placeholder: '00.00',
            defaultValue: '00.00',
            action: {
              text: 'USDC',
              to: '/risk-mnagament-home',
            },
          },
          inputMax: {
            placeholder: '00',
            defaultValue: '00.00',
            action: true,
          },
          balance: '10.42 USDC',
          disclaimer:
            'Cryptocurrency prices are subject to high market risk and price volatility. You should only invest in products that you are familiar with and where you understand the associated risks.',
        },
        {
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
            purchase: '',
            totalPolicies: '4551',
            totalPoliciesName: 'Total Policies',
          },
          table: {
            rows: [
              {
                text: 'Total Capital',
                icon: true,
              },
              {
                text: 'APR',
                icon: true,
              },
              {
                text: 'Utilization Ratio',
                icon: true,
              },
            ],
            columns: ['2560 USDC', '3,16%', '100 %'],
          },
          prpInput: {
            infoText: {
              text: 'Total',
            },
            placeholder: '00',
            defaultValue: '1500',
            action: {
              text: 'USDC',
              to: '/risk-mnagament-home',
            },
          },
          inputMax: {
            defaultValue: '00.00',
            placeholder: '00.00',
            action: true,
          },
          balance: '10.42 USDC',
          disclaimer:
            'Cryptocurrency prices are subject to high market risk and price volatility. You should only invest in products that you are familiar with and where you understand the associated risks.',
        },
      ],
    },
  }

  const [status, setStatus] = useState<number>(0)
  const [select, setSelect] = useState(false)
  const toggleSelect = () => setSelect((v) => !v)
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <div className="pb-6">
      <Header name="Liquidity" overview={true} />
      <div className="items-center justify-between hidden mb-5 sm:flex">
        <span className="hidden sm:block text-dark-300">Overview</span>
        <FilterTabs
          changeTab={setStatus}
          currentTab={status}
          tabs={['ALL', 'ACTIVE']}
        />
      </div>
      <div className="mb-3 desktop mobile">
        <div className="flex w-full">
          <SearchField />{' '}
          <button
            type="button"
            className="px-5 py-0 ml-3 text-base font-bold uppercase dark:bg-light-1100 bg-dark-800 text-dark-500 w-100 justify-self-end"
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
        {[...Array(6)].map((_, index) => (
          <>
            <Card
              index={index}
              data={BondData}
              selectButton={{ onClick: toggleSelect }}
            />
          </>
        ))}
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
      <Popup maxWidth="max-w-[860px]" onClose={toggleSelect} visible={select}>
        <PopConfirm onClose={toggleSelect} {...selectBond} />
      </Popup>
    </div>
  )
}

export default Bond
