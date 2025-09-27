import React from 'react'
import {LucideIcon} from 'lucide-react'

import {cn} from '@/lib/utils'
import {Badge} from '@/components/ui/badge'

const BaseBadge = ({
  icon,
  children,
  className,
  variant = 'default',
}: React.ComponentProps<typeof Badge> & {icon?: LucideIcon}) => {
  const Icon = icon
  return (
    <Badge variant={variant} className={cn(className)}>
      {Icon && <Icon />} {children}
    </Badge>
  )
}

export default BaseBadge
