import CustomLoader from '../../ui/CustomLoader';
import { useLoaderData } from 'react-router-dom';
import { connectUser } from '../../utils/helpers';
import { StreamChat } from 'stream-chat';
import styles from './Map.module.css';
import { Button } from '@mantine/core';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetGroups } from '../../hooks/useGetGroups';
import { useGeolocation } from './useGeolocation';
import Error from '../../ui/Error';
import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import GroupSelect from '../groups/GroupSelect';
import { useGroupProvider } from '../../context/GroupContext';
import CustomMarker from './CustomMarker';
import { useState } from 'react';
import { Geocoding } from './Geocoding';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Map() {
  const [address, setAddress] = useState('');
  const { user, isUserPending } = useGetUser();
  const { groups, isGroupsPending } = useGetGroups();
  const { currentGroupIndex } = useGroupProvider();
  let currentGroup = {};
  if (groups) currentGroup = groups[currentGroupIndex];
  const groupNames = groups?.map((group) => group?.name);
  const {
    position,
    getPosition,
    isLoading: isPositionLoading,
    error,
  } = useGeolocation({ lat: user?.coordinates[0], lng: user?.coordinates[1] });
  const streamToken = useLoaderData();
  connectUser(client, streamToken, user);
  if (isGroupsPending || isUserPending) return <CustomLoader />;
  if (error) return <Error customErrorMessage={error} />;
  return !isPositionLoading ? (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <Geocoding
          lat={position.lat}
          lng={position.lng}
          address={address}
          setAddress={setAddress}
          position={position}
        />
        <GoogleMap
          style={containerStyle}
          defaultCenter={position}
          defaultZoom={8}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
        >
          {currentGroup?.members.map((member) => (
            <CustomMarker member={member} key={member.id} />
          ))}
          <div className={styles.groupSelect}>
            <GroupSelect groupNames={groupNames} showLabel={false} />
          </div>
          <div className={styles.checkIn}>
            <Button
              radius="xl"
              fullWidth
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              onClick={() => getPosition(true)}
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
