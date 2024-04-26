"use client";
import MapSection from "./components/Home/MapSection";
import SearchSection from "./components/Home/SearchSection";
import { useState } from "react";

export default function Home() {
  const [map, setMap] = useState(null);
  return (
    <div className="p-6 grid gird-cols-1 md:grid-cols-3 gap-5">
      <div>
        <p className="text-[25px] font-thin">Search for Rides</p>
        <SearchSection map={map} />
        <button className="bg-[#4264fb] text-white w-full p-3 rounded-lg mt-3 border-2 border-black ">
          Search
        </button>
      </div>
      <div className="col-span-2">
        <MapSection onMapChange={setMap} />
      </div>
    </div>
  );
}
