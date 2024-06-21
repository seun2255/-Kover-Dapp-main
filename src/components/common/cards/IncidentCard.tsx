import React from 'react'

interface IncidentProps {
  data: any
}

function shortenAddress(address: string) {
  if (typeof address !== 'string' || address.length < 10) {
    throw new Error('Invalid address')
  }
  return `${address.slice(0, 7)}...`
}

function formatDate(input: string) {
  const date = new Date(input)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  const ordinalSuffix = (day: any) => {
    if (day > 3 && day < 21) return 'th' // handles 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return `${month} ${day}${ordinalSuffix(day)}, ${year}`
}

function IncidentCard({ data }: IncidentProps) {
  return (
    <>
      <div className="bg-dark-600 rounded incident-details dark:bg-white box-border-2x-light dark:box-border-2x-dark">
        {/* PC */}
        <div className="sm:flex items-center font-medium gap-[8px] hidden">
          <img src="/images/__avatar_url.png" alt="" />
          <span className="ml-[11px]">BY: {shortenAddress(data.address)} </span>
          <img width={6} height={6} src="/images/Ellipse 21.svg" alt="" />
          <span className="text-brand-400 dark:text-dark-800 dark:font-semibold font-normal fw-500 fs-14 lh-16">
            Created
          </span>
          <span className="fw-500 fs-14 lh-16">on {formatDate(data.date)}</span>
        </div>

        {/* Moblie */}
        <div className="flex gap-3 sm:hidden">
          <img width={40} height={40} src="/images/__avatar_url.png" alt="" />
          <div className="flex flex-col justify-center">
            <span>BY: {shortenAddress(data.address)} </span>
            <div>
              <span className="text-brand-400 dark:text-dark-800 dark:font-semibold font-normal fw-500 fs-14 lh-16">
                Created
              </span>
              <span className="fw-500 fs-14 lh-16">
                {' '}
                on {formatDate(data.date)}
              </span>
            </div>
          </div>
        </div>

        <p className="  incident-text">{data.incidentDescription}</p>
      </div>
    </>
  )
}

export default IncidentCard
