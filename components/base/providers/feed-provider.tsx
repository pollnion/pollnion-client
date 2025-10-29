'use client'

import React, {useEffect} from 'react'
import {createContext, useState} from 'react'

import BaseDialog from '../dialogs/base-dialog'
import usePostFeed from '@/hooks/feed/use-post-feed'
import PostFeedForm from '../forms/post-feed-form'

type DefaultValue = {} & DialogProps

const defaultValue = {
  isOpen: false,
  toggleOpen: () => {},
}

export const FeedContext = createContext(defaultValue as DefaultValue)

const FeedProvider = ({children}: {children: Children}) => {
  const {form, onSubmit} = usePostFeed()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen, form])

  return (
    <FeedContext.Provider value={{toggleOpen, isOpen}}>
      {children}

      <BaseDialog
        type="form"
        title="Create poll"
        form={form}
        isOpen={isOpen}
        onSubmit={onSubmit}
        toggleOpen={toggleOpen}
        onOkProps={{label: 'Create poll', className: 'w-full'}}
        className="h-[600px] overflow-y-scroll"
      >
        <PostFeedForm form={form} />
      </BaseDialog>
    </FeedContext.Provider>
  )
}

export default FeedProvider
