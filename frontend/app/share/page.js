"use client";
import React, { useState } from "react";
import MapSection from "../components/Home/MapSection";
import axios from "axios";
import InputItem from "../components/Home/InputItem";
import MapboxRoute from "../components/Home/MapboxRoute";
import { useUser } from "@clerk/clerk-react";
import RideSharedPopup from "../components/RideSharedPopup";

const ShareComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [sourcePlace, setSourcePlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  const [map, setMap] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];
  const [departureDate, setDepartureDate] = useState(currentDate);
  const [departureTime, setDepartureTime] = useState("");
  const [spotsInCar, setSpotsInCar] = useState(1);
  const [message, setMessage] = useState("");
  const [carNumber, setCarNumber] = useState("");

  const { user } = useUser();

  const handlePageRefresh = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = new RegExp("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$");
  const stateCodes = ['AP', 'AR', 'AS', 'BR', 'CG', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB', 'AN', 'CH', 'DN', 'DD', 'LA'];

  if (!regex.test(carNumber)) {
    alert('Invalid car number format.');
    return;
  }

  if (!stateCodes.includes(carNumber.slice(0, 2))) {
    alert('Invalid state code in car number.');
    return;
  }
    // Handle form submission here
    await axios
      .post("/api/rides/create", {
        source: sourceCoordinates,
        destination: destinationCoordinates,
        sourceName: sourcePlace,
        destinationName: destinationPlace,
        driverId: user.id,
        driverName: user.fullName,
        date: departureDate,
        message: message,
        time: departureTime,
        spotsInCar: spotsInCar,
      })
      .then((res) => {
        console.log(res.data);
        setShowPopup(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="bg-gray-100 pt-4 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <form
            onSubmit={handleSubmit}
            className="md:col-span-1 bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
          >
            <h1 className="text-[25px] font-thin text-gray-800">
              Input Trip Details
            </h1>
            <div className="mb-6">
              <InputItem
                type="source"
                namespace="Source"
                map={map}
                onCoordinatesChange={setSourceCoordinates}
                onPlaceChange={setSourcePlace}
              />
              <InputItem
                type="destination"
                namespace="Destination"
                map={map}
                onCoordinatesChange={setDestinationCoordinates}
                onPlaceChange={setDestinationPlace}
              />
              <MapboxRoute
                map={map}
                sourceCoordinates={sourceCoordinates}
                destinationCoordinates={destinationCoordinates}
              />
            </div>
            <div className="mb-6 flex justify-between">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="departureDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Departure Date
                </label>
                <input
                  id="departureDate"
                  type="date"
                  value={departureDate}
                  min={currentDate}
                  max="2024-12-31"
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="mt-1 block w-full outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 transition-all duration-300 focus:outline-none focus:ring-2 hover:ring-2 hover:ring-indigo-500"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="departureTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Departure Time
                </label>
                <input
                  id="departureTime"
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="mt-1 block w-full outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 transition-all duration-300 focus:outline-none focus:ring-2 hover:ring-2 hover:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="spotsInCar"
                className="block text-sm font-medium text-gray-700"
              >
                Spots in Your Car
              </label>
              <input
                id="spotsInCar"
                type="number"
                min="1"
                value={spotsInCar}
                onChange={(e) => setSpotsInCar(e.target.value)}
                className="mt-1 block w-full outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 transition-all duration-300 focus:outline-none focus:ring-2 hover:ring-2 hover:ring-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="carNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Car Number
              </label>
              <input
                id="carNumber"
                type="text"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                className="mt-1 block w-full outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 transition-all duration-300 focus:outline-none focus:ring-2 hover:ring-2 hover:ring-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 transition-all duration-300 focus:outline-none focus:ring-2 hover:ring-2 hover:ring-indigo-500"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                data-ripple-light="true"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
              >
                Share
              </button>
            </div>
          </form>
          <div className="md:col-span-2 transition-all duration-300">
            <MapSection onMapChange={setMap} />
          </div>
        </div>
      </div>
      <RideSharedPopup
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          handlePageRefresh();
        }}
        className="transition-all duration-300"
      />
    </div>
  );
};

export default ShareComponent;
