'use client'
import React from 'react'
import { useTabList, AriaTabListProps } from 'react-aria'
import { useTabListState } from 'react-stately'

import { Tab } from './Tab'
import { TabPanel } from './TabPanel'

import * as S from './styles'

export const Tabs = <T extends object>(props: AriaTabListProps<T>) => {
  const state = useTabListState(props)
  const ref = React.useRef(null)
  const { tabListProps } = useTabList(props, state, ref)
  return (
    <S.StylesTabs className={`tabs ${props.orientation || ''}`}>
      <S.StylesTabList {...tabListProps} ref={ref}>
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </S.StylesTabList>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </S.StylesTabs>
  )
}
