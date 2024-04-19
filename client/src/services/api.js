const BASE_URL = import.meta.env.VITE_API_URL

const defaultConfig = {
   'Content-Type': 'application/json',
   Accept: 'application/json',
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
   'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
   'Access-Control-Allow-Credentials': 'true',
}

const api = {
   get: async (endpoint, config = {}) => {
      try {
         const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               ...defaultConfig,
               ...config,
            },
         })
         return await response.json()
      } catch (error) {
         console.error('Failed to fetch data from the server.')
      }
   },

   post: async (endpoint, payload = {}, config = {}) => {
      try {
         const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               ...defaultConfig,
               ...config,
            },
            body: JSON.stringify(payload),
         })
         const data = await response.json()
         if (response.headers.get('Authorization')) {
            const token = response.headers.get('Authorization').split(' ')[1]
            data['token'] = token
         }
         return data
      } catch (error) {
         console.error('Failed to fetch data from the server.')
      }
   },

   put: async (endpoint, payload = {}, config = {}) => {
      try {
         const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               ...defaultConfig,
               ...config,
            },
            body: JSON.stringify(payload),
         })
         return await response.json()
      } catch (error) {
         console.error('Failed to fetch data from the server.')
      }
   },
   delete: async (endpoint, payload = {}, config = {}) => {
      try {
         const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               ...defaultConfig,
               ...config,
            },
            body: JSON.stringify(payload),
         })
         return await response.json()
      } catch (error) {
         console.error('Failed to fetch data from the server.')
      }
   },
}

export default api
