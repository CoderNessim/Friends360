import CustomLoader from '../../ui/CustomLoader';
import { useLoaderData } from 'react-router-dom';
import { connectUser } from '../../utils/helpers';
import { StreamChat } from 'stream-chat';
import styles from './Map.module.css';
import { Avatar, Button } from '@mantine/core';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetGroups } from '../../hooks/useGetGroups';
import { useGeolocation } from './useGeolocation';
import Error from '../../ui/Error';
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
} from '@vis.gl/react-google-maps';
import GroupSelect from '../groups/GroupSelect';
import { useGroupProvider } from '../../context/GroupContext';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Map() {
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
  } = useGeolocation({ lat: user.coordinates[0], lng: user.coordinates[1] });
  if (isPositionLoading) {
    console.log(position);
  }

  const streamToken = useLoaderData();
  connectUser(client, streamToken, user);
  console.log(currentGroup?.members);
  if (isGroupsPending || isUserPending) return <CustomLoader />;
  if (error) return <Error customErrorMessage={error} />;
  return !isPositionLoading ? (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <GoogleMap
          style={containerStyle}
          defaultCenter={position}
          defaultZoom={8}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
        >
          {currentGroup?.members.map((member) => (
            <AdvancedMarker
              position={{
                lat: member.coordinates[0],
                lng: member.coordinates[1],
              }}
              key={member.id}
            >
              <Avatar
                color="initials"
                name={member.username}
                allowedInitialsColors={['blue', 'red', 'green']} // Add more colors as needed
                key={member.username}
              />
            </AdvancedMarker>
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
