"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export function MapSection({ onMapChange }) {
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
            if (mapContainerRef.current) {
              // Clear the container element before rendering the map
              mapContainerRef.current.innerHTML = "";

              const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
                center: [longitude, latitude], // Set map center to user's location
                zoom: 14,
              });
              setMap(map);
              onMapChange(map);
            }
          },
          (error) => {
            console.error("Error getting user's location:", error);
            // Fallback to default location if user's location is not available
            if (mapContainerRef.current) {
              // Clear the container element before rendering the map
              mapContainerRef.current.innerHTML = "";

              const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
                center: [-70.9, 42.35], // Default location
                zoom: 14,
              });
              setMap(map);
            }
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.error("Geolocation is not supported by this browser.");
        // Fallback to default location
        if (mapContainerRef.current) {
          // Clear the container element before rendering the map
          mapContainerRef.current.innerHTML = "";

          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
            center: [-70.9, 42.35], // Default location
            zoom: 14,
          });
          setMap(map);
        }
      }
    };

    getUserLocation();

    return () => map && map.remove(); // Clean up the map instance on component unmount
  }, []);

  return (
    <div>
      <div
        className="col-span-3 shadow-md rounded-lg p-6 transition-all duration-300 hover:ring-2 hover:ring-indigo-500 overflow-hidden"
        ref={mapContainerRef}
        style={{ height: "630px" }}
      />
    </div>
  );
}

export default MapSection;
