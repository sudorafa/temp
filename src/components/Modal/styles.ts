'use client'

import styled from 'styled-components'

export const StylesModal = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Modal = styled.div`
  position: relative;
  background: #f4f4f4;
  border: 1px solid gray;
`
