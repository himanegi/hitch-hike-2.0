"use client";
import MapSection from "./components/Home/MapSection";
import { useState } from "react";
import InputItem from "./components/Home/InputItem";
import MapboxRoute from "./components/Home/MapboxRoute";
import axios from "axios";

export default function Home() {
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  const [map, setMap] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchAvailableRides = async () => {
    try {
      console.log(sourceCoordinates, destinationCoordinates);
      const response = await axios.post(
        "http://localhost:5000/api/rides/search",
        {
          source: sourceCoordinates,
          destination: destinationCoordinates,
        }
      );
      setSearchResults(response.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching available rides:", error);
      setSearchPerformed(true);
    }
  };

  return (
    <div className="p-6 grid gird-cols-1 md:grid-cols-3 gap-5">
      <div>
        <p className="text-[25px] font-thin">Search for Rides</p>
        <InputItem
          type="source"
          map={map}
          onCoordinatesChange={setSourceCoordinates}
        />
        <InputItem
          type="destination"
          map={map}
          onCoordinatesChange={setDestinationCoordinates}
        />
        <MapboxRoute
          map={map}
          sourceCoordinates={sourceCoordinates}
          destinationCoordinates={destinationCoordinates}
        />
        <button
          className="bg-[#4264fb] text-white w-full p-3 rounded-lg mt-3 border-2 border-black"
          onClick={fetchAvailableRides}
        >
          Search
        </button>
        {searchPerformed && searchResults.length === 0 && (
          <p className="mt-4">No available rides found.</p>
        )}
        {searchResults.length > 0 && (
          <div>
            <h2>Available Rides</h2>
            {searchResults.map((ride) => (
              <div key={ride.id}>
                {/* Display ride details */}
                <p>Source: {ride.source.join(", ")}</p>
                <p>Destination: {ride.destination.join(", ")}</p>
                {/* Add more ride details as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-2">
        <MapSection onMapChange={setMap} />
      </div>
    </div>
  );
}
