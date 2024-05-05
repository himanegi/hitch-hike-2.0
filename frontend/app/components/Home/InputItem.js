"use client";
import SearchBox from "../../searchbox/page";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

function InputItem({ type, map, onCoordinatesChange, onPlaceChange,namespace }) {
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
    const coordinatesString = feature.geometry.coordinates;
    const newCoordinates = coordinatesString.map((coord) => Number(coord));
    const newplaceName = feature.properties.name;

    console.log("place", newplaceName);
    console.log("coordinates", newCoordinates);

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
        type={type}
        namespace={namespace}
        selectPosition={value}
        setSelectPosition={(newValue) => {
          setValue(newValue);
          placeMarkerOnMap(newValue);
        }}
      />
    </div>
  );
}

export default InputItem;
