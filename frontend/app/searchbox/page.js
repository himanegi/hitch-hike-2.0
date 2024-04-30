"use client";
import React, { useState } from "react";

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
        coordinates: [place.lon, place.lat], // Longitude, Latitude
      },
      properties: {
        name: place.display_name,
      },
    };
    setSelectPosition(feature);
    setSearchText(place.display_name); // Set the selected place as the search input value
    setListPlace([]); // Clear the search results
  };

  return (
    <>
      <div className="flex mb-4">
        <div className="flex-1 mr-2">
          <input
            placeholder="Search for a place"
            className="w-full border border-gray-500 rounded-md py-2 px-3"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 border-black border-[2px] text-white font-thin py-2 px-4 rounded-md transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <ul>
          {listPlace.map((item) => (
            <li key={item?.place_id}>
              <div
                onClick={() => handleSelectPlace(item)}
                className="hover:bg-gray-100 cursor-pointer py-2 px-4 flex items-center"
              >
                <img
                  src="/searchresult.svg"
                  alt="Placeholder"
                  className="w-8 h-8 mr-2"
                />
                <span>{item?.display_name}</span>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
