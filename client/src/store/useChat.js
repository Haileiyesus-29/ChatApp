import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import { create } from 'zustand'

const useChat = create((set, getState) => ({
   userId: null,
   loading: true,
   chatList: [],
   messages: {},
   setUserId: id => set({ userId: id }),
   fetchChatList: async () => {
      set(store => ({ ...store, loading: true }))
      const response = await api.get(ENDPOINT.GET_ALL_CHATS())
      if (!response?.data) return
      set(store => ({ ...store, loading: false, chatList: response.data }))
   },
   fetchChatThread: async id => {
      const response = await api.get(ENDPOINT.GET_CHAT_THREAD(id))
      if (!response?.data) return
      set(store => ({
         ...store,
         messages: { ...store.messages, [id]: response.data },
      }))
   },
   sendMessage: async payload => {
      const response = await api.post(ENDPOINT.SEND_CHAT_MESSAGE(), payload)
      if (!response?.data || response.error) return
   },
   newMessage: async message => {
      const currState = getState()
      let chatId =
         message.sender === currState.userId ? message.receiver : message.sender

      let isChatted = false
      let chatList = currState.chatList.map(chat => {
         if (chat.id === chatId) {
            isChatted = true
            return {
               ...chat,
               lastMessage: message,
            }
         }
         return chat
      })
      if (!isChatted) {
         chatList.push({
            id: chatId,
            ...message.user,
            lastMessage: message,
         })
      }
      chatList.sort((a, b) => {
         const aDate = new Date(a.lastMessage.createdAt)
         const bDate = new Date(b.lastMessage.createdAt)
         return bDate - aDate
      })

      let messages
      if (currState.messages[chatId]) {
         messages = [...currState.messages[chatId]]
            .filter(msg => msg.id !== message.id)
            .push(message)
      } else {
         messages = (await api.get(ENDPOINT.GET_CHAT_THREAD(chatId))) ?? [
            message,
         ]
      }

      set(store => ({
         ...store,
         chatList,
         messages,
      }))
   },
   getChatInfo: async id => {
      const response = await api.get(ENDPOINT.GET_USER(id))
      return response.data
   },
}))

export default useChat
