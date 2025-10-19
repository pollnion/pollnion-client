import React from 'react'
import BaseAvatar from '../avatars/base-avatar'
import {useAuth} from '@/hooks/providers/use-auth'
import BaseDropdown from '../dropdown/base-dropdown'

const BaseNavAvatar = () => {
  const {isAuth, handleSignOut} = useAuth()

  const {user_metadata} = isAuth || {}
  const {avatar_url} = user_metadata || {}

  if (!isAuth) return null

  return (
    <BaseDropdown
      items={[
        {label: 'Profile', onClick: () => console.log('Go to profile')},
        {label: 'Logout', onClick: handleSignOut},
      ]}
    >
      <div>
        <BaseAvatar src={avatar_url} alt="avatar" />
      </div>
    </BaseDropdown>
  )
}

export default BaseNavAvatar
