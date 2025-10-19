import React from 'react'
import {TypographyLarge} from '../typography/base-typography'
import BaseButton from '../buttons/base-button'
import {ArrowUpDown} from 'lucide-react'

const SearchHeader = ({length}: {length: number}) => {
  return (
    <div className="flex items-center justify-between px-2 pb-2">
      <TypographyLarge className="text-md">Search result ({length})</TypographyLarge>
      <BaseButton variant="secondary" icon={ArrowUpDown}>
        Sort
      </BaseButton>
    </div>
  )
}

export default SearchHeader
