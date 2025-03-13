'use client'

import styled from 'styled-components'

export const StylesTabs = styled.div``

export const StylesTabList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 8px;
  background-color: #444;
  color: white;

  @media (min-width: 360px) {
    padding: 8px 16px;
  }

  @media (min-width: 720px) {
    padding: 16px 32px;
  }

  @media (min-width: 1080px) {
    padding: 16px 80px;
  }
`

export const StylesTab = styled.div`
  cursor: pointer;
  padding: 5px;
  transition: border-bottom 0.3s ease-in-out;
  &[aria-selected='true'] {
    border-bottom: 1px solid white;
  }
`
