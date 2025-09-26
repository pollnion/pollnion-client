import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

const DEFAULT_LINK = 'https://github.com/shadcn.png'

const BaseAvatar: React.FC<{src?: string; alt?: string}> = ({
  src = DEFAULT_LINK,
  alt = 'sample',
}) => {
  return (
    <Avatar className="h-7 w-7">
      <AvatarImage src={src} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  )
}

export default BaseAvatar
