'use client'

import React from 'react'
import { useButton, AriaButtonProps } from 'react-aria'
import * as S from './styles'

export interface ButtonStyledProps {
  $width?: string
  $borderRadius?: string
  $textColor?: string
  $backgroundColor?: string
  $borderColor?: string
}

interface ButtonProps extends AriaButtonProps, ButtonStyledProps {
  children: React.ReactNode
  onClick?: VoidFunction
  buttonRef?: React.RefObject<HTMLButtonElement | null>
  isDisabled?: boolean
}

export const Button = ({
  children,
  buttonRef,
  $width,
  $borderRadius,
  $textColor,
  $backgroundColor,
  $borderColor,
  isDisabled,
  ...props
}: ButtonProps) => {
  const { buttonProps } = useButton(
    props,
    buttonRef || React.createRef<HTMLButtonElement>()
  )

  return (
    <S.Button
      {...props}
      {...buttonProps}
      ref={buttonRef}
      $width={$width}
      $borderRadius={$borderRadius}
      $textColor={$textColor}
      $backgroundColor={$backgroundColor}
      $borderColor={$borderColor}
      disabled={isDisabled}
    >
      {children}
    </S.Button>
  )
}
