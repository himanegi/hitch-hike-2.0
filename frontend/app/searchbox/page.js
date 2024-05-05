"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdSearch } from "react-icons/md";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition,namespace } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchBoxRef = useRef(null);
  const resultsRef = useRef(null);

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
        setShowResults(true);
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleSelectPlace = (place) => {
    const feature = {
      geometry: { coordinates: [place.lon, place.lat] },
      properties: { name: place.display_name },
    };
    setSelectPosition(feature);
    setSearchText(place.display_name);
    setListPlace([]);
    setShowResults(false);
  };

  const handleClickOutside = (event) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target) &&
      resultsRef.current &&
      !resultsRef.current.contains(event.target)
    ) {
      setListPlace([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={searchBoxRef}
        className="flex items-center bg-white rounded-md hover:ring-2 hover:ring-indigo-500 transition-all duration-300 shadow-sm"
      >
        <input
          required={true}
          placeholder={namespace}
          className="flex-1 text-[15px] outline-none bg-transparent py-2 px-3 placeholder-gray-400 text-gray-800 transition-colors duration-300 focus:placeholder-gray-600"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button
          onClick={handleSearch}
          data-ripple-light="true"
          className=" mr-1 flex items-center justify-center bg-indigo-600 text-white rounded-md p-2 "
        >
          <MdSearch size={15} />
        </button>
      </div>
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute left-0 right-0 max-h-64 overflow-y-auto shadow-md rounded-md bg-white z-50"
          style={{
            maxWidth: "500px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <ul className="divide-y divide-gray-200">
            {listPlace.map((item) => (
              <li
                key={item?.place_id}
                className="transition-colors duration-300"
              >
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
          <style jsx>{`
            /* Customize the scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-track {
              background-color: #f1f1f1;
            }

            ::-webkit-scrollbar-thumb {
              background-color: #888;
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background-color: #555;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
