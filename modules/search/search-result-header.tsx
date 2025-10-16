import React from 'react'
import {Search} from 'lucide-react'

import useSearch from '@/hooks/layout/use-search'
import BaseInput from '@/components/base/inputs/base-input'

const SearchResultHeader = () => {
  const {onChange} = useSearch()

  return (
    <div className="px-2">
      <BaseInput
        icon={Search}
        placeholder="Search by keyword"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchResultHeader
