"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherData {
  date: Date;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
  temperature: {
    min: number;
    max: number;
    current: number;
  };
  wind: {
    speed: number;
    direction: string;
  };
  humidity: number;
}

const mockWeatherData: WeatherData[] = [
  {
    date: new Date(),
    condition: 'sunny',
    temperature: { min: 18, max: 26, current: 24 },
    wind: { speed: 10, direction: 'NE' },
    humidity: 45
  },
  {
    date: new Date(Date.now() + 86400000),
    condition: 'cloudy',
    temperature: { min: 17, max: 25, current: 22 },
    wind: { speed: 15, direction: 'E' },
    humidity: 50
  },
  {
    date: new Date(Date.now() + 86400000 * 2),
    condition: 'rainy',
    temperature: { min: 16, max: 23, current: 20 },
    wind: { speed: 20, direction: 'SE' },
    humidity: 65
  }
];

const WeatherIcon = ({ condition }: { condition: WeatherData['condition'] }) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-8 w-8 text-gray-500" />;
    case 'rainy':
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    case 'windy':
      return <Wind className="h-8 w-8 text-blue-300" />;
    default:
      return <Sun className="h-8 w-8 text-yellow-500" />;
  }
};

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>(mockWeatherData);
  const [selectedDay, setSelectedDay] = useState(0);
  const [location] = useState('London, UK');

  // In a real application, you would fetch real weather data here
  useEffect(() => {
    // Simulating API call
    const fetchWeatherData = async () => {
      // In production, replace with actual API call
      setWeatherData(mockWeatherData);
    };

    fetchWeatherData();
  }, []);

  const formatDate = (date: Date) => {
    return format(date, 'EEE, MMM d');
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Weather Forecast</CardTitle>
          <span className="text-sm font-medium">{location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex space-x-4 mb-4">
          {weatherData.map((day, index) => (
            <Button
              key={index}
              variant={selectedDay === index ? "default" : "outline"}
              onClick={() => setSelectedDay(index)}
              className="flex-1"
            >
              <div className="text-xs">
                <div>{index === 0 ? 'Today' : formatDate(day.date)}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <WeatherIcon condition={weatherData[selectedDay].condition} />
            <div>
              <div className="text-2xl font-bold">
                {weatherData[selectedDay].temperature.current}°C
              </div>
              <div className="text-sm text-muted-foreground">
                {weatherData[selectedDay].condition.charAt(0).toUpperCase() + 
                 weatherData[selectedDay].condition.slice(1)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Wind</div>
              <Badge variant="secondary">
                {weatherData[selectedDay].wind.speed} km/h
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Humidity</div>
              <Badge variant="secondary">
                {weatherData[selectedDay].humidity}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}