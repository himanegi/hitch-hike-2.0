"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export function MapSection({ onMapChange }) {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (mapContainerRef.current) {
              mapContainerRef.current.innerHTML = "";

              const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
                center: [longitude, latitude],
                zoom: 14,
              });
              setMap(map);
              onMapChange(map);
            }
          },
          (error) => {
            console.error("Error getting user's location:", error);
            if (mapContainerRef.current) {
              mapContainerRef.current.innerHTML = "";

              const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
                center: [-70.9, 42.35],
                zoom: 14,
              });
              setMap(map);
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = "";

          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/himanegi/clv9llq4j00q901ocgx2a6new",
            center: [-70.9, 42.35],
            zoom: 14,
          });
          setMap(map);
        }
      }
    };

    getUserLocation();

    return () => map && map.remove();
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
