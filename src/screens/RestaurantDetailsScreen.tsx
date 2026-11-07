import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'RestaurantDetails'>;

const RestaurantDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const showDirections = async () => {
    const { latitude, longitude } = restaurant;

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      Alert.alert(
        'Location unavailable',
        'Directions are not available for this restaurant.',
      );
      return;
    }

    const mapsUrl =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${latitude},${longitude}` +
      `&travelmode=driving`;

    try {
      await Linking.openURL(mapsUrl);
    } catch (error) {
      Alert.alert(
        'Unable to open Maps',
        'Please make sure Google Maps or a supported browser is installed.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Restaurant Details</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Restaurant image placeholder */}
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>🍽️</Text>
        </View>

        {/* Restaurant information */}
        <View style={styles.content}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>

          <Text style={styles.cuisine}>
            {restaurant.cuisine || 'Restaurant'}
          </Text>

          <View style={styles.divider} />

          {/* Address */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>
              {restaurant.address || 'Address unavailable'}
            </Text>
          </View>

          {/* Distance */}
          {typeof restaurant.distance === 'number' && (
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>
                {(restaurant.distance / 1000).toFixed(2)} km away
              </Text>
            </View>
          )}

          {/* Coordinates */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>
              {restaurant.latitude}, {restaurant.longitude}
            </Text>
          </View>

          {/* Directions button */}
          <Pressable style={styles.directionsButton} onPress={showDirections}>
            <Text style={styles.directionsButtonText}>↗ Show Directions</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 36,
    color: '#222222',
    lineHeight: 40,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
  headerSpacer: {
    width: 40,
  },
  imageContainer: {
    height: 230,
    backgroundColor: '#FCE9E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 75,
  },
  content: {
    padding: 20,
  },
  restaurantName: {
    fontSize: 25,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 15,
    color: '#E85D36',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 22,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 23,
  },
  directionsButton: {
    height: 54,
    backgroundColor: '#E85D36',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  directionsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RestaurantDetailsScreen;
