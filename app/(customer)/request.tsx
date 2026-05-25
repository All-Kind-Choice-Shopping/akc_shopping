import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RequestScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🇹🇿 Request Product
      </Text>

      <Text style={styles.subtitle}>
        Paste TikTok, Facebook, Alibaba,
        or product links and AKC SHOPPING
        will source it for you.
      </Text>

      <TextInput
        placeholder="Product Name"
        style={styles.input}
      />

      <TextInput
        placeholder="Paste Product Link"
        style={styles.input}
      />

      <TextInput
        placeholder="Quantity"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Additional Details"
        multiline
        numberOfLines={5}
        style={styles.messageInput}
      />

      <TouchableOpacity
        style={styles.uploadButton}
      >
        <Text style={styles.uploadText}>
          📷 Upload Product Image
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitButton}
      >
        <Text style={styles.submitText}>
          Submit Request
        </Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          How It Works
        </Text>

        <Text style={styles.infoText}>
          1. Send product link or image
        </Text>

        <Text style={styles.infoText}>
          2. AKC finds supplier
        </Text>

        <Text style={styles.infoText}>
          3. We send quotation
        </Text>

        <Text style={styles.infoText}>
          4. Product shipped to Malawi 🇲🇼
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginTop: 60,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 16,
  },

  messageInput: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 16,
    textAlignVertical: 'top',
    height: 140,
  },

  uploadButton: {
    backgroundColor: '#111',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 18,
  },

  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  submitButton: {
    backgroundColor: '#0A84FF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  infoBox: {
    backgroundColor: '#111',
    padding: 22,
    borderRadius: 22,
    marginTop: 35,
    marginBottom: 40,
  },

  infoTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  infoText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
});