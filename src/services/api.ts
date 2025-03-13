import axios from 'axios'
import { baseURL } from './endpoints'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer fake-jwt-token`,
  },
})
