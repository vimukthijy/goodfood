import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { Restaurant } from '../types/restaurant';

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
}

const RestaurantCard: React.FC<Props> = ({ restaurant, onPress }) => {
  const distance =
    restaurant.distance != null
      ? restaurant.distance >= 1000
        ? `${(restaurant.distance / 1000).toFixed(1)} km`
        : `${Math.round(restaurant.distance)} m`
      : 'Unavailable';

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.card}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageIcon}>🍽️</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>

          <View style={styles.cuisineContainer}>
            <Text style={styles.cuisine}>
              {restaurant.cuisine || 'Restaurant'}
            </Text>
          </View>

          <Text style={styles.address} numberOfLines={2}>
            {restaurant.address}
          </Text>

          <View style={styles.divider} />

          <View style={styles.footer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.distance}>{distance} away</Text>
            </View>

            <Text style={styles.rating}>Rating unavailable</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: '#FFF0E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    fontSize: 52,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
  cuisineContainer: {
    alignSelf: 'flex-start',
    marginTop: 9,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFF0E9',
    borderRadius: 7,
  },
  cuisine: {
    color: '#E85D36',
    fontSize: 12,
    fontWeight: '600',
  },
  address: {
    color: '#777777',
    marginTop: 11,
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginTop: 15,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoIcon: {
    fontSize: 12,
  },
  distance: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },
  rating: {
    fontSize: 11,
    color: '#999999',
  },
});

export default RestaurantCard;
