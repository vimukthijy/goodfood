import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

import SearchBar from '../components/SearchBar';
import CuisineFilter from '../components/CuisineFilter';
import RestaurantCard from '../components/RestaurantCard';

import { useLocation } from '../hooks/useLocation';
import { fetchNearbyRestaurants } from '../services/geoapify';
import { Restaurant } from '../types/restaurant';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const { getCurrentLocation } = useLocation();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const location = await getCurrentLocation();

      const results = await fetchNearbyRestaurants(
        location.latitude,
        location.longitude,
      );

      setRestaurants(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load restaurants.',
      );
    } finally {
      setLoading(false);
    }
  }, [getCurrentLocation]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  const cuisines = useMemo(() => {
    const uniqueCuisines = Array.from(
      new Set(restaurants.map(item => item.cuisine || 'Other').filter(Boolean)),
    ).sort();

    return ['All', ...uniqueCuisines];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch = [
        restaurant.name,
        restaurant.address,
        restaurant.cuisine || '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCuisine =
        selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;

      return matchesSearch && matchesCuisine;
    });
  }, [restaurants, search, selectedCuisine]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>Restaurant Finder</Text>

            <Text style={styles.location}>
              📍 Restaurants near your current location
            </Text>
          </View>

          <Pressable
            style={styles.refreshButton}
            onPress={loadRestaurants}
            disabled={loading}
          >
            <Text style={styles.refreshText}>↻</Text>
          </Pressable>
        </View>

        <View style={styles.searchContainer}>
          <SearchBar value={search} onChangeText={setSearch} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore cuisines</Text>
        </View>

        <CuisineFilter
          cuisines={cuisines}
          selected={selectedCuisine}
          onSelect={setSelectedCuisine}
        />
      </View>

      <View style={styles.restaurantSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby restaurants</Text>

          <Text style={styles.count}>{filteredRestaurants.length} found</Text>
        </View>

        {loading && restaurants.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#E85D36" />
            <Text style={styles.message}>Finding restaurants near you...</Text>
          </View>
        ) : error && restaurants.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>

            <Pressable style={styles.retryButton} onPress={loadRestaurants}>
              <Text style={styles.retryText}>Try again</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={filteredRestaurants}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <RestaurantCard
                restaurant={item}
                onPress={() =>
                  navigation.navigate('RestaurantDetails', {
                    restaurant: item,
                  })
                }
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={loadRestaurants}
                tintColor="#E85D36"
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🍽️</Text>
                <Text style={styles.emptyTitle}>No restaurants found</Text>
                <Text style={styles.message}>
                  Try another search or cuisine filter.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222222',
  },
  location: {
    fontSize: 12,
    color: '#888888',
    marginTop: 6,
  },
  refreshButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFF0E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshText: {
    fontSize: 25,
    color: '#E85D36',
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
  count: {
    fontSize: 12,
    color: '#888888',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    color: '#888888',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
  },
  error: {
    color: '#D93636',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 18,
    backgroundColor: '#E85D36',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 45,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginTop: 12,
  },
  restaurantSection: {
    flex: 1,
  },
});

export default HomeScreen;
