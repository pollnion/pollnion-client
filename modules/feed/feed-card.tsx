import React from 'react'
import {useRouter} from 'next/navigation'

import {cn} from '@/lib/utils'
import FeedCta from './feed-cta'
import {FeedItem} from '@/models/feed'
import FeedHeader from './feed-header'
import FeedContent from './feed-content'

const FeedCard = ({item}: {item: FeedItem}) => {
  const {push} = useRouter()

  const {author, id} = item || {}

  const postPath = `/${author.name}/post/${id}`

  return (
    <div
      onClick={() => push(postPath)}
      className={cn(
        'py-3 mb-1 sm:mb-4 bg-card p-3 rounded-none sm:rounded hover:cursor-pointer hover:bg-card/70'
      )}
    >
      <FeedHeader item={item} />
      <FeedContent item={item} />
      <FeedCta item={item} />
    </div>
  )
}

export default FeedCard
