import React from 'react'
import {FeedItem} from '@/models/feed'
import FeedCard from '../feed/feed-card'

const SearchResultCard = ({item}: {item: FeedItem}) => {
  return <FeedCard item={item} />
}

export default SearchResultCard
