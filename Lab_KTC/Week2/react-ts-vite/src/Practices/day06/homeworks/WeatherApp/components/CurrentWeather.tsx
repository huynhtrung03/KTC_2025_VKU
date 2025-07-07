// src/components/WeatherApp/CurrentWeather.tsx
import React from 'react';
import styles from './CurrentWeather.module.css';
import type { CurrentWeather as CurrentWeatherType } from '../../WeatherApp/types/weather';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  locationName: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current, locationName }) => {
  // Hàm để lấy icon thời tiết
  const getIconUrl = (iconPath: string) => {
    // API trả về đường dẫn icon dạng //cdn.weatherapi.com/...
    // Cần thêm https: vào trước
    return `https:${iconPath}`;
  };

  return (
    <div className={styles.currentWeatherCard}>
      <div className={styles.location}>{locationName}</div>
      <div className={styles.mainInfo}>
        <span className={styles.temperature}>{Math.round(current.temp_c)}°</span>
        <div className={styles.condition}>
          <img src={getIconUrl(current.condition.icon)} alt={current.condition.text} className={styles.weatherIcon} />
          <span>{current.condition.text}</span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailCard}>
          <p className={styles.detailValue}>{current.humidity}%</p>
          <p className={styles.detailLabel}>Độ ẩm</p>
        </div>
        <div className={styles.detailCard}>
          <p className={styles.detailValue}>{current.wind_kph} km/h</p>
          <p className={styles.detailLabel}>Gió</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;