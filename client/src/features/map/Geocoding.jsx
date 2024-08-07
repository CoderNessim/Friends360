import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { crudOperations } from '../../utils/helpers';
import { useQueryClient } from '@tanstack/react-query';

//this must be a component because it needs to be the child of the APIprovider
export function Geocoding({ lat, lng, address, setAddress, position }) {
  const queryClient = useQueryClient();
  const geocodingApiLoaded = useMapsLibrary('geocoding');
  const [geocodingService, setGeocodingService] = useState();
  useEffect(() => {
    if (!geocodingApiLoaded) return;

    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);
  useEffect(() => {
    if (!geocodingService) return;
    if(!lat || !lng) return;
    const geocode = async () => {
      geocodingService.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (results && status === 'OK') {
            setAddress(results[0].formatted_address);
          } else {
            toast.error(
              'Geocode was not successful for the following reason:',
              status
            );
          }
        }
      );
      await crudOperations('users', 'updateAddress', 'PATCH', {
        location: address,
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    };

    geocode();
  }, [geocodingService, lat, lng, setAddress, position, address]);

  return null;
}
