import React from 'react'
import { useTableColumnHeader } from 'react-aria'
import { mergeProps, useFocusRing } from 'react-aria'

import { TableState } from '@react-stately/table'
import { GridNode } from '@react-types/grid'

import * as S from './styles'

interface TableColumnHeaderProps {
  column: GridNode<object>
  state: TableState<object>
}

export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  column,
  state,
}) => {
  const ref = React.useRef<HTMLTableCellElement | null>(null)
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  )
  const { isFocusVisible, focusProps } = useFocusRing()
  const arrowIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼'

  return (
    <S.StyledTableColumnHeader
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={column.colspan ?? 1}
      $isFocusVisible={isFocusVisible}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <S.SortIcon
          aria-hidden="true"
          $isVisible={state.sortDescriptor?.column === column.key}
        >
          {arrowIcon}
        </S.SortIcon>
      )}
    </S.StyledTableColumnHeader>
  )
}
