import { Avatar } from '@mantine/core';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';

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
          <h2>{member.username}</h2>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
}

export default CustomMarker;
