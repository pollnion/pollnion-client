import React from 'react'
import {TypographyMuted} from '@/components/base/typography/base-typography'
import Link from 'next/link'

const LINK = 'https://charlidev.netlify.app/'

const Index = () => {
  return (
    <div className="flex space-x-2 flex-wrap">
      <TypographyMuted>Pollnion © 2025</TypographyMuted>
      <TypographyMuted>
        Made with ❤️ by{' '}
        <Link className="hover:underline text-blue-400" href={LINK} target="_blank">
          Charlidev
        </Link>
      </TypographyMuted>
    </div>
  )
}

export default Index
