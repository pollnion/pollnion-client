import React from 'react'
import {ArrowUp} from 'lucide-react'
import {Forward} from 'lucide-react'
import {MessageCircle} from 'lucide-react'

import {FeedItem} from '@/models/feed'
import {formattedNumber} from '@/lib/numbers'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographySmall} from '@/components/base/typography/base-typography'

const FeedCta: React.FC<{item: FeedItem}> = ({item}) => {
  const {engagement_count} = item || {}
  const {likes, comments} = engagement_count || {}

  return (
    <div className="mt-3 space-x-1">
      <BaseButton variant="secondary" className="rounded-full" size="sm">
        <ArrowUp />
        <TypographySmall>{formattedNumber(likes)}</TypographySmall>
      </BaseButton>

      <BaseButton variant="secondary" className="rounded-full" size="sm">
        <MessageCircle />
        <TypographySmall>{formattedNumber(comments)}</TypographySmall>
      </BaseButton>

      <BaseButton variant="secondary" className="rounded-full w-[60px]" size="sm">
        <Forward />
      </BaseButton>
    </div>
  )
}

export default FeedCta
