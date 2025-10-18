import React from 'react'
import {Plus} from 'lucide-react'

import {formattedNumber} from '@/lib/numbers'
import BaseButton from '@/components/base/buttons/base-button'
import BaseAvatar from '@/components/base/avatars/base-avatar'
import {TypographyMuted} from '@/components/base/typography/base-typography'
import {TypographySmall} from '@/components/base/typography/base-typography'

const UsersCard = ({item}: {item: {id?: string; name: string; followers: number}}) => {
  const {name, followers} = item || {}
  return (
    <section className="bg-card p-3 rounded-sm flex items-center space-y-2 space-x-2 justify-between">
      <div className="flex space-x-2 items-center">
        <BaseAvatar className="h-12 w-12" alt="avatar" />
        <div className="flex flex-col space-x-2">
          <TypographySmall className="text-lg">{name}</TypographySmall>
          <div className="flex items-center space-x-2">
            <TypographyMuted className="text-md">
              {formattedNumber(followers)} followers
            </TypographyMuted>
          </div>
        </div>
      </div>

      <BaseButton icon={Plus} size="sm">
        Follow
      </BaseButton>
    </section>
  )
}

export default UsersCard
