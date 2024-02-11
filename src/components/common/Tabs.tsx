import React from 'react'
import Button from './Button'
import { UserContext } from '../../App'
import { Scrollbars } from 'react-custom-scrollbars-2'
interface TabsProps {
  tabs: string[]
  changeTab: (index: number) => void
  currentTab: number
}
const renderThumb = () => {
  const thumbStyle = {
    backgroundColor: `transparent`,
    opacity: 0.1,
  }

  return <div style={{ ...thumbStyle }} />
}

function Tabs({ tabs, changeTab, currentTab }: TabsProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <React.Fragment>
      <>
        <div className="hidden sm:sm:flex gap-4 items-center sm:flex-wrap ">
          {tabs.map((value, index) => (
            <Button
              key={index}
              color={
                index === currentTab
                  ? `${theme === 'dark' ? '' : 'dark'} dark:bg-light-500`
                  : 'transparent'
              }
              className={`tab-btn ${
                value == 'Withdrawal Requests' ? 'withdraw' : ''
              }`}
              text={value}
              onClick={() => changeTab(index)}
              btnText={`${
                theme === 'dark' ? 'tab-item-lg-dark' : 'tab-item-lg'
              }`}
            />
          ))}
        </div>

        {/* <Scrollbars renderThumbVertical={renderThumb}>  */}
        <div className="no-scrollbar flex gap-[15px] items-center sm:hidden border-b border-b-[#43444B] w-full overflow-auto">
          {tabs.map((value, index) => (
            <Button
              key={index}
              className={
                index === currentTab
                  ? `px-1 tab-item  border-b-2 border-b-color-{#50ff7f} ${
                      theme == 'dark'
                        ? 'text-[#000000]'
                        : 'text-[#50ff7f] bg-transparent'
                    }`
                  : 'px-1 tab-item dark:tab-item-dark border-b-2 border-transparent bg-transparent '
              }
              text={value}
              btnText="mobile-tab-bar-text"
              onClick={() => changeTab(index)}
            />
          ))}
        </div>
        {/* </Scrollbars> */}
        <hr className="my-2.5 flex sm:hidden " />
      </>
    </React.Fragment>
  )
}

export default Tabs
