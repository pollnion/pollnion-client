'use client'

import React from 'react'
import {useState} from 'react'
import {createContext} from 'react'
import BaseDialog from '../dialogs/base-dialog'
import SignInForm from '../forms/sign-in-form'
import useSignUp from '@/hooks/auth/use-sign-up'
import useSignIn from '@/hooks/auth/use-sign-in'
import {useAuth} from '@/hooks/providers/use-auth'
import SignUpForm from '../forms/sign-up-form'
import usePassCheck from '@/hooks/auth/use-pass-check'

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
  const signUpProps = useSignUp()
  const signInProps = useSignIn()
  const passCheckProps = usePassCheck()

  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState('sign_in')

  const toggleOpen = () => {
    if (!isAuth) return setIsOpen(!isOpen)
  }

  const toggleType = (type: string) => {
    setType(type)
  }

  React.useEffect(() => {
    signInProps.form.reset()
    setType('sign_in') // back to default
  }, [isOpen])

  React.useEffect(() => {
    // resets values wheneer user changes pages
    signInProps.form.reset()
    signUpProps.form.reset()
  }, [type])

  return (
    <GatedContext.Provider value={{isOpen, toggleOpen}}>
      {children}

      <BaseDialog
        type="form"
        isOpen={isOpen}
        title={type === 'sign_in' ? 'Sign in' : 'Sign up'}
        onCancelProps={false}
        toggleOpen={toggleOpen}
        description={
          type === 'sign_in' ? 'Please enter your details.' : 'Create a new account.'
        }
        onOkProps={{
          className: 'w-full',
          disabled:
            type === 'sign_in'
              ? false
              : !passCheckProps.isPassValid(signUpProps.form.watch('password')),
          label: type === 'sign_in' ? 'Sign in' : 'Sign up',
        }}
        className="px-4 sm:px-12"
        {...(type === 'sign_in' ? signInProps : signUpProps)}
      >
        {type === 'sign_in' && <SignInForm {...signInProps} toggleType={toggleType} />}
        {type === 'sign_up' && (
          <SignUpForm {...signUpProps} {...passCheckProps} toggleType={toggleType} />
        )}
      </BaseDialog>
    </GatedContext.Provider>
  )
}

export default GatedProvider
