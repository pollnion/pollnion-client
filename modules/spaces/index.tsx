import React from 'react'
import {map} from 'lodash'

import spaces from '@/data/tags.json'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyMuted} from '@/components/base/typography/base-typography'

const Index = () => {
  return (
    <div>
      <TypographyMuted className="mb-2">Spaces</TypographyMuted>
      <div className="border-l px-2">
        {map(spaces.data, (item: {label: string}, idx: number) => {
          const {label} = item || {} // value,
          return (
            <div key={idx}>
              <BaseButton
                size="sm"
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                {label}
              </BaseButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Index
