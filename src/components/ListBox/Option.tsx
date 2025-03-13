import React from 'react'
import { mergeProps, useFocusRing, useOption } from 'react-aria'
import { ListState, Node } from 'react-stately'

interface OptionProps<T> {
  item: Node<T>
  state: ListState<T>
}

export const Option = <T,>({ item, state }: OptionProps<T>) => {
  const ref = React.useRef(null)
  const { optionProps } = useOption({ key: item.key }, state, ref)

  const { isFocusVisible, focusProps } = useFocusRing()

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      data-focus-visible={isFocusVisible}
    >
      {item.rendered}
    </li>
  )
}
