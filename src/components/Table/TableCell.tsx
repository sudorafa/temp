import React from 'react'
import { mergeProps, useFocusRing, useTableCell } from 'react-aria'

import { GridNode } from '@react-types/grid'
import { TableState } from 'react-stately'

import * as S from './styles'

interface TableCellProps {
  cell: GridNode<unknown>
  state: TableState<unknown>
}

export const TableCell: React.FC<TableCellProps> = ({ cell, state }) => {
  const ref = React.useRef<HTMLTableCellElement | null>(null)
  const { gridCellProps } = useTableCell({ node: cell }, state, ref)
  const { isFocusVisible, focusProps } = useFocusRing()

  return (
    <S.StyledTableCell
      {...mergeProps(gridCellProps, focusProps)}
      $isFocusVisible={isFocusVisible}
      ref={ref}
    >
      {cell.rendered}
    </S.StyledTableCell>
  )
}
