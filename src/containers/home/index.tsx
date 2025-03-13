'use client'
import React from 'react'
import { BidsTable } from './BidsTable'
import { Pencil1Icon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useBids } from 'src/services/hooks/useBids'
import { Item } from 'react-stately'
import { Tabs } from 'src/components/Tabs'
import Cookies from 'js-cookie'

import * as S from './styles'

import { RegisterModal } from './RegisterModal'
import { Dialog } from 'src/components/Dialog'
import { RegisterForm } from './RegisterForm'

const formatColumnName = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export const HomeContainer = () => {
  const token = Cookies.get('sso_token') || ''
  const dealId = '1'
  const { data, error, isLoading, refetch } = useBids(dealId, token)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const columns =
    data && data.length > 0
      ? [
          ...Object.keys(data[0]).map((key) => ({
            name: formatColumnName(key),
            key,
          })),
          { name: 'Edit', key: 'edit' },
          { name: 'View', key: 'view' },
        ]
      : []

  const rows =
    data && data.length > 0
      ? data.map((row, index) => ({
          accepted: row.accepted ? 'Sim' : 'Não',
          id: index + 1,
          user_id: row.user_id,
          description: row.description,
          value: row.value,
          edit: (
            <S.Icon>
              <Pencil1Icon width={24} onClick={() => ({})} cursor="pointer" />
            </S.Icon>
          ),
          view: (
            <S.Icon>
              <EyeOpenIcon width={24} onClick={() => ({})} cursor="pointer" />
            </S.Icon>
          ),
        }))
      : []

  return (
    <Tabs aria-label="Input settings" defaultSelectedKey="keyboard">
      <Item key="Ofertas-negociação" title="Ofertas de negociação">
        <S.Container>
          <S.Title>Ofertas de negociação</S.Title>
          <RegisterModal label="Cadastrar nova oferta">
            {(close) => (
              <Dialog title="Cadastrar nova oferta">
                <S.IconCross width={36} onClick={close} cursor="pointer" />
                <RegisterForm onClose={close} refetch={refetch} />
              </Dialog>
            )}
          </RegisterModal>
          <S.Card>
            <BidsTable columns={columns} rows={rows} />
          </S.Card>
        </S.Container>
      </Item>
      <Item key="criar-negociacao" title="Criar negociação">
        <S.Container>
          <S.Title>Criar negociação</S.Title>
          <S.Card>
            <p>Criar negociação</p>
          </S.Card>
        </S.Container>
      </Item>
      <Item key="minhas-negociacoes" title="Minhas negociações">
        <S.Container>
          <S.Title>Minhas negociações</S.Title>
          <S.Card>
            <p>Minhas negociações</p>
          </S.Card>
        </S.Container>
      </Item>
      <Item key="meus-convites" title="Meus convites">
        <S.Container>
          <S.Title>Meus convites</S.Title>
          <S.Card>
            <p>Meus convites</p>
          </S.Card>
        </S.Container>
      </Item>
      <Item key="editar-usuario" title="Editar Usuário">
        <S.Container>
          <S.Title>Editar Usuário</S.Title>
          <S.Card>
            <p>Editar Usuário</p>
          </S.Card>
        </S.Container>
      </Item>
    </Tabs>
  )
}
