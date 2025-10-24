import {format} from 'date-fns'

export const dateLabel = (seconds: number) => {
  const unixTimestamp = seconds * 1000
  const date = new Date(unixTimestamp)
  // Convert Unix timestamp to Date object
  const formattedDate = format(date, 'MMMM dd, yyyy')
  return formattedDate || 'N/A'
}

export const timeDifference = (timestamp: string | number | Date) => {
  const date = new Date(timestamp)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  const intervals = [
    {label: 'y', seconds: 31536000},
    {label: 'mo', seconds: 2592000},
    {label: 'w', seconds: 604800},
    {label: 'd', seconds: 86400},
    {label: 'h', seconds: 3600},
    {label: 'm', seconds: 60},
  ]

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds)
    if (count >= 1) return `${count}${i.label} ago`
  }

  return `${Math.floor(seconds)}s ago`
}

export const getTimestamp = () => {
  const now = new Date()
  const seconds = Math.floor(now.getTime() / 1000)
  const nanoseconds = now.getMilliseconds() * 1000000

  const timestamp = {seconds, nanoseconds}

  return timestamp
}
