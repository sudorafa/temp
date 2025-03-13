'use client'

import styled from 'styled-components'
import { LinkStylesProps } from '.'

export const Link = styled.span<LinkStylesProps>`
  color: ${({ color }) => color};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ $hoverColor }) => $hoverColor};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`
