import React from 'react'
import {isEqual} from 'lodash'

import {cn} from '@/lib/utils'
import {Badge} from '@/components/ui/badge'
import {POLL_STATUS, POLL_STATUS_LABEL} from '@/constants/status'

export const StatusPoint = ({status}: {status?: string}) => {
  // temprary: return nothing if the badge is open
  if (status === 'open') {
    return null
  }

  return (
    <div
      className={cn('rounded-full h-1 w-1', {
        'bg-red-500': isEqual(status, 'closed'),
        'bg-green-500': isEqual(status, 'open'),
      })}
    ></div>
  )
}

const BaseStatusBadge = ({status}: {status?: string}) => {
  return (
    <Badge variant="outline" className="d-flex items-center space-x-">
      <StatusPoint status={status} />{' '}
      <div>{POLL_STATUS_LABEL[status as keyof typeof POLL_STATUS]}</div>
    </Badge>
  )
}

export default BaseStatusBadge
