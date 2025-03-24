/**
 * Met Office DataPoint API service
 * Requires API key from https://www.metoffice.gov.uk/services/data/datapoint/api
 */

export interface MetOfficeWeatherData {
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  current: {
    temperature: number;
    feelsLike: number;
    windSpeed: number;
    windDirection: string;
    humidity: number;
    visibility: string;
    weatherType: string;
    weatherCode: number;
  };
  forecast: Array<{
    date: string;
    dayPeriod: 'Day' | 'Night';
    temperature: number;
    weatherType: string;
    weatherCode: number;
    windSpeed: number;
    precipitation: number;
  }>;
}

const API_KEY = process.env.NEXT_PUBLIC_MET_OFFICE_API_KEY;
const BASE_URL = 'http://datapoint.metoffice.gov.uk/public/data';

export class MetOfficeWeatherService {
  private static instance: MetOfficeWeatherService;
  private constructor() {}

  static getInstance(): MetOfficeWeatherService {
    if (!MetOfficeWeatherService.instance) {
      MetOfficeWeatherService.instance = new MetOfficeWeatherService();
    }
    return MetOfficeWeatherService.instance;
  }

  async getLocationId(latitude: number, longitude: number): Promise<string> {
    try {
      const response = await fetch(
        `${BASE_URL}/val/wxfcs/all/json/sitelist?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();
      
      // Find nearest location to provided coordinates
      let nearestLocation = data.Locations.Location[0];
      let shortestDistance = Number.MAX_VALUE;

      data.Locations.Location.forEach((location: any) => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          parseFloat(location.latitude),
          parseFloat(location.longitude)
        );

        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestLocation = location;
        }
      });

      return nearestLocation.id;
    } catch (error) {
      console.error('Error fetching location ID:', error);
      throw error;
    }
  }

  async getWeatherData(latitude: number, longitude: number): Promise<MetOfficeWeatherData> {
    try {
      if (!API_KEY) {
        console.warn('Met Office API key is not set. Using mock data.');
        return this.getMockWeatherData();
      }

      const locationId = await this.getLocationId(latitude, longitude);
      const response = await fetch(
        `${BASE_URL}/val/wxfcs/all/json/${locationId}?res=3hourly&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      return this.transformWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData();
    }
  }

  private transformWeatherData(data: any): MetOfficeWeatherData {
    const location = data.SiteRep.DV.Location;
    const periods = location.Period;
    const current = periods[0].Rep[0];

    return {
      location: {
        name: location.name,
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon)
      },
      current: {
        temperature: parseInt(current.T),
        feelsLike: parseInt(current.F),
        windSpeed: parseInt(current.S),
        windDirection: current.D,
        humidity: parseInt(current.H),
        visibility: current.V,
        weatherType: this.getWeatherType(parseInt(current.W)),
        weatherCode: parseInt(current.W)
      },
      forecast: periods.flatMap((period: any) => 
        period.Rep.map((rep: any) => ({
          date: period.value,
          dayPeriod: parseInt(rep.$) <= 12 ? 'Day' : 'Night',
          temperature: parseInt(rep.T),
          weatherType: this.getWeatherType(parseInt(rep.W)),
          weatherCode: parseInt(rep.W),
          windSpeed: parseInt(rep.S),
          precipitation: parseInt(rep.Pp)
        }))
      )
    };
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  private getWeatherType(code: number): string {
    const weatherTypes: { [key: number]: string } = {
      0: "Clear night",
      1: "Sunny day",
      2: "Partly cloudy",
      3: "Partly cloudy",
      4: "Not used",
      5: "Mist",
      6: "Fog",
      7: "Cloudy",
      8: "Overcast",
      9: "Light rain shower",
      10: "Light rain shower",
      11: "Drizzle",
      12: "Light rain",
      13: "Heavy rain shower",
      14: "Heavy rain shower",
      15: "Heavy rain",
      16: "Sleet shower",
      17: "Sleet shower",
      18: "Sleet",
      19: "Hail shower",
      20: "Hail shower",
      21: "Hail",
      22: "Light snow shower",
      23: "Light snow shower",
      24: "Light snow",
      25: "Heavy snow shower",
      26: "Heavy snow shower",
      27: "Heavy snow",
      28: "Thunder shower",
      29: "Thunder shower",
      30: "Thunder"
    };
    return weatherTypes[code] || "Unknown";
  }

  private getMockWeatherData(): MetOfficeWeatherData {
    return {
      location: {
        name: "London",
        latitude: 51.5074,
        longitude: -0.1278
      },
      current: {
        temperature: 18,
        feelsLike: 17,
        windSpeed: 8,
        windDirection: "SW",
        humidity: 76,
        visibility: "Good",
        weatherType: "Partly cloudy",
        weatherCode: 2
      },
      forecast: [
        {
          date: "2025-03-24",
          dayPeriod: "Day",
          temperature: 18,
          weatherType: "Partly cloudy",
          weatherCode: 2,
          windSpeed: 8,
          precipitation: 10
        },
        // Add more mock forecast data as needed
      ]
    };
  }
}