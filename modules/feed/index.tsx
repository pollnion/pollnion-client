'use client'

import React from 'react'

import FeedCard from './feed-card'
import FeedPost from './feed-post'
import FeedFilters from './feed-filters'
import FeedCardSkeleton from './feed-card-skeleton'

import {FeedItem} from '@/models/feed'
import {useReadStore} from '@/store/actions/use-read-store'
import BaseVirtuoso from '@/components/base/virtuoso/base-virtuoso'

const Index = () => {
  const feedProps = useReadStore<FeedItem>('feed', {ascending: false})

  return (
    <React.Fragment>
      <FeedPost />
      <FeedFilters />
      <BaseVirtuoso
        data={feedProps.data}
        LoadComp={FeedCardSkeleton}
        isLoading={feedProps.isLoading}
        loadMore={feedProps.loadMore}
      >
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </BaseVirtuoso>
    </React.Fragment>
  )
}

export default Index
