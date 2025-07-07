// src/api/weather.ts
import type { WeatherApiResponse } from '../types/weather';

const API_KEY = 'c9a0ca46550648b29ce125849232709'; //
const BASE_URL = 'https://api.weatherapi.com/v1'; //

interface FetchWeatherOptions {
  city: string;
  days?: number; // Mặc định là 1 nếu fetch forecast
  lang?: string; // Ngôn ngữ
}

export const fetchWeatherData = async ({
  city,
  days = 1,
  lang = 'vi'
}: FetchWeatherOptions): Promise<WeatherApiResponse | null> => {
  try {
    const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no&lang=${lang}`; //
    const response = await fetch(url);

    if (!response.ok) {
      // Xử lý lỗi từ API (ví dụ: thành phố không tìm thấy)
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
    }

    const data: WeatherApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
};