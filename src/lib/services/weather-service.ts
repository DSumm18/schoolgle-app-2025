/**
 * Weather service using Open-Meteo API
 * Free, no API key required
 * Documentation: https://open-meteo.com/
 */

export interface WeatherData {
  current: {
    temperature: number;
    windSpeed: number;
    windDirection: number;
    weatherCode: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
}

export class WeatherService {
  private static instance: WeatherService;
  private constructor() {}

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  /**
   * Get location coordinates from place name using Geocoding API
   */
  private async getCoordinates(placeName: string): Promise<GeocodingResult> {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(placeName)}&count=1&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();
      if (!data.results?.length) {
        throw new Error('Location not found');
      }

      return data.results[0];
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  }

  /**
   * Get weather description from WMO weather code
   * Based on https://open-meteo.com/en/docs#weathervariables
   */
  getWeatherDescription(code: number): string {
    const weatherCodes: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    return weatherCodes[code] || "Unknown";
  }

  /**
   * Get weather icon based on WMO weather code and is_day
   */
  getWeatherIcon(code: number, isDay: boolean = true): string {
    // Map weather codes to icon names
    const iconMap: { [key: number]: string } = {
      0: isDay ? "sun" : "moon",
      1: isDay ? "sun" : "moon",
      2: isDay ? "cloud-sun" : "cloud-moon",
      3: "cloud",
      45: "cloud-fog",
      48: "cloud-fog",
      51: "cloud-drizzle",
      53: "cloud-drizzle",
      55: "cloud-drizzle",
      56: "cloud-drizzle",
      57: "cloud-drizzle",
      61: "cloud-rain",
      63: "cloud-rain",
      65: "cloud-rain",
      66: "cloud-rain",
      67: "cloud-rain",
      71: "cloud-snow",
      73: "cloud-snow",
      75: "cloud-snow",
      77: "cloud-snow",
      80: "cloud-rain",
      81: "cloud-rain",
      82: "cloud-rain",
      85: "cloud-snow",
      86: "cloud-snow",
      95: "cloud-lightning",
      96: "cloud-lightning",
      99: "cloud-lightning",
    };
    return iconMap[code] || "cloud-question";
  }

  /**
   * Fetch weather data for a specific location
   */
  async getWeatherData(location: string = "London"): Promise<WeatherData> {
    try {
      // First get coordinates for the location
      const locationData = await this.getCoordinates(location);

      // Then fetch weather data using the coordinates
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${locationData.latitude}&longitude=${locationData.longitude}` +
        `&current_weather=true` +
        `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
        `&timezone=auto`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      return {
        current: {
          temperature: Math.round(data.current_weather.temperature),
          windSpeed: Math.round(data.current_weather.windspeed),
          windDirection: data.current_weather.winddirection,
          weatherCode: data.current_weather.weathercode,
          time: data.current_weather.time,
        },
        daily: {
          time: data.daily.time,
          temperature_2m_max: data.daily.temperature_2m_max.map(Math.round),
          temperature_2m_min: data.daily.temperature_2m_min.map(Math.round),
          weathercode: data.daily.weathercode,
        },
        location: {
          name: locationData.name,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        }
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData();
    }
  }

  /**
   * Returns mock weather data when API is unavailable
   */
  private getMockWeatherData(): WeatherData {
    const today = new Date();
    const next7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date.toISOString().split('T')[0];
    });

    return {
      current: {
        temperature: 18,
        windSpeed: 12,
        windDirection: 180,
        weatherCode: 1,
        time: today.toISOString(),
      },
      daily: {
        time: next7Days,
        temperature_2m_max: [20, 21, 19, 18, 22, 23, 21],
        temperature_2m_min: [12, 13, 11, 10, 14, 15, 13],
        weathercode: [1, 2, 3, 61, 1, 2, 3],
      },
      location: {
        name: "London",
        latitude: 51.5074,
        longitude: -0.1278,
      }
    };
  }
}