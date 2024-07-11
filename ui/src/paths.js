const paths = {
  home: () => "/",
  groups: () => "/group",
  channels: () => "/channels",
  chats: () => "/chat",
  chatMessage: id => `/chat/${id}`,
  channelMessage: id => `/channel/${id}`,
  groupMessage: id => `/group/${id}`,
  setting: () => "/setting",
  new: () => "/new",
  newGroup: () => "/new/group",
  newChannel: () => "/new/channel",
  about: (id, type) => `/${type}/about/${id}`,
}

export default paths
