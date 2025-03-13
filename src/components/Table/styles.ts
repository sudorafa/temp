import styled from 'styled-components'

export const Thead = styled.thead`
  border-bottom: 2px solid var(--spectrum-global-color-gray-800);
`

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #ddd;
  }
`

export const Tbody = styled.tbody``

export const StyledTableRow = styled.tr<{
  $isSelected: boolean
  $isPressed: boolean
  $isFocusVisible: boolean
  $index: number
}>`
  background: ${({ $isSelected, $isPressed, $index }) =>
    $isSelected
      ? 'blueviolet'
      : $isPressed
      ? 'var(--spectrum-global-color-gray-400)'
      : $index % 2
      ? 'var(--spectrum-alias-highlight-hover)'
      : 'none'};
  color: ${({ $isSelected }) => ($isSelected ? 'white' : 'inherit')};
  outline: none;
  box-shadow: ${({ $isFocusVisible }) =>
    $isFocusVisible ? 'inset 0 0 0 2px orange' : 'none'};
  cursor: default;
`

export const StyledTableCell = styled.td<{ $isFocusVisible: boolean }>`
  padding: 5px 10px;
  outline: none;
  box-shadow: ${({ $isFocusVisible }) =>
    $isFocusVisible ? 'inset 0 0 0 2px orange' : 'none'};
`

export const StyledTableColumnHeader = styled.th<{
  $isFocusVisible: boolean
  colSpan: number
}>`
  text-align: ${({ colSpan }) => (colSpan > 1 ? 'center' : 'left')};
  padding: 5px 10px;
  outline: none;
  box-shadow: ${({ $isFocusVisible }) =>
    $isFocusVisible ? 'inset 0 0 0 2px orange' : 'none'};
  cursor: default;
`

export const SortIcon = styled.span<{ $isVisible: boolean }>`
  padding: 0 2px;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`
