import { useCallback, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

const requestPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return new Promise(resolve => {
      Geolocation.requestAuthorization(
        () => resolve(true),
        () => resolve(false),
      );
    });
  }

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const useLocation = () => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = useCallback(async (): Promise<UserLocation> => {
    setLoading(true);
    try {
      if (!(await requestPermission())) {
        throw new Error('Location permission denied.');
      }

      return await new Promise<UserLocation>((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(userLocation);
            resolve(userLocation);
          },
          error => reject(new Error(error.message)),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, loading, getCurrentLocation };
};
