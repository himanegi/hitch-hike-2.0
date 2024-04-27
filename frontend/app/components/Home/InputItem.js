"use client";
import { SearchBox } from "@mapbox/search-js-react";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

function InputItem({ type, map, onCoordinatesChange, onPlaceChange }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [marker, setMarker] = useState(null); // State to store the marker reference

  useEffect(() => {
    type === "source"
      ? setPlaceholder("Input Source")
      : setPlaceholder("Input Destination");
  }, [type]);

  const placeMarkerOnMap = (feature) => {
    // Check if map instance is available
    if (!map) {
      console.error("Map instance not available!");
      return;
    }

    // Get the new coordinates from the selected feature
    const newCoordinates = feature.geometry.coordinates;
    const newplaceName = feature.properties.name;

    // Call the callback with the new coordinates
    onCoordinatesChange(newCoordinates);
    // Call the callback with the new place name
    onPlaceChange(newplaceName);

    // Remove the existing marker, if any
    if (marker) {
      marker.remove();
    }
    // Create a new marker with the updated coordinates
    const newMarker = new mapboxgl.Marker()
      .setLngLat(newCoordinates)
      .addTo(map);
    setMarker(newMarker); // Store the new marker reference in state
  };
  return (
    <div className=" p-1 mt-3 gap-3 border-black">
      <SearchBox
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        placeholder={placeholder}
        value={value}
        onChange={(v) => {
          setValue(v);
          console.log("change", v);
        }}
        onSuggest={(res) => console.log("suggest", res)}
        onSuggestError={(err) => console.log("error", err)}
        onRetrieve={(results) => {
          placeMarkerOnMap(results.features[0]);
        }}
        map={map}
        theme={{
          variables: {
            unit: "16px",
            padding: "0.5rem 1rem",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "0.5rem",
          },
          icons:
            type === "source"
              ? {
                  search: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>`,
                }
              : {
                  search: `<?xml version="1.0" encoding="utf-8"?>

                  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="796 796 200 200" enable-background="new 796 796 200 200" xml:space="preserve">
                  <path d="M970.135,870.134C970.135,829.191,936.943,796,896,796c-40.944,0-74.135,33.191-74.135,74.134
                    c0,16.217,5.221,31.206,14.055,43.41l-0.019,0.003L896,996l60.099-82.453l-0.019-0.003
                    C964.912,901.34,970.135,886.351,970.135,870.134z M896,900.006c-16.497,0-29.871-13.374-29.871-29.872s13.374-29.871,29.871-29.871
                    s29.871,13.373,29.871,29.871S912.497,900.006,896,900.006z"/>
                  </svg>`,
                },
          cssText: `
            .Input {
              border-radius:0.4rem;
              border:1px solid rgb(107 114 128);
              width: 100%;
            }
            .Input:focus {
              border: 2px solid black;
              border-radius:0.4rem;
            }

            .Results {
              background-color: white;
              border: 2px solid black;
            }
          `,
        }}
      />
    </div>
  );
}

export default InputItem;
