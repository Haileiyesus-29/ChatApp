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
   get: async endpoint => {
      try {
         const response = await axios.get(getPath(endpoint), getConfig())
         return response.data
      } catch (error) {
         await handleError(error)
         // Retry the request after verifying the token
         return (await axios.get(getPath(endpoint), getConfig())).data
      }
   },

   post: async (endpoint, payload = {}, config = {}) => {
      try {
         const response = await axios.post(
            getPath(endpoint),
            payload,
            getConfig(config)
         )
         return response.data
      } catch (error) {
         await handleError(error)
         // Retry the request after verifying the token
         return (
            await axios.post(getPath(endpoint), payload, getConfig(config))
         ).data
      }
   },

   put: async (endpoint, payload = {}, config = {}) => {
      try {
         const response = await axios.put(
            getPath(endpoint),
            payload,
            getConfig(config)
         )
         return response.data
      } catch (error) {
         await handleError(error)
         // Retry the request after verifying the token
         return (await axios.put(getPath(endpoint), payload, getConfig(config)))
            .data
      }
   },

   delete: async endpoint => {
      try {
         const response = await axios.delete(getPath(endpoint), getConfig())
         return response.data
      } catch (error) {
         await handleError(error)
         // Retry the request after verifying the token
         return (await axios.delete(getPath(endpoint), getConfig())).data
      }
   },
}

async function handleError(err) {
   if (err.response?.data.errors?.includes('Invalid token')) {
      try {
         const response = await axios.get(
            getPath(ENDPOINT.VERIFY()),
            getConfig()
         )
         if (response.data) {
            sessionStorage.setItem('token', `${response.data.token}`)
         } else {
            throw new Error('Invalid token')
         }
      } catch (error) {
         console.error(error)
      }
   } else {
      console.error(err)
   }
}
export default api
