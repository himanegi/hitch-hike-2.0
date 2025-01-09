"use client";
import SearchBox from "../../searchbox/page";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

function InputItem({
  type,
  map,
  onCoordinatesChange,
  onPlaceChange,
  namespace,
}) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [marker, setMarker] = useState(null); // State to store the marker reference

  useEffect(() => {
    type === "source"
      ? setPlaceholder("Input Source")
      : setPlaceholder("Input Destination");
  }, [type]);

  const placeMarkerOnMap = (feature) => {
    if (!map) {
      console.error("Map instance not available!");
      return;
    }

    const coordinatesString = feature.geometry.coordinates;
    const newCoordinates = coordinatesString.map((coord) => Number(coord));
    const newplaceName = feature.properties.name;

    console.log("place", newplaceName);
    console.log("coordinates", newCoordinates);

    onCoordinatesChange(newCoordinates);
    onPlaceChange(newplaceName);

    if (marker) {
      marker.remove();
    }

    const newMarker = new mapboxgl.Marker()
      .setLngLat(newCoordinates)
      .addTo(map);
    setMarker(newMarker);
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
