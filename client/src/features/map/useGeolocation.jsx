import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { crudOperations } from '../../utils/helpers';
import { useQueryClient } from '@tanstack/react-query';

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  console.log(defaultPosition);
  async function getPosition(onClick = false) {
    if (!navigator.geolocation) {
      alert('Your browser does not support geolocation');
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(newPosition);
        setIsLoading(false);

        try {
          await crudOperations('users', 'updateCoords', 'PATCH', {
            coordinates: [newPosition.lat, newPosition.lng],
          });
          queryClient.invalidateQueries({ queryKey: ['users'] });
          queryClient.invalidateQueries({ queryKey: ['groups'] });
          if (onClick) toast.success('Location updated');
        } catch (err) {
          toast.error(err.message);
        }
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  useEffect(() => {
    getPosition();
  }, []);

  return { isLoading, position, error, getPosition };
}
