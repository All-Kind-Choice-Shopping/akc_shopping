import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Nike Sneakers',
    price: 'MK85,000',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },

  {
    id: 2,
    name: 'iPhone 13',
    price: 'MK1,200,000',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  },

  {
    id: 3,
    name: 'Ladies Handbag',
    price: 'MK45,000',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
  },
];

export default function SearchScreen() {
  const [search, setSearch] =
    useState('');

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🔍 Search Products
      </Text>

      <TextInput
        placeholder="Search here..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {filteredProducts.map((product) => (
        <View
          key={product.id}
          style={styles.card}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.name}>
              {product.name}
            </Text>

            <Text style={styles.price}>
              {product.price}
            </Text>

            <TouchableOpacity
              style={styles.button}
            >
              <Text
                style={styles.buttonText}
              >
                View Product
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {filteredProducts.length === 0 && (
        <Text style={styles.noResult}>
          No products found
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginTop: 50,
    marginBottom: 25,
  },

  searchInput: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 25,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 22,
  },

  image: {
    width: '100%',
    height: 220,
  },

  info: {
    padding: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  price: {
    fontSize: 18,
    color: '#0A84FF',
    fontWeight: 'bold',
    marginBottom: 18,
  },

  button: {
    backgroundColor: '#0A84FF',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  noResult: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#777',
  },
});