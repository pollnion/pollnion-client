'use client'

import React from 'react'
import {ChevronLeft} from 'lucide-react'

import {cn} from '@/lib/utils'
import Spaces from '@/modules/spaces'
import Discover from '@/modules/discover'
import SearchTags from '@/modules/search/search-tags'
import BaseButton from '@/components/base/buttons/base-button'
import PublicLayout from '@/components/base/layouts/public-layout'
import SearchResultHeader from '@/modules/search/search-result-header'

const Layout = ({children}: {children: Children}) => {
  return (
    <PublicLayout showNav showFooter>
      <section className="grid grid-cols-12 p-0 m-0">
        <div
          className={cn(
            'hidden sm:block sm:col-span-4 lg:col-span-3 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-auto scroll-invisible'
          )}
        >
          <div className="space-y-4 sm:w-[200px] md:w-[250px]">
            <Discover />
            <Spaces />
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-6 space-y-3">
          <BaseButton variant="ghost" icon={ChevronLeft} href="/">
            Go back
          </BaseButton>

          <SearchResultHeader />
          <SearchTags />

          {children}
        </div>

        {/* dummy */}
        <div className="hidden lg:block col-span-3"></div>
      </section>
    </PublicLayout>
  )
}

export default Layout
