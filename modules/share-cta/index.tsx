'use client'

import React from 'react'
import {Forward} from 'lucide-react'
import {useShare} from '@/hooks/layout/use-share'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyH2, TypographyMuted} from '@/components/base/typography/base-typography'

const Index = () => {
  const {toggleOpen} = useShare()

  return (
    <div className="p-3 rounded-sm bg-neutral-900 space-y-2">
      <TypographyH2 className="text-center text-2xl font-extrabold">
        Tired with Polls?
      </TypographyH2>
      <TypographyMuted>
        Are you enjoying Pollnion? Share it with your friends!
      </TypographyMuted>
      <BaseButton
        icon={Forward}
        className="w-full"
        variant="secondary"
        onClick={toggleOpen}
      >
        Share
      </BaseButton>
    </div>
  )
}

export default Index
