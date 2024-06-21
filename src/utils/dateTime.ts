const createDateString = (date: any) => {
  const dateString = `${date.month}/${date.day}/${date.year}`
  return dateString
}

function getCurrentDateTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
  const day = now.getDate().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')

  const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

  return formattedDateTime
}

function getCurrentFormattedTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0')

  let hours = now.getHours()
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // The hour '0' should be '12'
  const strHours = String(hours).padStart(2, '0')

  return `${year}/${month}/${day} ${strHours}:${minutes}:${seconds} ${ampm}`
}

function getCurrentTime() {
  // Create a new Date object representing the current time
  var currentDate = new Date()

  // Get hours, minutes, and AM/PM indicator
  var hours = currentDate.getHours()
  var minutes: any = currentDate.getMinutes()
  var ampm = hours >= 12 ? 'PM' : 'AM'

  // Convert hours to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // The hour '0' should be '12' in 12-hour format

  // Pad single-digit minutes with a leading zero
  minutes = minutes < 10 ? '0' + minutes : minutes

  // Construct the time string
  var timeString = hours + ':' + minutes + ' ' + ampm

  return timeString
}

function createTimeString(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours} : ${minutes}`
}

export {
  createDateString,
  getCurrentDateTime,
  getCurrentTime,
  createTimeString,
  getCurrentFormattedTime,
}
