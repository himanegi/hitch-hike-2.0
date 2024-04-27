import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useState } from "react";

function MapboxRoute({
  map,
  sourceCoordinates,
  destinationCoordinates,
  routeId,
}) {
  const [error, setError] = useState(null); // Initialize error state
  const sourceIdRef = useRef(
    `route-${routeId}-${sourceCoordinates.join(
      "-"
    )}-${destinationCoordinates.join("-")}`
  );
  const layerIdRef = useRef(
    `route-${routeId}-${sourceCoordinates.join(
      "-"
    )}-${destinationCoordinates.join("-")}-line`
  );

  useEffect(() => {
    if (map && sourceCoordinates && destinationCoordinates) {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinates[0]},${sourceCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?geometries=geojson&overview=full&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`;

      const fetchRoute = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.routes.length > 0) {
            const route = data.routes[0];
            const routeGeoJson = route.geometry;

            // Check if the source already exists, if not, add it
            if (!map.getSource(sourceIdRef.current)) {
              map.addSource(sourceIdRef.current, {
                type: "geojson",
                data: routeGeoJson,
              });
            }

            // Check if the layer already exists, if not, add it
            if (!map.getLayer(layerIdRef.current)) {
              map.addLayer({
                id: layerIdRef.current,
                type: "line",
                source: sourceIdRef.current,
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
                padding: 80, // Add some padding around the bounds
              });

              // Reset the error state if a route is successfully fetched
              setError(null);
            }
          }
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      };

      fetchRoute();
    }
  }, [map, sourceCoordinates, destinationCoordinates, routeId]);

  return null;
}

export default MapboxRoute;
