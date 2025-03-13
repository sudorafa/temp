import React from 'react'
import { useTableHeaderRow } from 'react-aria'

import { Node } from '@react-types/shared'
import { TableState } from 'react-stately'

interface TableHeaderRowProps {
  item: Node<object>
  state: TableState<object>
  children: React.ReactNode
}

export const TableHeaderRow: React.FC<TableHeaderRowProps> = ({
  item,
  state,
  children,
}) => {
  const ref = React.useRef<HTMLTableRowElement | null>(null)
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref)

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  )
}
