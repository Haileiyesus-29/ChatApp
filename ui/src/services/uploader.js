import api from './api'
import { ENDPOINT } from '../endpoints'

async function uploadFiles(files) {
   const sig = await api.get(ENDPOINT.UPDATE_PROFILE_PICTURE())
   const sigData = sig.data

   if (!sigData) return console.error('Failed to get signed url')

   const requests = []

   const formData = new FormData()
   for (const file of files) {
      formData.append('file', file)
      formData.append('api_key', sigData.apiKey)
      formData.append('timestamp', sigData.timestamp)
      formData.append('signature', sigData.signature)
      formData.append('folder', sigData.folder)
      formData.append('eager', sigData.eager)

      requests.push(
         fetch(sigData.url, {
            method: 'POST',
            body: formData,
         })
      )
   }

   const response = await Promise.all(requests)
   const data = await Promise.all(response.map(res => res.text()))

   return JSON.parse(data)
}

export default uploadFiles
