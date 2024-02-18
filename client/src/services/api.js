import axios from 'axios'

const baseURL = 'http://127.0.0.1:5000/api/' // Replace with your actual server URL

const axiosInstance = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

// Common method for handling errors
const handleError = error => {
   if (error.response) {
      // The request was made, but the server responded with a status code outside of the 2xx range
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
   // GET request
   get: async (url, config = {}) => {
      try {
         const response = await axiosInstance.get(url, { config })
         return response.data
      } catch (error) {
         return handleError(error)
      }
   },

   // POST request
   post: async (url, data = {}, config = {}) => {
      try {
         const response = await axiosInstance.post(url, data, config)
         return response.data
      } catch (error) {
         return handleError(error)
      }
   },

   // PUT request
   put: async (url, data = {}, config = {}) => {
      try {
         const response = await axiosInstance.put(url, data, config)
         return response.data
      } catch (error) {
         return handleError(error)
      }
   },

   // DELETE request
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
