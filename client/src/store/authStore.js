import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import { create } from 'zustand'

const useAuth = create(set => ({
   account: null,
   loading: true,
   login: async (payload, cb) => {
      set({ loading: true })
      const response = await api.post(ENDPOINT.LOGIN(), payload)
      if (response.token) {
         localStorage.setItem('token', response.token)
         set({ account: response, loading: false })
      } else
         return cb?.('root', {
            type: 'manual',
            message: response.errors.join(),
         })
      set({ account: response.data, loading: false })
   },

   logout: async () => {
      localStorage.removeItem('token')
      set({ account: null })
   },

   register: async (payload, cb) => {
      console.log(payload)
      set({ loading: true })
      const response = await api.post(ENDPOINT.REGISTER(), payload)
      set({ loading: false })

      if (!response.token || response.errors) {
         localStorage.setItem('token', response.token)
      } else
         return cb?.('root', {
            type: 'manual',
            message: response.errors.join(),
         })

      set({ account: response.data, loading: false })
   },

   verify: async () => {
      set({ loading: true })
      const response = await api.get(ENDPOINT.VERIFY(), {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
      set({ loading: false })
      if (response.errors) return
      set({ account: response.data, loading: false })
   },
}))

export default useAuth
