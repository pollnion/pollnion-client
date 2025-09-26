'use client'

import React from 'react'
import {createContext} from 'react'

type DefaultValues = {
  isAuth: boolean
}

const defaultValues = {
  isAuth: false,
}

export const AuthContext = createContext(defaultValues as DefaultValues)

const AuthProvider = ({children}: {children: Children}) => {
  const isAuth = false

  return <AuthContext.Provider value={{isAuth}}>{children}</AuthContext.Provider>
}

export default AuthProvider
