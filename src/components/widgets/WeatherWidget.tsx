'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetOfficeWeatherService, MetOfficeWeatherData } from '@/lib/services/met-office-weather';

export function WeatherWidget() {
  const [weather, setWeather] = useState<MetOfficeWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // London coordinates (you can make this configurable)
        const weatherService = MetOfficeWeatherService.getInstance();
        const data = await weatherService.getWeatherData(51.5074, -0.1278);
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

  const getWeatherIcon = (weatherCode: number) => {
    // Map Met Office weather codes to appropriate icons
    const iconMap: { [key: number]: string } = {
      0: "moon", // Clear night
      1: "sun", // Sunny day
      2: "cloud-sun", // Partly cloudy (day)
      3: "cloud-moon", // Partly cloudy (night)
      5: "cloud-fog", // Mist
      6: "cloud-fog", // Fog
      7: "cloud", // Cloudy
      8: "cloud", // Overcast
      9: "cloud-drizzle", // Light rain shower
      10: "cloud-drizzle", // Light rain shower
      11: "cloud-drizzle", // Drizzle
      12: "cloud-rain", // Light rain
      13: "cloud-rain", // Heavy rain shower
      14: "cloud-rain", // Heavy rain shower
      15: "cloud-rain", // Heavy rain
      16: "cloud-snow", // Sleet shower
      17: "cloud-snow", // Sleet shower
      18: "cloud-snow", // Sleet
      19: "cloud-hail", // Hail shower
      20: "cloud-hail", // Hail shower
      21: "cloud-hail", // Hail
      22: "cloud-snow", // Light snow shower
      23: "cloud-snow", // Light snow shower
      24: "cloud-snow", // Light snow
      25: "cloud-snow", // Heavy snow shower
      26: "cloud-snow", // Heavy snow shower
      27: "cloud-snow", // Heavy snow
      28: "cloud-lightning", // Thunder shower
      29: "cloud-lightning", // Thunder shower
      30: "cloud-lightning", // Thunder
    };

    return iconMap[weatherCode] || "cloud-question";
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

  if (error) {
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

  if (!weather) return null;

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
              <p className="text-sm text-muted-foreground">{weather.current.weatherType}</p>
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
                className={getWeatherIcon(weather.current.weatherCode)}
              >
                {/* Icon paths will be added based on the weather type */}
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Wind:</span>{' '}
              {weather.current.windSpeed}mph {weather.current.windDirection}
            </div>
            <div>
              <span className="text-muted-foreground">Humidity:</span>{' '}
              {weather.current.humidity}%
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Forecast</h4>
            <div className="flex justify-between">
              {weather.forecast.slice(0, 4).map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground">
                    {new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short' })}
                  </div>
                  <div className="text-sm font-medium">{day.temperature}°C</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}