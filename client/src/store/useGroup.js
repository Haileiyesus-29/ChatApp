import {create} from "zustand"
import api from "@/services/api"
import {ENDPOINT} from "@/endpoints"

const useGroup = create((set, getState) => ({
  loading: true,
  chatList: [],
  messages: {},
  fetchChatList: async () => {
    set(store => ({...store, loading: true}))
    const response = await api.get(ENDPOINT.GET_ALL_GROUPS())
    if (!response?.data) return
    set(store => ({...store, loading: false, chatList: response.data}))
  },
  fetchGroupThread: async id => {
    const response = await api.get(ENDPOINT.GET_GROUP_MESSAGES(id))
    if (!response.data) return
    set(store => ({
      ...store,
      messages: {...store.messages, [id]: response.data},
    }))
  },
  sendMessage: async payload => {
    const response = await api.post(ENDPOINT.SEND_GROUP_MESSAGE(), payload)
    if (!response.data || response.error) return
  },
  newMessage: async msg => {
    const currState = getState()
    const chatList = currState.chatList
      .map(g => {
        if (g.id === msg.receiver) {
          return {...g, lastMessage: msg}
        }
        return g
      })
      .sort((a, b) => {
        const aDate = new Date(a.lastMessage.createdAt)
        const bDate = new Date(b.lastMessage.createdAt)
        return bDate - aDate
      })

    let groupMessages = []
    if (currState.messages[msg.receiver]) {
      groupMessages = [...currState.messages[msg.receiver]]
      groupMessages.push(msg)
    } else {
      groupMessages = (await api.get(ENDPOINT.GET_GROUP_MESSAGES(msg.receiver))).data || []
    }

    set(store => ({
      ...store,
      chatList,
      messages: {
        ...store.messages,
        [msg.receiver]: groupMessages,
      },
    }))
  },
  createGroup: async (payload, cb) => {
    try {
      const response = await api.post(ENDPOINT.CREATE_GROUP(), payload)
      cb?.(response?.data)
      set(store => ({
        ...store,
        chatList: [{...response.data, type: "group"}, ...store.chatList],
      }))
    } catch (error) {
      return cb?.(error?.response?.data)
    }
  },
  getGroupInfo: async id => {
    const response = await api.get(ENDPOINT.GET_GROUP(id))
    if (!response.data) return
    return response.data
  },
  updateGroup: async (id, payload, cb) => {
    const response = await api.put(ENDPOINT.UPDATE_GROUP(id), payload)
    cb?.(response)
    if (!response.data || response.error) return
    set(store => ({
      ...store,
      chatList: store.chatList.map(group => {
        if (group.id === id) {
          return {...group, ...payload}
        }
        return group
      }),
    }))
  },
  deleteGroup: async (id, cb) => {
    const response = await api.delete(ENDPOINT.DELETE_GROUP(id))
    cb?.(response)
    if (!response.data || response.error) return
    set(store => ({
      ...store,
      chatList: store.chatList.filter(group => group.id !== id),
    }))
  },
  joinGroup: async (payload, cb) => {
    const response = await api.post(ENDPOINT.JOIN_GROUP(), payload)
    cb?.(response)
    if (!response.data || response.error) return
    set(store => ({
      ...store,
      chatList: [response.data, ...store.chatList],
    }))
  },
}))

export default useGroup
