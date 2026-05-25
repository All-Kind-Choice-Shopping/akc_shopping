import React, { useState } from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function LoginScreen() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    if (
      email === 'customer@gmail.com' &&
      password === '123456'
    ) {

      Alert.alert('Success', 'Login successful');

      // GO TO HOME (index.js)
      router.replace('/customer');

    } else {

      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.logo}>
        AKC SHOPPING 🇲🇼
      </Text>

      <Text style={styles.subtitle}>
        Login to continue shopping
      </Text>

      <TextInput
        placeholder="Email Address"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/customer/register')}
      >
        <Text style={styles.registerText}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>

      <View style={styles.demoBox}>

        <Text style={styles.demoTitle}>
          Demo Account
        </Text>

        <Text style={styles.demoText}>
          Email: customer@gmail.com
        </Text>

        <Text style={styles.demoText}>
          Password: 123456
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 80,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 35,
  },

  input: {
    backgroundColor: '#F5F5F5',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: '#0A84FF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  registerText: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 16,
    color: '#0A84FF',
    fontWeight: '600',
  },

  demoBox: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 20,
    marginTop: 40,
  },

  demoTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  demoText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 6,
  },

});