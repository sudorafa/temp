import React from 'react'
import { mergeProps, useFocusRing, useTableRow } from 'react-aria'

import { Node, TableState } from 'react-stately'
import * as S from './styles'

interface TableRowProps {
  item: Node<object>
  children: React.ReactNode
  state: TableState<unknown>
}

export const TableRow: React.FC<TableRowProps> = ({
  item,
  children,
  state,
}) => {
  const ref = React.useRef<HTMLTableRowElement | null>(null)
  const isSelected = state.selectionManager.isSelected(item.key)
  const { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref
  )
  const { isFocusVisible, focusProps } = useFocusRing()

  return (
    <S.StyledTableRow
      $isSelected={isSelected}
      $isPressed={isPressed}
      $isFocusVisible={isFocusVisible}
      $index={item.index}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </S.StyledTableRow>
  )
}
