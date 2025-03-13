'use client'

import { useMutation } from '@tanstack/react-query'
import { api } from '../api'
import { endpoints } from '../endpoints'

interface LoginParams {
  login: string
  password: string
}

interface AuthParams {
  login: string
  app_token: string
}

interface AuthResponse {
  token: string
  user: {
    name: string
    email: string
    login: string
    password: string
    location: {
      lat: number
      lng: number
      address: string
      city: string
      state: string
      zip_code: number
    }
  }
}

const authenticateUser = async ({
  login,
  password,
}: LoginParams): Promise<AuthResponse> => {
  try {
    const { data, status } = await api.post(`${endpoints.authenticate}`, {
      login,
      password,
    })

    if (status !== 200) {
      throw new Error('Falha na autenticação')
    }

    return data
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error)
    throw new Error(
      'Falha na autenticação. Por favor, verifique suas credenciais e tente novamente.'
    )
  }
}

const authenticateUserSSO = async ({
  login,
  app_token,
}: AuthParams): Promise<AuthResponse> => {
  try {
    const { data, status } = await api.post(`${endpoints.authenticate}/sso`, {
      login,
      app_token,
    })

    if (status !== 200) {
      throw new Error('Falha na autenticação')
    }

    return data
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error)
    throw new Error(
      'Falha na autenticação. Por favor, verifique suas credenciais e tente novamente.'
    )
  }
}

export const useAuthenticate = () => {
  return useMutation<AuthResponse, Error, LoginParams>({
    mutationFn: authenticateUser,
  })
}

export const useAuthenticateSSO = () => {
  return useMutation<AuthResponse, Error, AuthParams>({
    mutationFn: authenticateUserSSO,
  })
}
