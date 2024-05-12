import {Server, Socket} from "socket.io"
import {JwtPayload} from "jsonwebtoken"
import jwt from "jsonwebtoken"
import db from "../../config/db"

type UserConnection = {
  activeSessions: Socket[]
}

class SocketManager {
  private static INSTANCE: SocketManager
  private io: Server
  private userSessions: Map<string, UserConnection> = new Map()

  private constructor(server) {
    this.io = new Server(server)
    console.log(`Socket server running`)

    this.io.use(this.authenticate.bind(this))

    this.io.on("connection", socket => {
      this.addListeners(socket)
      socket.on("disconnect", this.removeListeners.bind(this, socket))
    })
  }

  async authenticate(socket, next) {
    const token = socket.handshake.auth.token
    if (!token) return next(new Error("Authentication error"))

    const secretKey = process.env.JWT_SECRET_KEY
    if (!secretKey) {
      return next()
    }

    let verified: JwtPayload
    try {
      verified = jwt.verify(token, secretKey) as JwtPayload
    } catch (error) {
      return next(new Error("Authentication error"))
    }

    const user = await db.user.findFirst({
      where: {
        id: verified.id,
      },
      select: {
        id: true,
        groups: {
          select: {
            id: true,
          },
        },
        channels: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!user) return next(new Error("Authentication error"))

    socket.user = user

    next()
  }

  addListeners(socket) {
    this.userSessions.set(socket.user.id, {
      activeSessions: [...(this.userSessions.get(socket.user.id)?.activeSessions || []), socket],
    })
    const groups = socket.user.groups.map(g => g.id)
    const channels = socket.user.channels.map(c => c.id)
    socket.join(groups)
    socket.join(channels)
  }

  removeListeners(socket) {
    const userConnection = this.userSessions.get(socket.user.id)
    if (!userConnection) return

    const activeSessions = userConnection.activeSessions.filter(s => s.id !== socket.id)
    this.userSessions.set(socket.user.id, {activeSessions})

    if (activeSessions.length === 0) {
      this.userSessions.delete(socket.user.id)
    }

    const groups = socket.user.groups.map(g => g.id)
    const channels = socket.user.channels.map(c => c.id)

    groups.forEach(group => {
      socket.leave(group)
    })

    channels.forEach(channel => {
      socket.leave(channel)
    })
  }

  sendToUser(senderId: string, receiverId: string, data: any) {
    const senderConnections = this.userSessions.get(senderId)
    const receiverConnections = this.userSessions.get(receiverId)

    if (!senderConnections && !receiverConnections) return

    const senderSockets = senderConnections?.activeSessions ?? []
    const receiverSockets = receiverConnections?.activeSessions ?? []

    senderSockets.forEach(socket => {
      socket.emit("chat:message", data)
    })
    receiverSockets.forEach(socket => {
      socket.emit("chat:message", data)
    })
  }

  sendToGroup(groupId: string, data: any) {
    this.io.to(groupId).emit("group:message", data)
  }

  sendToChannel(channelId: string, data: any) {
    this.io.to(channelId).emit("channel:message", data)
  }

  public static init(server: any) {
    if (!SocketManager.INSTANCE) SocketManager.INSTANCE = new SocketManager(server)
    return SocketManager.INSTANCE
  }

  public static get instance() {
    return SocketManager.INSTANCE
  }
}

export default SocketManager
