"use client";
import MapSection from "./components/Home/MapSection";
import { useState } from "react";
import InputItem from "./components/Home/InputItem";
import MapboxRoute from "./components/Home/MapboxRoute";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const [requestSent, setRequestSent] = useState({});
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [sourcePlace, setSourcePlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  const [map, setMap] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);

  const { user } = useUser();

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
      console.log("Response:", response.data);
      if (response.data.rides && response.data.rides.length > 0) {
        setSearchResults(response.data.rides);
        console.log("Available rides:", response.data.rides);
      } else {
        setSearchResults([]);
        console.log("No rides found");
      }
    } catch (error) {
      console.error("Error fetching available rides:", error);
    }
  };

  const handleRideClick = (ride) => {
    setSelectedRide(ride);
  };

  const handleSubmit = async (ride) => {
    setRequestSent((prevState) => ({ ...prevState, [ride._id]: true }));

    await axios
      .post("http://localhost:5000/api/rideRequests/create", {
        username: user.fullName,
        rideId: ride._id,
        rider: user.id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) setAlreadyRequested(true);
      })
      .catch((err) => {
        console.error(err);
      });
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
              <div
                key={index}
                className="my-2 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleRideClick(ride)}
              >
                <div className="p-4">
                  <p className="font-thin">Source Name: {ride.sourceName}</p>
                  <p className="font-thin">
                    Destination Name: {ride.destinationName}
                  </p>
                  <p className="font-thin">Driver Name: {ride.driverName}</p>
                  <p className="font-thin">Date: {ride.date}</p>
                  <p className="font-thin">Time: {ride.time}</p>
                  <p className="font-thin">Message: {ride.message}</p>
                  <p className="font-thing">Distance: {ride.totalDist}</p>
                </div>
                <button
                  className="block mx-auto px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleSubmit(ride)}
                >
                  Send Request
                </button>
              </div>
            ))}
          </div>
        ) : null}
        {/* Render the selected ride */}
        {selectedRide && (
          <div className="mt-4">
            <MapboxRoute
              map={map}
              sourceCoordinates={selectedRide.source.coordinates}
              destinationCoordinates={selectedRide.destination.coordinates}
              routeId="selected-route"
            />
          </div>
        )}
      </div>
      <div className="col-span-2">
        <MapSection onMapChange={setMap} />
      </div>
    </div>
  );
}
