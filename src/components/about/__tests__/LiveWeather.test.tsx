import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LiveWeather from '../LiveWeather';

// Moca o fetch global
global.fetch = vi.fn();

describe('LiveWeather Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir o spinner de loading inicialmente', () => {
    // Retorna uma Promise que não resolve para manter o estado de loading
    (global.fetch as any).mockImplementationOnce(() => new Promise(() => {}));
    
    render(<LiveWeather />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('deve renderizar a temperatura corretamente após a requisição bem sucedida', async () => {
    const mockData = {
      current: {
        temperature_2m: 25.5,
        weather_code: 1, // Sunny
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<LiveWeather />);

    // Aguarda o spinner sumir e a temperatura aparecer
    await waitFor(() => {
      expect(screen.getByText('25.5°C')).toBeInTheDocument();
      expect(screen.getByText('Ensolarado/Parcialmente nublado')).toBeInTheDocument();
      expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    });
  });

  it('deve exibir mensagem de erro se a requisição falhar', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<LiveWeather />);

    await waitFor(() => {
      expect(screen.getByText('Não foi possível carregar o clima.')).toBeInTheDocument();
    });
  });
});
