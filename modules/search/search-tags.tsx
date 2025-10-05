'use client'

import React from 'react'
import {map} from 'lodash'
import {usePathname} from 'next/navigation'
import BaseButton from '@/components/base/buttons/base-button'

const TAGS = [
  {
    label: 'For you',
    href: '/search',
  },
  {
    label: 'Users',
    href: '/search/users',
  },
  {
    label: 'Top polls',
    href: '/search/polls',
  },
  {
    label: 'Spaces',
    href: '/search/spaces',
  },
  {
    label: 'Bookmark',
    href: '/search/bookmark',
  },
]

const SearchTags = () => {
  const pathname = usePathname()

  return (
    <div className="px-2 flex items-center space-x-1 overflow-x-auto scroll-invisible">
      {map(TAGS, ({label, href}, idx) => {
        const isActive = href && pathname === href
        return (
          <BaseButton
            key={idx}
            variant={isActive ? 'default' : 'secondary'}
            href={href}
            className="flex-shrink-0"
          >
            {label}
          </BaseButton>
        )
      })}
    </div>
  )
}

export default SearchTags
