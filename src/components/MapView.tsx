import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MinibusLine } from '../data/mockData';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Minibus Icon
const minibusIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png', // A generic bus/minibus icon
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface MapViewProps {
  selectedLine: MinibusLine | null;
}

// Component to update map center when line changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);
  return null;
}

export default function MapView({ selectedLine }: MapViewProps) {
  const [minibusPositions, setMinibusPositions] = useState<[number, number][]>([]);

  // Simulate minibus movement
  useEffect(() => {
    if (!selectedLine) {
      setMinibusPositions([]);
      return;
    }

    // Initialize 3 minibuses at random points on the route
    const route = selectedLine.routeCoordinates;
    const initialIndices = [0, Math.floor(route.length / 2), route.length - 1];
    
    // State to track current index for each minibus
    let currentIndices = [...initialIndices];
    // Direction: 1 for forward, -1 for backward
    let directions = [1, 1, -1];

    const interval = setInterval(() => {
      const newPositions: [number, number][] = [];
      
      currentIndices = currentIndices.map((idx, i) => {
        let nextIdx = idx + directions[i];
        
        // Reverse direction if hitting ends
        if (nextIdx >= route.length) {
          nextIdx = route.length - 2;
          directions[i] = -1;
        } else if (nextIdx < 0) {
          nextIdx = 1;
          directions[i] = 1;
        }
        
        newPositions.push(route[nextIdx]);
        return nextIdx;
      });

      setMinibusPositions(newPositions);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [selectedLine]);

  const center: [number, number] = selectedLine 
    ? selectedLine.routeCoordinates[0] 
    : [38.4189, 27.1287]; // Default to Izmir center

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater center={center} />

      {selectedLine && (
        <>
          <Polyline 
            positions={selectedLine.routeCoordinates} 
            color="blue" 
            weight={5} 
            opacity={0.7} 
          />
          
          {/* Stops */}
          {selectedLine.stops.map((stop) => (
            <Marker key={stop.id} position={[stop.lat, stop.lng]}>
              <Popup>{stop.name}</Popup>
            </Marker>
          ))}

          {/* Moving Minibuses */}
          {minibusPositions.map((pos, idx) => (
            <Marker 
              key={`bus-${idx}`} 
              position={pos} 
              icon={minibusIcon}
              zIndexOffset={1000}
            >
              <Popup>Minibüs #{idx + 1} (Hız: {Math.floor(Math.random() * 30 + 20)} km/s)</Popup>
            </Marker>
          ))}
        </>
      )}
    </MapContainer>
  );
}
