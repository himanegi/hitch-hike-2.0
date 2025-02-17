"use client";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import RequestForm from "../components/RequestForm";
import Map from "../map/page";
import InputItem from "../sourceinput/page";
import createAdjacencyList from "../utils/adjacencyList";
import dijkstra from "../utils/dijkstra";

const SearchComponent = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [sourcePlace, setSourcePlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
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

  const fetchAvailableRides = async () => {
    try {
      const response = await axios.post("/api/rides/search", {
        source: [sourceCoordinates.lat, sourceCoordinates.lon],
        destination: [destinationCoordinates.lat, destinationCoordinates.lon],
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

  const adjacencyList = createAdjacencyList(locations);
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
    <div className="bg-gray-100 pt-3 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="overflow-y-scroll h-[700px] md:col-span-1 bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:ring-2 hover:ring-indigo-500">
            <style jsx>{`
              /* Customize the scrollbar */
              ::-webkit-scrollbar {
                width: 8px;
              }

              ::-webkit-scrollbar-track {
                background-color: #f1f1f1;
                border-radius: 4px;
                margin-top: 2px;
                margin-bottom: 2px;
              }

              ::-webkit-scrollbar-thumb {
                background-color: #888;
                border-radius: 4px;
              }

              ::-webkit-scrollbar-thumb:hover {
                background-color: #555;
              }
            `}</style>
            <p className="text-[25px] font-thin text-gray-800">
              Search for Rides
            </p>
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
              className="inline-flex w-full justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
              onClick={() => {
                fetchAvailableRides();
                handleClick();
              }}
            >
              Search
            </button>
            {searchResults.length > 0 ? (
              <div className="mt-4">
                <h2 className="text-lg font-bold">Search Results:</h2>
                {searchResults.map((ride, index) => (
                  <div
                    key={index}
                    className="my-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
                      <p className="font-thin">
                        Date: {new Date(ride.date).toLocaleDateString("en-GB")}
                      </p>
                      <p className="font-thin">Time: {ride.time}</p>
                      <p className="font-thin">Message: {ride.message}</p>
                      <p className="font-thin">
                        Distance: {ride.totalDist.toFixed(2)} KM
                      </p>
                    </div>
                    <button
                      className="inline-flex ml-5 mb-5 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
                      onClick={() => handleButtonClick()}
                    >
                      Request
                    </button>
                    {showRequestForm && (
                      <div className="bg-black">
                        <RequestForm
                          ride={ride}
                          handleSubmit={handleSubmit}
                          onClose={() => setShowRequestForm(false)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : isSearchClicked ? (
              <div className="mt-4 text-lg">No rides found</div>
            ) : null}
            {selectedRide && <div className="mt-4"></div>}
          </div>
          <div className="col-span-2">
            <Map
              myPoints={myPoints}
              allPaths={isSearchClicked ? allPaths : []}
            />
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <p className="text-lg font-semibold mb-4">{popupMessage}</p>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md"
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
