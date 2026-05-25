import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';

const orders = [
  {
    id: 'AKC1024',
    product: 'Nike Sneakers',
    price: 'MK85,000',
    status: 'In Transit',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },

  {
    id: 'AKC2048',
    product: 'iPhone 13',
    price: 'MK1,200,000',
    status: 'Delivered',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  },
];

export default function OrdersScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        📦 My Orders
      </Text>

      {orders.map((order) => (
        <View
          key={order.id}
          style={styles.card}
        >
          <Image
            source={{ uri: order.image }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.product}>
              {order.product}
            </Text>

            <Text style={styles.orderId}>
              Order ID: {order.id}
            </Text>

            <Text style={styles.price}>
              {order.price}
            </Text>

            <View
              style={[
                styles.statusBox,
                order.status ===
                'Delivered'
                  ? styles.delivered
                  : styles.transit,
              ]}
            >
              <Text style={styles.statusText}>
                {order.status}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.trackButton}
              onPress={() =>
                router.push(
                  '/customer/tracking'
                )
              }
            >
              <Text
                style={styles.trackText}
              >
                Track Order
              </Text>
            </TouchableOpacity>
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
    color: '#0A84FF',
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

  product: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  orderId: {
    color: '#666',
    marginBottom: 8,
  },

  price: {
    fontSize: 18,
    color: '#0A84FF',
    fontWeight: 'bold',
    marginBottom: 15,
  },

  statusBox: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 18,
  },

  transit: {
    backgroundColor: '#FFF3CD',
  },

  delivered: {
    backgroundColor: '#D4EDDA',
  },

  statusText: {
    fontWeight: 'bold',
  },

  trackButton: {
    backgroundColor: '#0A84FF',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  trackText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});