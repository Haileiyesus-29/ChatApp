import { useEffect, useState } from 'react'
import api from '../services/api'

function useFetch(url) {
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)

   useEffect(() => {
      const loadData = async () => {
         try {
            setLoading(true)
            const response = await api.get(url)
            setData(response)
         } catch (error) {
            setError(error)
         } finally {
            setLoading(false)
         }
      }
      loadData()
   }, [url])

   return { data, loading, error }
}

export default useFetch
