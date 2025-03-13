'use client'
import styled from 'styled-components'
import { ButtonStyledProps } from '.'

export const Button = styled.button<ButtonStyledProps>`
  width: ${({ $width }) => $width || '100%'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '4px'};
  color: ${({ $textColor }) => $textColor || '#fff'};
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#007bff'};
  border: 1px solid ${({ $borderColor }) => $borderColor || '#007bff'};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`
