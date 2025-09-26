import React from 'react'
import {isEqual} from 'lodash'

import {cn} from '@/lib/utils'
import {Badge} from '@/components/ui/badge'
import {POLL_STATUS, POLL_STATUS_LABEL} from '@/constants/status'

const BaseStatusBadge = ({status}: {status?: string}) => {
  const Point = () => {
    return (
      <div
        className={cn('rounded-full h-1 w-1', {
          'bg-red-500': isEqual(status, 'closed'),
          'bg-green-500': isEqual(status, 'open'),
        })}
      ></div>
    )
  }

  return (
    <Badge variant="outline" className="d-flex items-center space-x-">
      <Point /> <div>{POLL_STATUS_LABEL[status as keyof typeof POLL_STATUS]}</div>
    </Badge>
  )
}

export default BaseStatusBadge
