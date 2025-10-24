'use client'

import React from 'react'
import {map} from 'lodash'
import {useSearchParams} from 'next/navigation'

import Users from '../users'
import {FeedItem} from '@/models/feed'
import SearchResultCard from './search-result-card'
import {useReadStore} from '@/store/actions/use-read-store'
import SearchHeader from '@/components/base/search/search-header'
// (optional future imports: Polls, Spaces, Bookmark, etc.)

const SearchResult = () => {
  const searchParams = useSearchParams()
  const currentType = searchParams.get('type')
  const {data} = useReadStore<FeedItem>('feed')

  const renderContent = () => {
    switch (currentType) {
      case 'users':
        return <Users />
      // case 'polls':
      //   return <Polls />
      // case 'spaces':
      //   return <Spaces />
      // case 'bookmark':
      //   return <Bookmark />
      default:
        return map(data, (item, idx) => <SearchResultCard key={idx} item={item} />)
    }
  }

  return (
    <div className="space-y-2">
      <SearchHeader length={data.length} />
      {renderContent()}
    </div>
  )
}

export default SearchResult
