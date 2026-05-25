import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const wishlistItems = [
  {
    id: 1,
    name: 'Nike Air Force',
    price: 'MK95,000',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },

  {
    id: 2,
    name: 'Samsung S24',
    price: 'MK1,450,000',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  },

  {
    id: 3,
    name: 'Luxury Handbag',
    price: 'MK65,000',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
  },
];

export default function WishlistScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        ❤️ Wishlist
      </Text>

      {wishlistItems.map((item) => (
        <View
          key={item.id}
          style={styles.card}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.price}>
              {item.price}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cartButton}
              >
                <Text
                  style={styles.cartText}
                >
                  Add To Cart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
              >
                <Text
                  style={styles.removeText}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
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
    color: '#E91E63',
    marginTop: 50,
    marginBottom: 25,
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
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cartButton: {
    backgroundColor: '#0A84FF',
    padding: 14,
    borderRadius: 14,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },

  cartText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 14,
    flex: 1,
    alignItems: 'center',
  },

  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});