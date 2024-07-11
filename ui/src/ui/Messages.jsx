import ChatTitle from "@/components/ChatTitle"
import PersonalChatBubble from "@/components/PersonalChatBubble"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import useAuth from "@/store/useAuth"
import {useEffect, useRef, useState} from "react"
import {useForm} from "react-hook-form"
import {useOutletContext, useParams} from "react-router-dom"
import {SendHorizontal} from "lucide-react"

function Messages() {
  const messageBox = useRef()
  const {id} = useParams()
  const {account} = useAuth(store => store)
  const {messages, fetchChatThread, chatList, sendMessage, getInfo} = useOutletContext()
  const [user, setUser] = useState(() => chatList.find(chat => chat.id === id) ?? null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    messageBox.current.scrollTop = messageBox.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (!messages[id]) {
      fetchChatThread(id)
    }
  }, [fetchChatThread, id, messages])

  useEffect(() => {
    if (!user?.id) {
      getInfo(id)
        .then(setUser)
        .then(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [getInfo, id, user?.id])

  const {
    register,
    handleSubmit,
    setValue,
    formState: {isSubmitting},
  } = useForm({defaultValues: {text: ""}})

  const onSubmit = async data => {
    await sendMessage({recipientId: id, message: data})
    setValue("text", "")
  }

  const showForm =
    (user?.type === "channel" && user?.ownerId === account.id) || user?.type !== "channel"

  if (!user && !loading) return <h1>Not Found</h1>

  return (
    <main className="flex flex-col justify-between gap-1 h-full overflow-hidden">
      <ChatTitle user={user} />
      <section ref={messageBox} className="bg-zinc-900 p-2 overflow-y-auto grow">
        <div className="flex flex-col justify-end items-start mt-auto min-h-full">
          {(messages[id] || [])?.map(message => (
            <PersonalChatBubble key={message.id} message={message} />
          ))}
        </div>
      </section>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-1 px-1 py-2">
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
