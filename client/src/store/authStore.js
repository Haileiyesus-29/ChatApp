import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import { create } from 'zustand'

const useAuth = create(set => ({
   account: null,
   loading: true,
   setLoading: status => set(state => ({ ...state, loading: status })),
   setToken: token => set(state => ({ ...state, token })),

   login: async payload => {
      set({ loading: true })
      const response = await api.post(ENDPOINT.LOGIN(), payload)
      if (!response?.data) return
      const token = response.headers.getAuthorization()?.split(' ')[1]
      localStorage.setItem('token', token)
      set({ account: response.data.data, loading: false })
   },

   logout: async () => {
      localStorage.removeItem('token')
      set({ account: null })
   },

   register: async payload => {
      set({ loading: true })
      const response = await api.post(ENDPOINT.REGISTER(), payload)
      set({ loading: false })
      if (!response?.data.data) return
      const token = response.headers.getAuthorization()?.split(' ')[1]
      localStorage.setItem('token', token)
      set({ account: response.data.data, loading: false })
   },

   verify: async () => {
      set({ loading: true })
      const response = await api.get(ENDPOINT.VERIFY(), {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
      set({ loading: false })
      if (!response?.data.data) return
      set({ account: response.data.data, loading: false })
   },
}))

export default useAuth
