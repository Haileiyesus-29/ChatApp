import api from './api'
import { ENDPOINT } from '../endpoints'

async function uploadFiles(files) {
   const sig = await api.get(ENDPOINT.UPDATE_PROFILE_PICTURE())
   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   }
   const formData = new FormData()

   const requests = []

   for (const file of files) {
      formData.append('file', file)
      formData.append('api_key', sig.api_key)
      formData.append('timestamp', sig.timestamp)
      formData.append('signature', sig.signature)

      requests.push(
         api.post(ENDPOINT.UPDATE_PROFILE_PICTURE(), formData, config)
      )
   }

   return Promise.all(requests)
}

export default uploadFiles
