import React from 'react'

import { useListState, ListState, Node } from 'react-stately'
import { useListBox } from 'react-aria'

import { Option } from './Option'
import { ListBoxSection } from './ListBoxSection'

import { ListProps } from 'react-stately'

interface ListBoxProps<T> extends ListProps<T> {
  label: React.ReactNode
  item?: Node<T>
  state: ListState<T>
}

export const ListBox = <T extends object>(props: ListBoxProps<T>) => {
  const state = useListState<T>(props)
  const ref = React.useRef(null)
  const { listBoxProps, labelProps } = useListBox(props, state, ref)

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <ul {...listBoxProps} ref={ref}>
        {[...state.collection].map((item) =>
          item.type === 'section' ? (
            <ListBoxSection key={item.key} section={item} state={state} />
          ) : (
            <Option key={item.key} item={item} state={state} />
          )
        )}
      </ul>
    </>
  )
}
