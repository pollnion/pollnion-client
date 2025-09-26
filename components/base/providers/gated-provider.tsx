'use client'

import React from 'react'
import {useState} from 'react'
import {createContext} from 'react'
import BaseDialog from '../dialogs/base-dialog'
import SignInForm from '../forms/sign-in-form'
import useSignIn from '@/hooks/auth/use-sign-in'
import {useAuth} from '@/hooks/providers/use-auth'

type DefaultValues = DialogProps

const defaultValues = {
  isOpen: false,
  toggleOpen: () => {},
}

export const GatedContext = createContext(defaultValues as DefaultValues)

// ** READ ME **
// for prompting login modal for unauthenticated users
const GatedProvider = ({children}: {children: Children}) => {
  const {isAuth} = useAuth()
  const signInProps = useSignIn()

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    if (!isAuth) return setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    signInProps.form.reset()
  }, [isOpen])

  return (
    <GatedContext.Provider value={{isOpen, toggleOpen}}>
      {children}

      <BaseDialog
        type="form"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        title="User not signed in"
        {...signInProps}
      >
        <SignInForm {...signInProps} />
      </BaseDialog>
    </GatedContext.Provider>
  )
}

export default GatedProvider
