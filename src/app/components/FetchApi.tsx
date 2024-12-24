"use client";
import { currentWeather } from "@/context/currentWeather";
import { useState, useEffect, useCallback } from "react";
import WeatherCard from "./WeatherCard";
import { ClockLoader } from "react-spinners";
function FetchApi({ cityName }: { cityName: string }) {
  const [loading, setLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState({});

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4190189464944ecf9995818b0d3e3854&units=metric`
      );
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data ${response.statusText}`);
      }
      const data = await response.json();

      const { name: city } = data;
      const { country, sunrise, sunset } = data.sys;
      const {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        sea_level,
        pressure,
      } = data.main;
      const { speed } = data.wind;
      const { all: clouds } = data.clouds;
      const { icon, main: weatherMood } = data.weather[0];

      const weather = {
        city,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        sea_level,
        pressure,
        windSpeed: speed,
        weatherMood,
        icon,
        speed,
        country,
        sunrise,
        sunset,
        clouds,
      };
      setWeatherInfo(weather);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [cityName]);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <currentWeather.Provider value={weatherInfo}>
      {loading ? (
        <ClockLoader
          className="z-20 absolute top-[30%] left-1/2 -translate-x-1/2"
          color="#f7f7f7f7"
          size={65}
        />
      ) : (
        <WeatherCard />
      )}
    </currentWeather.Provider>
  );
}

export default FetchApi;
