import { io, type Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../types/socket-events';

const serverUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  serverUrl,
  {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1_000,
  },
);