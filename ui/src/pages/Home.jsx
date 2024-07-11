import queryConfig from "@/services/query"
import {useQueries} from "@tanstack/react-query"
import {useEffect, useState} from "react"
import {Outlet} from "react-router-dom"

function Home() {
  const [chatList, setChatList] = useState([])
  const [chatChatlist, groupChatlist, channelChatlist] = useQueries({
    queries: [
      queryConfig.getChatChatlist(),
      queryConfig.getGroupChatlist(),
      queryConfig.getChannelChatlist(),
    ],
  })

  useEffect(() => {
    const fechedChatLists = []
    chatChatlist.data && fechedChatLists.push(...chatChatlist.data)
    groupChatlist.data && fechedChatLists.push(...groupChatlist.data)
    channelChatlist.data && fechedChatLists.push(...channelChatlist.data)

    fechedChatLists.sort((a, b) => {
      const dateA = new Date(a.lastMessage?.createdAt)
      const dateB = new Date(b.lastMessage?.createdAt)
      return dateB - dateA
    })
    setChatList(fechedChatLists)
  }, [chatChatlist.data, groupChatlist.data, channelChatlist.data])

  const loading = chatChatlist.isLoading || groupChatlist.isLoading || channelChatlist.isLoading
  return <Outlet context={{chatList, loading}} />
}
export default Home
