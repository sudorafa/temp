import React from 'react'
import * as S from './styles'

interface CardBoxMainProps {
  title?: () => React.ReactNode
  side?: () => React.ReactNode
  children: React.ReactNode
  maxWidth?: number
  minHeight?: number
}

export const CardBoxMain = ({
  title,
  side,
  children,
  maxWidth = 1352,
  minHeight = 664,
}: CardBoxMainProps) => (
  <S.CardBoxMain $maxWidth={maxWidth} $minHeight={minHeight}>
    {title && title()}
    {side && side()}
    {children}
  </S.CardBoxMain>
)
