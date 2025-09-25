import React from 'react'
import {Funnel} from 'lucide-react'
import {BaseIcon} from '@/components/base/icons/base-icon'
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
            <BaseIcon nameIcon="AiOutlinePlus" style={{width: 18, height: 18}} />
            <span>Add polls</span>
          </BaseButton>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FeedFilters
