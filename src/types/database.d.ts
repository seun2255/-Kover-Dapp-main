export type Notification = {
  message: {
    text: string
    time: string
  }
  from: {
    name: string
    address: string
  }
  link: string
}
