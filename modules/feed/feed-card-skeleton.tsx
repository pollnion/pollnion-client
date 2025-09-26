import React from 'react'
import {ClassNameValue} from 'tailwind-merge'

import {CardContent} from '@/components/ui/card'
import {Skeleton} from '@/components/ui/skeleton'
import {Avatar, AvatarFallback} from '@/components/ui/avatar'

type SkeletonFeedItemProps = {
  className?: ClassNameValue
}

export const FeedCardSkeleton: React.FC<SkeletonFeedItemProps> = ({className = ''}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback>
            <Skeleton className="w-10 h-10 rounded-full" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 w-3/5">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-2 w-4/6 rounded-md" />
            </div>
            <Skeleton className="h-3 w-12 rounded-md" />
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-11/12 rounded-md" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </CardContent>

      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <div className="ml-auto">
          <Skeleton className="h-8 w-10 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default FeedCardSkeleton
