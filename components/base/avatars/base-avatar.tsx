import React from 'react'
import {ClassNameValue} from 'tailwind-merge'
import {cn} from '@/lib/utils'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

const DEFAULT_LINK = 'https://github.com/shadcn.png'

const BaseAvatar: React.FC<{src?: string; alt?: string; className?: ClassNameValue}> = ({
  src = DEFAULT_LINK,
  alt = 'sample',
  className,
}) => {
  return (
    <Avatar className={cn('h-7 w-7', className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  )
}

export default BaseAvatar
