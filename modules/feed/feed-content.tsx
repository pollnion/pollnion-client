import React from 'react'
import {map} from 'lodash'
import {FeedItem} from '@/models/feed'
import {Badge} from '@/components/ui/badge'
import {formattedNumber} from '@/lib/numbers'
import {CircleCheckBig} from 'lucide-react'
import {POLL_STATUS_LABEL} from '@/constants/status'
import {TypographySmall} from '@/components/base/typography/base-typography'
import {TypographyLead} from '@/components/base/typography/base-typography'
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
  const {options = [], status, totalVotes = 0} = poll || {}

  const maxVotes = Math.max(...options.map((o) => o.votes))

  return (
    <React.Fragment>
      <div className="flex justify-between space-x-2 mb-2">
        <Badge variant="secondary">{space}</Badge>
      </div>

      <div className="rounded-sm">
        <div className="flex items-center mb-2 space-x-2 ml-2">
          <TypographyLead className="text-sm text-white font-semibold">
            {formattedNumber(totalVotes)} total votes
          </TypographyLead>
          <div>•</div>
          <TypographyMuted className="text-xs">
            {POLL_STATUS_LABEL[status as keyof typeof POLL_STATUS_LABEL]}
          </TypographyMuted>
        </div>

        {map(options, ({votes, label}, i) => (
          <div
            key={i}
            className="bg-neutral-800 mb-1 last:mb-0 p-2 rounded-sm whitespace-nowrap flex items-center space-x-2"
            style={{width: `${(votes / totalVotes) * 100}%`}}
          >
            <TypographySmall>{votes}</TypographySmall>
            <TypographyMuted>{label}</TypographyMuted>
            {votes === maxVotes && <CircleCheckBig size="16" />}
          </div>
        ))}

        <div className="pt-1">
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
