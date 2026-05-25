import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';

const categories = [
  { id: 1, name: '📢 Classifieds' },

  { id: 2, name: '🏷️ Garage Sale' },

  { id: 3, name: '📦 Miscellaneous' },

  { id: 4, name: '🎨 Hobbies' },

  {
    id: 5,
    name: '⚽ Sports & Outdoors',
  },

  {
    id: 6,
    name: '🏺 Antiques & Collectibles',
  },

  {
    id: 7,
    name: '🎸 Musical Instruments',
  },

  {
    id: 8,
    name: '🖌️ Arts & Crafts',
  },

  {
    id: 9,
    name: '🚗 Auto Parts',
  },

  {
    id: 10,
    name: '🚴 Bicycles',
  },

  {
    id: 11,
    name: '👕 Clothing & Accessories',
  },

  {
    id: 12,
    name: '👠 Women Clothing & Shoes',
  },

  {
    id: 13,
    name: '👞 Men Clothing & Shoes',
  },

  {
    id: 14,
    name: '🚘 Vehicles',
  },

  {
    id: 15,
    name: '🏠 Housing',
  },

  {
    id: 16,
    name: '🏡 Home Sales',
  },

  {
    id: 17,
    name: '🔑 Rentals',
  },

  {
    id: 18,
    name: '🌿 Home & Garden',
  },

  {
    id: 19,
    name: '🛋️ Furniture',
  },

  {
    id: 20,
    name: '🏠 Household',
  },

  {
    id: 21,
    name: '🧺 Appliances',
  },

  {
    id: 22,
    name: '🛠️ Tools',
  },

  {
    id: 23,
    name: '🌱 Garden',
  },

  {
    id: 24,
    name: '💻 Electronics',
  },

  {
    id: 25,
    name: '🖥️ Electronics & Computers',
  },

  {
    id: 26,
    name: '📱 Mobile Phones',
  },

  {
    id: 27,
    name: '🧥 Clothing & Accessories',
  },

  {
    id: 28,
    name: '👗 Women Clothing & Shoes',
  },

  {
    id: 29,
    name: '👔 Men Clothing & Shoes',
  },

  {
    id: 30,
    name: '💍 Jewelry & Accessories',
  },

  {
    id: 31,
    name: '🧳 Bags & Luggage',
  },

  {
    id: 32,
    name: '👨‍👩‍👧 Family',
  },

  {
    id: 33,
    name: '🍼 Baby & Kids',
  },

  {
    id: 34,
    name: '💄 Health & Beauty',
  },

  {
    id: 35,
    name: '🧸 Toys & Games',
  },

  {
    id: 36,
    name: '🐶 Pet Supplies',
  },

  {
    id: 37,
    name: '🎬 Entertainment',
  },

  {
    id: 38,
    name: '🎮 Video Games',
  },

  {
    id: 39,
    name: '📚 Books, Movies & Music',
  },
];

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🛍️ Categories
      </Text>

      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() =>
              router.push('/customer/search')
            }
          >
            <Text style={styles.cardText}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 35,
    borderRadius: 20,
    marginBottom: 18,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
});