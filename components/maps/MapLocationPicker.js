// =============================================================================
// 4. components/maps/MapLocationPicker.js - Interactive map for coordinates
// =============================================================================
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function MapLocationPicker({
  initialLocation,
  onLocationChange,
  className = "h-64",
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");

      const mapInstance = new Map(mapRef.current, {
        center: initialLocation,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      });

      const markerInstance = new Marker({
        position: initialLocation,
        map: mapInstance,
        draggable: true,
        title: "Project Location",
      });

      markerInstance.addListener("dragend", () => {
        const position = markerInstance.getPosition();
        const coords = {
          lat: position.lat(),
          lng: position.lng(),
        };
        onLocationChange(coords);
      });

      mapInstance.addListener("click", (event) => {
        const coords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        markerInstance.setPosition(coords);
        onLocationChange(coords);
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    };

    if (mapRef.current && !map) {
      initMap();
    }
  }, [initialLocation, onLocationChange, map]);

  return (
    <div
      className={`${className} rounded-lg overflow-hidden border border-gray-300`}
    >
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
