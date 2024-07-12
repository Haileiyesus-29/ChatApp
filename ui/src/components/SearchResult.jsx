/* eslint-disable react/prop-types */
import {useNavigate} from "react-router-dom"
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"
import {Send, CirclePlus} from "lucide-react"
import paths from "@/paths"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {ENDPOINT} from "@/endpoints"
import api from "@/services/api"
import queryConfig from "@/services/query"

// eslint-disable-next-line react/prop-types
function SearchResult({type = "user", account, setSearchInput}) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const endpoint = type === "group" ? ENDPOINT.JOIN_GROUP() : ENDPOINT.JOIN_CHANNEL()
      const res = await api.post(endpoint, {id: account.id})
      return res.data
    },
    onSuccess: data => {
      queryClient.setQueryData(queryConfig.getChatList(type, account.id), old =>
        (old || []).filter(chat => chat.id !== account.id).concat(data)
      )
      const goto =
        type === "group" ? paths.groupMessage(account.id) : paths.channelMessage(account.id)
      setSearchInput("")
      navigate(goto)
    },
  })

  return (
    <li className="flex items-center gap-2 bg-zinc-950 p-2 rounded-md">
      <Avatar className="w-12 h-12">
        <AvatarImage
          src={account.image || "default_profile.jpg"}
          className="w-full h-full object-cover"
          alt={account.name}
        />
        <AvatarFallback>Profile Image</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-between">
        <p className="font-semibold text-zinc-50">{account.name}</p>
        <span className="text-sm text-zinc-50/60">@{account.username}</span>
      </div>

      {type === "user" ? (
        <span
          className="ml-auto px-3 hover:text-blue-500 transition cursor-pointer"
          onClick={() => {
            setSearchInput("")
            navigate(paths.chatMessage(account.id))
          }}
        >
          <Send />
        </span>
      ) : (
        <span
          className="ml-auto px-3 hover:text-blue-500 transition cursor-pointer"
          onClick={mutation.mutate}
        >
          <CirclePlus />
        </span>
      )}
    </li>
  )
}
export default SearchResult
