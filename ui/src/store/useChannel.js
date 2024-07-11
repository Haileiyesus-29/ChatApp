import {ENDPOINT} from "@/endpoints"
import api from "@/services/api"
import {create} from "zustand"

const useChannel = create((set, getStore) => ({
  loading: true,
  chatList: [],
  messages: {},
  fetchChatList: async () => {
    set({loading: true})
    const response = await api.get(ENDPOINT.GET_ALL_CHANNELS())
    if (!response?.data) return
    set(store => ({...store, loading: false, chatList: response.data}))
  },
  fetchChannelThread: async id => {
    const response = await api.get(ENDPOINT.GET_CHANNEL_MESSAGES(id))
    if (!response.data) return
    set(store => ({
      ...store,
      messages: {...store.messages, [id]: response.data},
    }))
  },
  sendMessage: async payload => {
    const response = await api.post(ENDPOINT.SEND_CHANNEL_MESSAGE(), payload)
    if (!response.data || response.error) return
  },
  newMessage: async msg => {
    const currState = getStore()
    const chatList = currState.chatList
      .map(ch => (ch.id === msg.sender ? {...ch, lastMessage: msg} : ch))
      .sort((a, b) => {
        const aDate = new Date(a.lastMessage.createdAt)
        const bDate = new Date(b.lastMessage.createdAt)
        return bDate - aDate
      })

    let channelMessages
    if (currState.messages[msg.sender]) {
      channelMessages = [...currState.messages[msg.sender]]
      channelMessages.push(msg)
    } else {
      channelMessages = (await api.get(ENDPOINT.GET_CHANNEL_MESSAGES(msg.sender))).data ?? []
    }

    set(store => ({
      ...store,
      chatList,
      messages: {
        ...store.messages,
        [msg.sender]: channelMessages,
      },
    }))
  },
  createChannel: async (payload, cb) => {
    try {
      const response = await api.post(ENDPOINT.CREATE_CHANNEL(), payload)
      cb?.(response.data)
      if (!response.data || response.error) return
      set(store => ({
        ...store,
        chatList: [{...response.data, type: "channel"}, ...store.chatList],
      }))
    } catch (error) {
      return cb?.(error.response.data)
    }
  },
  getChannelInfo: async id => {
    const response = await api.get(ENDPOINT.GET_CHANNEL(id))
    if (!response.data) return
    return response.data
  },
  updateChannel: async (id, payload, cb) => {
    const response = await api.put(ENDPOINT.UPDATE_CHANNEL(id), payload)
    cb?.(response)
    if (!response.data || response.error) return
    set(store => ({
      ...store,
      chatList: store.chatList.map(channel =>
        channel.id === id
          ? {
              ...channel,
              name: payload.name,
              image: payload.image,
              username: payload.username,
            }
          : channel
      ),
    }))
  },
  deleteChannel: async (id, cb) => {
    const response = await api.delete(ENDPOINT.DELETE_CHANNEL(id))
    cb?.(response)
    if (!response.data || response.error) return
    set(store => ({
      ...store,
      chatList: store.chatList.filter(channel => channel.id !== id),
    }))
  },
  joinChannel: async (payload, cb) => {
    const response = await api.post(ENDPOINT.JOIN_CHANNEL(), payload)
    cb?.()
    if (!response.data || response.error) return
    set(store => ({
      ...store,
      chatList: [response.data, ...store.chatList],
    }))
  },
}))

export default useChannel
