"use client";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RideSharedPopup from "../components/RideSharedPopup";
import Map from "../map/page";
import InputItem from "../sourceinput/page";
// import MapSection from "../components/Home/MapSection";
// import InputItem from "../components/Home/InputItem";
// import MapboxRoute from "../components/Home/MapboxRoute";
import { distance } from "turf";
import createAdjacencyList from "../utils/adjacencyList";
import dijkstra from "../utils/dijkstra";
import HaversineDistance from "../utils/haversine";

const ShareComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [sourcePlace, setSourcePlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  // const [map, setMap] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];
  const [departureDate, setDepartureDate] = useState(currentDate);
  const [departureTime, setDepartureTime] = useState("");
  const [spotsInCar, setSpotsInCar] = useState(1);
  const [message, setMessage] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [allPaths, setAllPaths] = useState([]);

  const { user } = useUser();

  const myPoints = [
    [25.495888259522516, 81.86993608590821], //Uptron
    [25.49861488542562, 81.86312708481141], //Teliyarganj Chauraha
    [25.494318289237118, 81.86126713666609], //Yamuna Gate
    [25.492486990625462, 81.85701173913526], // APS Old Cantt
    [25.492657811815377, 81.8610579644117], //Ganga Gate
    [25.494318289237118, 81.86126713666609], //Yamuna Gate
    [25.492657811815377, 81.8610579644117], //Ganga Gate
    [25.480122171991997, 81.8624741883314], //Army Canteen
    [25.495888259522516, 81.86993608590821], //Uptron
    [25.480122171991997, 81.8624741883314], //Army Canteen
    [25.47257897045846, 81.85668489287013], //Old Katra
    [25.474033767581517, 81.8477323741156], //Belly Gaon
    [25.492486990625462, 81.85701173913526], // APS Old Cantt
    [25.474033767581517, 81.8477323741156], //Belly Gaon
    [25.47257897045846, 81.85668489287013], //Old Katra
    [25.470262035007487, 81.86253387178975], //Allahabad Uni
    [25.480122171991997, 81.8624741883314], //Army Canteen
    [25.470262035007487, 81.86253387178975], //Allahabad Uni
    [25.456736707332805, 81.8593706484965], //Tagore Town
    [25.464765870097402, 81.85191021620103], //Katra
    [25.46158660125893, 81.84427073353051], //Police Line
    [25.474033767581517, 81.8477323741156], //Belly Gaon
    [25.47257897045846, 81.85668489287013], //Old Katra
    [25.464765870097402, 81.85191021620103], //Katra
    [25.456736707332805, 81.8593706484965], //Tagore Town
    [25.442679868982705, 81.86735496207731], //Chungi
    [25.445581209458688, 81.85746077782231], //CMP Degree College
    [25.449623175857198, 81.85125369815248], //RamnathPur
    [25.456736707332805, 81.8593706484965], //Tagore Town
    [25.458088766131926, 81.85187816003692], //CA Park
    [25.46158660125893, 81.84427073353051], //Police Line
    [25.4544052785852, 81.82523194476462], //Allahabad High Court
    [25.447973754027352, 81.8127614673697], //SSB, Allahabad
    [25.446761524396102, 81.82585061029825], //Prayagraj Junction
    [25.449626148001222, 81.83879382823923], //Prayagraj Bus Stand
    [25.45098058434759, 81.82614712705708], //All Saints Cathedral
    [25.4544052785852, 81.82523194476462], //Allahabad High Court
    [25.45295982867542, 81.83494025578001], //Civil Lines
    [25.449623175857198, 81.85125369815248], //RamnathPur
    [25.449626148001222, 81.83879382823923], //Prayagraj Bus Stand
  ];
  const locations = {
    Uptron: { lat: 25.495888259522516, lon: 81.86993608590821 },
    "Teliyarganj Chauraha": { lat: 25.49861488542562, lon: 81.86312708481141 },
    "Yamuna Gate": { lat: 25.494318289237118, lon: 81.86126713666609 },
    "APS Old Cantt": { lat: 25.492486990625462, lon: 81.85701173913526 },
    "Ganga Gate": { lat: 25.492657811815377, lon: 81.8610579644117 },
    "Army Canteen": { lat: 25.480122171991997, lon: 81.8624741883314 },
    "Old Katra": { lat: 25.47257897045846, lon: 81.85668489287013 },
    "Belly Gaon": { lat: 25.474033767581517, lon: 81.8477323741156 },
    "Allahabad Uni": { lat: 25.470262035007487, lon: 81.86253387178975 },
    "Tagore Town": { lat: 25.456736707332805, lon: 81.8593706484965 },
    Katra: { lat: 25.464765870097402, lon: 81.85191021620103 },
    "Police Line": { lat: 25.46158660125893, lon: 81.84427073353051 },
    Chungi: { lat: 25.442679868982705, lon: 81.86735496207731 },
    "CMP Degree College": { lat: 25.445581209458688, lon: 81.85746077782231 },
    RamnathPur: { lat: 25.449623175857198, lon: 81.85125369815248 },
    "CA Park": { lat: 25.458088766131926, lon: 81.85187816003692 },
    "Allahabad High Court": { lat: 25.4544052785852, lon: 81.82523194476462 },
    "Civil Lines": { lat: 25.45295982867542, lon: 81.83494025578001 },
    SSB: { lat: 25.447973754027352, lon: 81.8127614673697 },
    "Prayagraj Junction": { lat: 25.446761524396102, lon: 81.82585061029825 },
    "Prayagraj Bus Stand": { lat: 25.449626148001222, lon: 81.83879382823923 },
    "All Saints Cathedral": { lat: 25.45098058434759, lon: 81.82614712705708 },
  };

  const adjacencyList = createAdjacencyList(locations);

  const handlePageRefresh = () => {
    window.location.reload();
  };

  const handleClick = () => {
    console.log("chal gaya!");
    const path = dijkstra(adjacencyList, sourcePlace, destinationPlace);
    const paths = path.map((name) => [
      locations[name].lat,
      locations[name].lon,
    ]);
    setAllPaths(paths);
    setIsSearchClicked(true);
    console.log("Source:", sourceCoordinates);
    console.log("Destination:", destinationCoordinates);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const distance = HaversineDistance(
      sourceCoordinates,
      destinationCoordinates
    );
    await axios
      .post("/api/rides/create", {
        source: [sourceCoordinates.lat, sourceCoordinates.lon],
        destination: [destinationCoordinates.lat, destinationCoordinates.lon],
        sourceName: sourcePlace,
        destinationName: destinationPlace,
        driverId: user.id,
        driverName: user.fullName,
        date: departureDate,
        message: message,
        time: departureTime,
        spotsInCar: spotsInCar,
        ridePath: allPaths,
        distance,
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
    <div className="bg-gray-100 pt-3 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <form
            onSubmit={handleSubmit}
            className="md:col-span-1  bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
          >
            <h1 className="text-[25px] font-thin text-gray-800">
              Input Trip Details
            </h1>
            <div className="mb-6">
              <InputItem
                type="source"
                locations={locations}
                onCoordinatesChange={setSourceCoordinates}
                onPlaceChange={setSourcePlace}
              />
              <InputItem
                type="destination"
                locations={locations}
                onCoordinatesChange={setDestinationCoordinates}
                onPlaceChange={setDestinationPlace}
              />
              <button
                type="button" //bug fix for auto submit
                className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
                onClick={handleClick}
              >
                Get Route
              </button>
              {/* <InputItem
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
              /> */}
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
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
              >
                Share
              </button>
            </div>
          </form>
          <div className="md:col-span-2 transition-all duration-300">
            <Map
              myPoints={myPoints}
              allPaths={isSearchClicked ? allPaths : []}
            />
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
