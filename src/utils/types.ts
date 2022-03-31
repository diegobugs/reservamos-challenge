/*
  DEFINE ALL GLOBAL TYPES FOR THE APPLICATION
*/

export type PlaceType = {
  id: number;
  slug: string;
  city_slug: string;
  display: string;
  ascii_display: string;
  city_name: string;
  city_ascii_name: string;
  state: string;
  country: string;
  lat: string;
  long: string;
  result_type: string;
  popularity: string;
  sort_criteria: number;
};

export type PlacesResponse = Array<PlaceType>;

export type WeatherType = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

export type DailyWeatherType = WeatherType & {
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
};

export type WeatherResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherType;
  daily: [DailyWeatherType];
};

export type CustomWeatherType = {
  id: number;
  currentTemp: number;
  daily: Array<{
    temp: {
      max: number;
      min: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
  }>;
};
