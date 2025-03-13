'use client'

import styled from 'styled-components'
import { InputStylesProps } from '.'

export const InputContainer = styled.div<{ width: string | number }>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

export const Label = styled.label<{ $labelColor: string }>`
  color: ${({ $labelColor }) => $labelColor};
  margin-bottom: 8px;
`

export const Input = styled.input<InputStylesProps>`
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

export const ErrorMessage = styled.span<{ $errorColor: string }>`
  color: ${({ $errorColor }) => $errorColor};
  margin-top: 8px;
  font-size: 12px;
`

export const Icon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`

export const IconEye = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`
