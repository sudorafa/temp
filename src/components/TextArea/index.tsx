'use client'

import React from 'react'
import { useTextField, AriaTextFieldProps } from 'react-aria'
import * as S from './styles'

interface TextAreaStylesProps {
  $borderColor?: string
  $borderRadius?: string
  $textColor?: string
  $placeholderColor?: string
  $labelColor?: string
  $backgroundColor?: string
  $width?: string | number
}

interface TextAreaProps
  extends AriaTextFieldProps<HTMLTextAreaElement>,
    TextAreaStylesProps {
  label: string
}

export const TextArea = ({
  label,
  $borderColor = '#ccc',
  $borderRadius = '4px',
  $textColor = '#000',
  $placeholderColor = '#aaa',
  $labelColor = '#000',
  $backgroundColor = '#fff',
  $width = '100%',
  ...props
}: TextAreaProps) => {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const { labelProps, inputProps } = useTextField(
    {
      ...props,
      inputElementType: 'textarea',
    },
    ref
  )

  return (
    <S.Container $width={$width}>
      {label && (
        <S.Label {...labelProps} $labelColor={$labelColor}>
          {label}
        </S.Label>
      )}
      <S.TextArea
        {...inputProps}
        ref={ref}
        $borderColor={$borderColor}
        $borderRadius={$borderRadius}
        $backgroundColor={$backgroundColor}
        $textColor={$textColor}
        $placeholderColor={$placeholderColor}
      />
    </S.Container>
  )
}
