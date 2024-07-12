import {Navigate, Outlet} from "react-router-dom"
import Header from "@/components/Header"
import NavLinks from "@/components/NavLinks"
import useAuth from "@/store/useAuth"
import Provider from "@/Provider"
import Loader from "./Loader"
import {useQuery} from "@tanstack/react-query"

function Container() {
  const {loading, account, verify} = useAuth(state => state)

  useQuery({
    queryKey: ["verify"],
    queryFn: verify,
    refetchInterval: 1000 * 60 * 15,
  })

  const renderMainComponents = () => (
    <>
      <Header />
      <NavLinks />
      <Outlet />
    </>
  )

  if (loading) return <Loader />
  if (!account) return <Navigate to="/login" />
  return (
    <Provider>
      <div className="grid grid-cols-[min-content,1fr] grid-rows-[min-content,1fr] bg-black mx-auto lg:rounded-xl w-full max-w-screen-lg h-full overflow-hidden">
        {renderMainComponents()}
      </div>
    </Provider>
  )
}
export default Container
