import ChatTitle from "@/components/ChatTitle"
import PersonalChatBubble from "@/components/PersonalChatBubble"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import useAuth from "@/store/useAuth"
import {useEffect, useRef} from "react"
import {useForm} from "react-hook-form"
import {useOutletContext, useParams} from "react-router-dom"
import {SendHorizontal} from "lucide-react"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import queryConfig from "@/services/query"
import Loader from "./Loader"
import {ENDPOINT} from "@/endpoints"
import api from "@/services/api"

function Messages() {
  const messageBox = useRef()
  const {id} = useParams()
  const account = useAuth(state => state.account)

  const {type} = useOutletContext()
  const messageQuery = useQuery(queryConfig.fetchMessages(type, id))
  const chatQuery = useQuery(queryConfig.fetchChatInfo(type, id))
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async data => {
      const res = await api.post(getEndpoint(type), {
        recipientId: id,
        message: {
          text: data.text,
        },
      })
      return res.data
    },
    onSuccess: res => {
      if (!res) return

      // update messages chache
      queryClient.setQueryData(queryConfig.fetchMessages(type, id).queryKey, old =>
        old.filter(msg => msg.id !== res.id).concat(res)
      )

      // update chat list cache
      queryClient.setQueryData(queryConfig.getChatList(type).queryKey, old => {
        if (!old)
          return [
            {
              ...chatQuery.data,
              type,
              lastMessage: res,
            },
          ]

        old.forEach(chat => {
          if (chat.id === id) {
            chat.lastMessage = res
          }
        })

        return [...old].sort((a, b) => {
          const dateA = new Date(a.lastMessage?.createdAt)
          const dateB = new Date(b.lastMessage?.createdAt)
          return dateB - dateA
        })
      })

      setValue("text", "")
      messageBox.current.scrollTop = messageBox.current.scrollHeight
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: {isSubmitting},
  } = useForm({defaultValues: {text: ""}})

  const onSubmit = e =>
    handleSubmit(data => {
      mutation.mutateAsync(data)
    })(e)

  useEffect(() => {
    if (messageBox.current) messageBox.current.scrollTop = messageBox.current.scrollHeight
  }, [messageQuery.data])

  const showForm =
    chatQuery.data?.type !== "channel" ||
    (chatQuery.data?.type === "channel" && chatQuery.data?.owner === account.id)

  const loading = messageQuery.isLoading || chatQuery.isLoading

  if (loading) return <Loader />
  return (
    <main className="flex flex-col justify-between gap-1 h-full overflow-hidden">
      <ChatTitle user={chatQuery.data} type={type} />
      <section ref={messageBox} className="bg-zinc-900 p-2 overflow-y-auto grow">
        <div className="flex flex-col justify-end items-start mt-auto min-h-full">
          {messageQuery.data.map(message => (
            <PersonalChatBubble key={message.id} message={message} />
          ))}
        </div>
      </section>
      {showForm && (
        <form onSubmit={onSubmit} className="flex items-center gap-1 px-1 py-2">
          <Input
            {...register("text", {required: true})}
            autoComplete="off"
            placeholder="Write you message here.."
          />
          <Button disabled={isSubmitting} type="submit" variant="secondary">
            <SendHorizontal />
          </Button>
        </form>
      )}
    </main>
  )
}
export default Messages

const getEndpoint = type => {
  switch (type) {
    case "chat":
      return ENDPOINT.SEND_CHAT_MESSAGE()
    case "group":
      return ENDPOINT.SEND_GROUP_MESSAGE()
    case "channel":
      return ENDPOINT.SEND_CHANNEL_MESSAGE()
    default:
      return ENDPOINT.SEND_MESSAGE()
  }
}
