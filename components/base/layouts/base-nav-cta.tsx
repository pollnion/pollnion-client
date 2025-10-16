import React from 'react'
import {useAuth} from '@/hooks/providers/use-auth'
import {useGate} from '@/hooks/providers/use-gate'
import BaseButton from '@/components/base/buttons/base-button'

const BaseNavCta = () => {
  const {isAuth} = useAuth()
  const {toggleOpen} = useGate()

  if (isAuth) return null

  return (
    <BaseButton onClick={toggleOpen}>
      <span>Sign in</span>
    </BaseButton>
  )
}

export default BaseNavCta
