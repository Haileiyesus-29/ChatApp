import queryConfig from "@/services/query"
import {useQuery} from "@tanstack/react-query"
import {Outlet} from "react-router-dom"

function Channel() {
  const chatlistQuery = useQuery(queryConfig.getChatList("channel"))

  if (chatlistQuery.isLoading) return <div>Loading...</div>
  return (
    <Outlet
      context={{
        chatList: chatlistQuery.data,
        type: "channel",
      }}
    />
  )
}
export default Channel
