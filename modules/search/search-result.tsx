import React from 'react'
import {map} from 'lodash'
import {ArrowUpDown} from 'lucide-react'

import SearchResultCard from './search-result-card'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyLarge} from '@/components/base/typography/base-typography'

import feed from '@/data/feed.json'

const Head = () => {
  return (
    <div className="flex items-center justify-between px-2">
      <TypographyLarge className="text-md">Search result (728)</TypographyLarge>
      <BaseButton variant="secondary" icon={ArrowUpDown}>
        Sort
      </BaseButton>
    </div>
  )
}

const SearchResult = () => {
  return (
    <div className="px-0 md:px-2 space-y-2">
      <Head />
      <div className="grid grid-cols-12 gap-2">
        {map(feed?.data, (item, idx) => {
          return <SearchResultCard key={idx} item={item} />
        })}
      </div>
    </div>
  )
}

export default SearchResult
