import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

const BRAND = '#CC0000';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({
  name,
  color,
  badgeCount,
}: {
  name: IoniconsName;
  color: string;
  badgeCount?: number;
}) {
  return (
    <View>
      <Ionicons name={name} size={22} color={color} />
      {badgeCount ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {badgeCount > 9 ? '9+' : badgeCount}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function CustomerTabs() {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BRAND,
        tabBarInactiveTintColor: theme.dark ? '#777777' : '#9E9E9E',
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
          backgroundColor: colors.card,
          height: Platform.OS === 'ios' ? 82 : 62,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      {/* ── Visible tabs ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color }) => (
            <TabIcon name="radio-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <TabIcon name="cart-outline" color={color} badgeCount={3} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabIcon name="person-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <TabIcon name="settings-outline" color={color} />
          ),
        }}
      />

      {/* ── Hidden screens (navigated via router.push) ── */}
      <Tabs.Screen name="assistant"     options={{ href: null }} />
      <Tabs.Screen name="categories"    options={{ href: null }} />
      <Tabs.Screen name="help"          options={{ href: null }} />
      <Tabs.Screen name="login"         options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="orders"        options={{ href: null }} />
      <Tabs.Screen name="payment"       options={{ href: null }} />
      <Tabs.Screen name="register"      options={{ href: null }} />
      <Tabs.Screen name="request"       options={{ href: null }} />
      <Tabs.Screen name="search"        options={{ href: null }} />
      <Tabs.Screen name="tracking"      options={{ href: null }} />
      <Tabs.Screen name="wishlist"      options={{ href: null }} />
      <Tabs.Screen name="product/[id]"  options={{ href: null }} />
    </Tabs>
  );
}

export default function CustomerLayout() {
  return (
    <ThemeProvider>
      <CustomerTabs />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: BRAND,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
});