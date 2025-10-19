'use client'

import React, {createContext, useEffect, useState, ReactNode} from 'react'
import {supabase} from '@/supabase/client'
import type {Session, User} from '@supabase/supabase-js'

type AuthContextType = {
  isAuth: User | null
  loading: boolean
  handleGoogleLogin: () => Promise<void>
}

const defaultValues: AuthContextType = {
  isAuth: null,
  loading: true,
  handleGoogleLogin: async () => {},
}

export const AuthContext = createContext<AuthContextType>(defaultValues)

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAuth, setIsAuth] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const handleGoogleLogin = async () => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {redirectTo: window.location.origin},
    })

    if (error) console.error('Login error:', error)
  }

  const handleFacebookLogin = async () => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {redirectTo: window.location.origin},
    })

    if (error) console.error('Facebook login error:', error.message)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const fetchSession = async () => {
    const {data, error} = await supabase.auth.getSession()
    if (error) console.error('Session fetch error:', error)

    console.log(data)

    setIsAuth(data.session?.user ?? null)
    setLoading(false)
  }

  useEffect(() => {
    fetchSession()

    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuth(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{isAuth, loading, handleGoogleLogin}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
