'use client'
import React from 'react'
import { useTab } from 'react-aria'

import { TabListState, Node } from 'react-stately'

import * as S from './styles'

interface TabProps<T> {
  item: Node<T>
  state: TabListState<object>
}

export const Tab: React.FC<TabProps<object>> = ({ item, state }) => {
  const { key, rendered } = item
  const ref = React.useRef(null)
  const { tabProps } = useTab({ key }, state, ref)
  return (
    <S.StylesTab {...tabProps} ref={ref}>
      {rendered}
    </S.StylesTab>
  )
}
