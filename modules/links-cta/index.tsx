import React from 'react'
import {TypographyMuted} from '@/components/base/typography/base-typography'
import Link from 'next/link'

const LINK = 'https://charlidev.netlify.app/'

const Index = () => {
  return (
    <div>
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
