import { Ionicons } from '@expo/vector-icons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../context/ThemeContext';
import {
    formatPrice,
    getProductById,
    getRelatedProducts,
    type Product,
} from '../../../data/products';

const BRAND         = '#CC0000';
const { width: SW } = Dimensions.get('window');

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name={
            i < Math.floor(rating)
              ? 'star'
              : i < rating
              ? 'star-half'
              : 'star-outline'
          }
          size={size}
          color="#FFA500"
        />
      ))}
    </View>
  );
}

// ─── Full-Screen Image Modal ──────────────────────────────────────────────────

function ImageModal({
  images,
  startIndex,
  visible,
  onClose,
}: {
  images: string[];
  startIndex: number;
  visible: boolean;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <TouchableOpacity onPress={onClose} style={s.modalClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={startIndex}
          getItemLayout={(_, index) => ({
            length: SW,
            offset: SW * index,
            index,
          })}
          onMomentumScrollEnd={e => {
            setCurrent(Math.round(e.nativeEvent.contentOffset.x / SW));
          }}
          renderItem={({ item }) => (
            <View style={{ width: SW, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{ uri: item }}
                style={{ width: SW, height: SW }}
                resizeMode="contain"
              />
            </View>
          )}
          keyExtractor={(_, i) => String(i)}
        />

        <View style={s.modalDots}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                s.modalDot,
                {
                  backgroundColor:
                    i === current ? '#fff' : 'rgba(255,255,255,0.35)',
                  width: i === current ? 16 : 6,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
}

// ─── Vendor Video Player ──────────────────────────────────────────────────────

function VendorVideo({ uri }: { uri: string }) {
  const videoRef                = useRef<Video>(null);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted]       = useState(false);

  function formatTime(ms: number): string {
    const total = Math.floor(ms / 1000);
    const m     = Math.floor(total / 60);
    const sec   = total % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  async function togglePlay() {
    if (!videoRef.current) return;
    if (playing) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setPlaying(p => !p);
  }

  function onPlaybackUpdate(status: AVPlaybackStatus) {
    if (!status.isLoaded) return;
    setPlaying(status.isPlaying);
    setProgress(status.positionMillis ?? 0);
    setDuration(status.durationMillis ?? 0);
    if (status.didJustFinish) setPlaying(false);
  }

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <View style={s.videoWrap}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={s.video}
        resizeMode={ResizeMode.COVER}
        isMuted={muted}
        onPlaybackStatusUpdate={onPlaybackUpdate}
      />

      <View style={s.videoControls}>
        {/* Vendor badge */}
        <View style={s.vendorLabel}>
          <View style={s.vendorAvatar}>
            <Ionicons name="storefront-outline" size={12} color="#fff" />
          </View>
          <Text style={s.vendorLabelText}>Vendor Video</Text>
        </View>

        {/* Play / Pause */}
        <TouchableOpacity onPress={togglePlay} style={s.playPauseBtn}>
          <Ionicons name={playing ? 'pause' : 'play'} size={32} color="#fff" />
        </TouchableOpacity>

        {/* Progress + time */}
        <View style={s.videoBottomBar}>
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${pct}%` }]} />
          </View>
          <View style={s.timeRow}>
            <Text style={s.timeText}>{formatTime(progress)}</Text>
            <TouchableOpacity onPress={() => setMuted(m => !m)}>
              <Ionicons
                name={muted ? 'volume-mute' : 'volume-high'}
                size={16}
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={s.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Related Card ─────────────────────────────────────────────────────────────

function RelatedCard({ product }: { product: Product }) {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <TouchableOpacity
      style={[s.relCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() =>
        router.replace({
          pathname: '/(customer)/product/[id]',
          params: { id: product.id },
        })
      }
      activeOpacity={0.75}
    >
      <Image source={{ uri: product.image }} style={s.relImg} resizeMode="cover" />
      <View style={s.relInfo}>
        <Text style={[s.relName, { color: colors.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Stars rating={product.rating} size={10} />
        <Text style={s.relPrice}>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProductDetailScreen() {
  const { theme } = useTheme();
  const { colors } = theme;

  const { id }  = useLocalSearchParams<{ id: string }>();
  const product = getProductById(id ?? '1');

  const [selectedImage, setSelectedImage] = useState(0);
  const [modalVisible, setModalVisible]   = useState(false);
  const [descExpanded, setDescExpanded]   = useState(false);
  const [wishlisted, setWishlisted]       = useState(false);
  const [cartCount, setCartCount]         = useState(0);
  const [qty, setQty]                     = useState(1);

  if (!product) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const related = getRelatedProducts(product);

  function handleAddToCart() {
    setCartCount(prev => prev + qty);
    Alert.alert('Added to cart ✓', `${qty} × ${product.name} added to your cart.`);
  }

  function handleBuyNow() {
    router.push({
      pathname: '/(customer)/payment',
      params: { productId: product.id, qty: String(qty) },
    });
  }

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>

      {/* ── Header ── */}
      <SafeAreaView style={{ backgroundColor: BRAND }} edges={['top']}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.headerBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={s.headerTitle} numberOfLines={1}>
            {product.name}
          </Text>
          <TouchableOpacity
            onPress={() => setWishlisted(w => !w)}
            style={s.headerBtn}
          >
            <Ionicons
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={wishlisted ? '#FFD700' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >

        {/* ── Image Gallery ── */}
        <View style={{ backgroundColor: colors.card }}>
          <TouchableOpacity activeOpacity={0.95} onPress={() => setModalVisible(true)}>
            <Image
              source={{ uri: product.images[selectedImage] }}
              style={s.mainImage}
              resizeMode="cover"
            />
            <View style={s.zoomHint}>
              <Ionicons name="expand-outline" size={13} color="#fff" />
              <Text style={s.zoomText}>Tap to zoom</Text>
            </View>
          </TouchableOpacity>

          {/* Thumbnails */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={s.thumbRow}
          >
            {product.images.map((img, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedImage(i)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: img }}
                  style={[
                    s.thumb,
                    selectedImage === i && {
                      borderColor: BRAND,
                      borderWidth: 2,
                    },
                  ]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Price & Info ── */}
        <View style={[s.card, { backgroundColor: colors.card }]}>
          <Text style={[s.productName, { color: colors.text }]}>
            {product.name}
          </Text>

          {/* Price — current price only */}
          <View style={s.priceRow}>
            <Text style={s.price}>{formatPrice(product.price)}</Text>
          </View>

          {/* Rating */}
          <View style={s.ratingRow}>
            <Stars rating={product.rating} size={17} />
            <Text style={[s.ratingNum, { color: colors.text }]}>
              {product.rating}
            </Text>
            <Text style={[s.ratingCount, { color: colors.subText }]}>
              ({product.reviewCount})
            </Text>
            <View style={s.separator} />
            <Text style={[s.sold, { color: colors.subText }]}>
              {product.sold} sold
            </Text>
          </View>

          {/* Stock */}
          <View style={s.stockRow}>
            <View
              style={[
                s.stockDot,
                { backgroundColor: product.inStock ? '#4CAF50' : '#F44336' },
              ]}
            />
            <Text
              style={[
                s.stockText,
                { color: product.inStock ? '#4CAF50' : '#F44336' },
              ]}
            >
              {product.inStock ? 'In stock' : 'Out of stock'}
            </Text>
          </View>
        </View>

        {/* ── Quantity ── */}
        <View style={[s.card, { backgroundColor: colors.card }]}>
          <Text style={[s.cardTitle, { color: colors.text }]}>Quantity</Text>
          <View style={s.qtyRow}>
            <TouchableOpacity
              style={[s.qtyBtn, { borderColor: colors.border }]}
              onPress={() => setQty(q => Math.max(1, q - 1))}
            >
              <Ionicons name="remove" size={18} color={BRAND} />
            </TouchableOpacity>
            <Text style={[s.qtyNum, { color: colors.text }]}>{qty}</Text>
            <TouchableOpacity
              style={[s.qtyBtn, { borderColor: colors.border }]}
              onPress={() => setQty(q => q + 1)}
            >
              <Ionicons name="add" size={18} color={BRAND} />
            </TouchableOpacity>
            <Text style={[s.qtyTotal, { color: colors.subText }]}>
              Total: {formatPrice(product.price * qty)}
            </Text>
          </View>
        </View>

        {/* ── Description ── */}
        <View style={[s.card, { backgroundColor: colors.card }]}>
          <Text style={[s.cardTitle, { color: colors.text }]}>
            Product Description
          </Text>
          <Text
            style={[s.description, { color: colors.subText }]}
            numberOfLines={descExpanded ? undefined : 3}
          >
            {product.description}
          </Text>
          <TouchableOpacity
            onPress={() => setDescExpanded(e => !e)}
            style={{ marginTop: 6 }}
          >
            <Text style={s.readMore}>
              {descExpanded ? 'Show less ▲' : 'Read more ▼'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Vendor Product Video ── */}
        <View style={[s.card, { backgroundColor: colors.card }]}>
          <Text style={[s.cardTitle, { color: colors.text }]}>Product Video</Text>
          <Text style={[s.cardSubtitle, { color: colors.subText }]}>
            Uploaded by vendor — see the product in action
          </Text>
          <VendorVideo uri={product.videoUrl} />
        </View>

        {/* ── Ratings Breakdown ── */}
        <View style={[s.card, { backgroundColor: colors.card }]}>
          <Text style={[s.cardTitle, { color: colors.text }]}>
            Ratings & Reviews
          </Text>

          <View style={s.ratingBreakdown}>
            <View style={s.bigRating}>
              <Text style={[s.bigRatingNum, { color: colors.text }]}>
                {product.rating}
              </Text>
              <Stars rating={product.rating} size={18} />
              <Text style={[s.bigRatingCount, { color: colors.subText }]}>
                {product.reviewCount} reviews
              </Text>
            </View>

            <View style={s.ratingBars}>
              {[5, 4, 3, 2, 1].map(star => {
                const pct =
                  star === 5
                    ? 60
                    : star === 4
                    ? 25
                    : star === 3
                    ? 10
                    : star === 2
                    ? 3
                    : 2;
                return (
                  <View key={star} style={s.ratingBarRow}>
                    <Text style={[s.ratingBarLabel, { color: colors.subText }]}>
                      {star}
                    </Text>
                    <Ionicons name="star" size={10} color="#FFA500" />
                    <View
                      style={[
                        s.ratingBarTrack,
                        { backgroundColor: colors.inputBg },
                      ]}
                    >
                      <View style={[s.ratingBarFill, { width: `${pct}%` }]} />
                    </View>
                    <Text style={[s.ratingBarPct, { color: colors.subText }]}>
                      {pct}%
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Sample review */}
          <View style={[s.review, { borderTopColor: colors.border }]}>
            <View style={s.reviewHeader}>
              <View style={[s.avatar, { backgroundColor: colors.inputBg }]}>
                <Text style={{ fontSize: 16 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.reviewName, { color: colors.text }]}>
                  Grace Tembo
                </Text>
                <Stars rating={5} size={12} />
              </View>
              <Text style={[s.reviewDate, { color: colors.subText }]}>
                2 days ago
              </Text>
            </View>
            <Text style={[s.reviewText, { color: colors.subText }]}>
              Excellent product! Exactly as described. Delivery was fast and
              packaging was great. Highly recommend!
            </Text>
          </View>
        </View>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <View style={[s.card, { backgroundColor: colors.card }]}>
            <Text style={[s.cardTitle, { color: colors.text }]}>
              Related Products
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 8 }}
            >
              {related.map(p => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* ── Sticky Bottom Bar ── */}
      <View
        style={[
          s.bottomBar,
          { backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        <TouchableOpacity
          style={[s.cartBtn, { borderColor: BRAND }]}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={20} color={BRAND} />
          <Text style={[s.cartBtnText, { color: BRAND }]}>Add to Cart</Text>
          {cartCount > 0 && (
            <View style={s.cartBadge}>
              <Text style={s.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={s.buyBtn}
          onPress={handleBuyNow}
          activeOpacity={0.85}
        >
          <Ionicons name="flash" size={18} color="#fff" />
          <Text style={s.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* ── Image Zoom Modal ── */}
      <ImageModal
        images={product.images}
        startIndex={selectedImage}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1 },

  // Header
  header: {
    backgroundColor: BRAND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerBtn:   { padding: 4, width: 34 },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },

  // Modal
  modalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  modalDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingBottom: 40,
    paddingTop: 12,
  },
  modalDot: { height: 6, borderRadius: 3 },

  // Main image
  mainImage: { width: SW, height: SW * 0.75 },
  zoomHint: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  zoomText: { color: '#fff', fontSize: 11 },

  thumbRow: { paddingHorizontal: 12, paddingVertical: 10 },
  thumb: {
    width: 62,
    height: 62,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  // Cards
  card:        { marginTop: 8, padding: 16 },
  cardTitle:   { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardSubtitle:{ fontSize: 12, marginBottom: 10 },

  // Product info
  productName: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: { fontSize: 24, fontWeight: '700', color: BRAND },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  ratingNum:   { fontSize: 14, fontWeight: '700' },
  ratingCount: { fontSize: 13 },
  separator:   { width: 4, height: 4, borderRadius: 2, backgroundColor: '#9E9E9E' },
  sold:        { fontSize: 13 },

  stockRow:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stockDot:  { width: 8, height: 8, borderRadius: 4 },
  stockText: { fontSize: 13, fontWeight: '500' },

  // Quantity
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 4,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNum:   { fontSize: 18, fontWeight: '700', minWidth: 28, textAlign: 'center' },
  qtyTotal: { fontSize: 13, flex: 1, textAlign: 'right' },

  // Description
  description: { fontSize: 14, lineHeight: 22 },
  readMore:    { fontSize: 13, color: BRAND, fontWeight: '500' },

  // Video player
  videoWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: 220,
    position: 'relative',
  },
  video: { width: '100%', height: '100%' },
  videoControls: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 10,
  },
  vendorLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  vendorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorLabelText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  playPauseBtn: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBottomBar: { gap: 4 },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: BRAND, borderRadius: 2 },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: { color: '#fff', fontSize: 11 },

  // Ratings breakdown
  ratingBreakdown: { flexDirection: 'row', gap: 16, marginBottom: 4 },
  bigRating:       { alignItems: 'center', gap: 4, paddingRight: 12 },
  bigRatingNum:    { fontSize: 40, fontWeight: '700' },
  bigRatingCount:  { fontSize: 11 },
  ratingBars:      { flex: 1, gap: 5, justifyContent: 'center' },
  ratingBarRow:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingBarLabel:  { fontSize: 11, width: 10, textAlign: 'right' },
  ratingBarTrack:  { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  ratingBarFill:   { height: '100%', backgroundColor: '#FFA500', borderRadius: 3 },
  ratingBarPct:    { fontSize: 10, width: 28, textAlign: 'right' },

  // Review
  review:       { borderTopWidth: 0.5, marginTop: 14, paddingTop: 14 },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewName: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  reviewDate: { fontSize: 11 },
  reviewText: { fontSize: 13, lineHeight: 20 },

  // Related
  relCard: {
    width: 130,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: { elevation: 1 },
    }),
  },
  relImg:   { width: '100%', height: 100 },
  relInfo:  { padding: 8 },
  relName:  { fontSize: 11, fontWeight: '500', lineHeight: 15, marginBottom: 4 },
  relPrice: { fontSize: 12, color: BRAND, fontWeight: '700', marginTop: 4 },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth: 0.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 8 },
    }),
  },
  cartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 13,
    position: 'relative',
  },
  cartBtnText: { fontSize: 14, fontWeight: '700' },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: BRAND,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  buyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: BRAND,
    borderRadius: 12,
    paddingVertical: 13,
  },
  buyBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});