import React from 'react'
import {RESERVED_PATHS} from '@/constants/path'

const Page = ({params}: RouteParams) => {
  const {username} = params

  // TOOD:
  // add api call if invalid then return 404

  if (RESERVED_PATHS?.includes(username || '')) {
    return <div>Not founds</div> // TODO: this is temp
  }

  return <div>page</div>
}

export default Page
