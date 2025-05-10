// src/services/websocketService.ts
let socket: WebSocket | null = null;
let listeners: ((data: any) => void)[] = [];

export function connectWebSocket(url: string) {
  if (socket && socket.readyState === WebSocket.OPEN) return socket;

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('✅ WebSocket connected');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      listeners.forEach((listener) => listener(data));
    } catch (e) {
      console.error('❌ Error parsing WebSocket message:', event.data);
    }
  };

  socket.onclose = () => {
    console.log('🔌 WebSocket disconnected');
  };

  socket.onerror = (err) => {
    console.error('❌ WebSocket error', err);
  };

  return socket;
}

export function sendMessage(message: object) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.warn('⚠️ WebSocket not connected');
  }
}

export function addMessageListener(callback: (data: any) => void) {
  listeners.push(callback);
}

export function removeMessageListener(callback: (data: any) => void) {
  listeners = listeners.filter((l) => l !== callback);
}

export function closeWebSocket() {
  socket?.close();
  socket = null;
  listeners = [];
}
