const createDateString = (date: any) => {
  const dateString = `${date.month}/${date.day}/${date.year}`
  return dateString
}

export { createDateString }
