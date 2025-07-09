// src/components/WeatherApp/HourlyForecast.tsx
import React from 'react';
import styles from './HourlyForecast.module.css';
import type { HourlyForecastItem } from '../../WeatherApp/types/weather';
interface HourlyForecastProps {
  hourlyData: HourlyForecastItem[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const getIconUrl = (iconPath: string) => {
    return `https:${iconPath}`;
  };

  const displayHours = hourlyData.slice(0, 12); 

  return (
    <div className={styles.hourlyForecastCard}>
      <h4 className={styles.title}>Dự báo hàng giờ</h4>
      <div className={styles.hourlyList}>
        {displayHours.map((hour, index) => (
          <div key={hour.time_epoch} className={styles.hourlyItem}>
            <span className={styles.time}>{index === 0 ? 'Now' : new Date(hour.time).getHours() + ':00'}</span>
            <img src={getIconUrl(hour.condition.icon)} alt={hour.condition.text} className={styles.hourlyIcon} />
            <span className={styles.temperature}>{Math.round(hour.temp_c)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;