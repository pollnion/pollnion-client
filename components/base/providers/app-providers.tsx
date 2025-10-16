import React from 'react'
import {Toaster} from 'sonner'

import AuthProvider from './auth-provider'
import FeedProvider from './feed-provider'
import GatedProvider from './gated-provider'
import ShareProvider from './share-provider'
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
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <AuthProvider>
        <GatedProvider>
          <FeedProvider>
            <ShareProvider>
              <LayoutProvider>
                {children}

                <Toaster position="bottom-right" richColors />
              </LayoutProvider>
            </ShareProvider>
          </FeedProvider>
        </GatedProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default AppProviders
