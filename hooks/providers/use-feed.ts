'use client'

import {useContext} from 'react'
import {FeedContext} from '@/components/base/providers/feed-provider'

export const useFeed = () => useContext(FeedContext)
