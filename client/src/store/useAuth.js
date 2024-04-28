import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import uploadFiles from '@/services/uploader'
import { create } from 'zustand'

const useAuth = create(set => ({
   account: null,
   loading: true,
   login: async (payload, cb) => {
      set({ loading: true })
      const response = await api.post(ENDPOINT.LOGIN(), payload)
      if (response.errors) {
         return cb?.('root', {
            type: 'manual',
            message: response?.errors.join(),
         })
      }
      sessionStorage.setItem('token', response?.token)
      set({ account: response?.data, loading: false })
   },

   logout: async () => {
      sessionStorage.removeItem('token')
      set({ account: null })
   },

   register: async (payload, cb) => {
      set({ loading: true })
      const response = await api.post(ENDPOINT.REGISTER(), payload)
      set({ loading: false })

      if (!response?.errors && response?.token) {
         sessionStorage.setItem('token', response?.token)
         cb?.()
      } else {
         console.log(response.errors)
         return cb?.(response.errors.join())
      }
      set({ account: response?.data, loading: false })
   },

   verify: async () => {
      set({ loading: true })
      const response = await api.get(ENDPOINT.VERIFY())
      set({ loading: false })
      if (response?.errors) return
      sessionStorage.setItem('token', response?.token)
      set({ account: response?.data, loading: false })
   },

   updateProfile: async (payload, cb) => {
      set({ loading: true })
      const response = await api.put(ENDPOINT.UPDATE_USER(), payload)
      set({ loading: false })

      if (response?.errors) {
         return cb?.('root', {
            message: response?.errors.join(),
         })
      }

      set({ account: response?.data, loading: false })
   },
   updateProfilePicture: async image => {
      const response = await uploadFiles(image)
      console.log(response)
      // set({ account: response?.data })
   },
}))

export default useAuth
