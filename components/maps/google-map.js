// =============================================================================
// 7. components/maps/google-map.js
// =============================================================================
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { createPlotMarker, calculateMapBounds, MAP_STYLES } from "@/lib/maps";

export default function GoogleMap({
  plots = [],
  center = { lat: -1.2921, lng: 36.8219 }, // Default to Nairobi
  zoom = 10,
  onPlotClick = null,
  className = "",
}) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapType, setMapType] = useState("roadmap");

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const mapInstance = new Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: mapType,
        styles: MAP_STYLES[mapType] || [],
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER,
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      setMap(mapInstance);
    };

    if (mapRef.current && !map) {
      initMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, zoom, mapType]);

  // Update markers when plots change
  useEffect(() => {
    if (map && plots.length > 0) {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));

      // Create new markers
      const newMarkers = plots.map((plot) => {
        const marker = createPlotMarker(plot, map);

        if (onPlotClick) {
          marker.addListener("click", () => onPlotClick(plot));
        }

        return marker;
      });

      markersRef.current = newMarkers;
      setMarkers(newMarkers);

      // Fit map to show all plots
      const bounds = calculateMapBounds(plots);
      if (bounds) {
        map.fitBounds(bounds);
      }
    }
  }, [map, plots, onPlotClick]);

  // Map type toggle controls
  const MapControls = () => (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2">
      <div className="flex gap-2">
        <button
          onClick={() => setMapType("roadmap")}
          className={`px-3 py-1 text-sm rounded ${
            mapType === "roadmap"
              ? "bg-sage-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Roadmap
        </button>
        <button
          onClick={() => setMapType("satellite")}
          className={`px-3 py-1 text-sm rounded ${
            mapType === "satellite"
              ? "bg-sage-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => setMapType("terrain")}
          className={`px-3 py-1 text-sm rounded ${
            mapType === "terrain"
              ? "bg-sage-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Terrain
        </button>
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <MapControls />
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}
