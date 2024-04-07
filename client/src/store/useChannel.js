import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import { create } from 'zustand'

const useChannel = create(set => ({
   loading: true,
   chatList: [],
   messages: {},
   fetchChatList: async () => {
      set({ loading: true })
      const response = await api.get(ENDPOINT.GET_ALL_CHANNELS())
      if (!response?.data) return
      set(store => ({ ...store, loading: false, chatList: response.data }))
   },
   fetchChannelThread: async id => {
      const response = await api.get(ENDPOINT.GET_CHANNEL_MESSAGES(id))
      if (!response.data) return
      set(store => ({
         ...store,
         messages: { ...store.messages, [id]: response.data },
      }))
   },
   sendMessage: async payload => {
      const response = await api.post(ENDPOINT.SEND_CHANNEL_MESSAGE(), payload)
      if (!response.data || response.error) return
      set(store => ({
         ...store,
         chatList: store.chatList
            .map(channel => {
               if (channel.id === payload.recipientId) {
                  return { ...channel, lastMessage: response.data }
               }
               return channel
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
      set({
         chatList: chatList.map(channel => {
            if (channel.id === msg.channelId) {
               return { ...channel, lastMessage: msg }
            }
            return channel
         }),
         messages: {
            ...messages,
            [msg.channelId]: [...(messages[msg.channelId] ?? []), msg],
         },
      })
   },
   createChannel: async (payload, cb) => {
      const response = await api.post(ENDPOINT.CREATE_CHANNEL(), payload)
      cb?.(response)
      if (!response.data || response.error) return
      set(store => ({
         ...store,
         chatList: [response.data, ...store.chatList],
      }))
   },
}))

export default useChannel
