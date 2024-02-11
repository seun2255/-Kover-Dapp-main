import React, { useState } from 'react'
import 'react-modern-drawer/dist/index.css'
import { UserContext } from '../../../App'
import Popup from '../../templates/Popup'
import Button from '../Button'
import PopConfirm, { PopConfirmProps } from '../pop-confirm/PopConfirm'
interface ClaimsCardProps {
  button?: boolean
  icon: string
}

function ClaimsCard({ button, icon }: ClaimsCardProps) {
  const [stake, setStake] = useState<number>(0)
  const { theme } = React.useContext(UserContext)
  const toggleStake = () => setStake((v) => (v === 0 ? 1 : 0))

  const stakePopup: PopConfirmProps = {
    id: 4,
    title: 'Stake',
    datam: {
      tabs: [
        {
          text: 'Stake',
        },
        {
          text: 'Unstake',
        },
      ],
      data: [
        {
          cover: {
            card: {
              icon: '/images/Recta3234ngle 3.svg',
              name: 'USDC Pool',
              subIcon: '/images/Group 284.svg',
            },
            purchase: '',
            totalPolicies: '4551',
            totalPoliciesName: 'Total Stakers',
          },
          table: {
            rows: [
              {
                text: 'TVL',
              },
              {
                text: 'APR',
              },
              {
                text: 'lOCK PERIOD',
                icon: false,
              },
            ],
            columns: ['$7,000,087.5 ', '3,16%', '---'],
          },
          dayTab: true,
          prpInput: {
            infoText: {
              text: 'Total',
            },
            placeholder: '00.00',
            action: {
              text: 'USDC',
            },
          },
          inputMax: {
            placeholder: '00.00',
            action: true,
          },
          warning: 'Your wallet is empty. Please purchase or transfer assets',
          balance: '10.42 USDC',
          disclaimer:
            'Cryptocurrency prices are subject to high market risk and price volatility. You should only invest in products that you are familiar with and where you understand the associated risks.',
        },
        {
          cover: {
            card: {
              icon: '/images/Recta3234ngle 3.svg',
              name: 'USDC Pool',
              subIcon: '/images/Group 284.svg',
            },
            purchase: '',
            totalPolicies: '4551',
            totalPoliciesName: 'Total Stakers',
          },
          table: {
            rows: [
              {
                text: 'TVL',
              },
              {
                text: 'APR',
              },
              {
                text: 'lOCK PERIOD',
                icon: false,
              },
            ],
            columns: ['$7,000,087.5 ', '3,16%', '14 days'],
          },
          dayTab: true,
          prpInput: {
            infoText: {
              text: 'Total',
            },
            placeholder: '00.00',
            action: {
              text: 'USDC',
            },
          },
          inputMax: {
            placeholder: '00.00',
          },
          warning: 'Your wallet is empty. Please purchase or transfer assets',
          balance: '10.42 USDC',
          disclaimer:
            'Cryptocurrency prices are subject to high market risk and price volatility. You should only invest in products that you are familiar with and where you understand the associated risks.',
        },
      ],
    },
  }

  return (
    <>
      <div className="rounded sm:rounded bg-dark-600  dark:text-primary-100 dark:bg-white dark:box-border general-box-border mb-[15px] p-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={theme === 'dark' ? '/images/57.svg' : '/images/56.svg'}
              className="w-[35px] h-[35px] status-card-item-1"
              alt=""
            />
            <span className="cover-title dark:cover-title-dark status-card-item-2">
              USDC Pool
            </span>
            <img src={icon} className="status-card-item-3" alt="" />
          </div>
          <div className="flex flex-col items-end">
            <span className="mb-[5px] claim-card-no justify-end">4551</span>
            <div className="flex infotext flex justify-end small dark">
              <span className="claim-card-sub font-normal lg:font-medium fw-500 fw-400">
                Total Stakes
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center card-hr">
          <img
            src={theme === 'dark' ? '/images/012.svg' : '/images/hr_svg.svg'}
            alt=""
          />
        </div>

        <div className="flex justify-between">
          <div className="flex justify-start flex-col gap-[7px]">
            <span className="claim-card-sub">ENTRY DATE</span>
            <div className="flex gap-[5px] items-center">
              <span className="claim-card-sub">APR</span>{' '}
              <img src="/images/Mask (11).svg" alt="" />
            </div>
            <span className="claim-card-sub">Capital</span>
          </div>

          <div className="flex justify-end flex-col gap-[7px] justify-items-end text-end">
            <span className="claim-card-info">2022/06/01 10:26:20</span>
            <span className="claim-card-info">5%</span>
            <span className="claim-card-info">----</span>
          </div>
        </div>
        <Button
          className="gap-2.5 dark:bg-white dark:box-border w-full mt-[20px]"
          text="Unstake"
          color={
            button
              ? `${theme != 'dark' ? 'grey-gradient' : ''}`
              : `${theme != 'dark' ? 'greenGradient' : ''}`
          }
          endIcon={
            button
              ? `${
                  theme === 'dark'
                    ? '/images/63.svg'
                    : '/images/grey-ok-circle-btn.svg'
                }`
              : `${theme === 'dark' ? '/images/62.svg' : '/images/61.svg'}`
          }
          onClick={toggleStake}
          btnText={button ? 'stake text-[#78797E]' : 'stake text-[#101212]'}
        />
      </div>
      <Popup
        maxWidth="max-w-[820px]"
        onClose={toggleStake}
        visible={Boolean(stake)}
      >
        <PopConfirm
          defaultTab={stake === 2 ? 1 : 0}
          onClose={toggleStake}
          {...stakePopup}
        />
      </Popup>
    </>
  )
}
export default ClaimsCard
