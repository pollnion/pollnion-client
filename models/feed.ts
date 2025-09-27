import {POLL_STATUS} from '@/constants/status'
import {USER_STATUS} from '@/constants/status'

export type PollOption = {
  id: string
  label: string
  votes: number
}

export type Poll = {
  status: keyof typeof POLL_STATUS | string // temp
  question: string
  totalVotes: number
  options: PollOption[]
}

export type Author = {
  id: string
  name: string
  status: keyof typeof USER_STATUS | string // temp
}

export type Content = {
  title: string
  space: string
  description: string
}

export type EngagementsCount = {
  likes: number
  comments: number
}

export type FeedItem = {
  id: string
  author: Author
  createdAt: number
  content: Content
  poll?: Poll
  engagementCount?: EngagementsCount
}

export type FeedData = FeedItem[]
