'use client'

import React from 'react'
import {useState} from 'react'
import {createContext} from 'react'

import SignUpForm from '../forms/sign-up-form'
import SignInForm from '../forms/sign-in-form'
import BaseDialog from '../dialogs/base-dialog'

import useSignUp from '@/hooks/auth/use-sign-up'
import useSignIn from '@/hooks/auth/use-sign-in'
import {useAuth} from '@/hooks/providers/use-auth'
import usePassCheck from '@/hooks/auth/use-pass-check'
import {isEmpty} from 'lodash'

type DefaultValues = DialogProps & {toggleOpen: (action?: () => void) => void}

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

  const toggleOpen = (action?: () => void) => {
    if (isEmpty(isAuth)) return setIsOpen(!isOpen)
    return action?.()
  }

  const toggleType = (type: string) => {
    setType(type)
  }

  React.useEffect(() => {
    signInProps.form.reset()
    setType('sign_in') // back to default
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    // resets values whenever user changes pages
    signInProps.form.reset()
    signUpProps.form.reset()
  }, [type, signInProps.form, signUpProps.form])

  return (
    <GatedContext.Provider value={{isOpen, toggleOpen}}>
      {children}

      <BaseDialog
        type="form"
        isOpen={isOpen}
        title={type === 'sign_in' ? 'Sign in' : 'Sign up'}
        onCancelProps={undefined}
        toggleOpen={() => toggleOpen()}
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
