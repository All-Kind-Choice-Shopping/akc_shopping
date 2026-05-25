import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useState } from 'react';

export default function AssistantScreen() {
  const [message, setMessage] =
    useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🤖 AKC AI Assistant
      </Text>

      <View style={styles.chatBox}>
        <Text style={styles.botText}>
          Hello 👋
        </Text>

        <Text style={styles.botMessage}>
          How can I help you today?
        </Text>
      </View>

      <View style={styles.chatBox}>
        <Text style={styles.userText}>
          Customer
        </Text>

        <Text style={styles.userMessage}>
          I want sneakers from Tanzania.
        </Text>
      </View>

      <TextInput
        placeholder="Ask anything..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.sendButton}
      >
        <Text style={styles.sendText}>
          Send Message
        </Text>
      </TouchableOpacity>

      <View style={styles.quickBox}>
        <Text style={styles.quickTitle}>
          Quick Questions
        </Text>

        <TouchableOpacity
          style={styles.quickButton}
        >
          <Text style={styles.quickText}>
            📦 Track My Order
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
        >
          <Text style={styles.quickText}>
            🚚 Delivery Prices
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
        >
          <Text style={styles.quickText}>
            🇹🇿 Import From Tanzania
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 25,
    color: '#0A84FF',
  },

  chatBox: {
    marginBottom: 20,
  },

  botText: {
    fontWeight: 'bold',
    color: '#0A84FF',
    marginBottom: 6,
  },

  botMessage: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
  },

  userText: {
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
    textAlign: 'right',
  },

  userMessage: {
    backgroundColor: '#0A84FF',
    color: '#fff',
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
    textAlign: 'right',
  },

  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    marginTop: 10,
  },

  sendButton: {
    backgroundColor: '#0A84FF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 15,
  },

  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  quickBox: {
    marginTop: 30,
    marginBottom: 40,
  },

  quickTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  quickButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  quickText: {
    fontSize: 16,
    fontWeight: '600',
  },
});