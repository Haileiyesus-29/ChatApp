import queryConfig from "@/services/query"
import {useQuery} from "@tanstack/react-query"
import {Outlet} from "react-router-dom"

function Chat() {
  const chatlistQuery = useQuery(queryConfig.getChatList("chat"))

  if (chatlistQuery.isLoading) return <div>Loading...</div>

  return (
    <Outlet
      context={{
        chatList: chatlistQuery.data,
        type: "chat",
      }}
    />
  )
}
export default Chat
