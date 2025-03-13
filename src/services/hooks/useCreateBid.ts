import { useMutation } from '@tanstack/react-query'
import { api } from '../api'
import { endpoints } from '../endpoints'
import Cookies from 'js-cookie'

interface CreateBidParams {
  dealId: number
  user_id: number
  accepted: boolean
  value: number
  description: string
}

interface CreateBidResponse {
  bid: {
    user_id: number
    accepted: boolean
    value: number
    description: string
  }
}

const createBid = async ({
  dealId,
  user_id,
  accepted,
  value,
  description,
}: CreateBidParams): Promise<CreateBidResponse> => {
  try {
    const token = Cookies.get('sso_token') || ''

    const { data, status } = await api.post(
      `${endpoints.deal}/${dealId}/bid`,
      { user_id, accepted, value, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (status !== 201) {
      throw new Error('Falha ao criar oferta')
    }

    return data
  } catch (error) {
    console.error('Erro ao criar oferta:', error)
    throw new Error('Não foi possível criar a oferta.')
  }
}

export const useCreateBid = () => {
  return useMutation<CreateBidResponse, Error, CreateBidParams>({
    mutationFn: createBid,
  })
}
