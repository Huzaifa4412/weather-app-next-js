"use client";
import { useState } from "react";
import FetchApi from "./components/FetchApi";
import SearchBar from "./components/Search";

export default function Home() {
  const [city, setCity] = useState("karachi");
  return (
    <>
      <main className="w-full max-w-md mx-auto space-y-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-center text-white text-shadow-lg">
          Weather Forecast
        </h1>
        <SearchBar cityName={(city: string) => setCity(city)} />
        <FetchApi cityName={city} />
      </main>
    </>
  );
}
