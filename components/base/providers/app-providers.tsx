import React from 'react'
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
      {children}
    </ThemeProvider>
  )
}

export default AppProviders
