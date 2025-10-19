import React from 'react'
import {Search} from 'lucide-react'

import useSearch from '@/hooks/layout/use-search'
import BaseInput from '@/components/base/inputs/base-input'

const SearchResultHeader = () => {
  const {onChange} = useSearch()

  return (
    <BaseInput
      icon={Search}
      placeholder="Search by keyword"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchResultHeader
