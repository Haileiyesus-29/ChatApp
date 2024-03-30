import { create } from 'zustand'

const useAuth = create(set => ({
   account: null,
   loading: true,
   setAccount: account =>
      set(state => ({ ...state, account: account || null })),
   setLoading: status => set(state => ({ ...state, loading: status })),
}))

export default useAuth
