'use client'
import styled from 'styled-components'

export const CardBoxMain = styled.div<{
  $maxWidth: number
  $minHeight: number
}>`
  width: 100%;
  height: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  min-height: ${({ $minHeight }) => $minHeight}px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color('grey', 7)};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`
