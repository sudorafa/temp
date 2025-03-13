'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from 'src/lib/registry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from 'src/global-styles/theme'

import { GlobalStyle, inter } from 'src/global-styles'

import 'src/services/mocks/apisMocks'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <body className={`${inter.variable}`}>{children}</body>
        </QueryClientProvider>
      </StyledComponentsRegistry>
    </ThemeProvider>
  )
}
