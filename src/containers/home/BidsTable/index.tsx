import React from 'react'
import { Cell, Column, Row, TableBody, TableHeader } from 'react-stately'
import { Table } from 'src/components'
import { TableProps } from 'src/components/Table/Table'

interface BidsTableProps extends TableProps {
  columns: Array<{ name: string }>
  rows: Array<{ [key: string]: React.ReactNode }>
}

export const BidsTable = ({ columns, rows, ...props }: BidsTableProps) => {
  return (
    <Table {...props}>
      <TableHeader columns={columns}>
        {(column) => <Column>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  )
}
