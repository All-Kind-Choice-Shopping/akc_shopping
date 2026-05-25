import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const cartItems = [
  {
    id: 1,
    name: 'Nike Sneakers',
    price: 'MK85,000',
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },

  {
    id: 2,
    name: 'Ladies Handbag',
    price: 'MK45,000',
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
  },
];

export default function CartScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🛒 My Cart
      </Text>

      {cartItems.map((item) => (
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

            <Text style={styles.quantity}>
              Quantity: {item.quantity}
            </Text>

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
      ))}

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>
          Cart Summary
        </Text>

        <Text style={styles.summaryText}>
          Total Items: 3
        </Text>

        <Text style={styles.total}>
          Total: MK175,000
        </Text>

        <TouchableOpacity
          style={styles.checkoutButton}
        >
          <Text
            style={styles.checkoutText}
          >
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
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

  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
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
    marginBottom: 8,
  },

  quantity: {
    fontSize: 16,
    color: '#666',
    marginBottom: 18,
  },

  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  summaryBox: {
    backgroundColor: '#111',
    padding: 22,
    borderRadius: 22,
    marginBottom: 40,
  },

  summaryTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  summaryText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },

  total: {
    color: '#0A84FF',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 25,
  },

  checkoutButton: {
    backgroundColor: '#0A84FF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});