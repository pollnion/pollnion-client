import React from 'react'
import {Plus} from 'lucide-react'
import {Funnel} from 'lucide-react'
import BaseButton from '@/components/base/buttons/base-button'

const FeedFilters = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <BaseButton variant="ghost" icon={Funnel}>
          Filters
        </BaseButton>

        <div className="text-end">
          <BaseButton variant="outline">
            <Plus />
            <span>Add polls</span>
          </BaseButton>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FeedFilters
