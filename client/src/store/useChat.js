import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import { create } from 'zustand'

const useChat = create(set => ({
   userId: null,
   loading: true,
   chatList: [],
   messages: {},
   setUserId: id => set({ userId: id }),
   fetchChatList: async () => {
      set(store => ({ ...store, loading: true }))
      const response = await api.get(ENDPOINT.GET_ALL_CHATS())
      if (!response.data) return
      set(store => ({ ...store, loading: false, chatList: response.data }))
   },
   fetchChatThread: async id => {
      const response = await api.get(ENDPOINT.GET_CHAT_THREAD(id))
      if (!response.data) return
      set(store => ({
         ...store,
         messages: { ...store.messages, [id]: response.data },
      }))
   },
   sendMessage: async payload => {
      const response = await api.post(ENDPOINT.SEND_CHAT_MESSAGE(), payload)
      if (!response.data || response.error) return
      // set(store => ({
      //    ...store,
      //    chatList: store.chatList
      //       .map(chat => {
      //          if (chat.id === payload.recipientId) {
      //             return { ...chat, lastMessage: response.data }
      //          }
      //          return chat
      //       })
      //       .sort((a, b) => {
      //          const aDate = new Date(a.lastMessage.createdAt)
      //          const bDate = new Date(b.lastMessage.createdAt)
      //          return bDate - aDate
      //       }),
      //    messages: {
      //       ...store.messages,
      //       [payload.recipientId]: [
      //          ...(store.messages[payload.recipientId] ?? []),
      //          response.data,
      //       ],
      //    },
      // }))
   },
   newMessage: async message => {
      set(store => {
         let chatId =
            message.sender === store.userId ? message.receiver : message.sender

         return {
            ...store,
            chatList: store.chatList
               .map(chat => {
                  if (
                     chat.id === message.receiver ||
                     chat.id === message.sender
                  ) {
                     return { ...chat, lastMessage: message }
                  }
                  return chat
               })
               .sort((a, b) => {
                  const aDate = new Date(a.lastMessage.createdAt)
                  const bDate = new Date(b.lastMessage.createdAt)
                  return bDate - aDate
               }),
            messages: {
               ...store.messages,
               [chatId]: [
                  ...(store.messages[chatId] ?? []).filter(
                     msg => msg.id !== message.id
                  ),
                  message,
               ],
            },
         }
      })
   },
   getChatInfo: async id => {
      const response = await api.get(ENDPOINT.GET_USER(id))
      if (!response.data) return
      return response.data
   },
}))

export default useChat
