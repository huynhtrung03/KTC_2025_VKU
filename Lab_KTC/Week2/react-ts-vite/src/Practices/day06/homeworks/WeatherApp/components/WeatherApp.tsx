// src/components/WeatherApp/WeatherApp.tsx
import React, { useState, useEffect } from 'react';
import styles from './WeatherApp.module.css';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import { fetchWeatherData } from '../../WeatherApp/api/weather'; // Đảm bảo đường dẫn đúng đến file api
import type { WeatherApiResponse } from '../../WeatherApp/types/weather'; // Đảm bảo đường dẫn đúng đến file types

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('Da nang'); // Mặc định là Hanoi
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData({ city });
        if (data) {
          setWeatherData(data);
        } else {
          setError('Không tìm thấy dữ liệu thời tiết cho thành phố này.');
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi khi lấy dữ liệu thời tiết.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      if (city) { // Chỉ fetch nếu có thành phố
        getWeatherData();
      }
    }, 500); // Debounce 500ms để tránh gọi API quá nhiều khi người dùng gõ

    return () => clearTimeout(debounceFetch); // Cleanup debounce timer
  }, [city]); // Gọi lại useEffect khi 'city' thay đổi

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  // Hàm thực hiện tìm kiếm khi click icon
  const handleSearchClick = () => {
    // Nếu muốn fetch lại, chỉ cần setCity(city) để trigger useEffect
    setCity(city.trim());
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.statusBar}></div>
      <div className={styles.searchBar}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Da nang"
            value={city}
            onChange={handleCityChange}
            className={styles.searchInput}
            style={{ paddingRight: 36 }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearchClick();
            }}
          />
          <button
            type="button"
            className={styles.searchIcon}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 20,
              color: '#888',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
            onClick={handleSearchClick}
            aria-label="Tìm kiếm"
          >
            🔍
          </button>
        </div>
      </div>

      {loading && <p className={styles.message}>Đang tải dữ liệu thời tiết...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && weatherData && (
        <div className={styles.weatherDisplay}>
          <CurrentWeather
            current={weatherData.current}
            locationName={weatherData.location.name}
          />
          <HourlyForecast
            hourlyData={weatherData.forecast.forecastday[0].hour}
          />
        </div>
      )}
      {!loading && !error && !weatherData && <p className={styles.message}>Nhập tên thành phố để xem thời tiết.</p>}
    </div>
  );
};

export default WeatherApp;