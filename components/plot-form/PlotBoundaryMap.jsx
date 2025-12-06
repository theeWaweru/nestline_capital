// components/plot-form/PlotBoundaryMap.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { AlertCircle, Map as MapIcon } from "lucide-react";

export default function PlotBoundaryMap({ coordinates, className = "" }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [polygon, setPolygon] = useState(null);
    const [mapError, setMapError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const hasValidCoordinates = () => {
        return (
            coordinates?.corner1?.lat &&
            coordinates?.corner1?.lng &&
            coordinates?.corner2?.lat &&
            coordinates?.corner2?.lng &&
            coordinates?.corner3?.lat &&
            coordinates?.corner3?.lng &&
            coordinates?.corner4?.lat &&
            coordinates?.corner4?.lng
        );
    };

    useEffect(() => {
        const initMap = async () => {
            try {
                setIsLoading(true);
                const loader = new Loader({
                    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                    version: "weekly",
                });

                await loader.importLibrary("maps");
                await loader.importLibrary("marker");

                const defaultCenter = { lat: -1.2921, lng: 36.8219 };

                const mapInstance = new google.maps.Map(mapRef.current, {
                    center: defaultCenter,
                    zoom: 15,
                    mapTypeId: "satellite",
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                        position: google.maps.ControlPosition.TOP_RIGHT,
                        mapTypeIds: ["roadmap", "satellite", "terrain"],
                    },
                    streetViewControl: false,
                    fullscreenControl: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_CENTER,
                    },
                });

                setMap(mapInstance);
                setMapError(null);
                setIsLoading(false);
            } catch (error) {
                console.error("Error initializing map:", error);
                setMapError("Failed to load map.");
                setIsLoading(false);
            }
        };

        if (mapRef.current && !map) {
            initMap();
        }
    }, [map]);

    useEffect(() => {
        if (!map || !hasValidCoordinates()) return;

        try {
            markers.forEach((marker) => marker.setMap(null));
            if (polygon) polygon.setMap(null);

            const corners = [
                {
                    lat: parseFloat(coordinates.corner1.lat),
                    lng: parseFloat(coordinates.corner1.lng),
                    label: "1",
                    title: "Corner 1",
                },
                {
                    lat: parseFloat(coordinates.corner2.lat),
                    lng: parseFloat(coordinates.corner2.lng),
                    label: "2",
                    title: "Corner 2",
                },
                {
                    lat: parseFloat(coordinates.corner3.lat),
                    lng: parseFloat(coordinates.corner3.lng),
                    label: "3",
                    title: "Corner 3",
                },
                {
                    lat: parseFloat(coordinates.corner4.lat),
                    lng: parseFloat(coordinates.corner4.lng),
                    label: "4",
                    title: "Corner 4",
                },
            ];

            const newMarkers = corners.map((corner) => {
                const marker = new google.maps.Marker({
                    position: { lat: corner.lat, lng: corner.lng },
                    map: map,
                    title: corner.title,
                    label: {
                        text: corner.label,
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                    },
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: "#dc2626",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                        scale: 10,
                    },
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `
            <div style="padding: 8px;">
              <strong>${corner.title}</strong><br/>
              Lat: ${corner.lat.toFixed(6)}<br/>
              Lng: ${corner.lng.toFixed(6)}
            </div>
          `,
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });

                return marker;
            });

            const polygonPath = [
                { lat: corners[0].lat, lng: corners[0].lng },
                { lat: corners[1].lat, lng: corners[1].lng },
                { lat: corners[2].lat, lng: corners[2].lng },
                { lat: corners[3].lat, lng: corners[3].lng },
                { lat: corners[0].lat, lng: corners[0].lng },
            ];

            const newPolygon = new google.maps.Polygon({
                paths: polygonPath,
                strokeColor: "#dc2626",
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: "#dc2626",
                fillOpacity: 0.15,
                strokePattern: [
                    { icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 3 }, offset: "0", repeat: "10px" }
                ],
            });

            newPolygon.setMap(map);

            const bounds = new google.maps.LatLngBounds();
            corners.forEach((corner) => {
                bounds.extend({ lat: corner.lat, lng: corner.lng });
            });

            map.fitBounds(bounds, { padding: 50 });

            setMarkers(newMarkers);
            setPolygon(newPolygon);
        } catch (error) {
            console.error("Error updating map:", error);
            setMapError("Invalid coordinates.");
        }
    }, [map, coordinates]);

    if (mapError) {
        return (
            <div className={`${className} bg-red-50 border border-red-200 rounded-lg p-6`}>
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                        <p className="text-sm font-semibold text-red-900">Map Error</p>
                        <p className="text-sm text-red-700">{mapError}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${className} relative`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
                    <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-[#5c8a75] border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Loading map...</p>
                    </div>
                </div>
            )}

            <div
                ref={mapRef}
                className="w-full h-full rounded-lg border-2 border-gray-300"
                style={{ minHeight: "400px" }}
            />

            {!hasValidCoordinates() && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg">
                    <div className="text-center p-6">
                        <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-900 mb-1">Plot Boundary Preview</p>
                        <p className="text-sm text-gray-600">
                            Enter all 4 corner coordinates to see the plot boundary
                        </p>
                    </div>
                </div>
            )}

            {hasValidCoordinates() && !isLoading && (
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-white"></div>
                        <span className="text-gray-700">Corner Markers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 border-t-2 border-red-600 border-dashed"></div>
                        <span className="text-gray-700">Plot Boundary</span>
                    </div>
                </div>
            )}
        </div>
    );
}