import { Avatar } from '@mantine/core';
import {
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import styles from './CustomMarker.module.css';
import HeaderContent from './HeaderContent';

function CustomMarker({ member }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const map = useMap();

  const handleMarkerClick = useCallback(() => {
    setInfoWindowShown((isShown) => !isShown);
    if (map) {
      map.panTo({ lat: member.coordinates[0], lng: member.coordinates[1] });
      map.setZoom(15); // Adjust zoom level as desired
    }
  }, [map, member.coordinates]);

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <AdvancedMarker
      position={{
        lat: member.coordinates[0],
        lng: member.coordinates[1],
      }}
      ref={markerRef}
      collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
      onClick={handleMarkerClick}
    >
      <Avatar
        color="initials"
        className={styles.avatar}
        name={member.username}
        allowedInitialsColors={['blue', 'red', 'purple', 'black']}
        key={member.username}
      />
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          onClose={handleClose}
          shouldFocus={true}
          headerContent={<HeaderContent member={member} />}
        >
          <div className={styles.infoWindow}>
            <p className={styles.text}>Location: {member.location}</p>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
}

export default CustomMarker;
