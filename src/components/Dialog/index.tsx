import React from 'react'
import type { AriaDialogProps } from 'react-aria'
import { useDialog } from 'react-aria'

interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const Dialog = ({ title, children, ...props }: DialogProps) => {
  const ref = React.useRef(null)
  const { dialogProps, titleProps } = useDialog(props, ref)

  return (
    <div {...dialogProps} ref={ref} style={{ padding: 30 }}>
      {title && (
        <h3 {...titleProps} style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
