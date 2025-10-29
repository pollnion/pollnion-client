import React from 'react'
import map from 'lodash/map'

import UsersCard from './users-card'
import SearchHeader from '@/components/base/search/search-header'

const USERS = [
  {
    id: '123123123',
    name: 'User name 1',
    followers: 123123,
  },
  {
    id: '983712312',
    name: 'Luna Dev',
    followers: 54200,
  },
  {
    id: '458291034',
    name: 'CodeWiz',
    followers: 189000,
  },
  {
    id: '719283746',
    name: 'PixelPilot',
    followers: 30214,
  },
  {
    id: '992384756',
    name: 'JSJunkie',
    followers: 77777,
  },
  {
    id: '557392045',
    name: 'DesignDino',
    followers: 25000,
  },
  {
    id: '634782901',
    name: 'MemeMechanic',
    followers: 987654,
  },
  {
    id: '849302174',
    name: 'ReactRanger',
    followers: 41000,
  },
  {
    id: '302948576',
    name: 'TechieTori',
    followers: 67234,
  },
  {
    id: '190283475',
    name: 'AsyncAce',
    followers: 120345,
  },
]

const Users = () => {
  return (
    <div className="px-0 sm:px-2 space-y-2">
      <SearchHeader length={USERS.length} />
      {map(USERS, (item, idx) => {
        return <UsersCard key={idx} item={item} />
      })}
    </div>
  )
}

export default Users
