'use client';

import { useState, useEffect, useRef } from 'react';
import BottomNav from '@/components/bottomnav';

export default function WebSocketTestPage() {
  const [url, setUrl] = useState<string>(
    'wss://1750ostac1.execute-api.af-south-1.amazonaws.com/production/'
  );
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  const log = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const connect = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      log('✅ Connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      log(`📥 Received: ${event.data}`);
    };

    socket.onerror = (error) => {
      log(`❌ Error: ${JSON.stringify(error)}`);
    };

    socket.onclose = () => {
      log('🔌 Disconnected');
      setIsConnected(false);
    };
  };

  const sendMessage = () => {
    if (socketRef.current && isConnected) {
      try {
        const parsed = JSON.parse(message); // Ensure it's valid JSON
        if (!parsed.action) {
          log('⚠️ JSON must contain an "action" field');
          return;
        }
        const msgToSend = JSON.stringify(parsed);
        socketRef.current.send(msgToSend);
        log(`📤 Sent: ${msgToSend}`);
        setMessage('');
      } catch (err) {
        log('❌ Invalid JSON format');
      }
    } else {
      log('⚠️ Not connected');
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <section className="flex min-h-screen flex-col justify-between bg-gray-100 p-4">
      <div>
        <h2 className="mb-4 text-xl font-bold">WebSocket Tester</h2>

        <div className="mb-2">
          <label htmlFor="ws-url" className="text-sm font-semibold">
            WebSocket URL
          </label>
          <input
            id="ws-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={connect}
            className="rounded bg-green-500 px-3 py-1 text-white"
            disabled={isConnected}
          >
            Connect
          </button>
          <button
            onClick={disconnect}
            className="rounded bg-red-500 px-3 py-1 text-white"
            disabled={!isConnected}
          >
            Disconnect
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="text-sm font-semibold">
            Message (JSON with action)
          </label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="mt-1 w-full rounded border px-2 py-1"
            placeholder='{"action":"getLeaderboard"}'
          />
          <button
            onClick={sendMessage}
            className="mt-2 rounded bg-blue-500 px-3 py-1 text-white"
            disabled={!isConnected}
          >
            Send
          </button>
        </div>

        <div className="h-64 overflow-auto rounded border bg-white p-2">
          <h4 className="mb-2 font-semibold">Logs</h4>
          <pre className="whitespace-pre-wrap text-sm">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </pre>
        </div>
      </div>

      <BottomNav />
    </section>
  );
}
