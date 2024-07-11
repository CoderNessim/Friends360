import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import CustomLoader from '../../ui/CustomLoader';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { connectUser, crudOperations } from '../../utils/helpers';
import { StreamChat } from 'stream-chat';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 25.9561024,
  lng: -80.1710398,
};

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Map() {
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => crudOperations('users', 'getMe', 'GET'),
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  const navigationState = useNavigation();
  const streamToken = useLoaderData();
  connectUser(client, streamToken, user);

  if (isPending) return <CustomLoader />;
  if (navigationState === 'loading') return <CustomLoader />;

  return isLoaded ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </>
  ) : (
    <CustomLoader />
  );
}

export default Map;
