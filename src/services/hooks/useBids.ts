'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { endpoints } from '../endpoints'

interface BidsParams {
  id: string
  token: string
}

interface Bid {
  user_id: number
  accepted: boolean
  value: number
  description: string
}

const fetchBids = async ({ id, token }: BidsParams): Promise<Bid[]> => {
  try {
    const { data, status } = await api.get(`${endpoints.deal}/${id}/bid`, {
      headers: {
        authorization: token,
      },
    })

    if (status !== 200) {
      throw new Error('Falha ao buscar dados das ofertas')
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar dados das ofertas:', error)
    throw new Error(
      'Falha ao buscar dados das ofertas. Por favor, tente novamente.'
    )
  }
}

export const useBids = (id: string, token: string) => {
  return useQuery<Bid[], Error>({
    queryKey: ['bids', id],
    queryFn: () => fetchBids({ id, token }),
  })
}
