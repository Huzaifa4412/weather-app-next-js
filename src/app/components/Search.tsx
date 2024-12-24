import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ cityName }: { cityName: (city: string) => void }) => {
  const [city, setCity] = useState("karachi");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.children[0] as HTMLInputElement;
    cityName(input.value);
    setCity("");
  };
  return (
    <>
      <div className="relative">
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="Search for a city..."
            className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-75"
            onClick={() => cityName(city)}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
