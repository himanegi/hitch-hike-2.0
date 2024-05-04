"use client";
import MapSection from "../components/Home/MapSection";
import { useState } from "react";
import InputItem from "../components/Home/InputItem";
import MapboxRoute from "../components/Home/MapboxRoute";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import RequestForm from "../components/RequestForm";

const SearchComponent = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [sourcePlace, setSourcePlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  const [map, setMap] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { user } = useUser();

  const fetchAvailableRides = async () => {
    try {
      const response = await axios.post("/api/rides/search", {
        source: sourceCoordinates,
        destination: destinationCoordinates,
        sourceName: sourcePlace,
        destinationName: destinationPlace,
      });
      if (response.data.rides && response.data.rides.length > 0) {
        setSearchResults(response.data.rides);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching available rides:", error);
    }
  };

  const handleRideClick = (ride) => {
    setSelectedRide(ride);
  };

  const handleButtonClick = () => {
    setShowRequestForm(true);
  };
  const handleSubmit = async (e, ride, phoneNumber, message) => {
    e.preventDefault();
    console.log("phone number", phoneNumber);
    console.log("message", message);
    await axios
      .post("/api/rideRequests/create", {
        username: user.fullName,
        rideId: ride._id,
        rider: user.id,
        phoneNumber: phoneNumber,
        message: message,
        riderSource: sourcePlace,
        riderDestination: destinationPlace,
      })
      .then((res) => {
        setPopupMessage(res.data.message);
        setShowPopup(true);
        console.log("bhej diya");
      })
      .catch((err) => {
        setPopupMessage("An error occurred while sending your request.");
        setShowPopup(true);
      });
  };

  return (
    <div className="bg-gray-100 pt-4 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:ring-2 hover:ring-indigo-500">
            <p className="text-[25px] font-thin text-gray-800">
              Search for Rides
            </p>
            <InputItem
              type="source"
              map={map}
              namespace="Pickup"
              onCoordinatesChange={setSourceCoordinates}
              onPlaceChange={setSourcePlace}
            />
            <InputItem
              type="destination"
              map={map}
              namespace="Drop"
              onCoordinatesChange={setDestinationCoordinates}
              onPlaceChange={setDestinationPlace}
            />
            <MapboxRoute
              map={map}
              sourceCoordinates={sourceCoordinates}
              destinationCoordinates={destinationCoordinates}
            />
            <button
              className="ripple-bg-indigo-300 inline-flex w-full justify-center mt-10 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
              onClick={fetchAvailableRides}
            >
              Search
            </button>
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
                      <p className="font-thin">
                        Source Name: {ride.sourceName}
                      </p>
                      <p className="font-thin">
                        Destination Name: {ride.destinationName}
                      </p>
                      <p className="font-thin">
                        Driver Name: {ride.driverName}
                      </p>
                      <p className="font-thin">Date: {ride.date}</p>
                      <p className="font-thin">Time: {ride.time}</p>
                      <p className="font-thin">Message: {ride.message}</p>
                      <p className="font-thing">Distance: {ride.totalDist}</p>
                    </div>
                    <button
                      className="block mx-auto px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleButtonClick()}
                    >
                      Request
                    </button>
                    {showRequestForm && (
                      <RequestForm
                        ride={ride}
                        handleSubmit={handleSubmit}
                        onClose={() => setShowRequestForm(false)}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : null}
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
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <p className="text-lg font-semibold mb-4">{popupMessage}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
