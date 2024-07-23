import React from 'react'

interface FilterTabsProps {
  tabs: string[]
  currentTab: number
  showinmobile?: boolean
  changeTab: (index: number) => void
  setCurrency?: any
}

function FilterTabs({
  tabs,
  currentTab,
  changeTab,
  showinmobile,
  setCurrency,
}: FilterTabsProps) {
  return (
    //
    <div className={`gap-4 ${showinmobile ? 'flex' : 'hidden md:flex'}`}>
      {tabs.map((value, index) => (
        <button
          key={index}
          type="button"
          className={`currency-type
          ${
            index === currentTab
              ? 'text-white dark:text-dark-100'
              : 'text-dark-200'
          }`}
          onClick={() => {
            changeTab(index)
            setCurrency?.(value)
          }}
        >
          {value}
        </button>
      ))}
    </div>
  )
}
export default FilterTabs
