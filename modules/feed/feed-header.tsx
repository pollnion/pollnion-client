import React from 'react'
import {isEqual} from 'lodash'
import {Ellipsis} from 'lucide-react'
import {ShieldCheck} from 'lucide-react'

import {FeedItem} from '@/models/feed'
import {timeDifference} from '@/lib/dates'
import {formattedNumber} from '@/lib/numbers'
import {USER_STATUS} from '@/constants/status'
import BaseAvatar from '@/components/base/avatars/base-avatar'
import BaseButton from '@/components/base/buttons/base-button'
import BaseHoverCard from '@/components/base/hover-card/base-hover-card'
import {TypographySmall} from '@/components/base/typography/base-typography'
import {TypographyMedium} from '@/components/base/typography/base-typography'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const FeedHeader: React.FC<{item: FeedItem}> = ({item}) => {
  const {author, created_at} = item || {}
  const {name, status} = author || {}

  const isAdmin = isEqual(status, USER_STATUS.admin)

  const Trigger = () => {
    return (
      <div className="flex items-center space-x-2 hover:underline hover:text-blue-300/90 decoration-blue-300/90">
        <BaseAvatar alt="avatar" />
        <TypographySmall>{name}</TypographySmall>
      </div>
    )
  }

  const Content = () => {
    return (
      <div className="flex space-x-2">
        <BaseAvatar className="h-12 w-12" alt="avatar" />
        <div>
          <TypographyMedium>{name}</TypographyMedium>
          <TypographyMuted className="text-sm">
            {formattedNumber(123)} followers
          </TypographyMuted>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 justify-between">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <BaseHoverCard trigger={<Trigger />} content={<Content />} />

          {isAdmin && <ShieldCheck size={16} className="text-blue-500" />}
        </div>
        <TypographyMuted className="text-xs">
          {timeDifference(created_at)}
        </TypographyMuted>
      </div>
      <BaseButton variant="ghost" className="rounded-full" size="sm">
        <Ellipsis size="18" />
      </BaseButton>
    </div>
  )
}

export default FeedHeader
