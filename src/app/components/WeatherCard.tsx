"use client";
import { useContext, useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { currentWeather } from "@/context/currentWeather";
import Image from "next/image";

export default function WeatherCard() {
  const [isNightMode, setIsNightMode] = useState(false);
  useEffect(() => {
    if (isNightMode) {
      document.documentElement.setAttribute("data-scheme", "dark");
    } else {
      document.documentElement.removeAttribute("data-scheme");
    }
  });

  interface WeatherData {
    city: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    sea_level: number;
    pressure: number;
    windSpeed: string;
    weatherMood: string;
    icon: string;
    speed: number;
    sunrise: number;
    country: string;
    sunset: number;
    clouds: number;
  }

  const data = useContext(currentWeather) as WeatherData;
  const date = new Date();

  return (
    <div
      className={`bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl w-full max-w-md border border-white border-opacity-20 transition-all duration-500 ${
        isNightMode ? "night-mode" : ""
      }`}
    >
      <div
        className={`bg-gradient-to-r ${
          isNightMode
            ? "from-blue-900 to-indigo-900"
            : "from-blue-600 to-blue-700"
        } p-8 text-white relative overflow-hidden transition-all duration-500`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            isNightMode ? "bg-blue-900" : "bg-blue-600"
          } opacity-50 transform -skew-y-6 transition-all duration-500`}
        ></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <MapPin className="w-8 h-8 mr-2" />
                {data?.city}
              </h1>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <p className="text-lg opacity-90">
                  {date.toLocaleString("en-us", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
              >
                <i
                  className={`wi ${
                    isNightMode ? "wi-night-clear" : "wi-day-sunny"
                  } text-2xl`}
                ></i>
              </button>
            </div>
          </div>
          <div className="mt-10 flex justify-between items-end">
            <div>
              <p className="text-8xl font-bold text-shadow animate-fade-in">
                {Math.round(data?.temp)}°
              </p>
              <p className="text-xl font-bold text-shadow animate-fade-in">
                {data.weatherMood}
              </p>
            </div>
            <div className="text-right">
              <Image
                src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
                alt="Weather Mood"
                width={200}
                height={200}
                className="icon"
              />
              <p className="text-xl mt-2">
                Feels like: {Math.round(data.feels_like)}°
              </p>
              <p className="text-lg mt-1">
                High: {Math.round(data.temp_max)}° / Low:
                {Math.round(data.temp_min)}°
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 grid grid-cols-3 gap-6 bg-white bg-opacity-30 backdrop-blur-md">
        <WeatherProperty
          icon="wi-sprinkle"
          label="Humidity"
          value={data?.humidity + "%"}
        />
        <WeatherProperty
          icon="wi-strong-wind"
          label="Wind"
          value={`${data.speed}  mph`}
        />
        <WeatherProperty
          icon="wi-flood"
          label="Sea Level"
          value={`${data.sea_level} hPa`}
        />
        <WeatherProperty
          icon="wi-cloud"
          label="Clouds"
          value={`${data.clouds}%`}
        />
        <WeatherProperty
          icon="wi-sunrise"
          label="Sun Rise"
          value={
            window && window !== undefined
              ? new Date(data.sunrise * 1000).toLocaleTimeString()
              : ""
          }
        />
        <WeatherProperty
          icon="wi-sunset"
          label="Sun Set"
          value={
            window && window !== undefined
              ? new Date(data.sunset * 1000).toLocaleTimeString()
              : ""
          }
        />
      </div>
    </div>
  );
}

function WeatherProperty({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center bg-white bg-opacity-40 rounded-xl p-3 backdrop-blur-sm shadow-md transition-all duration-300 hover:bg-opacity-60 hover:shadow-lg">
      <i
        className={`wi ${icon} text-3xl text-blue-600 mb-2`}
        style={{ color: "var(--text-color)" }}
      ></i>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}
