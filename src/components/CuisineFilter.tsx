import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  cuisines: string[];
  selected: string;
  onSelect: (cuisine: string) => void;
}

const CuisineFilter: React.FC<Props> = ({ cuisines, selected, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {cuisines.map(cuisine => {
        const active = selected === cuisine;

        return (
          <Pressable
            key={cuisine}
            onPress={() => onSelect(cuisine)}
            style={[styles.chip, active && styles.activeChip]}
          >
            <Text
              numberOfLines={1}
              style={[styles.text, active && styles.activeText]}
            >
              {cuisine}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 10,
    height: 60,
  },
  chip: {
    height: 38,
    minWidth: 65,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: '#E85D36',
    borderColor: '#E85D36',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
  },
  activeText: {
    color: '#FFFFFF',
  },
});

export default CuisineFilter;
