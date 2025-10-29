import React from 'react'
import map from 'lodash/map'
import {ArrowUp} from 'lucide-react'
import {Forward} from 'lucide-react'
import {Repeat2} from 'lucide-react'
import {Bookmark} from 'lucide-react'
import {MessageCircle} from 'lucide-react'

import {FeedItem} from '@/models/feed'
import {formattedNumber} from '@/lib/numbers'
import BaseButton from '@/components/base/buttons/base-button'

const FeedCta: React.FC<{item: FeedItem}> = ({item}) => {
  const {engagementCount} = item || {}
  const {likes, comments} = engagementCount || {}

  const buttons = [
    {
      // likes
      icon: ArrowUp,
      label: formattedNumber(likes),
    },
    {
      // reposts
      icon: Repeat2,
      label: formattedNumber(likes),
    },
    {
      // comments
      icon: MessageCircle,
      label: formattedNumber(comments),
    },
  ]

  const buttons_v2 = [
    {
      // bookmark
      icon: Bookmark,
    },
    {
      // forward
      icon: Forward,
    },
  ]

  return (
    <div className="flex justify-between sm:justify-start mt-3">
      <div className="flex space-x-1">
        {map(buttons, ({icon, label}, idx) => (
          <BaseButton
            key={idx}
            icon={icon}
            size="sm"
            variant="secondary"
            className="rounded-full"
          >
            {label}
          </BaseButton>
        ))}
      </div>

      <div className="flex">
        {map(buttons_v2, ({icon}, idx) => (
          <BaseButton
            key={idx}
            icon={icon}
            size="sm"
            variant="ghost"
            className="rounded-full"
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(FeedCta)
