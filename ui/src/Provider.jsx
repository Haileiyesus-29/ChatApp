import {PropTypes} from "prop-types"
import {useEffect} from "react"
import instance from "@/services/socket"
import useAuth from "@/store/useAuth"

Provider.propTypes = {
  children: PropTypes.node,
}

function Provider({children}) {
  const {account} = useAuth(store => store)

  useEffect(() => {
    if (account) instance.connect()

    return () => {
      instance?.disconnect()
    }
  }, [account])

  const listener = (...args) => {
    console.log(args)
  }

  useEffect(() => {
    instance.on("chat:message", listener)
    return () => instance.off("chat:message", listener)
  }, [])

  return children
}
export default Provider
