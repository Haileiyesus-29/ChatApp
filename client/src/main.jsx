import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 30 * 1000,
      },
   },
})

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </QueryClientProvider>
   </React.StrictMode>
)
