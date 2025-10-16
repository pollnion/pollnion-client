'use client'

import React from 'react'
import {map, take} from 'lodash'

import {Badge} from '@/components/ui/badge'
import {formattedNumber} from '@/lib/numbers'
import LatestSkeleton from './latest-skeleton'
import useGetFeed from '@/hooks/feed/use-get-feed'
import {TypographySmall} from '@/components/base/typography/base-typography'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const Index = () => {
  const {data, isLoading} = useGetFeed()

  const _data = take(data, 3)

  if (isLoading) return <LatestSkeleton />

  return (
    <div className="bg-neutral-900 rounded-sm p-3">
      <TypographySmall>Latest polls</TypographySmall>

      <div className="my-2">
        {map(_data, (item, idx) => {
          const {content, poll} = item || {}

          const {title, space} = content || {}
          const {totalVotes} = poll || {}

          return (
            <div
              key={idx}
              className="hover:bg-neutral-800/50 p-1 rounded-sm hover:cursor-pointer"
            >
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
