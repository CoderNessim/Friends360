import { Loader } from '@mantine/core';
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 25.9561024,
  lng: -80.1710398,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  return isLoaded ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </>
  ) : (
    <Loader />
  );
}

export default Map;
