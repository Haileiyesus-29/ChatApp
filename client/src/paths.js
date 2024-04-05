const paths = {
   home: () => '/',
   groups: () => '/group',
   channels: () => '/channels',
   chats: () => '/chat',
   chatMessage: id => `/chat/${id}`,
   channelMessage: id => `/channel/${id}`,
   groupMessage: id => `/grop/${id}`,
   setting: () => '/setting',
   new: () => '/new',
   newGroup: () => '/new/group',
   newChannel: () => '/new/channel',
}

export default paths