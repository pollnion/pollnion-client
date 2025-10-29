'use client'

import React from 'react'

import FeedCard from './feed-card'
import FeedPost from './feed-post'
import FeedCardSkeleton from './feed-card-skeleton'

import useGetFeed from '@/hooks/feed/use-get-feed'
import {Separator} from '@/components/ui/separator'
import BaseVirtuoso from '@/components/base/virtuoso/base-virtuoso'
import FeedFilters from './feed-filters'

const Index = () => {
  const feedProps = useGetFeed()

  return (
    <div className="space-y-4 w-full md:w-[560px] relative">
      <FeedPost />
      <FeedFilters />
      <BaseVirtuoso
        data={feedProps.data}
        LoadComp={FeedCardSkeleton}
        loadMore={feedProps.loadMore}
        isLoading={feedProps.isLoading}
      >
        {(idx, item) => <FeedCard key={item.id} item={item} />}
      </BaseVirtuoso>
    </div>
  )
}

export default Index
