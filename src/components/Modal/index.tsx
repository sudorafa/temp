import React from 'react'
import { Overlay, useModalOverlay } from 'react-aria'

import * as S from './styles'

import { ReactNode } from 'react'
import { OverlayTriggerState } from 'react-stately'

interface ModalProps {
  state: OverlayTriggerState
  children: ReactNode
  [key: string]: unknown
}

export const Modal = ({ state, children, ...props }: ModalProps) => {
  const ref = React.useRef(null)
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref)

  return (
    <Overlay>
      <S.StylesModal {...underlayProps}>
        <S.Modal {...modalProps} ref={ref}>
          {children}
        </S.Modal>
      </S.StylesModal>
    </Overlay>
  )
}
