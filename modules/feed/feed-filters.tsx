import React from 'react'
import {Funnel} from 'lucide-react'
import BaseButton from '@/components/base/buttons/base-button'

const FeedFilters = () => {
  return (
    <div className="text-end">
      <BaseButton variant="secondary" icon={Funnel}>
        Filters
      </BaseButton>
    </div>
  )
}

export default FeedFilters
