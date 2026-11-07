// import { GEOAPIFY_API_KEY, GEOAPIFY_BASE_URL } from '../config/api';
import Config from 'react-native-config';
import { Restaurant } from '../types/restaurant';

export const fetchNearbyRestaurants = async (
  latitude: number,
  longitude: number,
): Promise<Restaurant[]> => {
  const params = new URLSearchParams({
    categories: 'catering.restaurant',
    filter: `circle:${longitude},${latitude},5000`,
    bias: `proximity:${longitude},${latitude}`,
    limit: '50',
    lang: 'en',
    apiKey: `${Config.GEOAPIFY_API_KEY}`,
  });

  console.log('API Key:', Config.GEOAPIFY_API_KEY);
  console.log('Base URL:', Config.GEOAPIFY_BASE_URL);

  const response = await fetch(
    `${Config.GEOAPIFY_BASE_URL}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('Unable to fetch restaurants.');
  }

  const data = await response.json();

  return data.features.map((feature: any) => {
    const properties = feature.properties;

    return {
      id: properties.place_id,
      name: properties.name || 'Unnamed Restaurant',
      address: properties.formatted || 'Address unavailable',
      latitude: properties.lat,
      longitude: properties.lon,
      distance: properties.distance,
      cuisine: properties.datasource?.raw?.cuisine || 'Other',
      categories: properties.categories || [],
    };
  });
};
