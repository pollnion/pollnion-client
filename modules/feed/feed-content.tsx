import React from 'react'
import {map} from 'lodash'
import {FeedItem} from '@/models/feed'
import {Badge} from '@/components/ui/badge'
import {BaseIcon} from '@/components/base/icons/base-icon'
import BaseStatusBadge from '@/components/base/badges/base-status-badge'
import {TypographySmall} from '@/components/base/typography/base-typography'
import {TypographyLarge} from '@/components/base/typography/base-typography'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const Polls = ({poll}: {poll: FeedItem['poll']}) => {
  const {options, status, totalVotes} = poll || {}
  return (
    <React.Fragment>
      <div className="flex justify-between space-x-2 mb-2">
        <div className="flex space-x-2">
          <BaseStatusBadge status={status} />
          <Badge variant="outline">{totalVotes} votes</Badge>
        </div>
        <Badge variant="secondary">help</Badge>
      </div>

      {map(options, ({votes, label}, i) => (
        <div
          key={i}
          className="bg-neutral-900 mb-1 p-2 rounded-sm flex items-center space-x-2"
        >
          <TypographySmall>{votes}</TypographySmall>{' '}
          <TypographyMuted>{label}</TypographyMuted>
        </div>
      ))}

      <div className="py-3 flex justify-between">
        <TypographySmall>See more</TypographySmall>

        <div className="flex space-x-1 items-center">
          <BaseIcon nameIcon="AiOutlineClockCircle" />
          <TypographyMuted>3 hrs left</TypographyMuted>
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
      <Polls poll={poll} />
    </React.Fragment>
  )
}

export default FeedContent
