import React from 'react'
import Feed from '../feed/feed'

// className="grid grid-cols-1 md:grid-cols-12 md:gap-4 mt-6"

const Index = () => {
  return (
    <div className="flex justify-between mt-6">
      <div className="hidden md:block">this is another section</div>
      <Feed />
      <div className="hidden xl:block">this is another section</div>
    </div>
  )
}

export default Index
