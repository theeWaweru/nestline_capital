// lib/maps.js - Google Maps utilities
export const MAP_STYLES = {
  satellite: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
  terrain: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export const PLOT_MARKER_COLORS = {
  available: "#22c55e", // Green
  requested: "#f59e0b", // Orange
  confirmed: "#3b82f6", // Blue
  sold: "#ef4444", // Red
};

export function createPlotMarker(plot, map) {
  const marker = new google.maps.Marker({
    position: { lat: plot.coordinates.lat, lng: plot.coordinates.lng },
    map: map,
    title: `Plot ${plot.plotId} - ${plot.status}`,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: PLOT_MARKER_COLORS[plot.status],
      fillOpacity: 0.8,
      scale: 8,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    },
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px; font-family: 'Quicksand', sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937;">Plot ${plot.plotId}</h3>
        <p style="margin: 4px 0; color: #6b7280;"><strong>Size:</strong> ${
          plot.sizeInAcres
        } acres</p>
        <p style="margin: 4px 0; color: #6b7280;"><strong>Price:</strong> KSh ${plot.price.toLocaleString()}</p>
        <p style="margin: 4px 0; color: #6b7280;"><strong>Location:</strong> ${
          plot.location
        }</p>
        <p style="margin: 4px 0;"><span style="background: ${
          PLOT_MARKER_COLORS[plot.status]
        }; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${
      plot.status
    }</span></p>
      </div>
    `,
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  return marker;
}

export function calculateMapBounds(plots) {
  if (!plots.length) return null;

  const bounds = new google.maps.LatLngBounds();
  plots.forEach((plot) => {
    bounds.extend(
      new google.maps.LatLng(plot.coordinates.lat, plot.coordinates.lng)
    );
  });
  return bounds;
}
