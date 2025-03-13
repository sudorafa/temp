'use client'
import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export { inter, geistSans, geistMono } from './theme/tokens/fonts'

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f4f4f4;
    --foreground: ${theme.color('grey', 7)};
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    color: var(--foreground);
    background: var(--background);
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
