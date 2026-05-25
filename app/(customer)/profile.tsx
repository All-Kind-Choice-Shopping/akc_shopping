import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://i.pravatar.cc/300',
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          AKC Customer
        </Text>

        <Text style={styles.email}>
          customer@email.com
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          My Account
        </Text>

        <TouchableOpacity
          style={styles.option}
        >
          <Text style={styles.optionText}>
            📦 My Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            router.push('/customer/tracking')
          }
        >
          <Text style={styles.optionText}>
            🚛 Track Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
        >
          <Text style={styles.optionText}>
            ❤️ Wishlist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
        >
          <Text style={styles.optionText}>
            💳 Payment Methods
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
        >
          <Text style={styles.optionText}>
            📍 Delivery Address
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Support
        </Text>

        <TouchableOpacity
          style={styles.option}
        >
          <Text style={styles.optionText}>
            🤖 AI Assistant
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
        >
          <Text style={styles.optionText}>
            📞 Contact Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
        >
          <Text style={styles.optionText}>
            ℹ️ About AKC SHOPPING
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          router.push('/customer/login')
        }
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },

  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },

  email: {
    color: '#fff',
    marginTop: 6,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  optionText: {
    fontSize: 17,
    color: '#333',
  },

  logoutButton: {
    backgroundColor: '#FF3B30',
    margin: 20,
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 40,
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});