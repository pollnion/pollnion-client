'use client'

import React, {useEffect} from 'react'
import {createContext} from 'react'

import {useDialog} from '@/store/ui/use-dialog'
import BaseDialog from '../dialogs/base-dialog'
import PostFeedForm from '../forms/post-feed-form'
import usePostFeed from '@/hooks/feed/use-post-feed'

type DefaultValue = {} & DialogProps

const defaultValue = {
  isOpen: false,
  toggleOpen: () => {},
}

export const FeedContext = createContext(defaultValue as DefaultValue)

const FeedProvider = ({children}: {children: Children}) => {
  const dialogProps = useDialog()
  const {form, onSubmit, isLoading} = usePostFeed(callback)

  function callback() {
    dialogProps.toggleOpen()
  }

  useEffect(() => {
    form.reset()
  }, [dialogProps.isOpen, form])

  const loading = form.formState.isSubmitting || isLoading

  return (
    <FeedContext.Provider value={{...dialogProps}}>
      {children}

      <BaseDialog
        type="form"
        title="Create poll"
        form={form}
        onSubmit={onSubmit}
        isOpen={dialogProps.isOpen}
        toggleOpen={dialogProps.toggleOpen}
        className="h-[600px] overflow-y-scroll"
        onOkProps={{
          label: 'Create poll',
          className: 'w-full',
          disabled: loading,
          isLoading: loading,
        }}
      >
        <PostFeedForm form={form} />
      </BaseDialog>
    </FeedContext.Provider>
  )
}

export default FeedProvider
