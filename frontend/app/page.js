"use client";
import MapSection from "./components/Home/MapSection";
import { useState } from "react";
import InputItem from "./components/Home/InputItem";
import MapboxRoute from "./components/Home/MapboxRoute";
import axios from "axios";

export default function Home() {
  const [sourcePlace, setSourcePlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  const [map, setMap] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // New state for search results

  const fetchAvailableRides = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rides/search",
        {
          source: sourceCoordinates,
          destination: destinationCoordinates,
          sourceName: sourcePlace,
          destinationName: destinationPlace,
        }
      );

      // Check if the response has rides data
      if (response.data.rides && response.data.rides.length > 0) {
        setSearchResults(response.data.rides); // Update the searchResults state with the rides data
      } else {
        setSearchResults([]); // Clear the search results if no rides found
        console.log("No rides found");
      }
    } catch (error) {
      console.error("Error fetching available rides:", error);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <p className="text-[25px] font-thin">Search for Rides</p>
        <InputItem
          type="source"
          map={map}
          onCoordinatesChange={setSourceCoordinates}
          onPlaceChange={setSourcePlace}
        />
        <InputItem
          type="destination"
          map={map}
          onCoordinatesChange={setDestinationCoordinates}
          onPlaceChange={setDestinationPlace}
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

        {/* Render search results */}
        {searchResults.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Search Results:</h2>
            {searchResults.map((ride, index) => (
              <div key={index} className="my-2">
                <p>Source Coordinates: {ride.source.coordinates.join(", ")}</p>
                <p>
                  Destination Coordinates:{" "}
                  {ride.destination.coordinates.join(", ")}
                </p>
                <MapboxRoute
                  map={map}
                  sourceCoordinates={ride.source.coordinates}
                  destinationCoordinates={ride.destination.coordinates}
                  routeId={`route-${index}`} // Add a unique routeId prop
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="col-span-2">
        <MapSection onMapChange={setMap} />
      </div>
    </div>
  );
}
