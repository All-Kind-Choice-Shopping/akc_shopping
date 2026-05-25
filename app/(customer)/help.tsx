import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const BRAND = '#CC0000';

const FAQS = [
  {
    q: 'How do I track my order?',
    a: 'Go to the Tracking tab on the home screen and enter your order number.',
  },
  {
    q: 'How do I request a product?',
    a: 'Tap Request on the home screen and fill in the product details.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept Airtel Money, TNM Mpamba, and card payments.',
  },
  {
    q: 'How do I return an item?',
    a: 'Contact support within 7 days of delivery with your order number.',
  },
];

export default function HelpScreen() {
  // ✅ Correct — destructure theme first, then colors from theme
  const { theme } = useTheme();
  const { colors } = theme;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SafeAreaView
      style={[s.safe, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Help & Support</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Contact options ─────────────────────── */}
        <Text style={[s.sectionLabel, { color: colors.subText }]}>
          CONTACT US
        </Text>

        <View style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[s.contactRow, { borderBottomColor: colors.border }]}
            onPress={() => Linking.openURL('tel:+265999000000')}
          >
            <View style={[s.contactIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="call-outline" size={20} color="#2E7D32" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.contactTitle, { color: colors.text }]}>Call Us</Text>
              <Text style={[s.contactSub, { color: colors.subText }]}>
                +265 999 000 000
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.subText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.contactRow, { borderBottomColor: colors.border }]}
            onPress={() => Linking.openURL('https://wa.me/265999000000')}
          >
            <View style={[s.contactIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.contactTitle, { color: colors.text }]}>WhatsApp</Text>
              <Text style={[s.contactSub, { color: colors.subText }]}>
                Chat with us
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.subText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.contactRow, { borderBottomWidth: 0 }]}
            onPress={() => Linking.openURL('mailto:support@akcshopping.com')}
          >
            <View style={[s.contactIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="mail-outline" size={20} color="#1565C0" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.contactTitle, { color: colors.text }]}>Email</Text>
              <Text style={[s.contactSub, { color: colors.subText }]}>
                support@akcshopping.com
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.subText} />
          </TouchableOpacity>
        </View>

        {/* ── FAQs ────────────────────────────────── */}
        <Text style={[s.sectionLabel, { color: colors.subText }]}>
          FREQUENTLY ASKED QUESTIONS
        </Text>

        <View style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {FAQS.map((faq, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setOpenFaq(openFaq === i ? null : i)}
              style={[
                s.faqRow,
                { borderBottomColor: colors.border },
                i === FAQS.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[s.faqQ, { color: colors.text }]}>{faq.q}</Text>
                {openFaq === i && (
                  <Text style={[s.faqA, { color: colors.subText }]}>
                    {faq.a}
                  </Text>
                )}
              </View>
              <Ionicons
                name={openFaq === i ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={colors.subText}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Live chat ───────────────────────────── */}
        <TouchableOpacity
          style={s.chatBtn}
          onPress={() => router.push('/(customer)/assistant')}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
          <Text style={s.chatBtnText}>Start Live Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1 },

  header: {
    backgroundColor: BRAND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  backBtn:     { width: 32 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#fff' },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    marginTop: 20,
    marginBottom: 6,
    paddingHorizontal: 16,
  },

  card: {
    marginHorizontal: 14,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 0.5,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
  },
  contactIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTitle: { fontSize: 14, fontWeight: '600' },
  contactSub:   { fontSize: 12, marginTop: 2 },

  faqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderBottomWidth: 0.5,
  },
  faqQ: { fontSize: 13, fontWeight: '500', lineHeight: 20 },
  faqA: { fontSize: 12, marginTop: 6, lineHeight: 18 },

  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: BRAND,
    marginHorizontal: 14,
    marginTop: 24,
    paddingVertical: 15,
    borderRadius: 14,
  },
  chatBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});