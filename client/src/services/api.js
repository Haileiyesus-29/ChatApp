import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
})

const api = {
   get: async (endpoint, config = {}) => {
      try {
         return await axiosInstance.get(endpoint, { headers: config })
      } catch (error) {
         console.log(error)
      }
   },

   post: async (endpoint, data = {}, config = {}) => {
      try {
         return await axiosInstance.post(endpoint, data, { headers: config })
      } catch (error) {
         console.log(error)
      }
   },

   put: async (endpoint, data = {}, config = {}) => {
      try {
         return await axiosInstance.put(endpoint, data, { headers: config })
      } catch (error) {
         console.log(error)
      }
   },
   delete: async (endpoint, data = {}, config = {}) => {
      try {
         return await axiosInstance.put(endpoint, data, { headers: config })
      } catch (error) {
         console.log(error)
      }
   },
}

export default api
