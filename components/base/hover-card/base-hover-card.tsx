import React from 'react'
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card'

const BaseHoverCard = ({
  trigger,
  content,
}: {
  trigger: React.ReactNode
  content: React.ReactNode
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{trigger}</HoverCardTrigger>
      <HoverCardContent>{content}</HoverCardContent>
    </HoverCard>
  )
}

export default BaseHoverCard
