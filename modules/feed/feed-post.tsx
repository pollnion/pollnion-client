import React from 'react'
import {Plus} from 'lucide-react'
import BaseButton from '@/components/base/buttons/base-button'

const FeedPost = () => {
  return (
    <React.Fragment>
      <div className="fixed bottom-4 right-4 z-50 block md:hidden">
        <BaseButton className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
          <Plus />
        </BaseButton>
      </div>
    </React.Fragment>
  )
}

export default FeedPost
