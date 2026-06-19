import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LiveVisitors from './LiveVisitors';

// Moca a classe WebSocket global
class MockWebSocket {
  onopen: (() => void) | null = null;
  onmessage: ((event: any) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  readyState = 1; // OPEN

  send = vi.fn();
  close = vi.fn();
  addEventListener = vi.fn();
}

describe('LiveVisitors Component', () => {
  let originalWebSocket: any;
  let currentWsInstance: MockWebSocket | null = null;

  beforeEach(() => {
    originalWebSocket = global.WebSocket;
    currentWsInstance = null;
    (global as any).WebSocket = class MockedWebSocket extends MockWebSocket {
      constructor() {
        super();
        currentWsInstance = this;
      }
    };
    vi.useFakeTimers();
  });

  afterEach(() => {
    (global as any).WebSocket = originalWebSocket;
    vi.useRealTimers();
  });

  it('deve exibir o status inicial como conectando', () => {
    // Altera readyState para simular connecting
    (global as any).WebSocket = class MockedWebSocketConnecting extends MockWebSocket {
      constructor() {
        super();
        this.readyState = 0; // CONNECTING
      }
    };

    render(<LiveVisitors />);
    
    expect(screen.getByText('Conectando...')).toBeInTheDocument();
    expect(screen.getByTestId('wifi-disconnected')).toBeInTheDocument();
  });

  it('deve atualizar o status para conectado quando o WebSocket abrir', () => {
    render(<LiveVisitors />);
    
    act(() => {
      if (currentWsInstance?.onopen) currentWsInstance.onopen();
    });

    expect(screen.getByText('Conectado em tempo real')).toBeInTheDocument();
    expect(screen.getByTestId('wifi-connected')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument(); // Estado inicial de visitantes
  });

  it('deve atualizar o número de visitantes quando receber mensagem do servidor', () => {
    render(<LiveVisitors />);
    
    act(() => {
      if (currentWsInstance?.onopen) currentWsInstance.onopen();
      if (currentWsInstance?.onmessage) {
        currentWsInstance.onmessage({
          data: JSON.stringify({ visitors: 42 })
        });
      }
    });

    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
