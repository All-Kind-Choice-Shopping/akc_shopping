import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useState } from 'react';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] =
    useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        💳 Payments
      </Text>

      {/* ORDER SUMMARY */}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Order Summary
        </Text>

        <Text style={styles.summaryText}>
          Products Total: MK150,000
        </Text>

        <Text style={styles.summaryText}>
          Delivery Fee: MK8,000
        </Text>

        <Text style={styles.total}>
          Total: MK158,000
        </Text>
      </View>

      {/* PAYMENT METHODS */}

      <Text style={styles.sectionTitle}>
        Select Payment Method
      </Text>

      <TouchableOpacity
        style={[
          styles.methodCard,

          selectedMethod === 'Airtel'
            ? styles.activeCard
            : null,
        ]}
        onPress={() =>
          setSelectedMethod('Airtel')
        }
      >
        <Text style={styles.methodText}>
          📱 Airtel Money
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.methodCard,

          selectedMethod === 'TNM'
            ? styles.activeCard
            : null,
        ]}
        onPress={() =>
          setSelectedMethod('TNM')
        }
      >
        <Text style={styles.methodText}>
          📱 TNM Mpamba
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.methodCard,

          selectedMethod === 'Bank'
            ? styles.activeCard
            : null,
        ]}
        onPress={() =>
          setSelectedMethod('Bank')
        }
      >
        <Text style={styles.methodText}>
          🏦 Bank Transfer
        </Text>
      </TouchableOpacity>

      {/* PHONE NUMBER */}

      <TextInput
        placeholder="Enter Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
      />

      {/* TRANSACTION ID */}

      <TextInput
        placeholder="Enter Transaction ID"
        style={styles.input}
      />

      {/* PAY BUTTON */}

      <TouchableOpacity
        style={styles.payButton}
      >
        <Text style={styles.payButtonText}>
          ✅ Confirm Payment
        </Text>
      </TouchableOpacity>

      {/* PAYMENT INFO */}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          ℹ️ Payment Instructions
        </Text>

        <Text style={styles.infoText}>
          1. Send payment using your
          selected method.
        </Text>

        <Text style={styles.infoText}>
          2. Enter your transaction ID.
        </Text>

        <Text style={styles.infoText}>
          3. Admin will verify your
          payment.
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
    marginBottom: 25,
  },

  summaryCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },

  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  summaryText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },

  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111',
  },

  methodCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
  },

  activeCard: {
    borderWidth: 2,
    borderColor: '#0A84FF',
  },

  methodText: {
    fontSize: 18,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    fontSize: 16,
  },

  payButton: {
    backgroundColor: '#0A84FF',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },

  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginTop: 25,
    marginBottom: 40,
  },

  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    lineHeight: 24,
  },
});