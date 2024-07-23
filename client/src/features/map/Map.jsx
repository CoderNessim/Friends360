import CustomLoader from '../../ui/CustomLoader';
import { useLoaderData } from 'react-router-dom';
import { connectUser } from '../../utils/helpers';
import { StreamChat } from 'stream-chat';
import styles from './Map.module.css';
import { Button } from '@mantine/core';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetGroups } from '../../hooks/useGetGroups';
import { useGeolocation } from './useGeolocation';
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
} from '@vis.gl/react-google-maps';
import GroupSelect from '../groups/GroupSelect';

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
  } = useGeolocation({ lat: user.coordinates[0], lng: user.coordinates[1] });
  if (!isPositionLoading) {
    console.log(position);
  }

  const streamToken = useLoaderData();
  connectUser(client, streamToken, user);

  if (isGroupsPending || isUserPending) return <CustomLoader />;

  return !isPositionLoading ? (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <GoogleMap
          style={containerStyle}
          defaultCenter={position}
          defaultZoom={8}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
        >
          <AdvancedMarker position={position}></AdvancedMarker>
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
      </APIProvider>
    </>
  ) : (
    <CustomLoader />
  );
}

export default Map;
