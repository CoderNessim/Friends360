import { Avatar } from '@mantine/core';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import styles from './CustomMarker.module.css';

function CustomMarker({ member }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <AdvancedMarker
      position={{
        lat: member.coordinates[0],
        lng: member.coordinates[1],
      }}
      ref={markerRef}
      onClick={handleMarkerClick}
    >
      <Avatar
        color="initials"
        name={member.username}
        allowedInitialsColors={['blue', 'red', 'green', 'purple', 'black']}
        key={member.username}
      />
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <div className={styles.infoWindow}>
            <div className={styles.headerContainer}>
              <Avatar
                color="initials"
                name={member.username}
                allowedInitialsColors={[
                  'blue',
                  'red',
                  'green',
                  'purple',
                  'black',
                ]}
                key={member.username}
                size={32}
              />
              <h2 className={styles.header}>{member.username}</h2>
            </div>
            <p className={styles.text}>
              Coordinates: {member.coordinates.join(', ')}
            </p>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
}

export default CustomMarker;
