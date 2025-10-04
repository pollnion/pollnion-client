import React from 'react'
import {Search} from 'lucide-react'

import BaseInput from '@/components/base/inputs/base-input'

const SearchResultHeader = () => {
  return (
    <div className="px-2">
      <BaseInput icon={Search} placeholder="Search by keyword" />
    </div>
  )
}

export default SearchResultHeader
