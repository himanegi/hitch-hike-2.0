"use client";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setListPlace(result);
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleSelectPlace = (place) => {
    const feature = {
      geometry: {
        coordinates: [place.lon, place.lat],
      },
      properties: {
        name: place.display_name,
      },
    };
    setSelectPosition(feature);
    setSearchText(place.display_name);
    setListPlace([]);
  };

  return (
    <div>
      <div className="flex items-center bg-white rounded-md hover:ring-2 hover:ring-indigo-500 transition-all duration-300 mb-4 shadow-sm">
        <input
          required={true}
          placeholder="Search"
          className="flex-1 text-[15px] outline-none bg-transparent py-2 px-3 placeholder-gray-400 text-gray-800 transition-colors duration-300 focus:placeholder-gray-600"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button
          onClick={handleSearch}
          className=" mr-1 flex items-center justify-center bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <MdSearch size={15} />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto shadow-md rounded-md">
        <ul className="bg-white divide-y divide-gray-200">
          {listPlace.map((item) => (
            <li key={item?.place_id} className="transition-colors duration-300">
              <div
                onClick={() => handleSelectPlace(item)}
                className="hover:bg-gray-100 cursor-pointer py-2 px-4 flex items-center"
              >
                <img
                  src="/searchresult.svg"
                  alt="Placeholder"
                  className="w-6 h-6 mr-2"
                />
                <span>{item?.display_name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
