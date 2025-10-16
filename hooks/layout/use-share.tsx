'use client'

import {useContext} from 'react'
import {ShareContext} from '@/components/base/providers/share-provider'

export const useShare = () => useContext(ShareContext)
