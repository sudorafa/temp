import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

export const ErrorMessage = styled.div`
  margin-top: 20px;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
`

export const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 12px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
`
