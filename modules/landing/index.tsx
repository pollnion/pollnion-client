import React from 'react'
import {Separator} from '@radix-ui/react-separator'

// middle
import Feed from '../feed'

// left
import Spaces from '../spaces'
import Discover from '../discover'

// right
import Share from '../share-cta'
import Timeline from '../timeline-cta'
import LinksCta from '../links-cta'

import {cn} from '@/lib/utils'
import styles from './styles.module.scss'

const Index = () => {
  return (
    <div className="flex items-center justify-between mt-4 sm:space-x-4">
      {/* left */}
      <div
        className={cn(
          styles['scroll-invisible'],
          'hidden sm:block sm:w-[200px] md:w-[250px] space-y-4 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto'
        )}
      >
        <Discover />
        <Separator orientation="horizontal" className="flex-1" />
        <Spaces />
      </div>

      {/* middle */}
      <Feed />

      {/* right */}
      <div
        className={cn(
          styles['scroll-invisible'],
          'hidden md:block sm:w-[200px] md:w-[250px] space-y-4 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto'
        )}
      >
        <Share />
        <Timeline />
        <LinksCta />
      </div>
    </div>
  )
}

export default Index
