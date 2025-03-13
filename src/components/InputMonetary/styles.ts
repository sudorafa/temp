'use client'

import styled from 'styled-components'

export const InputContainer = styled.div<{ $width: string | number }>`
  width: ${({ $width }) => $width || '100%'};
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

export const Input = styled.input<{
  $borderColor?: string
  $borderColorFocus?: string
  $textColor?: string
  $placeholderColor?: string
  $backgroundColor?: string
  $errorColor?: string
}>`
  width: 100%;
  padding: 10px 40px;
  border: 1px solid
    ${({ $borderColor, $errorColor }) => $errorColor || $borderColor || '#ccc'};
  border-radius: 4px;
  color: ${({ $textColor }) => $textColor || '#000'};
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#fff'};
  transition: border-color 0.3s;
  text-overflow: ellipsis;

  &::placeholder {
    color: ${({ $placeholderColor }) => $placeholderColor || '#aaa'};
  }

  &:focus {
    border-color: ${({ $borderColorFocus }) => $borderColorFocus || '#007bff'};
    outline: none;
  }
`

export const CurrencySymbol = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  font-weight: bold;
`
