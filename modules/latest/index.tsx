'use client'

import React from 'react'
import {map, take} from 'lodash'

import {formattedNumber} from '@/lib/numbers'
import useGetFeed from '@/hooks/feed/use-get-feed'
import {TypographyLead} from '@/components/base/typography/base-typography'
import {TypographySmall} from '@/components/base/typography/base-typography'
import {TypographyMuted} from '@/components/base/typography/base-typography'
import {Badge} from '@/components/ui/badge'

const Index = () => {
  const {data} = useGetFeed()

  const _data = take(data, 3)

  return (
    <div className="bg-neutral-900 rounded-sm p-4">
      <TypographySmall>Latest polls</TypographySmall>

      <div className="space-y-2 my-2">
        {map(_data, (item, idx) => {
          const {content, poll} = item || {}
          const {title, space} = content || {}
          const {totalVotes} = poll || {}
          return (
            <div key={idx}>
              {title && <TypographySmall>{title}</TypographySmall>}
              <div className="flex space-x-1 mt-1 items-center">
                <Badge variant="secondary">{space}</Badge>
                <TypographyMuted className="text-xs">
                  {formattedNumber(totalVotes)} total votes
                </TypographyMuted>
              </div>
            </div>
          )
        })}
      </div>

      <TypographyMuted>See more</TypographyMuted>
    </div>
  )
}

export default Index
