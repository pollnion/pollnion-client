import React from 'react'
import {map} from 'lodash'

import SearchResultCard from './search-result-card'
import SearchHeader from '@/components/base/search/search-header'

import feed from '@/data/feed.json'

const SearchResult = () => {
  return (
    <div className="px-0 md:px-2 space-y-2">
      <SearchHeader length={feed?.data.length} />
      <div className="grid grid-cols-12 gap-2">
        {map(feed?.data, (item, idx) => {
          return <SearchResultCard key={idx} item={item} />
        })}
      </div>
    </div>
  )
}

export default SearchResult
