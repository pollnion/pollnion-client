import React from 'react'
import {useAuth} from '@/hooks/providers/use-auth'
import {useGate} from '@/hooks/providers/use-gate'
import BaseButton from '@/components/base/buttons/base-button'

const BaseNavCta = () => {
  const {isAuth} = useAuth()
  const {toggleOpen} = useGate()

  if (isAuth) return null

  return (
    <div className="flex space-x-2">
      <BaseButton variant="ghost" onClick={toggleOpen}>
        <span>Sign in</span>
      </BaseButton>
      <BaseButton onClick={toggleOpen}>Join</BaseButton>
    </div>
  )
}

export default BaseNavCta
