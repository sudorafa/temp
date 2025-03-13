import React from 'react'
import { useTableSelectionCheckbox, useTableCell, Key } from 'react-aria'
import { Checkbox } from 'src/components/Checkbox'

import { GridNode } from '@react-types/grid'
import { TableState } from '@react-stately/table'

interface TableCheckboxCellProps {
  cell: GridNode<unknown>
  state: TableState<unknown>
}

export const TableCheckboxCell: React.FC<TableCheckboxCellProps> = ({
  cell,
  state,
}) => {
  const ref = React.useRef<HTMLTableCellElement | null>(null)
  const { gridCellProps } = useTableCell({ node: cell }, state, ref)
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey as Key },
    state
  )

  return (
    <td {...gridCellProps} ref={ref}>
      <Checkbox {...checkboxProps} />
    </td>
  )
}
