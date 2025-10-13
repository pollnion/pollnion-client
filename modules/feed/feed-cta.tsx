import React from 'react'
import {map} from 'lodash'
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
      Icon: ArrowUp,
      label: formattedNumber(likes),
    },
    {
      // likes
      Icon: Repeat2,
      label: formattedNumber(likes),
    },
    {
      // likes
      Icon: MessageCircle,
      label: formattedNumber(comments),
    },
  ]

  const buttons_v2 = [
    {
      // bookmark
      Icon: Bookmark,
    },
    {
      // forward
      Icon: Forward,
    },
  ]

  return (
    <div className="flex justify-between sm:justify-start mt-3">
      <div className="flex space-x-1">
        {map(buttons, (item, idx) => {
          return React.createElement(BaseButton, {
            ...item,
            key: idx,
            size: 'sm',
            variant: 'secondary',
            className: 'rounded-full',
          })
        })}
      </div>

      <div className="flex">
        {map(buttons_v2, (item, idx) => {
          return React.createElement(BaseButton, {
            ...item,
            key: idx,
            size: 'sm',
            variant: 'ghost',
            className: 'rounded-full',
          })
        })}
      </div>
    </div>
  )
}

export default FeedCta
