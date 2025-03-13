'use client'

import React from 'react'
import { useTextField } from 'react-aria'
import * as S from './styles'

export interface MonetaryInputStylesProps {
  $borderColor?: string
  $borderColorFocus?: string
  $textColor?: string
  $placeholderColor?: string
  $backgroundColor?: string
  $errorColor?: string
  $width?: string | number
}

interface MonetaryInputProps extends MonetaryInputStylesProps {
  placeholder: string
  value: number
  onChange: (value: number) => void
}

export const InputMonetary = ({
  $borderColor,
  $borderColorFocus,
  $textColor,
  $placeholderColor,
  $backgroundColor,
  $errorColor = '#ff0000',
  $width = '100%',
  placeholder,
  value,
  onChange,
  ...props
}: MonetaryInputProps) => {
  const ref = React.useRef<HTMLInputElement>(null)
  const { inputProps } = useTextField({ ...props, type: 'text' }, ref)

  const formatValue = (value: number) => {
    return value?.toFixed(2).replace('.', ',')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(
      e.target.value.replace(/[^0-9,]/g, '').replace(',', '.')
    )
    if (!isNaN(newValue)) {
      onChange(newValue)
    } else {
      onChange(0)
    }
  }

  return (
    <S.InputContainer $width={$width}>
      <div style={{ position: 'relative', width: '100%' }}>
        <S.CurrencySymbol>R$</S.CurrencySymbol>
        <S.Input
          {...inputProps}
          ref={ref}
          placeholder={placeholder}
          value={formatValue(value)}
          onChange={handleChange}
          $errorColor={$errorColor}
          $borderColor={$borderColor}
          $borderColorFocus={$borderColorFocus}
          $textColor={$textColor}
          $placeholderColor={$placeholderColor}
          $backgroundColor={$backgroundColor}
        />
      </div>
    </S.InputContainer>
  )
}
