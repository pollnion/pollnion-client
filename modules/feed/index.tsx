'use client'

import React from 'react'
import FeedCard from './feed-card'
import FeedFilters from './feed-filters'
import useGetFeed from '@/hooks/feed/use-get-feed'
import {Separator} from '@/components/ui/separator'
import FeedCardSkeleton from './feed-card-skeleton'
import BaseVirtuoso from '@/components/base/virtuoso/base-virtuoso'

const Index = () => {
  const feedProps = useGetFeed()

  return (
    <div className="col-span-8 xl:col-span-6 space-y-4 w-[700px]">
      <FeedFilters />
      <Separator className="my-3" />

      <BaseVirtuoso
        data={feedProps.data}
        LoadComp={FeedCardSkeleton}
        loadMore={feedProps.loadMore}
        isLoading={feedProps.isLoading}
      >
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </BaseVirtuoso>
    </div>
  )
}

export default Index
