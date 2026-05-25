import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const liveProducts = [
  {
    id: 1,
    name: 'Nike Air Max',
    viewers: '1.2K Watching',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },

  {
    id: 2,
    name: 'iPhone 13 Pro',
    viewers: '850 Watching',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  },

  {
    id: 3,
    name: 'Luxury Handbag',
    viewers: '620 Watching',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
  },
];

export default function LiveScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🔴 Live Shopping
      </Text>

      <Text style={styles.subtitle}>
        Join live selling sessions and
        buy products instantly.
      </Text>

      {liveProducts.map((item) => (
        <View
          key={item.id}
          style={styles.card}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>
              LIVE
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.viewers}>
              👀 {item.viewers}
            </Text>

            <TouchableOpacity
              style={styles.joinButton}
            >
              <Text
                style={styles.joinText}
              >
                Join Live
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
    color: '#FF3B30',
    marginTop: 50,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    lineHeight: 24,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 240,
  },

  liveBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },

  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  info: {
    padding: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  viewers: {
    fontSize: 16,
    color: '#666',
    marginBottom: 18,
  },

  joinButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  joinText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});