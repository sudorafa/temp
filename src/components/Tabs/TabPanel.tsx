'use client'
import React from 'react'
import { useTabPanel, AriaTabPanelProps } from 'react-aria'
import { TabListState } from 'react-stately'

interface ExtendedAriaTabPanelProps extends AriaTabPanelProps {
  state: TabListState<unknown>
}

export const TabPanel = ({ state, ...props }: ExtendedAriaTabPanelProps) => {
  const ref = React.useRef(null)
  const { tabPanelProps } = useTabPanel(props, state, ref)
  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  )
}
