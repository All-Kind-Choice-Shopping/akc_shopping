import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { PRODUCTS, formatPrice, getDiscount, type Product } from '../../data/products';

const BRAND = '#CC0000';
const CARD_WIDTH = (Dimensions.get('window').width - 32 - 16) / 3;

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface QuickAction {
  id: string;
  label: string;
  icon: IoniconsName;
  route: string;
}

interface Category {
  id: string;
  name: string;
  icon: IoniconsName;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'request',  label: 'Request',  icon: 'cube-outline',    route: '/(customer)/request'  },
  { id: 'orders',   label: 'Orders',   icon: 'receipt-outline',  route: '/(customer)/orders'   },
  { id: 'tracking', label: 'Tracking', icon: 'location-outline', route: '/(customer)/tracking' },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart-outline',    route: '/(customer)/wishlist' },
];

const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: 'laptop-outline' },
  { id: 'shoes',       name: 'Shoes',       icon: 'walk-outline'   },
  { id: 'clothes',     name: 'Clothes',     icon: 'shirt-outline'  },
];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={s.header}>
      <Text style={s.headerTitle}>AKC Shopping</Text>
      <View style={s.headerRight}>
        <TouchableOpacity
          onPress={() => router.push('/(customer)/notifications')}
          style={s.iconBtn}
        >
          <Ionicons name="notifications-outline" size={22} color="#fff" />
          <View style={s.notifDot} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(customer)/cart')}>
          <Ionicons name="cart-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar() {
  const { theme } = useTheme();
  const { colors } = theme;
  return (
    <View style={[s.searchWrapper, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        style={[s.searchBox, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
        activeOpacity={0.8}
        onPress={() => router.push('/(customer)/search')}
      >
        <Ionicons name="search-outline" size={16} color="#9E9E9E" />
        <Text style={[s.searchPlaceholder, { color: colors.subText }]}>
          Search products...
        </Text>
        <Ionicons name="mic-outline" size={16} color={BRAND} style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>
    </View>
  );
}

// ─── Flash Sale Banner ────────────────────────────────────────────────────────

function FlashSaleBanner() {
  const INITIAL = 2 * 3600 + 14 * 60 + 33;
  const [secs, setSecs] = useState(INITIAL);

  useEffect(() => {
    const t = setInterval(() => setSecs(p => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const h   = Math.floor(secs / 3600);
  const m   = Math.floor((secs % 3600) / 60);
  const sec = secs % 60;

  return (
    <TouchableOpacity style={s.flashBanner} activeOpacity={0.85}>
      <Ionicons name="flash" size={14} color="#FFD700" />
      <Text style={s.flashText}>Flash Sale — Up to 60% off</Text>
      <View style={s.flashTimerBox}>
        <Text style={s.flashTimerText}>{pad(h)}:{pad(m)}:{pad(sec)}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

function QuickActions() {
  const { theme } = useTheme();
  const { colors } = theme;
  return (
    <View style={[s.quickRow, { backgroundColor: colors.card }]}>
      {QUICK_ACTIONS.map(a => (
        <TouchableOpacity
          key={a.id}
          style={s.quickBtn}
          onPress={() => router.push(a.route as any)}
          activeOpacity={0.7}
        >
          <View style={[s.quickCircle, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
            <Ionicons name={a.icon} size={22} color={BRAND} />
          </View>
          <Text style={[s.quickLabel, { color: colors.subText }]}>{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────

function Categories({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const { theme } = useTheme();
  const { colors } = theme;
  return (
    <View style={[s.section, { backgroundColor: colors.card }]}>
      <View style={s.sectionHeader}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>Categories</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.catsContent}>
        {CATEGORIES.map(cat => {
          const isActive = active === cat.id;
          return (
            <TouchableOpacity key={cat.id} style={s.catItem} onPress={() => onSelect(cat.id)} activeOpacity={0.7}>
              <View style={[
                s.catIcon,
                { backgroundColor: colors.inputBg, borderColor: colors.border },
                isActive && { backgroundColor: '#FFF0F0', borderColor: '#FFBCBC' },
              ]}>
                <Ionicons name={cat.icon} size={22} color={isActive ? BRAND : colors.subText} />
              </View>
              <Text style={[s.catName, { color: isActive ? BRAND : colors.subText }]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={s.catItem} onPress={() => router.push('/(customer)/categories')} activeOpacity={0.7}>
          <View style={[s.catIcon, { backgroundColor: '#FFF0F0', borderColor: '#FFBCBC' }]}>
            <Ionicons name="grid-outline" size={22} color={BRAND} />
          </View>
          <Text style={[s.catName, { color: BRAND }]}>See All</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const discount = getDiscount(product.originalPrice, product.price);

  return (
    <TouchableOpacity
      style={[s.productCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      activeOpacity={0.75}
      onPress={() =>
        router.push({ pathname: '/(customer)/product/[id]', params: { id: product.id } })
      }
    >
      {/* Real image */}
      <View style={s.productImgWrap}>
        <Image
          source={{ uri: product.image }}
          style={s.productImg}
          resizeMode="cover"
        />
        {/* Discount badge */}
        {discount > 0 && (
          <View style={s.discountBadge}>
            <Text style={s.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <View style={s.productInfo}>
        <Text style={[s.productName, { color: colors.text }]} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Stars */}
        <View style={s.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < Math.floor(product.rating) ? 'star' : i < product.rating ? 'star-half' : 'star-outline'}
              size={10}
              color="#FFA500"
            />
          ))}
          <Text style={[s.reviewCount, { color: colors.subText }]}>({product.reviewCount})</Text>
        </View>

        <Text style={s.productPrice}>{formatPrice(product.price)}</Text>
        <Text style={[s.originalPrice, { color: colors.subText }]}>
          {formatPrice(product.originalPrice)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Trending Products ────────────────────────────────────────────────────────

function TrendingProducts({ activeCategory }: { activeCategory: string }) {
  const { theme } = useTheme();
  const { colors } = theme;

  const list =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory);

  const rows: Product[][] = [];
  for (let i = 0; i < list.length; i += 3) rows.push(list.slice(i, i + 3));

  return (
    <View style={[s.section, { backgroundColor: colors.card }]}>
      <View style={s.sectionHeader}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>Trending Products</Text>
        <TouchableOpacity onPress={() => router.push('/(customer)/search')}>
          <Text style={s.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={s.productsWrap}>
        {rows.map((row, ri) => (
          <View key={ri} style={s.productRow}>
            {row.map(p => <ProductCard key={p.id} product={p} />)}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <View key={`ph-${i}`} style={s.productPlaceholder} />
              ))}
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { theme } = useTheme();
  const { colors } = theme;
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(prev => (prev === id ? 'all' : id));
  }, []);

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <Header />
      <ScrollView
        style={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
      >
        <SearchBar />
        <FlashSaleBanner />
        <QuickActions />
        <Categories active={activeCategory} onSelect={handleCategorySelect} />
        <TrendingProducts activeCategory={activeCategory} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  safe:   { flex: 1 },
  scroll: { flex: 1 },

  header: {
    backgroundColor: BRAND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', letterSpacing: 0.3 },
  headerRight: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  iconBtn:     { position: 'relative' },
  notifDot: {
    position: 'absolute', top: -1, right: -1,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#FFD700', borderWidth: 1.5, borderColor: BRAND,
  },

  searchWrapper: { paddingHorizontal: 12, paddingVertical: 10 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 0.5,
  },
  searchPlaceholder: { flex: 1, fontSize: 14 },

  flashBanner: {
    backgroundColor: BRAND, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 9,
  },
  flashText:      { color: '#fff', fontSize: 13, fontWeight: '600' },
  flashTimerBox:  { backgroundColor: '#fff', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  flashTimerText: { color: BRAND, fontSize: 11, fontWeight: '700', fontVariant: ['tabular-nums'] },

  quickRow:    { flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 8, marginTop: 8 },
  quickBtn:    { flex: 1, alignItems: 'center', gap: 6 },
  quickCircle: { width: 50, height: 50, borderRadius: 25, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' },
  quickLabel:  { fontSize: 11, fontWeight: '500' },

  section:       { marginTop: 8 },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8,
  },
  sectionTitle: { fontSize: 14, fontWeight: '600' },
  seeAll:       { fontSize: 12, color: BRAND, fontWeight: '500' },

  catsContent: { paddingLeft: 12, paddingRight: 8, paddingBottom: 14 },
  catItem:     { alignItems: 'center', marginRight: 14, minWidth: 56, gap: 5 },
  catIcon:     { width: 52, height: 52, borderRadius: 14, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' },
  catName:     { fontSize: 11, fontWeight: '500', textAlign: 'center' },

  productsWrap:       { paddingHorizontal: 12, paddingBottom: 14 },
  productRow:         { flexDirection: 'row', gap: 8, marginBottom: 8 },
  productPlaceholder: { width: CARD_WIDTH },

  productCard: {
    width: CARD_WIDTH, borderWidth: 0.5, borderRadius: 10, overflow: 'hidden',
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2 },
      android: { elevation: 2 },
    }),
  },
  productImgWrap: { position: 'relative' },
  productImg:     { width: '100%', height: 90 },
  discountBadge: {
    position: 'absolute', top: 4, left: 4,
    backgroundColor: BRAND, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1,
  },
  discountText:  { color: '#fff', fontSize: 9, fontWeight: '700' },
  productInfo:   { padding: 6 },
  productName:   { fontSize: 10, fontWeight: '500', lineHeight: 14 },
  starsRow:      { flexDirection: 'row', alignItems: 'center', gap: 1, marginTop: 3 },
  reviewCount:   { fontSize: 9, marginLeft: 2 },
  productPrice:  { fontSize: 11, color: BRAND, fontWeight: '700', marginTop: 3 },
  originalPrice: { fontSize: 9, textDecorationLine: 'line-through', marginTop: 1 },
});