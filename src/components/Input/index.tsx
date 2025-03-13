'use client'

import React, { useState } from 'react'
import { useTextField } from 'react-aria'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import * as S from './styles'

export interface InputStylesProps {
  $borderColor?: string
  $borderColorFocus?: string
  $textColor?: string
  $placeholderColor?: string
  $labelColor?: string
  $backgroundColor?: string
  $errorColor?: string
  width?: string | number
}

interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    InputStylesProps {
  label?: string
  error?: string
  icon?: React.ReactNode
  type: 'text' | 'password' | 'email' | 'number'
  placeholder: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  label,
  error,
  icon,
  type,
  $labelColor = '#000',
  $borderColor,
  $borderColorFocus,
  $textColor,
  $placeholderColor,
  $backgroundColor,
  $errorColor = '#ff0000',
  width = '100%',
  placeholder,
  value = '',
  onChange = () => {},
}: InputProps) => {
  const [inputType, setInputType] = useState(type)
  const ref = React.useRef<HTMLInputElement>(null)
  const { inputProps, labelProps } = useTextField({ type: inputType }, ref)

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <S.InputContainer width={width}>
      {label ? (
        <S.Label {...labelProps} $labelColor={$labelColor}>
          {label}
        </S.Label>
      ) : null}
      <div style={{ position: 'relative', width: '100%' }}>
        {icon && <S.Icon>{icon}</S.Icon>}
        <S.Input
          {...inputProps}
          ref={ref}
          placeholder={placeholder}
          $borderColor={$borderColor}
          $borderColorFocus={$borderColorFocus}
          $textColor={$textColor}
          $placeholderColor={$placeholderColor}
          $backgroundColor={$backgroundColor}
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <S.IconEye onClick={togglePasswordVisibility}>
            {inputType === 'text' ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </S.IconEye>
        )}
      </div>
      {error && (
        <S.ErrorMessage $errorColor={$errorColor}>{error}</S.ErrorMessage>
      )}
    </S.InputContainer>
  )
}
