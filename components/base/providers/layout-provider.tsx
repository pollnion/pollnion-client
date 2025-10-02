'use client'

import React from 'react'
import {createContext} from 'react'
import Spaces from '@/modules/spaces'
import useSheet from '../sheet/useSheet'
import Discover from '@/modules/discover'
import LinkCta from '@/modules/links-cta'
import ShareCta from '@/modules/share-cta'
import BaseSheet from '../sheet/base-sheet'

type DefaultValues = DialogProps

const defaultValues = {
  isOpen: false,
  toggleOpen: () => {},
}

export const LayoutContext = createContext(defaultValues as DefaultValues)

const SHEET_CONTENTS = {
  title: 'Tags & Spaces',
  description: `Categorize your content with tags or spaces. Perfect for filtering and staying organized.`,
}

const LayoutProvider = ({children}: {children: Children}) => {
  const sheetProps = useSheet()

  return (
    <LayoutContext.Provider value={{...sheetProps}}>
      {children}

      <BaseSheet {...sheetProps} {...SHEET_CONTENTS} footer={<LinkCta />}>
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
