'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';

export default function LiveVisitors() {
  const [visitors, setVisitors] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Usando um echo server público para simular WebSockets em tempo real
    const ws = new WebSocket('wss://ws.postman-echo.com/raw');
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      
      // Simula uma nova contagem de visitantes sendo enviada/recebida via WebSocket
      // Como é um echo server, ele vai devolver exatamente o que enviarmos.
      const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          const randomVisitors = Math.floor(Math.random() * 50) + 10;
          ws.send(JSON.stringify({ visitors: randomVisitors }));
        }
      }, 3000);

      // Limpa o intervalo quando fechar
      ws.addEventListener('close', () => clearInterval(interval));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.visitors) {
          setVisitors(data.visitors);
        }
      } catch (e) {
        // Ignora erros de parse
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="bg-[#2E8B57] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center w-full h-full min-h-50 text-white" data-testid="live-visitors">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold">Visitantes Agora</h3>
        {isConnected ? (
          <Wifi className="w-4 h-4 text-green-300" data-testid="wifi-connected" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-300" data-testid="wifi-disconnected" />
        )}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Users className="w-8 h-8 opacity-80" />
        <span className="text-4xl font-bold transition-all duration-500" data-testid="visitors-count">
          {visitors === 0 && isConnected ? '...' : visitors}
        </span>
        <span className="text-sm opacity-80">
          pessoas navegando no site
        </span>
      </div>
      <div className="mt-4 text-xs opacity-60 flex items-center gap-1">
        <span className="relative flex h-2 w-2">
          {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? 'bg-white' : 'bg-red-400'}`}></span>
        </span>
        {isConnected ? 'Conectado em tempo real' : 'Conectando...'}
      </div>
    </div>
  );
}
