import React from 'react'
import {map} from 'lodash'
import {TypographyMuted} from '../typography/base-typography'
import {TypographyP, TypographySmall} from '../typography/base-typography'

type TimelineItem = {
  description?: string
}

const timeline: TimelineItem[] = [{description: 'Pollnion just launched! 🎉🥳'}]

export function BaseTimeline() {
  return (
    <div className="bg-neutral-900 rounded-sm p-3">
      <TypographyP className="font-extrabold">What&apos;s new?</TypographyP>

      {map(timeline, (item, idx) => {
        const {description} = item || {}
        return (
          <React.Fragment key={idx}>
            <TypographyMuted>{description}</TypographyMuted>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default BaseTimeline
