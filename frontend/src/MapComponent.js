import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function LocationMarker({ position, onLocationClick }) {
  useMapEvents({
    click(e) {
      onLocationClick(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapComponent({ position, onLocationClick }) {
  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Default to San Francisco
      zoom={10}
      style={{ height: '400px', width: '100%', maxWidth: '800px', margin: '0 auto' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} onLocationClick={onLocationClick} />
    </MapContainer>
  );
}

export default MapComponent;
