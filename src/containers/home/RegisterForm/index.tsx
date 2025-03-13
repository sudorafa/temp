'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Input, Checkbox, Button, ProgressCircle } from 'src/components'

import * as S from './styles'
import { useCreateBid } from 'src/services/hooks/useCreateBid'

interface FormData {
  user_id: number
  accepted: boolean
  value: number
  description: string
}

interface RegisterFormProps {
  onClose: VoidFunction
  refetch: VoidFunction
}

export const RegisterForm = ({ onClose, refetch }: RegisterFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const { mutate: createBid, isPending } = useCreateBid()

  const onSubmit = (data: FormData) => {
    createBid(
      { dealId: 1, ...data, value: Number(data.value) },
      {
        onSuccess: () => {
          refetch()
          onClose()
        },
      }
    )
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="user_id"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            placeholder="Digite o ID do usuário"
            error={errors.user_id?.message}
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />

      <Controller
        name="value"
        control={control}
        render={({ field }) => (
          <Input type="number" placeholder="Digite o valor" {...field} />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            placeholder="Digite a descrição"
            error={errors.description?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="accepted"
        control={control}
        render={({ field }) => (
          <Checkbox
            isIndeterminate={false}
            checked={field.value}
            onChange={field.onChange}
            name={field.name}
            onBlur={field.onBlur}
          >
            Accepted
          </Checkbox>
        )}
      />

      <Button type="submit" $backgroundColor="#444">
        {isPending ? (
          <ProgressCircle aria-label="Loading…" isIndeterminate />
        ) : (
          'Cadastrar'
        )}
      </Button>
    </S.Form>
  )
}
