'use client'

import styled from 'styled-components'

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.svg<{
  $isFocusVisible?: boolean
}>`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  cursor: pointer;
  ${({ $isFocusVisible }) =>
    $isFocusVisible &&
    `
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  `}
`

export const Label = styled.label<{
  $labelColor: string
  $isDisabled: boolean
}>`
  display: flex;
  align-items: center;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  margin-left: 8px;
  color: ${({ $labelColor }) => $labelColor};
`

export const ErrorMessage = styled.span`
  color: #ff0000;
  margin-left: 8px;
  font-size: 12px;
`
