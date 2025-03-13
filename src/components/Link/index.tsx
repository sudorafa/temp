'use client'

import React from 'react'
import NextLink from 'next/link'
import { useLink } from 'react-aria'
import * as S from './styles'

export interface LinkStylesProps {
  color?: string
  $hoverColor?: string
}

interface LinkProps extends LinkStylesProps {
  href: string
  children: React.ReactNode
}

export const Link = ({
  href,
  children,
  color = '#0070f3',
  $hoverColor = '#0366d6',
}: LinkProps) => {
  const styleProps = { color, $hoverColor }
  const ref = React.useRef<HTMLAnchorElement>(null)
  const { linkProps } = useLink({ ...styleProps, elementType: 'a' }, ref)

  return (
    <NextLink href={href} passHref>
      <S.Link {...linkProps} ref={ref} color={color} $hoverColor={$hoverColor}>
        {children}
      </S.Link>
    </NextLink>
  )
}
