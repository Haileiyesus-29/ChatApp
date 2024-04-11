import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import { create } from 'zustand'

const useChat = create(set => ({
   loading: true,
   chatList: [],
   messages: {},
   fetchChatList: async () => {
      set(store => ({ ...store, loading: true }))
      const response = await api.get(ENDPOINT.GET_CONTACTS())
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
      set(store => ({
         ...store,
         chatList: store.chatList
            .map(chat => {
               if (chat.id === payload.recipientId) {
                  return { ...chat, lastMessage: response.data }
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
            [payload.recipientId]: [
               ...(store.messages[payload.recipientId] ?? []),
               response.data,
            ],
         },
      }))
   },
   newMessage: async (msg, user) => {
      set(store => ({
         ...store,
         chatList: store.chatList.map(chat => {
            if (chat.id === msg.chatId) {
               return { ...chat, lastMessage: msg }
            }
            return chat
         }),
         messages: {
            ...store.messages,
            [msg.chatId]: [...(store.messages[msg.chatId] ?? []), msg],
         },
      }))
   },
   getChatInfo: async id => {
      const response = await api.get(ENDPOINT.GET_USER(id))
      if (!response.data) return
      return response.data
   },
}))

export default useChat
