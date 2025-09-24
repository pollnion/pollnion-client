import React from 'react'
import {Funnel} from 'lucide-react'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const FeedFilters = () => {
  return (
    <div className="flex items-center justify-between">
      <TypographyMuted className="text-bg">Polls</TypographyMuted>
      <BaseButton variant="ghost" icon={Funnel}>
        Filters
      </BaseButton>
    </div>
  )
}

export default FeedFilters
