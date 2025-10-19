'use client'

import React from 'react'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {useSearchParams} from 'next/navigation'
import BaseButton from '@/components/base/buttons/base-button'

const TAGS = [
  {
    label: 'For you',
    type: undefined, // default (no query)
  },
  {
    label: 'Users',
    type: 'users',
  },
  {
    label: 'Top polls',
    type: 'polls',
  },
  {
    label: 'Spaces',
    type: 'spaces',
  },
  {
    label: 'Bookmark',
    type: 'bookmark',
  },
]

const SearchTags = () => {
  const searchParams = useSearchParams()
  const currentType = searchParams.get('type')

  return (
    <div className="px-2 flex items-center space-x-2 overflow-x-auto scroll-invisible">
      {TAGS.map((tag) => {
        const isActive = currentType === tag.type || (!currentType && !tag.type)
        const href = tag.type ? `/search?type=${tag.type}` : '/search'

        return (
          <BaseButton
            key={tag.label}
            href={href}
            className={cn(
              'px-3 py-1 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-black'
                : 'bg-muted hover:bg-muted/80 text-foreground/80'
            )}
          >
            {tag.label}
          </BaseButton>
        )
      })}
    </div>
  )
}

export default SearchTags
