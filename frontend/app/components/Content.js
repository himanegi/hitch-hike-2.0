"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import SearchSection from "./Home/SearchSection";

export function Content() {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    // Function to get user's current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const map = new mapboxgl.Map({
              container: mapContainerRef.current,
              style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
              center: [longitude, latitude], // Set map center to user's location
              zoom: 14,
            });

            setMap(map);
          },
          (error) => {
            console.error("Error getting user's location:", error);
            // Fallback to default location if user's location is not available
            const map = new mapboxgl.Map({
              container: mapContainerRef.current,
              style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
              center: [-70.9, 42.35], // Default location
              zoom: 14,
            });

            setMap(map);
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.error("Geolocation is not supported by this browser.");
        // Fallback to default location
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
          center: [-70.9, 42.35], // Default location
          zoom: 14,
        });

        setMap(map);
      }
    };

    getUserLocation();

    return () => map && map.remove();
  }, []);

  return (
    <div className="p-6 pb-5 grid grid-cols-1 md:grid-cols-4 gap-5">
      <div>
        <SearchSection map={map} />
      </div>
      <div
        className="col-span-3 border-2 border-black rounded-xl overflow-hidden"
        ref={mapContainerRef}
        style={{ height: "650px" }}
      />
    </div>
  );
}

export default Content;
