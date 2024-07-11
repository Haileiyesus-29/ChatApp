import queryConfig from "@/services/query"
import {useQuery} from "@tanstack/react-query"
import {Outlet} from "react-router-dom"

function Group() {
  const chatlistQuery = useQuery(queryConfig.getGroupChatlist())

  if (chatlistQuery.isLoading) return <div>Loading...</div>
  return (
    <Outlet
      context={{
        chatList: chatlistQuery.data,
        type: "group",
      }}
    />
  )
}

export default Group
