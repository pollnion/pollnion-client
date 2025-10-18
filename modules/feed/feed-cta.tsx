import React from 'react'
import {ArrowUp, Forward, Repeat2, Bookmark, MessageCircle} from 'lucide-react'
import {map} from 'lodash'

import {FeedItem} from '@/models/feed'
import {formattedNumber} from '@/lib/numbers'
import BaseButton from '@/components/base/buttons/base-button'

const FeedCta: React.FC<{item: FeedItem}> = ({item}) => {
  const {engagementCount} = item || {}
  const {likes = 0, comments = 0} = engagementCount || {}

  const buttons = [
    {
      icon: ArrowUp,
      label: formattedNumber(likes),
      ariaLabel: 'Like',
    },
    {
      icon: Repeat2,
      label: formattedNumber(0),
      ariaLabel: 'Repost',
    },
    {
      icon: MessageCircle,
      label: formattedNumber(comments),
      ariaLabel: 'Comment',
    },
  ]

  const buttons_v2 = [
    {
      icon: Bookmark,
      ariaLabel: 'Save',
    },
    {
      icon: Forward,
      ariaLabel: 'Share',
    },
  ]

  return (
    <div className="flex justify-between sm:justify-start mt-3">
      <div className="flex space-x-1">
        {map(buttons, (item, idx) => (
          <BaseButton
            key={idx}
            size="sm"
            variant="secondary"
            className="rounded-full"
            aria-label={item.ariaLabel}
          >
            <item.icon aria-hidden="true" />
            {item.label && (
              <span className="sr-only sm:not-sr-only sm:ml-1">{item.label}</span>
            )}
          </BaseButton>
        ))}
      </div>

      <div className="flex">
        {map(buttons_v2, (item, idx) => (
          <BaseButton
            key={idx}
            size="sm"
            variant="ghost"
            className="rounded-full"
            aria-label={item.ariaLabel}
          >
            <item.icon aria-hidden="true" />
          </BaseButton>
        ))}
      </div>
    </div>
  )
}

export default FeedCta
