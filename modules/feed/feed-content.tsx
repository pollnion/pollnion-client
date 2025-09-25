import React from 'react'
import {map} from 'lodash'
import {FeedItem} from '@/models/feed'
import {TypographyLarge} from '@/components/base/typography/base-typography'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const Polls = ({poll}: {poll: FeedItem['poll']}) => {
  const {options} = poll || {}
  return (
    <React.Fragment>
      {map(options, ({votes, label}, i) => (
        <div key={i} className="bg-red-300 mb-1 p-2 round-xs">
          {votes} {label}
        </div>
      ))}
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
