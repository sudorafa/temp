'use client'

import React from 'react'

import { VisuallyHidden, AriaCheckboxProps } from 'react-aria'

import * as S from './styles'

interface CheckboxStyledProps {
  $labelColor?: string
  $backgroundColor?: string
  $checkColor?: string
  $borderColor?: string
  $borderRadius?: string
  $errorBorderColor?: string
}

interface CheckboxProps extends CheckboxStyledProps, AriaCheckboxProps {
  isIndeterminate?: boolean
  isDisabled?: boolean
  children?: React.ReactNode
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox = ({
  isIndeterminate,
  isDisabled,
  children,
  $labelColor = '#000',
  $backgroundColor = '#fff',
  $checkColor = '#000',
  $borderColor = '#ccc',
  $borderRadius = '4px',
  checked,
  onChange,
}: CheckboxProps & {
  checked?: boolean
  onChange?: (checked: boolean) => void
}) => {
  const ref = React.useRef<HTMLInputElement>(null)

  const handleChange = () => {
    if (onChange) {
      onChange(!checked) // Atualiza o estado corretamente
    }
  }

  return (
    <S.CheckboxContainer>
      <S.Label $labelColor={$labelColor} $isDisabled={!!isDisabled}>
        <VisuallyHidden>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            ref={ref}
          />
        </VisuallyHidden>
        <S.StyledCheckbox aria-hidden="true">
          <rect
            x={checked ? 4 : 5}
            y={checked ? 4 : 5}
            width={checked ? 16 : 14}
            height={checked ? 16 : 14}
            fill={checked ? $backgroundColor : 'none'}
            stroke={checked ? 'none' : $borderColor}
            strokeWidth={2}
            rx={$borderRadius}
          />
          {checked && (
            <path
              transform="translate(7 7)"
              d={`M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1
            1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712
            6A.999.999 0 0 1 3.788 9z`}
              fill={$checkColor}
            />
          )}
          {isIndeterminate && (
            <rect x={7} y={11} width={10} height={2} fill="gray" />
          )}
        </S.StyledCheckbox>
        {children}
      </S.Label>
    </S.CheckboxContainer>
  )
}
