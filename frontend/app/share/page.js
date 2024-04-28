"use client";
import React, { useState } from "react";
import MapSection from "../components/Home/MapSection";
import axios from "axios";
import InputItem from "../components/Home/InputItem";
import MapboxRoute from "../components/Home/MapboxRoute";
import { useUser } from "@clerk/clerk-react";

const ShareComponent = () => {
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
  // const clerk = new Clerk(process.env.CLERK_SECRET_KEY);
  // const currUser = await clerk.users.getUser(user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(
      "Fetching available rides :",
      sourcePlace,
      destinationPlace,
      sourceCoordinates,
      destinationCoordinates,
    );
    // Handle form submission here
    await axios
      .post("http://localhost:5000/api/rides/create", {
        source: sourceCoordinates,
        destination: destinationCoordinates,
        sourceName: sourcePlace,
        destinationName: destinationPlace,
        driverId: user.id,
        date:departureDate,
        message:message,
        time:departureTime
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      <form
        onSubmit={handleSubmit}
        className="md:col-span-1 bg-white shadow-md rounded-lg p-2 px-4"
      >
        <h1 className="text-[25px]">Input Trip Details</h1>
        <div className="mb-4">
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
        </div>
        <div className="mb-4 px-1 flex justify-between">
          <div className="w-1/2 mr-2">
            <label htmlFor="departureDate" className="block font-medium mb-2">
              Departure Date
            </label>
            <input
              id="departureDate"
              type="date"
              value={departureDate}
              min={currentDate}
              max="2024-12-31"
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full border border-gray-500 rounded-md py-2 px-3"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="departureTime" className="block font-medium mb-2">
              Departure Time
            </label>
            <input
              id="departureTime"
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full border border-gray-500 rounded-md py-2 px-3"
            />
          </div>
        </div>
        <div className="mb-4 px-1">
          <label htmlFor="spotsInCar" className="block font-medium mb-2">
            Spots in Your Car
          </label>
          <input
            id="spotsInCar"
            type="number"
            min="1"
            value={spotsInCar}
            onChange={(e) => setSpotsInCar(e.target.value)}
            className="w-full border border-gray-500 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4 px-1">
          <label htmlFor="carNumber" className="block font-medium mb-2">
            Car Number
          </label>
          <input
            id="carNumber"
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            className="w-full border border-gray-500 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-2 px-1">
          <label htmlFor="message" className="block font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-500 rounded-md py-2 px-3"
          ></textarea>
        </div>
        <div className="px-1">
          <button
            type="submit"
            className="bg-blue-500 text-white text-[14px] py-1 px-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Share
          </button>
        </div>
      </form>
      <div className="md:col-span-2">
        <MapSection onMapChange={setMap} />
      </div>
    </div>
  );
};

export default ShareComponent;
