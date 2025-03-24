'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
  };
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Leeds coordinates
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=53.8008&longitude=-1.5491&current_weather=true'
        );
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every hour
    const interval = setInterval(fetchWeather, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherDescription = (code: number): string => {
    const weatherCodes: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      51: "Light drizzle",
      53: "Moderate drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Snow",
      77: "Snow grains",
      80: "Light showers",
      81: "Moderate showers",
      82: "Heavy showers",
      95: "Thunderstorm"
    };
    return weatherCodes[code] || "Unknown";
  };

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

  if (!weather) return null;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Weather - Leeds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {Math.round(weather.current_weather.temperature)}°C
              </h3>
              <p className="text-sm text-muted-foreground">
                {getWeatherDescription(weather.current_weather.weathercode)}
              </p>
              <p className="text-sm text-muted-foreground">
                Wind: {Math.round(weather.current_weather.windspeed)} km/h
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
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}