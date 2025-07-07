// src/types/weather.d.ts

// Kiểu dữ liệu cho điều kiện thời tiết (vd: Sunny, Clear, Cloudy)
export interface WeatherCondition {
  text: string;
  icon: string; // URL của icon thời tiết
  code: number;
}

// Kiểu dữ liệu cho dữ liệu vị trí
export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

// Kiểu dữ liệu cho thời tiết hiện tại
export interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number; // Nhiệt độ Celsius
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number; // Tốc độ gió km/h
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number; // Độ ẩm
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

// Kiểu dữ liệu cho dự báo hàng giờ
export interface HourlyForecastItem {
  time_epoch: number;
  time: string; // Định dạng "YYYY-MM-DD HH:MM"
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

// Kiểu dữ liệu cho dự báo theo ngày (một ngày trong forecast.forecastday)
export interface DailyForecast {
  date: string;
  date_epoch: number;
  hour: HourlyForecastItem[]; // Mảng các dự báo hàng giờ
}

// Kiểu dữ liệu cho toàn bộ phản hồi API (Current Weather + Forecast)
export interface WeatherApiResponse {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: DailyForecast[]; // Chỉ lấy ngày đầu tiên (index 0) cho dự báo hàng giờ
  };
}