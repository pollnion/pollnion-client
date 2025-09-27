import React from 'react'
import BaseAvatar from '../avatars/base-avatar'
import {useAuth} from '@/hooks/providers/use-auth'

const BaseNavAvatar = () => {
  const {isAuth} = useAuth()

  if (!isAuth) return null

  return <BaseAvatar />
}

export default BaseNavAvatar
