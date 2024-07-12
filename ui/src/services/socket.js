import {io} from "socket.io-client"

class SocketClient {
  #socket = null

  constructor() {
    this.#socket = io({
      withCredentials: true,
      reconnectionDelay: 3000,
      autoConnect: false,
      retries: 5,
      auth: {
        token: sessionStorage.getItem("tokens"),
      },
    })

    this.#socket?.on("connect", () => {
      console.log("Connected to server")
    })

    this.#socket?.on("disconnect", () => {
      console.log("Disconnected from server")
    })
  }
  get instance() {
    return this.#socket
  }
}

const socketClient = new SocketClient()

export default socketClient.instance
