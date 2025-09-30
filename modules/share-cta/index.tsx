import React from 'react'
import {Forward} from 'lucide-react'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyH2, TypographyMuted} from '@/components/base/typography/base-typography'

const Index = () => {
  return (
    <div className="p-3 rounded-sm bg-neutral-900 space-y-2">
      <TypographyH2 className="text-center text-2xl font-extrabold">
        Tired with Polls?
      </TypographyH2>
      <TypographyMuted>
        Are you enjoying Pollnion? Share it with your friends!
      </TypographyMuted>
      <BaseButton variant="secondary" icon={Forward} className="w-full">
        Share
      </BaseButton>
    </div>
  )
}

export default Index
