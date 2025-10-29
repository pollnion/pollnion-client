import React from 'react'
import map from 'lodash/map'
import {Heart} from 'lucide-react'
import {Book} from 'lucide-react'
import {Search} from 'lucide-react'
import {Bookmark} from 'lucide-react'
import {DollarSign} from 'lucide-react'

import discover from '@/data/discover.json'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const ICONS = {
  spaces: Book,
  search: Search,
  for_you: Heart,
  plan: DollarSign,
  bookmark: Bookmark,
}

const LABELS = {
  plan: 'Plan',
  spaces: 'Spaces',
  search: 'Search',
  for_you: 'For you',
  bookmark: 'Bookmark',
}

const Index = () => {
  return (
    <div>
      <TypographyMuted className="mb-2">Discover</TypographyMuted>
      <div className="border-l px-2">
        {map(discover.data, (item: {label: string}, idx: number) => {
          const {label} = item || {} // value,
          return (
            <div key={idx}>
              <BaseButton
                size="sm"
                variant="ghost"
                className="w-full justify-start gap-2"
                icon={ICONS[label as keyof typeof ICONS]}
              >
                {LABELS[label as keyof typeof LABELS]}
              </BaseButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Index
