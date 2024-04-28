export const ENDPOINT = {
   // User endpoints
   GET_USER: id => `/api/user/${id}`,
   UPDATE_USER: () => `/api/user`,
   DELETE_USER: () => `/api/user`,
   UPDATE_PROFILE_PICTURE: () => `/api/user/signedurl`,

   // auth endpoints
   LOGIN: () => '/api/auth/login',
   REGISTER: () => '/api/auth/register',
   VERIFY: () => '/api/auth/verify',
   LOGOUT: () => '/api/auth/logout',

   // Chat endpoints
   GET_ALL_CHATS: () => '/api/chat',
   GET_CHAT_THREAD: id => `/api/chat/${id}`,
   SEND_CHAT_MESSAGE: () => '/api/chat',
   GET_CONTACTS: () => '/api/chat/contacts',
   ADD_CONTACT: () => '/api/chat/contacts',

   // channel endpoints
   GET_ALL_CHANNELS: () => `/api/channel`,
   CREATE_CHANNEL: () => `/api/channel`,
   GET_CHANNEL: id => `/api/channel/${id}`,
   UPDATE_CHANNEL: id => `/api/channel/${id}`,
   DELETE_CHANNEL: id => `/api/channel/${id}`,
   GET_CHANNEL_MEMBERS: id => `/api/channel/${id}/members`,
   GET_CHANNEL_MESSAGES: id => `/api/channel/${id}/messages`,
   SEND_CHANNEL_MESSAGE: () => `/api/channel/messages`,
   JOIN_CHANNEL: () => `/api/channel/join`,
   LEAVE_CHANNEL: () => `/api/channel/leave`,

   // group endpoints
   GET_ALL_GROUPS: () => `/api/group`,
   CREATE_GROUP: () => `/api/group`,
   GET_GROUP: id => `/api/group/${id}`,
   UPDATE_GROUP: id => `/api/group/${id}`,
   DELETE_GROUP: id => `/api/group/${id}`,
   GET_GROUP_MEMBERS: id => `/api/group/${id}/members`,
   GET_GROUP_MESSAGES: id => `/api/group/${id}/messages`,
   SEND_GROUP_MESSAGE: () => `/api/group/messages`,
   JOIN_GROUP: () => `/api/group/join`,
   LEAVE_GROUP: () => `/api/group/leave`,

   // search endpoints
   SEARCH: query => `/api/search?q=${query}`,
   SEARCH_USERS: query => `/api/search/users?q=${query}`,
   SEARCH_CHANNELS: query => `/api/search/channels?q=${query}`,
   SEARCH_GROUPS: query => `/api/search/groups?q=${query}`,
}
