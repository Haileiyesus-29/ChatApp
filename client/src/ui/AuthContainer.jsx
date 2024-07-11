import {PropTypes} from "prop-types"
import useAuth from "@/store/useAuth"
import {Navigate} from "react-router-dom"

AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

function AuthContainer({children}) {
  const {account, loading} = useAuth(store => store)

  if (account && !loading) return <Navigate to="/" />
  return (
    <main className="flex justify-center items-center bg-black mx-auto p-4 rounded-xl w-full max-w-screen-lg h-full overflow-hidden">
      {children}
    </main>
  )
}
export default AuthContainer
