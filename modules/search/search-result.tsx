'use client'

import React from 'react'
import {map} from 'lodash'
import {useSearchParams} from 'next/navigation'

import feed from '@/data/feed.json'
import SearchResultCard from './search-result-card'
import SearchHeader from '@/components/base/search/search-header'
import Users from '../users'
// (optional future imports: Polls, Spaces, Bookmark, etc.)

const SearchResult = () => {
  const searchParams = useSearchParams()
  const currentType = searchParams.get('type')

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
        return map(feed?.data, (item, idx) => <SearchResultCard key={idx} item={item} />)
    }
  }

  return (
    <div className="space-y-2">
      <SearchHeader length={feed?.data.length} />
      {renderContent()}
    </div>
  )
}

export default SearchResult
