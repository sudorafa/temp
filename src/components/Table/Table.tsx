import React from 'react'
import { AriaTableProps, useTable } from 'react-aria'
import { useTableState } from 'react-stately'
import {
  TableColumnHeader,
  TableHeaderRow,
  TableRowGroup,
  TableCell,
  TableRow,
  TableCheckboxCell,
  TableSelectAllCell,
} from '.'

import * as S from './styles'

export interface TableProps extends AriaTableProps {
  selectionMode?: 'none' | 'single' | 'multiple'
  selectionBehavior?: 'toggle' | 'replace'
}

export const Table = ({
  selectionMode,
  selectionBehavior,
  ...props
}: TableProps) => {
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  })

  const ref = React.useRef<HTMLTableElement | null>(null)
  const { collection } = state
  const { gridProps } = useTable(props, state, ref)

  return (
    <S.StyledTable
      {...gridProps}
      ref={ref}
      style={{ borderCollapse: 'collapse' }}
    >
      <TableRowGroup type="thead">
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell ? (
                <TableSelectAllCell
                  key={column.key}
                  column={column}
                  state={state}
                />
              ) : (
                <TableColumnHeader
                  key={column.key}
                  column={column}
                  state={state}
                />
              )
            )}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup type="tbody">
        {[...collection.body.childNodes].map((row) => (
          <TableRow key={row.key} item={row} state={state}>
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell key={cell.key} cell={cell} state={state} />
              ) : (
                <TableCell key={cell.key} cell={cell} state={state} />
              )
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </S.StyledTable>
  )
}
