import React from 'react'
import {FeedItem} from '@/models/feed'
import BaseAvatar from '@/components/base/avatars/base-avatar'
import {TypographyMuted} from '@/components/base/typography/base-typography'
import {TypographySmall} from '@/components/base/typography/base-typography'

const FeedHeader: React.FC<{item: FeedItem}> = ({item}) => {
  const {author} = item || {} // createdAt
  const {name} = author || {}

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        <BaseAvatar />
        <TypographySmall>{name}</TypographySmall>
      </div>
      <TypographyMuted className="text-xs">1 hr ago</TypographyMuted>
    </div>
  )
}

export default FeedHeader
