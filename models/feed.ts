export type PollOption = {
  id: string
  label: string
  votes: number
}

export type Poll = {
  status: string
  question: string
  totalVotes: number
  options: PollOption[]
}

export type Author = {
  id: string
  name: string
  status: string
}

export type Content = {
  title: string
  description: string
}

export type FeedItem = {
  id: string
  author: Author
  createdAt: number
  content: Content
  poll?: Poll
}

export type FeedData = FeedItem[]
