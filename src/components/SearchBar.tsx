import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>⌕</Text>

      <TextInput
        style={styles.input}
        placeholder="Search restaurants or cuisine..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')}>
          <Text style={styles.clear}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 54,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  searchIcon: {
    fontSize: 25,
    color: '#777',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  clear: {
    color: '#777',
    fontSize: 18,
    padding: 5,
  },
});

export default SearchBar;
