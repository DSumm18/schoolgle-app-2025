'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherService, WeatherData } from '@/lib/services/weather-service';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const weatherService = WeatherService.getInstance();
        const data = await weatherService.getWeatherData();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to load weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            Unable to load weather data
          </div>
        </CardContent>
      </Card>
    );
  }

  const weatherService = WeatherService.getInstance();
  const isDay = new Date().getHours() > 6 && new Date().getHours() < 20;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Weather - {weather.location.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{weather.current.temperature}°C</h3>
              <p className="text-sm text-muted-foreground">
                {weatherService.getWeatherDescription(weather.current.weatherCode)}
              </p>
            </div>
            <div className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={weatherService.getWeatherIcon(weather.current.weatherCode, isDay)}
              >
                {/* Icon paths will be added based on the weather type */}
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Wind:</span>{' '}
              {weather.current.windSpeed}km/h
            </div>
            <div>
              <span className="text-muted-foreground">Direction:</span>{' '}
              {weather.current.windDirection}°
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">7-Day Forecast</h4>
            <div className="flex justify-between">
              {weather.daily.time.slice(0, 4).map((date, index) => (
                <div key={date} className="text-center">
                  <div className="text-xs text-muted-foreground">
                    {new Date(date).toLocaleDateString('en-GB', { weekday: 'short' })}
                  </div>
                  <div className="text-sm font-medium">
                    {weather.daily.temperature_2m_max[index]}°
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {weather.daily.temperature_2m_min[index]}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}