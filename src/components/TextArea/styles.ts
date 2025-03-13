'use client'

import styled from 'styled-components'

export const Container = styled.div<{
  $width: string | number
}>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width};
  margin-bottom: 16px;
`

export const Label = styled.label<{
  $labelColor: string
}>`
  color: ${({ $labelColor }) => $labelColor};
  margin-bottom: 8px;
`

export const TextArea = styled.textarea<{
  $borderColor: string
  $borderRadius: string
  $backgroundColor: string
  $textColor: string
  $placeholderColor: string
}>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  transition: border-color 0.3s;
  resize: vertical;

  &::placeholder {
    color: ${({ $placeholderColor }) => $placeholderColor};
  }

  &:focus {
    border-color: ${({ $borderColor }) => $borderColor};
    outline: none;
  }
`
