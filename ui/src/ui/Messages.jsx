import ChatTitle from "@/components/ChatTitle"
import PersonalChatBubble from "@/components/PersonalChatBubble"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import useAuth from "@/store/useAuth"
import {useRef} from "react"
import {useForm} from "react-hook-form"
import {useOutletContext, useParams} from "react-router-dom"
import {SendHorizontal} from "lucide-react"
import {useQuery} from "@tanstack/react-query"
import queryConfig from "@/services/query"
import Loader from "./Loader"

function Messages() {
  const messageBox = useRef()
  const {id} = useParams()
  const account = useAuth(state => state.account)

  const {type} = useOutletContext()
  const messageQuery = useQuery(queryConfig.fetchMessages(type, id))
  const chatQuery = useQuery(queryConfig.fetchChatInfo(type, id))

  const {
    register,
    handleSubmit,
    setValue,
    formState: {isSubmitting},
  } = useForm({defaultValues: {text: ""}})

  const onSubmit = e =>
    handleSubmit(data => {
      console.log(data)
      setValue("text", "")
    })(e)

  // Only show form if the chat is not a channel or the user is the owner of the channel
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
