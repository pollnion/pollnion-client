'use client'

import React from 'react'

import FeedCard from './feed-card'
import FeedPost from './feed-post'
import FeedFilters from './feed-filters'
import FeedCardSkeleton from './feed-card-skeleton'

import useGetFeed from '@/hooks/feed/use-get-feed'
import BaseVirtuoso from '@/components/base/virtuoso/base-virtuoso'

const Index = () => {
  const feedProps = useGetFeed()

  return (
    <React.Fragment>
      <FeedPost />
      <FeedFilters />
      <BaseVirtuoso
        data={feedProps.data}
        LoadComp={FeedCardSkeleton}
        loadMore={feedProps.loadMore}
        isLoading={feedProps.isLoading}
      >
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </BaseVirtuoso>
    </React.Fragment>
  )
}

export default Index
