import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

function MapboxRoute({ map, sourceCoordinates, destinationCoordinates }) {
  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    const fetchRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinates[0]},${sourceCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?geometries=geojson&overview=full&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes.length > 0) {
          const route = data.routes[0];
          const routeGeoJson = route.geometry;

          // Add route as a source
          map.addSource("route", {
            type: "geojson",
            data: routeGeoJson,
          });

          // Add route as a layer
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#000000",
              "line-width": 4,
            },
          });

          // Calculate bounds to include both source and destination
          const bounds = new mapboxgl.LngLatBounds();
          bounds.extend(sourceCoordinates);
          bounds.extend(destinationCoordinates);

          // Adjust map view to fit bounds
          map.fitBounds(bounds, {
            padding: 120, // Add some padding around the bounds
          });

          // Reset the error state if a route is successfully fetched
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        // Set an error state on fetch error
        setError("An error occurred while fetching the route.");
      }
    };

    fetchRoute();
  }, [map, sourceCoordinates, destinationCoordinates]); // Add sourceCoordinates and destinationCoordinates as dependencies

  // Conditionally render the error message
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return null; // This component doesn't render anything itself
}

export default MapboxRoute;
