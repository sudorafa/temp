import React from 'react'
import { useOverlayTrigger } from 'react-aria'
import { useOverlayTriggerState } from 'react-stately'
import { Button } from 'src/components'
import { Modal } from 'src/components/Modal'

interface RegisterModalProps {
  label: string
  children: (close: () => void) => React.ReactElement
  [key: string]: unknown
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  label,
  children,
  ...props
}) => {
  const state = useOverlayTriggerState(props)
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state
  )

  return (
    <>
      <Button {...triggerProps} $backgroundColor="#444">
        {label}
      </Button>
      {state.isOpen && (
        <Modal state={state}>
          {React.cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  )
}
