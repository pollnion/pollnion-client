import React from 'react'
import {ArrowUp} from 'lucide-react'
import {Forward} from 'lucide-react'
import {Repeat2} from 'lucide-react'
import {Bookmark} from 'lucide-react'
import {MessageCircle} from 'lucide-react'

import {FeedItem} from '@/models/feed'
import {formattedNumber} from '@/lib/numbers'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographySmall} from '@/components/base/typography/base-typography'

const FeedCta: React.FC<{item: FeedItem}> = ({item}) => {
  const {engagementCount} = item || {}
  const {likes, comments} = engagementCount || {}

  return (
    <div className="flex justify-between sm:justify-start mt-3">
      <div className="flex space-x-1">
        <BaseButton variant="secondary" className="rounded-full" size="sm">
          <ArrowUp />
          <TypographySmall>{formattedNumber(likes)}</TypographySmall>
        </BaseButton>

        <BaseButton variant="secondary" className="rounded-full" size="sm">
          <Repeat2 />
          <TypographySmall>{formattedNumber(likes)}</TypographySmall>
        </BaseButton>

        <BaseButton variant="secondary" className="rounded-full" size="sm">
          <MessageCircle />
          <TypographySmall>{formattedNumber(comments)}</TypographySmall>
        </BaseButton>
      </div>

      <div className="flex">
        <BaseButton variant="ghost" className="rounded-full" size="sm">
          <Bookmark />
        </BaseButton>

        <BaseButton variant="ghost" className="rounded-full" size="sm">
          <Forward />
        </BaseButton>
      </div>
    </div>
  )
}

export default FeedCta
