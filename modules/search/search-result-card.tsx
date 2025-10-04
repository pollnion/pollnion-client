import React from 'react'
import {FeedItem} from '@/models/feed'
import FeedContent from '../feed/feed-content'
import FeedHeader from '@/modules/feed/feed-header'

const SearchResultCard = ({item}: {item: FeedItem}) => {
  return (
    <div className="bg-card p-3 col-span-12 xl:col-span-6 rounded-none sm:rounded">
      <FeedHeader item={item} />
      <FeedContent item={item} />
    </div>
  )
}

export default SearchResultCard
