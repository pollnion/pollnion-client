import React from 'react'
import {isEqual} from 'lodash'
import {Ellipsis} from 'lucide-react'
import {ShieldCheck} from 'lucide-react'
import {FeedItem} from '@/models/feed'
import {USER_STATUS} from '@/constants/status'
import BaseAvatar from '@/components/base/avatars/base-avatar'
import {TypographyMuted} from '@/components/base/typography/base-typography'
import {TypographySmall} from '@/components/base/typography/base-typography'

const FeedHeader: React.FC<{item: FeedItem}> = ({item}) => {
  const {author} = item || {} // createdAt
  const {name, status} = author || {}

  const isAdmin = isEqual(status, USER_STATUS.admin)

  return (
    <div className="flex justify-between items-center space-x-2">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <BaseAvatar />
          <TypographySmall>{name}</TypographySmall>
          {isAdmin && <ShieldCheck size={16} className="text-blue-500" />}
        </div>
        <TypographyMuted className="text-xs">1 hr ago</TypographyMuted>
      </div>
      <Ellipsis />
    </div>
  )
}

export default FeedHeader
