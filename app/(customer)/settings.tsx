import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const BRAND = '#CC0000';

// ─── Types ────────────────────────────────────────────────────────────────────

type Language = { code: string; label: string; flag: string };

// ─── Data ─────────────────────────────────────────────────────────────────────

const LANGUAGES: Language[] = [
  { code: 'en',  label: 'English',  flag: '🇬🇧' },
  { code: 'ny',  label: 'Chichewa', flag: '🇲🇼' },
  { code: 'sw',  label: 'Swahili',  flag: '🇹🇿' },
];

// ─── Row components ───────────────────────────────────────────────────────────

function SectionLabel({ label, colors }: { label: string; colors: any }) {
  return (
    <Text style={[styles.sectionLabel, { color: colors.subText }]}>
      {label.toUpperCase()}
    </Text>
  );
}

function SettingRow({
  icon,
  iconBg,
  title,
  subtitle,
  right,
  onPress,
  colors,
  noBorder,
}: {
  icon: string;
  iconBg: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  colors: any;
  noBorder?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.row,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
        noBorder && { borderBottomWidth: 0 },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.65 : 1}
    >
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.rowSub, { color: colors.subText }]}>{subtitle}</Text>
        ) : null}
      </View>
      {right ?? (
        onPress ? (
          <Ionicons name="chevron-forward" size={16} color={colors.subText} />
        ) : null
      )}
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const { theme, toggleDark, isDark } = useTheme();
  const { colors } = theme;

  const [notifications, setNotifications] = useState(true);
  const [langModal, setLangModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);

  function handleSelectLang(lang: Language) {
    setSelectedLang(lang);
    setLangModal(false);
    // TODO: pass lang.code into your i18n library (e.g. i18next.changeLanguage(lang.code))
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: BRAND }]}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Appearance ─────────────────────────── */}
        <SectionLabel label="Appearance" colors={colors} />
        <View style={[styles.card, { borderColor: colors.border }]}>
          <SettingRow
            icon="🌙"
            iconBg={isDark ? '#3A3A3A' : '#EEF2FF'}
            title="Dark Mode"
            subtitle={isDark ? 'Dark theme is on' : 'Light theme is on'}
            colors={colors}
            noBorder
            right={
              <Switch
                value={isDark}
                onValueChange={toggleDark}
                trackColor={{ false: '#E0E0E0', true: BRAND }}
                thumbColor="#fff"
              />
            }
          />
        </View>

        {/* ── Notifications ──────────────────────── */}
        <SectionLabel label="Notifications" colors={colors} />
        <View style={[styles.card, { borderColor: colors.border }]}>
          <SettingRow
            icon="🔔"
            iconBg="#FFF3E0"
            title="Push Notifications"
            subtitle="Order updates & promotions"
            colors={colors}
            noBorder
            right={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E0E0E0', true: BRAND }}
                thumbColor="#fff"
              />
            }
          />
        </View>

        {/* ── Language ───────────────────────────── */}
        <SectionLabel label="Language" colors={colors} />
        <View style={[styles.card, { borderColor: colors.border }]}>
          <SettingRow
            icon="🌍"
            iconBg="#E8F5E9"
            title="App Language"
            subtitle={`${selectedLang.flag}  ${selectedLang.label}`}
            colors={colors}
            noBorder
            onPress={() => setLangModal(true)}
          />
        </View>

        {/* ── Account ────────────────────────────── */}
        <SectionLabel label="Account" colors={colors} />
        <View style={[styles.card, { borderColor: colors.border }]}>
          <SettingRow
            icon="🔑"
            iconBg="#FCE4EC"
            title="Change Password"
            subtitle="Update your account password"
            colors={colors}
            onPress={() => router.push('/(customer)/profile')}
          />
          <SettingRow
            icon="💳"
            iconBg="#E3F2FD"
            title="Payment Methods"
            subtitle="Cards, mobile money & more"
            colors={colors}
            noBorder
            onPress={() => router.push('/(customer)/payment')}
          />
        </View>

        {/* ── Support ────────────────────────────── */}
        <SectionLabel label="Support" colors={colors} />
        <View style={[styles.card, { borderColor: colors.border }]}>
          <SettingRow
            icon="❓"
            iconBg="#F3E5F5"
            title="Help & Support"
            subtitle="FAQs, live chat, contact us"
            colors={colors}
            noBorder
            onPress={() => router.push('/(customer)/help')}
          />
        </View>

        {/* ── Logout ─────────────────────────────── */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={() => router.replace('/(customer)/login')}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text style={[styles.version, { color: colors.subText }]}>
          AKC Shopping v1.0.0
        </Text>
      </ScrollView>

      {/* ── Language Modal ─────────────────────── */}
      <Modal
        visible={langModal}
        transparent
        animationType="slide"
        onRequestClose={() => setLangModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLangModal(false)}
        >
          <Pressable
            style={[styles.modalSheet, { backgroundColor: colors.card }]}
            onPress={e => e.stopPropagation()}
          >
            <View style={[styles.modalHandle, { backgroundColor: colors.border }]} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Choose Language
            </Text>
            {LANGUAGES.map(lang => {
              const isActive = lang.code === selectedLang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.langRow,
                    { borderBottomColor: colors.border },
                    isActive && { backgroundColor: '#FFF0F0' },
                  ]}
                  onPress={() => handleSelectLang(lang)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.langFlag}>{lang.flag}</Text>
                  <Text style={[styles.langLabel, { color: colors.text }]}>
                    {lang.label}
                  </Text>
                  {isActive && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={BRAND}
                      style={{ marginLeft: 'auto' }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setLangModal(false)}
            >
              <Text style={[styles.cancelText, { color: colors.subText }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1 },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },

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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: '500' },
  rowSub: { fontSize: 12, marginTop: 2 },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#CC0000',
    marginHorizontal: 14,
    marginTop: 28,
    paddingVertical: 15,
    borderRadius: 14,
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  version: { textAlign: 'center', fontSize: 11, marginTop: 16 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingHorizontal: 0,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 14,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    gap: 14,
  },
  langFlag: { fontSize: 24 },
  langLabel: { fontSize: 15, fontWeight: '500' },
  cancelBtn: { paddingVertical: 16, alignItems: 'center' },
  cancelText: { fontSize: 15, fontWeight: '500' },
});