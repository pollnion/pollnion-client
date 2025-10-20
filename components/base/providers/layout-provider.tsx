'use client'

import React from 'react'
import {createContext} from 'react'
import Spaces from '@/modules/spaces'
import Discover from '@/modules/discover'
import LinkCta from '@/modules/links-cta'
import ShareCta from '@/modules/share-cta'
import BaseSheet from '../sheet/base-sheet'
import {useToggle} from '@/store/useToggle'

const defaultValues = {
  isOpen: false,
  toggleOpen: () => {},
}

export const LayoutContext = createContext(defaultValues as DialogProps)

const SHEET_CONTENTS = {
  title: 'Tags & Spaces',
  description: `Categorize your content with tags or spaces. Perfect for filtering and staying organized.`,
}

const LayoutProvider = ({children}: {children: Children}) => {
  const {open, setOpen} = useToggle()

  const props = {
    isOpen: open,
    toggleOpen: () => setOpen(!open),
  }

  return (
    <LayoutContext.Provider value={{...props}}>
      {children}

      <BaseSheet {...props} {...SHEET_CONTENTS} footer={<LinkCta />}>
        <div className="space-y-4">
          <ShareCta />
          <Discover />
          <Spaces />
        </div>
      </BaseSheet>
    </LayoutContext.Provider>
  )
}

export default LayoutProvider
