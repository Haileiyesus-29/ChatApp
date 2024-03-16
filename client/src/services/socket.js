import { io } from 'socket.io-client'
const ENDPOINT = import.meta.env.VITE_SERVER_ADDR

export const socket = io(ENDPOINT)
