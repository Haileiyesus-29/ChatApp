import {RouterProvider} from "react-router-dom"
import routes from "@/routes"
import {useEffect} from "react"
import useAuth from "./store/useAuth"

function App() {
  const {verify} = useAuth(state => state)

  useEffect(() => {
    verify()
  }, [verify])

  return <RouterProvider router={routes} />
}

export default App
