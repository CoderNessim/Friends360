import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 25.9561024,
  lng: -80.1710398,
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
      //may need to add more libraries
      libraries={['maps', 'marker']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        mapId="DEMO_MAP_ID"
      >
        <Marker position={center} title="My location" />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
