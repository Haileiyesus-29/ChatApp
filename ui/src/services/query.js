import {ENDPOINT} from "@/endpoints"
import api from "./api"

const queryConfig = {
  fetchMessages: (type, id) => {
    return {
      queryKey: ["message", type, id],
      queryFn: async () => {
        const response = await api.get(getMessagesEndpoint(type, id))
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
  getChatList: type => {
    return {
      queryKey: ["chatList", type],
      queryFn: async () => {
        const response = await api.get(getChatlistEndpoint(type))
        return response.data
      },
    }
  },
  getChatInfo: (type, id) => ({
    queryKey: ["chatInfo", type, id],
    queryFn: async () => {
      const response = await api.get(getInfoEndpoint(type, id))
      return response.data
    },
  }),
}

export default queryConfig

const getChatlistEndpoint = type => {
  switch (type) {
    case "chat":
      return ENDPOINT.GET_ALL_CHATS()
    case "group":
      return ENDPOINT.GET_ALL_GROUPS()
    case "channel":
      return ENDPOINT.GET_ALL_CHANNELS()
    default:
      return ENDPOINT.GET_ALL_CHATS()
  }
}

const getMessagesEndpoint = (type, id) => {
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
