import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useState } from 'react';

export default function TrackingScreen() {
  const [trackingId, setTrackingId] =
    useState('');

  const [showResult, setShowResult] =
    useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🚚 Track Order
      </Text>

      <Text style={styles.subtitle}>
        Enter your tracking number to
        check delivery progress.
      </Text>

      <TextInput
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChangeText={setTrackingId}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowResult(true)}
      >
        <Text style={styles.buttonText}>
          Track Package
        </Text>
      </TouchableOpacity>

      {showResult && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>
            📦 Tracking Result
          </Text>

          <Text style={styles.resultText}>
            Tracking ID: {trackingId}
          </Text>

          <Text style={styles.resultText}>
            Status: In Transit
          </Text>

          <Text style={styles.resultText}>
            Current Location: Blantyre
          </Text>

          <Text style={styles.resultText}>
            Estimated Delivery: Tomorrow
          </Text>
        </View>
      )}

      <View style={styles.timelineBox}>
        <Text style={styles.timelineTitle}>
          🚛 Delivery Steps
        </Text>

        <Text style={styles.timelineText}>
          ✅ Order Received
        </Text>

        <Text style={styles.timelineText}>
          ✅ Product Purchased
        </Text>

        <Text style={styles.timelineText}>
          ✅ Arrived In Malawi
        </Text>

        <Text style={styles.timelineText}>
          🔄 Out For Delivery
        </Text>

        <Text style={styles.timelineText}>
          ⏳ Delivered
        </Text>
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
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    lineHeight: 24,
  },

  input: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 25,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#0A84FF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  resultBox: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 20,
    marginBottom: 30,
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111',
  },

  resultText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },

  timelineBox: {
    backgroundColor: '#111',
    padding: 22,
    borderRadius: 20,
    marginBottom: 50,
  },

  timelineTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  timelineText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
});