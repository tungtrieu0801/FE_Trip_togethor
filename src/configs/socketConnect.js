import { io } from 'socket.io-client';

const baseUrlSocket = import.meta.env.VITE_BASE_URL_SOCKET || 'http://localhost:3000/chat';

const socket = io(baseUrlSocket, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  auth: {
    token: localStorage.getItem('token') || ''
  }
});

export default socket;