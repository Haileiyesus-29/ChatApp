import axios from 'axios'

const baseURL = `${import.meta.env.VITE_SERVER_ADDR}/api/`

const axiosInstance = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

const handleError = error => {
   if (error.response) {
      console.error('Response error:', error.response.data)
      return Promise.reject(error.response.data)
   } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request)
      return Promise.reject('No response received')
   } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message)
      return Promise.reject(error.message)
   }
}

const api = {
   get: async (url, config = {}) => {
      try {
         const response = await axiosInstance.get(url, { config })
         return response.data
      } catch (error) {
         return handleError(error)
      }
   },

   post: async (url, data = {}, config = {}) => {
      try {
         const response = await axiosInstance.post(url, data, config)
         return response.data
      } catch (error) {
         return handleError(error)
      }
   },

   put: async (url, data = {}, config = {}) => {
      try {
         const response = await axiosInstance.put(url, data, config)
         return response.data
      } catch (error) {
         return handleError(error)
      }
   },

   del: async (url, config = {}) => {
      try {
         const response = await axiosInstance.delete(url, config)
         return response.data
      } catch (error) {
         return handleError(error)
      }
   },
}

export default api
