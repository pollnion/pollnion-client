import React from 'react'
import {ArrowUp} from 'lucide-react'
import {Forward} from 'lucide-react'
import {MessageCircle} from 'lucide-react'
import {FeedItem} from '@/models/feed'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographySmall} from '@/components/base/typography/base-typography'

const FeedCta: React.FC<{item: FeedItem}> = ({item}) => {
  const {} = item || {}
  return (
    <div className="mt-3 space-x-1">
      <BaseButton variant="secondary" className="rounded-full w-[60px]" size="sm">
        <ArrowUp />
        <TypographySmall>3</TypographySmall>
      </BaseButton>

      <BaseButton variant="secondary" className="rounded-full w-[60px]" size="sm">
        <MessageCircle />
        <TypographySmall>3</TypographySmall>
      </BaseButton>

      <BaseButton variant="secondary" className="rounded-full w-[60px]" size="sm">
        <Forward />
      </BaseButton>
    </div>
  )
}

export default FeedCta
