/* eslint-disable react/prop-types */
import {Navigate, Outlet} from "react-router-dom"
import Header from "@/components/Header"
import NavLinks from "@/components/NavLinks"
import useAuth from "@/store/useAuth"
import Provider from "@/Provider"
import Loader from "./Loader"

function Container() {
  const {loading, account} = useAuth(state => state)

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
