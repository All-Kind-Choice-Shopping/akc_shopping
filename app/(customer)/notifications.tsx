import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const notifications = [
  {
    id: 1,
    title: '📦 Order Confirmed',
    message:
      'Your iPhone 13 order has been confirmed.',
    time: '2 mins ago',
  },

  {
    id: 2,
    title: '🚚 Delivery Update',
    message:
      'Your package is now in Blantyre.',
    time: '15 mins ago',
  },

  {
    id: 3,
    title: '🔥 Flash Sale',
    message:
      'Big discounts available today only.',
    time: '1 hour ago',
  },

  {
    id: 4,
    title: '💳 Payment Received',
    message:
      'Your payment was successfully verified.',
    time: '3 hours ago',
  },

  {
    id: 5,
    title: '🎁 New Arrivals',
    message:
      'New fashion products added today.',
    time: 'Yesterday',
  },
];

export default function NotificationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🔔 Notifications
      </Text>

      {notifications.map((item) => (
        <View
          key={item.id}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>
            {item.title}
          </Text>

          <Text style={styles.message}>
            {item.message}
          </Text>

          <Text style={styles.time}>
            {item.time}
          </Text>
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
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111',
  },

  message: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 12,
  },

  time: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
});