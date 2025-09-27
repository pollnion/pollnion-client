'use client'

import {useContext} from 'react'
import {GatedContext} from '@/components/base/providers/gated-provider'

export const useGate = () => useContext(GatedContext)
