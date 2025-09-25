// BaseIcon.tsx
import React from 'react'
import loadable from '@loadable/component'
import {IconBaseProps} from 'react-icons'
import * as AiIcons from 'react-icons/ai'

interface typesPropsIcon {
  nameIcon: string
  propsIcon?: IconBaseProps
  style?: React.CSSProperties
}

export const iconLibMap: Record<string, () => Promise<typeof AiIcons>> = {
  ai: () => import('react-icons/ai'),
}

export function BaseIcon({
  nameIcon,
  propsIcon,
  ...rest
}: typesPropsIcon): React.JSX.Element {
  const lib = nameIcon
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLowerCase()

  const loadIcon = iconLibMap[lib]

  if (!loadIcon) {
    throw new Error(`Icon library "${lib}" is not supported`)
  }

  const ElementIcon = loadable(() =>
    loadIcon().then((mod) => {
      const Component = mod[nameIcon as keyof typeof mod]
      if (!Component) {
        throw new Error(`Icon "${nameIcon}" not found in library "${lib}"`)
      }
      return {default: Component as React.ComponentType<IconBaseProps>}
    })
  )

  return <ElementIcon {...propsIcon} {...rest} />
}
