import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';

export default function VendorDashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🏪 Vendor Dashboard
      </Text>

      <Text style={styles.subtitle}>
        Manage your products, orders,
        earnings and customers.
      </Text>

      {/* STATS */}

      <View style={styles.statsRow}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            120
          </Text>

          <Text style={styles.statsLabel}>
            Orders
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            MK2.4M
          </Text>

          <Text style={styles.statsLabel}>
            Revenue
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            48
          </Text>

          <Text style={styles.statsLabel}>
            Products
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            4.9⭐
          </Text>

          <Text style={styles.statsLabel}>
            Rating
          </Text>
        </View>
      </View>

      {/* BUTTONS */}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push('/vendor/add-product')
        }
      >
        <Text style={styles.buttonText}>
          ➕ Add Product
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push('/vendor/products')
        }
      >
        <Text style={styles.buttonText}>
          📦 My Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push('/vendor/orders')
        }
      >
        <Text style={styles.buttonText}>
          🛒 Customer Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push('/vendor/earnings')
        }
      >
        <Text style={styles.buttonText}>
          💰 Earnings
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push('/vendor/messages')
        }
      >
        <Text style={styles.buttonText}>
          💬 Messages
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push('/vendor/analytics')
        }
      >
        <Text style={styles.buttonText}>
          📊 Analytics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() =>
          router.push('/vendor/profile')
        }
      >
        <Text style={styles.profileButtonText}>
          👤 Vendor Profile
        </Text>
      </TouchableOpacity>
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
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 25,
    lineHeight: 24,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  statsCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  statsNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A84FF',
  },

  statsLabel: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },

  button: {
    backgroundColor: '#0A84FF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  profileButton: {
    backgroundColor: '#111',
    padding: 18,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 40,
    alignItems: 'center',
  },

  profileButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});