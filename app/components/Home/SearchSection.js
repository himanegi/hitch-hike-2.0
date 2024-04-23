import React from "react";
import InputItem from "./InputItem";
import MapboxRoute from "./MapboxRoute";
import { useState } from "react";

function SearchSection({ map }) {
  const [sourceCoordinates, setSourceCoordinates] = useState([0, 0]);
  const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
  return (
    <div className="p-2 md:p-6 rounded-xl border-[2px] border-black">
      <p className="text-[25px] font-bold font-thin">Search for Rides</p>
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
      <button className="bg-[#4264fb] text-white w-full p-3 rounded-lg mt-3 border-2 border-black ">
        Search
      </button>
    </div>
  );
}

export default SearchSection;
