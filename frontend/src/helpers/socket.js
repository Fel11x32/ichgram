import { io } from 'socket.io-client';

let socket = null;

export function connectSocket(userId) {
	if (socket?.connected) return socket;
	socket = io('http://localhost:8000', {
		query: { userId },
		withCredentials: true,
		transports: ['websocket'],
	});
	return socket;
}

export function getSocket() {
	return socket;
}

export function disconnectSocket() {
	try {
		socket?.disconnect();
	} finally {
		socket = null;
	}
}
