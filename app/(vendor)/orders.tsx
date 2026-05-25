import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📦 Active Delivery
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Product
        </Text>

        <Text style={styles.value}>
          Nike Sneakers
        </Text>

        <Text style={styles.label}>
          Current Location
        </Text>

        <Text style={styles.location}>
          🚛 Karonga, Malawi
        </Text>

        <Text style={styles.label}>
          Status
        </Text>

        <Text style={styles.status}>
          On The Way
        </Text>

        <Text style={styles.label}>
          Estimated Arrival
        </Text>

        <Text style={styles.arrival}>
          Tomorrow 10:00 AM
        </Text>
      </View>

      <View style={styles.timeline}>
        <Text style={styles.timelineText}>
          ✅ Parcel received in Dar es Salaam
        </Text>

        <Text style={styles.timelineText}>
          ✅ Bus departed Tanzania
        </Text>

        <Text style={styles.timelineText}>
          ✅ Arrived in Karonga
        </Text>

        <Text style={styles.timelineText}>
          ⏳ Heading to Blantyre
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#0A84FF',
    padding: 25,
    borderRadius: 25,
  },

  label: {
    color: '#dbeafe',
    marginTop: 15,
    fontSize: 15,
  },

  value: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  location: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  status: {
    color: '#22c55e',
    fontSize: 20,
    fontWeight: 'bold',
  },

  arrival: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  timeline: {
    marginTop: 30,
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 20,
  },

  timelineText: {
    fontSize: 16,
    marginBottom: 18,
    lineHeight: 24,
  },
});