'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { endpoints } from '../endpoints'

interface DealParams {
  id: string
  token: string
}

interface DealResponse {
  deal: {
    type: number
    value: number
    description: string
    trade_for: string
    location: {
      lat: number
      lng: number
      address: string
      city: string
      state: string
      zip_code: number
    }
    urgency: {
      type: number
      limit_date: string
    }
    photos: { src: string }[]
  }
}

const fetchDeal = async ({ id, token }: DealParams): Promise<DealResponse> => {
  try {
    const { data, status } = await api.get(`${endpoints.deal}/${id}`, {
      headers: {
        authorization: token,
      },
    })

    if (status !== 200) {
      throw new Error('Falha ao buscar dados da negociação')
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar dados da negociação:', error)
    throw new Error(
      'Falha ao buscar dados da negociação. Por favor, tente novamente.'
    )
  }
}

export const useDeal = (id: string, token: string) => {
  return useQuery<DealResponse, Error>({
    queryKey: ['deal', id],
    queryFn: () => fetchDeal({ id, token }),
  })
}
