import React from 'react'
import FeedCard from './feed-card'
import FeedFilters from './feed-filters'
import {Separator} from '@/components/ui/separator'

const Feed = () => {
  return (
    <div className="col-span-8 xl:col-span-6 space-y-4 w-[700px]">
      <FeedFilters />
      <Separator className="my-3" />
      <FeedCard />
    </div>
  )
}

export default Feed
