import styled from 'styled-components'
import { CrossCircledIcon } from '@radix-ui/react-icons'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  height: 100vh;
  background-color: #f4f4f4;
  margin: 0 8px;
  @media (min-width: 360px) {
    margin: 0 16px;
  }

  @media (min-width: 720px) {
    margin: 0 32px;
  }

  @media (min-width: 1080px) {
    margin: 0 80px;
  }
`

export const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 1rem;

  @media (min-width: 720px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1080px) {
    font-size: 2rem;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
`

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`

export const IconCross = styled(CrossCircledIcon)`
  position: absolute;
  z-index: 100;
  top: 16px;
  right: 16px;
`
