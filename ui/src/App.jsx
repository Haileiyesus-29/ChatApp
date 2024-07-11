import {RouterProvider} from "react-router-dom"
import routes from "@/routes"
import {useEffect} from "react"
import useAuth from "./store/useAuth"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

function App() {
  const {verify} = useAuth(state => state)

  useEffect(() => {
    verify()
  }, [verify])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}

export default App
