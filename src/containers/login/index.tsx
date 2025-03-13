'use client'

import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { PersonIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input, Button, ProgressCircle } from 'src/components'

import {
  useAuthenticate,
  useAuthenticateSSO,
} from 'src/services/hooks/useAuthenticate'
import * as S from './styles'

const loginSchema = z.object({
  login: z.string().min(1, 'O login é obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginContainer = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: authenticate } = useAuthenticate()
  const { mutate: authenticateSSO, isPending: isSSOAuthenticating } =
    useAuthenticateSSO()
  const onSubmit = (data: LoginFormValues) => {
    authenticate(data, {
      onSuccess: (response) => {
        authenticateSSO(
          {
            login: response?.user.login || '',
            app_token: response?.token || '',
          },
          {
            onSuccess: (ssoResponse) => {
              Cookies.set('sso_token', ssoResponse.token, { expires: 1 })
              router.push('/')
            },
          }
        )
      },
    })
  }
  return (
    <S.Container>
      <S.Title>Tech Circle</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          render={({ field }) => (
            <Input
              label="Login"
              type="text"
              placeholder="Digite seu login"
              icon={<PersonIcon width={24} />}
              error={errors.login?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              icon={<LockClosedIcon width={24} />}
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <Button type="submit" isDisabled={isSSOAuthenticating}>
          {isSSOAuthenticating ? (
            <ProgressCircle aria-label="Loading…" isIndeterminate />
          ) : (
            'Entrar'
          )}
        </Button>
      </S.Form>
    </S.Container>
  )
}
