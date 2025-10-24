'use client'

import React, {createContext, useEffect, useState, ReactNode} from 'react'
import {supabase} from '@/supabase/client'
import type {User} from '@supabase/supabase-js'

type AuthContextType = {
  isAuth: User | null
  loading: boolean
  handleSignOut: () => Promise<void>
  handleGoogleLogin: () => Promise<void>
  handleFacebookLogin: () => Promise<void>
}

const defaultValues: AuthContextType = {
  isAuth: null,
  loading: true,
  handleSignOut: async () => {},
  handleGoogleLogin: async () => {},
  handleFacebookLogin: async () => {},
}

export const AuthContext = createContext<AuthContextType>(defaultValues)

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAuth, setIsAuth] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const handleGoogleLogin = async () => {
    await new Promise((res) => setTimeout(res, 300))
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {redirectTo: window.location.origin},
    })

    setLoading(false)

    if (error) console.error('Login error:', error)
  }

  const handleFacebookLogin = async () => {
    await new Promise((res) => setTimeout(res, 300)) // quick UX flash
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {redirectTo: window.location.origin},
    })

    setLoading(false)

    if (error) console.error('Facebook login error:', error.message)
  }

  const handleSignOut = async () => {
    try {
      await new Promise((res) => setTimeout(res, 300)) // quick UX flash
      await supabase.auth.signOut()
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSession = async () => {
    const {data, error} = await supabase.auth.getSession()
    if (error) console.error('Session fetch error:', error)
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
    <AuthContext.Provider
      value={{isAuth, loading, handleGoogleLogin, handleSignOut, handleFacebookLogin}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
