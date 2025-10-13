import React from 'react'
import Link from 'next/link'
import {map, round} from 'lodash'
import {CircleCheckBig} from 'lucide-react'

import {cn} from '@/lib/utils'
import {FeedItem} from '@/models/feed'
import {Badge} from '@/components/ui/badge'
import {formattedNumber} from '@/lib/numbers'
import {POLL_STATUS} from '@/constants/status'
import {POLL_STATUS_LABEL} from '@/constants/status'
import {StatusPoint} from '@/components/base/badges/base-status-badge'
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

  const isClosed = POLL_STATUS.closed === status
  const maxVotes = Math.max(...options.map((o) => o.votes))

  return (
    <React.Fragment>
      <div className="flex justify-between space-x-2 mb-2">
        <Badge variant="secondary">{space}</Badge>
      </div>

      <div className="flex items-center mb-2 space-x-2 ml-2">
        <TypographyLead className="text-sm text-white font-semibold">
          {formattedNumber(totalVotes)} total votes
        </TypographyLead>

        <div className="flex items-center space-x-2">
          <StatusPoint status={status} />
          <TypographyMuted className="text-xs">
            {POLL_STATUS_LABEL[status as keyof typeof POLL_STATUS_LABEL]}
          </TypographyMuted>
        </div>
      </div>

      <>
        {map(options, ({votes, label}, i) => (
          <div
            key={i}
            className="mb-1 relative items-center rounded-md bg-neutral-800/50 hover:bg-neutral-800/60 hover:cursor-pointer"
          >
            <div
              className={cn(
                'last:mb-0 p-2 rounded-sm whitespace-nowrap flex items-center space-x-2',
                {'bg-neutral-700/50': true} // temp
              )}
              style={{width: `${(votes / totalVotes) * 100}%`}}
            >
              <TypographySmall>{formattedNumber(votes)}</TypographySmall>
              <TypographyMuted className="break-normal">{label}</TypographyMuted>
              {votes === maxVotes && isClosed && <CircleCheckBig size="16" />}
            </div>

            <div className="absolute top-2 right-2">
              <TypographyMuted>{round((votes / totalVotes) * 100)} %</TypographyMuted>
            </div>
          </div>
        ))}
      </>

      {options.length > 3 && (
        <div className="pt-1">
          <TypographyMuted>See more</TypographyMuted>
        </div>
      )}
    </React.Fragment>
  )
}

const FeedContent: React.FC<{item: FeedItem}> = ({item}) => {
  const {content, poll, id} = item || {}
  const {title, description} = content || {}

  return (
    <React.Fragment>
      <div className="mb-2">
        {title && <TypographyLarge className="break-words">{title}</TypographyLarge>}

        {description && (
          <div className="break-normal">
            <TypographyMuted>
              {description.length > 100 ? description.slice(0, 100) + '…' : description}
            </TypographyMuted>

            {description.length > 100 && (
              <Link href={`/polls/${id ?? ''}`}>
                <TypographyMuted className="hover:underline text-sm mt-1">
                  See more
                </TypographyMuted>
              </Link>
            )}
          </div>
        )}
      </div>
      <Polls poll={poll} content={content} />
    </React.Fragment>
  )
}

export default FeedContent
