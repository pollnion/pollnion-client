import React from 'react'
import {map} from 'lodash'
import {isEqual} from 'lodash'
import {FeedItem} from '@/models/feed'
import {Badge} from '@/components/ui/badge'
import {formattedNumber} from '@/lib/numbers'
import {POLL_STATUS} from '@/constants/status'
import BaseStatusBadge from '@/components/base/badges/base-status-badge'
import {TypographySmall} from '@/components/base/typography/base-typography'
import {TypographyLarge} from '@/components/base/typography/base-typography'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const Polls = ({
  poll,
  content,
}: {
  poll: FeedItem['poll']
  content: FeedItem['content']
}) => {
  const {space} = content || {}
  const {options, status, totalVotes = 0} = poll || {}

  const isOpen = isEqual(status, POLL_STATUS.open)

  return (
    <React.Fragment>
      <div className="flex justify-between space-x-2 mb-2">
        <Badge variant="secondary">{space}</Badge>
      </div>

      <div className="border rounded-sm p-2">
        <div className="flex items-center mb-2 justify-between space-x-2">
          <BaseStatusBadge status={status} />
          {isOpen && <TypographyMuted className="text-xs">3 hrs left</TypographyMuted>}
        </div>

        {map(options, ({votes, label}, i) => (
          <div
            key={i}
            className="bg-neutral-900 mb-1 last:mb-0 p-2 rounded-sm whitespace-nowrap flex items-center space-x-2"
            style={{width: `${votes}%`}}
          >
            <TypographySmall>{votes}</TypographySmall>
            <TypographyMuted>{label}</TypographyMuted>
          </div>
        ))}

        <div className="pt-1 flex justify-between">
          <Badge variant="outline">{formattedNumber(totalVotes)} votes</Badge>
          <TypographyMuted>See more</TypographyMuted>
        </div>
      </div>
    </React.Fragment>
  )
}

const FeedContent: React.FC<{item: FeedItem}> = ({item}) => {
  const {content, poll} = item || {}
  const {title, description} = content || {}

  return (
    <React.Fragment>
      <div className="mb-2">
        {title && <TypographyLarge>{title}</TypographyLarge>}
        {description && <TypographyMuted>{description}</TypographyMuted>}
      </div>
      <Polls poll={poll} content={content} />
    </React.Fragment>
  )
}

export default FeedContent
