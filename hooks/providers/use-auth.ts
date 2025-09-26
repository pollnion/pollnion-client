'use client'

import {useContext} from 'react'
import {AuthContext} from '@/components/base/providers/auth-provider'

export const useAuth = () => useContext(AuthContext)
