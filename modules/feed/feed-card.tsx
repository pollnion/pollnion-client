import React from 'react'

import {cn} from '@/lib/utils'
import FeedCta from './feed-cta'
import {FeedItem} from '@/models/feed'
import FeedHeader from './feed-header'
import FeedContent from './feed-content'

const FeedCard = ({item}: {item: FeedItem}) => {
  return (
    <div className={cn('py-3 border-b')}>
      <FeedHeader item={item} />
      <FeedContent item={item} />
      <FeedCta item={item} />
    </div>
  )
}

export default FeedCard
