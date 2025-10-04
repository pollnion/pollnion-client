import React from 'react'
import BaseNav from './base-nav'
import BaseFooter from './base-footer'

type PublicLayoutProps = {
  showNav?: boolean
  children: Children
  showFooter?: boolean
}

const PublicLayout: React.FC<PublicLayoutProps> & React.ComponentProps<'div'> = ({
  children,
  showNav = false,
  showFooter = false,
}) => {
  return (
    <div>
      {showNav && <BaseNav />}
      <main className="px-0 sm:px-2 lg:container lg:mx-auto lg:px-6 mt-5">
        {children}
      </main>
      {showFooter && <BaseFooter />}
    </div>
  )
}

export default PublicLayout
