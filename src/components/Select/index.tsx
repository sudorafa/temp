import React from 'react'
import { Item, SelectStateOptions, useSelectState } from 'react-stately'
import { AriaSelectOptions, HiddenSelect, useSelect } from 'react-aria'

import { Button, ListBox, PopOver } from '../'

export const Select = (
  props: SelectStateOptions<object> & AriaSelectOptions<object>
) => {
  const state = useSelectState(props)
  const ref = React.useRef<HTMLButtonElement>(null)
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  )

  return (
    <div style={{ display: 'inline-block' }}>
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        isDisabled={props.isDisabled}
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Button {...triggerProps} buttonRef={ref}>
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : 'Select an option'}
        </span>
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen && (
        <PopOver state={state} triggerRef={ref} placement="bottom start">
          {state.selectedItem && (
            <ListBox {...menuProps} state={state} label={props.label} />
          )}
        </PopOver>
      )}
    </div>
  )
}

export const SelectItem = Item
