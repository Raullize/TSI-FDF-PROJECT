'use client';

import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, Loader2 } from 'lucide-react';

interface WeatherData {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

export default function LiveWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Charqueadas, RS coordinates
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-29.9547&longitude=-51.6258&current=temperature_2m,weather_code&timezone=America%2FSao_Paulo'
        );
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    // Refresh every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code <= 3) return <Sun className="w-8 h-8 text-yellow-500" data-testid="sun-icon" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-500" data-testid="rain-icon" />;
    return <Cloud className="w-8 h-8 text-gray-500" data-testid="cloud-icon" />;
  };

  const getWeatherDescription = (code: number) => {
    if (code <= 3) return 'Ensolarado/Parcialmente nublado';
    if (code >= 51 && code <= 67) return 'Chuvoso';
    return 'Nublado';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex flex-col items-center justify-center text-center w-full h-full min-h-50" data-testid="live-weather">
      <h3 className="text-lg font-serif font-bold text-amber-950 mb-4">Clima ao Vivo (Charqueadas, RS)</h3>
      
      {loading ? (
        <div className="flex items-center justify-center text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin" data-testid="loading-spinner" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm">Não foi possível carregar o clima.</p>
      ) : weather ? (
        <div className="flex flex-col items-center gap-2">
          {getWeatherIcon(weather.current.weather_code)}
          <span className="text-3xl font-bold text-amber-950">
            {weather.current.temperature_2m}°C
          </span>
          <span className="text-sm text-gray-500">
            {getWeatherDescription(weather.current.weather_code)}
          </span>
        </div>
      ) : null}
    </div>
  );
}
