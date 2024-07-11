import {ENDPOINT} from "@/endpoints"
import api from "./api"

const queryConfig = {
  fetchMessages: (type, id) => {
    return {
      queryKey: ["message", type, id],
      queryFn: async () => {
        const response = await api.get(getEndpoint(type, id))
        return response.data
      },
      enabled: !!id,
    }
  },
  fetchChatInfo: (type, id) => {
    return {
      queryKey: ["chatInfo", type, id],
      queryFn: async () => {
        const res = await api.get(getInfoEndpoint(type, id))
        return res.data
      },
      enabled: !!id,
    }
  },
  getChatChatlist: () => ({
    queryKey: ["chat", "chatlist"],
    queryFn: async () => {
      const response = await api.get(ENDPOINT.GET_ALL_CHATS())
      return response.data
    },
  }),
  getGroupChatlist: () => ({
    queryKey: ["group", "chatlist"],
    queryFn: async () => {
      const response = await api.get(ENDPOINT.GET_ALL_GROUPS())
      return response.data
    },
  }),
  getChannelChatlist: () => ({
    queryKey: ["channel", "chatlist"],
    queryFn: async () => {
      const response = await api.get(ENDPOINT.GET_ALL_CHANNELS())
      return response.data
    },
  }),

  getChatInfo: (type, id) => ({
    queryKey: ["chatInfo", type, id],
    queryFn: async () => {
      const response = await api.get(getInfoEndpoint(type, id))
      return response.data
    },
  }),
}

export default queryConfig

const getEndpoint = (type, id) => {
  switch (type) {
    case "chat":
      return ENDPOINT.GET_CHAT_THREAD(id)
    case "group":
      return ENDPOINT.GET_GROUP_MESSAGES(id)
    case "channel":
      return ENDPOINT.GET_CHANNEL_MESSAGES(id)
    default:
      return ENDPOINT.GET_CHAT_THREAD(id)
  }
}

const getInfoEndpoint = (type, id) => {
  switch (type) {
    case "chat":
      return ENDPOINT.GET_USER(id)
    case "group":
      return ENDPOINT.GET_GROUP(id)
    case "channel":
      return ENDPOINT.GET_CHANNEL(id)
    default:
      return ENDPOINT.GET_USER(id)
  }
}
