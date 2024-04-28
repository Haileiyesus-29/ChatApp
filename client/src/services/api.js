import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const getConfig = custom => ({
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Credentials': 'true',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
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
         handleError(error)
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
         handleError(error)
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
         handleError(error)
      }
   },

   delete: async endpoint => {
      try {
         const response = await axios.delete(getPath(endpoint), getConfig())
         return response.data
      } catch (error) {
         handleError(error)
      }
   },
}

function handleError(err) {
   console.log(err)
}

export default api
