import { api } from '../api'
import MockAdapter from 'axios-mock-adapter'
import { baseURL, endpoints } from '../endpoints'

const apisMocks = new MockAdapter(api, { delayResponse: 500 })

export const apiToken = 'fake-jwt-token'

interface Bid {
  user_id: number
  accepted: boolean
  value: number
  description: string
}

const bidsData: Record<number, Bid[]> = {
  1: [
    { user_id: 1, accepted: true, value: 500.0, description: 'Oferta 1' },
    { user_id: 2, accepted: false, value: 600.0, description: 'Oferta 2' },
    { user_id: 1, accepted: false, value: 1000.0, description: 'Oferta 3' },
    { user_id: 1, accepted: true, value: 200.0, description: 'Oferta 4' },
    { user_id: 1, accepted: true, value: 300.0, description: 'Oferta 5' },
  ],
}

apisMocks.onPost(`${baseURL}${endpoints.authenticate}`).reply(200, {
  token: 'fake-jwt-token',
  user: {
    name: 'Lucas Developer',
    email: 'lucas@dev.com',
    login: 'lucasdev',
    password: '123456',
    location: {
      lat: -23.5505,
      lng: -46.6333,
      address: 'Rua Fictícia, 123',
      city: 'São Paulo',
      state: 'SP',
      zip_code: 12345678,
    },
  },
})

apisMocks.onPost(`${baseURL}${endpoints.authenticate}/sso`).reply(200, {
  token: 'fake-sso-jwt-token',
  user: {
    name: 'Lucas Developer',
    email: 'lucas@dev.com',
    login: 'lucasdev',
    password: '123456',
    location: {
      lat: -23.5505,
      lng: -46.6333,
      address: 'Rua Fictícia, 123',
      city: 'São Paulo',
      state: 'SP',
      zip_code: 12345678,
    },
  },
})

apisMocks
  .onGet(new RegExp(`${baseURL}${endpoints.deal}/\\d+/bid`))
  .reply((config) => {
    const match = config.url?.match(/\/deal\/(\d+)\/bid/)
    const dealId = match ? Number(match[1]) : null

    if (!dealId || !bidsData[dealId]) {
      return [404, { error: 'Negócio não encontrado' }]
    }

    return [200, bidsData[dealId]]
  })

apisMocks
  .onPost(new RegExp(`${baseURL}${endpoints.deal}/\\d+/bid`))
  .reply((config) => {
    const match = config.url?.match(/\/deal\/(\d+)\/bid/)
    const dealId = match ? Number(match[1]) : null

    if (!dealId) {
      return [400, { error: 'ID do negócio é obrigatório' }]
    }

    try {
      const requestBody = JSON.parse(config.data)
      const { user_id, accepted, value, description } = requestBody

      if (!user_id || typeof accepted !== 'boolean' || !value || !description) {
        return [400, { error: 'Parâmetros inválidos' }]
      }

      const newBid = { user_id, accepted, value, description }

      if (!bidsData[dealId]) {
        bidsData[dealId] = []
      }
      bidsData[dealId].push(newBid)

      return [201, newBid]
    } catch {
      return [500, { error: 'Erro interno no servidor' }]
    }
  })

export default apisMocks
