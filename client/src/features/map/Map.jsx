import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import CustomLoader from '../../ui/CustomLoader';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { connectUser } from '../../utils/helpers';
import { StreamChat } from 'stream-chat';
import GroupSelect from '../groups/GroupSelect';
import styles from './Map.module.css';
import { Button } from '@mantine/core';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetGroups } from '../../hooks/useGetGroups';
import { useGeolocation } from './useGeolocation';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Map() {
  const { user, isUserPending } = useGetUser();
  const { groups, isGroupsPending } = useGetGroups();
  const groupNames = groups?.map((group) => group.name);
  const {
    position,
    getPosition,
    isLoading: isPositionLoading,
    error,
  } = useGeolocation();
  if (!isPositionLoading) {
    console.log(position);
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  const navigationState = useNavigation();
  const streamToken = useLoaderData();
  connectUser(client, streamToken, user);

  if (isGroupsPending || isUserPending) return <CustomLoader />;
  if (navigationState === 'loading') return <CustomLoader />;

  return isLoaded || isPositionLoading ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <div className={styles.groupSelect}>
          <GroupSelect groupNames={groupNames} showLabel={false} />
        </div>
        <div className={styles.checkIn}>
          <Button
            radius="xl"
            fullWidth
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={() => getPosition()}
          >
            Check in
          </Button>
        </div>
      </GoogleMap>
    </>
  ) : (
    <CustomLoader />
  );
}

export default Map;
