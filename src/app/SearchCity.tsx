import React, { useState } from "react";
import { Search } from "lucide-react";

function SearchCity() {
  const [cityName, setCityName] = useState("karachi");

  return (
    <div className="relative">
      <input
        type="text"
        value={cityName}
        onChange={(e) => {
          setCityName(e.target.value);
        }}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-75" />
    </div>
  );
}

export default SearchCity;
