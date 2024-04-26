"use client";
import React, { useState } from "react";
import MapSection from "../components/Home/MapSection";
import SearchSection from "../components/Home/SearchSection";
import axios from "axios";

const ShareComponent = () => {
  const [map, setMap] = useState(null);
  const [departure, setDeparture] = useState("");
  const [tripLength, setTripLength] = useState("");
  const [spotsInCar, setSpotsInCar] = useState(1);
  const [womenOnly, setWomenOnly] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    axios
      .post("/api/trips", {
        departure,
        tripLength,
        spotsInCar,
        womenOnly,
        message,
        source: {
          type: "Point",
          coordinates: map.getSource().getCenter(),
        },
        destination: {
          type: "Point",
          coordinates: map.getDestination().getCenter(),
        },
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
        className="md:col-span-1 bg-white shadow-md rounded-lg p-6"
      >
        <div>
          {/* This handles the from and to section of the form */}
          <SearchSection map={map} />
        </div>
        <div className="mb-4">
          <label htmlFor="departure" className="block font-medium mb-2">
            Departure
          </label>
          <input
            id="departure"
            type="datetime-local"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tripLength" className="block font-medium mb-2">
            Trip Length
          </label>
          <input
            id="tripLength"
            type="number"
            placeholder="Trip Length"
            value={tripLength}
            onChange={(e) => setTripLength(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="spotsInCar" className="block font-medium mb-2">
            Spots in Your Car
          </label>
          <input
            id="spotsInCar"
            type="number"
            min="1"
            value={spotsInCar}
            onChange={(e) => setSpotsInCar(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="womenOnly" className="flex items-center">
            <input
              id="womenOnly"
              type="checkbox"
              checked={womenOnly}
              onChange={(e) => setWomenOnly(e.target.checked)}
              className="mr-2"
            />
            Women Only
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Share
        </button>
      </form>
      <div className="md:col-span-2">
        <MapSection onMapChange={setMap} />
      </div>
    </div>
  );
};

export default ShareComponent;
