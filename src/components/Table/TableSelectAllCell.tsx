import React from 'react'
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
  VisuallyHidden,
} from 'react-aria'
import { Checkbox } from '../Checkbox'

import { TableState } from 'react-stately'
import { GridNode } from '@react-types/grid'

interface TableSelectAllCellProps {
  column: GridNode<object>
  state: TableState<unknown>
}

export const TableSelectAllCell: React.FC<TableSelectAllCellProps> = ({
  column,
  state,
}) => {
  const ref = React.useRef<HTMLTableCellElement | null>(null)
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  )
  const { checkboxProps } = useTableSelectAllCheckbox(state)

  return (
    <th {...columnHeaderProps} ref={ref}>
      {state.selectionManager.selectionMode === 'single' ? (
        <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
      ) : (
        <Checkbox {...checkboxProps} />
      )}
    </th>
  )
}
