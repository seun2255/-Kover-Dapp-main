import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  timeLeftInSeconds: number
}

const calculateRemainingTime = (timeInSeconds: number) => {
  const days = Math.floor(timeInSeconds / (24 * 60 * 60))
  const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60)

  return {
    days,
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
  }
}

function CountdownTimer({ timeLeftInSeconds }: CountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(timeLeftInSeconds)
  )
  const [timeLeft, setTimeLeft] = useState(timeLeftInSeconds)
  if (timeLeft !== 0) {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(timeLeft - 60))
      setTimeLeft(timeLeft - 60)
      if (timeLeft - 60 === 0) clearInterval(intervalId)
    }, 60000) // Updates every minute
  }

  return (
    <span>{`${remainingTime.days}:${remainingTime.hours}:${remainingTime.minutes}`}</span>
  )
}

export default CountdownTimer
