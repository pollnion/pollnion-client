import React from 'react'

import {cn} from '@/lib/utils'
import FeedCta from './feed-cta'
import {FeedItem} from '@/models/feed'
import FeedHeader from './feed-header'
import FeedContent from './feed-content'

const FeedCard = ({item}: {item: FeedItem}) => {
  return (
    <div
      className={cn(
        'py-3 mb-1 sm:mb-4 bg-card p-3 rounded-none sm:rounded hover:cursor-pointer hover:bg-card/90'
      )}
    >
      <FeedHeader item={item} />
      <FeedContent item={item} />
      <FeedCta item={item} />
    </div>
  )
}

export default React.memo(FeedCard)
