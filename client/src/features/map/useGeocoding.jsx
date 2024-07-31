import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function useGeocoding(lat, lng) {
  const geocodingApiLoaded = useMapsLibrary('geocoding');
  console.log(geocodingApiLoaded);
  const [address, setAddress] = useState('');
  const [geocodingService, setGeocodingService] = useState();

  useEffect(() => {
    if (!geocodingApiLoaded) {
      console.error('Google Maps API not loaded');
      return;
    }
    setGeocodingService(new window.google.maps.Geocoder());
    console.log('Geocoding service set:', new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);
  useEffect(() => {
    if (!geocodingService) return;
    console.log('Geocoding service initialized');

    const geocode = async () => {
      console.log('Geocoding coordinates:', lat, lng);
      geocodingService.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (results && status === 'OK') {
            console.log('Geocoding results:', results);
            setAddress(results[0].formatted_address);
          } else {
            console.error(
              'Geocode was not successful for the following reason: ' + status
            );
          }
        }
      );
    };

    geocode();
  }, [geocodingService, lat, lng]);

  return address;
}
