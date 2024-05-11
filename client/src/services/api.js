import { ENDPOINT } from '@/endpoints'
import axios from 'axios'

// const BASE_URL = import.meta.env.VITE_API_URL

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

// const getPath = endpoint => `${BASE_URL}${endpoint}`

const dontTryEndponits = [
   ENDPOINT.LOGIN(),
   ENDPOINT.REGISTER(),
   ENDPOINT.VERIFY(),
]

const api = {
   request: async (method, endpoint, payload = {}, config = {}) => {
      try {
         const response = await axios[method](
            endpoint,
            payload,
            getConfig(config)
         )

         return response.data
      } catch (err) {
         const errorData = err.response.data

         if (dontTryEndponits.includes(endpoint)) {
            return errorData
         }

         if (errorData.errors?.includes('Invalid token')) {
            await axios.get(ENDPOINT.VERIFY()), getConfig()
         }

         const retry = await axios[method](endpoint, payload, getConfig(config))
         return retry.data
      }
   },

   get: async (endpoint, config = {}) => {
      try {
         const response = await axios.get(endpoint, getConfig(config))

         return response.data
      } catch (err) {
         const errorData = err.response.data

         if (dontTryEndponits.includes(endpoint)) {
            return errorData
         }

         if (errorData.errors?.includes('Invalid token')) {
            await axios.get(ENDPOINT.VERIFY()), getConfig()
         }

         const retry = await axios.get(endpoint, getConfig(config))
         return retry.data
      }
   },
}

const methods = ['post', 'put', 'delete']

methods.forEach(method => {
   api[method] = async (endpoint, payload = {}, config = {}) => {
      return api.request(method, endpoint, payload, config)
   }
})

export default api
