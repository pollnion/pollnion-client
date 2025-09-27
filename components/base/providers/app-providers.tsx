import React from 'react'
import AuthProvider from './auth-provider'
import GatedProvider from './gated-provider'
import {ThemeProvider} from './theme-provider'

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
        <GatedProvider>{children}</GatedProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default AppProviders
