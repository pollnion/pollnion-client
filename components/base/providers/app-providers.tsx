import React from 'react'

import AuthProvider from './auth-provider'
import FeedProvider from './feed-provider'
import GatedProvider from './gated-provider'
import {ThemeProvider} from './theme-provider'
import LayoutProvider from './layout-provider'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({children}: AppProvidersProps) => {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <AuthProvider>
        <GatedProvider>
          <LayoutProvider>
            <FeedProvider>{children}</FeedProvider>
          </LayoutProvider>
        </GatedProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default AppProviders
