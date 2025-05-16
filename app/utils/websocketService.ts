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
  console.log('sending Message:', message);
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.warn('⚠️ WebSocket not connected');
  }
}

export function addMessageListener(callback: (data: any) => void) {
  listeners.push(callback);

  if (socket) {
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        listeners.forEach((listener) => listener(data));
        console.log('listener data:', data);
      } catch (e) {
        console.error('❌ Error parsing WebSocket message:', event.data);
      }
    };
  } else {
    console.warn('⚠️ WebSocket not connected when trying to add listener');
  }
}
export function removeMessageListener(callback: (data: any) => void) {
  const index = listeners.indexOf(callback);
  if (index > -1) {
    listeners.splice(index, 1);
  }
}
export function closeWebSocket() {
  socket?.close();
  socket = null;
  listeners = [];
}
