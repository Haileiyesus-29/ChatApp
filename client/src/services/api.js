import { ENDPOINT } from '@/endpoints'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const getConfig = custom => ({
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Credentials': 'true',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      ...custom,
   },
   withCredentials: true,
})

const getPath = endpoint => `${BASE_URL}${endpoint}`

const api = {
   request: async (method, endpoint, payload = {}, config = {}) => {
      try {
         const response = await axios[method](
            getPath(endpoint),
            payload,
            getConfig(config)
         )
         if (response.data) return response.data

         if (response.data.errors?.includes('Invalid token')) {
            console.log('Invalid token error detected')
            await axios.get(getPath(ENDPOINT.VERIFY()), getConfig())
         }

         const retry = await axios[method](
            getPath(endpoint),
            payload,
            getConfig(config)
         )
         return retry.data
      } catch (err) {
         console.error(err)
      }
   },
}

const methods = ['get', 'post', 'put', 'delete']

methods.forEach(method => {
   api[method] = async (endpoint, payload = {}, config = {}) => {
      return api.request(method, endpoint, payload, config)
   }
})

export default api
