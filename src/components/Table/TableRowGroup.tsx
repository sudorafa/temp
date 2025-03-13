import { useTableRowGroup } from 'react-aria'

import React from 'react'
import * as S from './styles'

interface TableRowGroupProps {
  type: keyof React.JSX.IntrinsicElements
  children: React.ReactNode
}

export const TableRowGroup = ({
  type: Element,
  children,
}: TableRowGroupProps) => {
  const { rowGroupProps } = useTableRowGroup()
  const StyledElement = Element === 'thead' ? S.Thead : S.Tbody
  return <StyledElement {...rowGroupProps}>{children}</StyledElement>
}
