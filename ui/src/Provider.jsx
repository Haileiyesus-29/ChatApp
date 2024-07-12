import {PropTypes} from "prop-types"
import {useCallback, useEffect} from "react"
import instance from "@/services/socket"
import useAuth from "@/store/useAuth"
import {useQueryClient} from "@tanstack/react-query"
import queryConfig from "./services/query"

Provider.propTypes = {
  children: PropTypes.node,
}

function Provider({children}) {
  const {account} = useAuth(store => store)
  const queryClient = useQueryClient()

  const listener = useCallback(
    (event, data) => {
      let chatId = null
      if (event === "chat") chatId = account.id === data.sender ? data.receiver : data.sender
      if (event === "group") chatId = data.receiver
      if (event === "channel") chatId = data.sender

      queryClient.setQueryData(queryConfig.getChatList(event).queryKey, old => {
        let chached = false

        const list = (old || []).map(chat => {
          if (chat.id === chatId) {
            chached = true
            chat.lastMessage = data
          }
          return chat
        })

        if (!chached) list.push({...data.user, lastMessage: data})

        list.sort((a, b) => {
          const dateA = new Date(a.lastMessage?.createdAt)
          const dateB = new Date(b.lastMessage?.createdAt)
          return dateB - dateA
        })

        return list
      })

      // update messages cache
      const oldMessages = queryClient.getQueryData(
        queryConfig.fetchMessages(event, chatId).queryKey
      )
      if (!oldMessages) return queryClient.fetchQuery(queryConfig.fetchMessages(event, chatId))

      queryClient.setQueryData(queryConfig.fetchMessages(event, chatId).queryKey, () =>
        oldMessages.filter(msg => msg.id !== data.id).concat(data)
      )
    },

    [account.id, queryClient]
  )

  useEffect(() => {
    if (account) {
      instance.auth.token = sessionStorage.getItem("token")
      instance.connect()
    } else instance.disconnect()

    return () => {
      instance?.disconnect()
    }
  }, [account])

  useEffect(() => {
    instance.on("chat:message", listener.bind(null, "chat"))
    return () => instance.off("chat:message", listener)
  }, [listener])

  useEffect(() => {
    instance.on("group:message", listener.bind(null, "group"))
    return () => instance.off("group:message", listener)
  }, [listener])

  useEffect(() => {
    instance.on("channel:message", listener.bind(null, "channel"))
    return () => instance.off("channel:message", listener)
  }, [listener])

  return <>{children}</>
}
export default Provider
