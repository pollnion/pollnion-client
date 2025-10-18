import React from 'react'
import {RESERVED_PATHS} from '@/constants/path'

export async function generateMetadata({params}: {params: {username: string}}) {
  const {username} = params

  return {
    title: `${username} | Profile`,
    description: `See what ${username} is polling about on Pollnion.`,
  }
}

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
