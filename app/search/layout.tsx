'use client'

import React from 'react'
import {ChevronLeft} from 'lucide-react'

import Spaces from '@/modules/spaces'
import Share from '@/modules/share-cta'
import Latest from '@/modules/latest'
import LinksCta from '@/modules/links-cta'
import Timeline from '@/modules/timeline-cta'
import Discover from '@/modules/discover'
import SearchTags from '@/modules/search/search-tags'
import BaseButton from '@/components/base/buttons/base-button'
import PublicLayout from '@/components/base/layouts/public-layout'
import SearchResultHeader from '@/modules/search/search-result-header'
import PublicColLayout from '@/components/base/layouts/public-col-layout'

const Layout = ({children}: {children: Children}) => {
  return (
    <PublicLayout showNav showFooter>
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
        <div className="space-y-4">
          <div className="sticky top-0 z-10 bg-background pb-2 space-y-2">
            <BaseButton variant="ghost" icon={ChevronLeft} href="/">
              Go back
            </BaseButton>

            <SearchResultHeader />
            <SearchTags />
          </div>

          {children}
        </div>
      </PublicColLayout>
    </PublicLayout>
  )
}

export default Layout
