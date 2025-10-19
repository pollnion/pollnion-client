import React from 'react'

// middle
import Feed from '../feed'

// left
import Spaces from '../spaces'
import Discover from '../discover'

// right
import Latest from '../latest'
import Share from '../share-cta'
import LinksCta from '../links-cta'
import Timeline from '../timeline-cta'

import PublicColLayout from '@/components/base/layouts/public-col-layout'

const Index = () => {
  return (
    <PublicColLayout
      left={
        <React.Fragment>
          <Discover />
          <Spaces />
        </React.Fragment>
      }
      right={
        <React.Fragment>
          <Share />
          <Timeline />
          <Latest />
          <LinksCta />
        </React.Fragment>
      }
    >
      <Feed />
    </PublicColLayout>
  )
}

export default Index
