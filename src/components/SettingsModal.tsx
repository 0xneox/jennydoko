import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '../store/gameStore';
import { soundManager } from '../utils/soundManager';
import { CandyButton } from './candy/CandyButton';
import { CandyPanel } from './candy/CandyPanel';
import { CANDY_GOLD, CANDY_SURFACE, CANDY_TEXT } from '../utils/theme';
import { LegalDocumentModal } from './LegalDocumentModal';
import { LegalDocument, PRIVACY_POLICY, TERMS_OF_SERVICE } from '../data/legalText';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onRestart?: () => void;
  onOpenStory?: () => void;
  onOpenTutorial?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  onRestart,
  onOpenStory,
  onOpenTutorial,
}) => {
  const { gameMode, setGameMode } = useGameStore();
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());
  const [bgmEnabled, setBgmEnabled] = useState(soundManager.isBgmEnabled());
  const [legalDoc, setLegalDoc] = useState<LegalDocument | null>(null);

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <CandyPanel style={styles.settingsModal} contentStyle={styles.settingsModalFace}>
        <View style={styles.settingsHeader}>
          <Text style={styles.settingsTitle}>⚙️ Settings</Text>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onClose();
            }}
            style={styles.hintCloseIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.hintCloseIconText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Mode Selection */}
        <Text style={styles.settingsSectionTitle}>Game Mode</Text>
        <View style={styles.settingsModeGroup}>
          <TouchableOpacity
            style={[
              styles.settingsModeOption,
              gameMode === 'normal' && styles.settingsModeOptionActive,
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setGameMode('normal');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.settingsModeEmoji}>🌱</Text>
            <Text
              style={[
                styles.settingsModeText,
                gameMode === 'normal' && styles.settingsModeTextActive,
              ]}
            >
              Normal
            </Text>
            <Text style={styles.settingsModeSub}>First 3 oops free</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingsModeOption,
              gameMode === 'zen' && styles.settingsModeOptionActive,
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setGameMode('zen');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.settingsModeEmoji}>🧘</Text>
            <Text
              style={[
                styles.settingsModeText,
                gameMode === 'zen' && styles.settingsModeTextActive,
              ]}
            >
              Zen Mode
            </Text>
            <Text style={styles.settingsModeSub}>Infinite chances</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingsModeOption,
              gameMode === 'challenge' && styles.settingsModeOptionActive,
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setGameMode('challenge');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.settingsModeEmoji}>⚡</Text>
            <Text
              style={[
                styles.settingsModeText,
                gameMode === 'challenge' && styles.settingsModeTextActive,
              ]}
            >
              Challenge
            </Text>
            <Text style={styles.settingsModeSub}>3 hearts max</Text>
          </TouchableOpacity>
        </View>

        {/* Sound Toggle */}
        <View style={styles.settingsRow}>
          <View style={styles.settingsRowLeft}>
            <Text style={styles.settingsRowIcon}>🔊</Text>
            <Text style={styles.settingsRowLabel}>Sound Effects</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleSwitch, soundEnabled && styles.toggleSwitchActive]}
            onPress={() => {
              const next = !soundEnabled;
              soundManager.setEnabled(next);
              setSoundEnabled(next);
              if (next) soundManager.play('button');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleSwitchText}>{soundEnabled ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        {/* Background Music Toggle */}
        <View style={styles.settingsRow}>
          <View style={styles.settingsRowLeft}>
            <Text style={styles.settingsRowIcon}>🎵</Text>
            <Text style={styles.settingsRowLabel}>Acoustic Music</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleSwitch, bgmEnabled && styles.toggleSwitchActive]}
            onPress={() => {
              const next = !bgmEnabled;
              soundManager.setBgmEnabled(next);
              setBgmEnabled(next);
              if (next) soundManager.play('button');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleSwitchText}>{bgmEnabled ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        {/* Story & Lore Section */}
        {(onOpenStory || onOpenTutorial) && (
          <>
            <Text style={styles.settingsSectionTitle}>Story & Learning</Text>
            <View style={styles.storyButtonsRow}>
              {onOpenStory && (
                <CandyButton
                  skin="orange"
                  size="sm"
                  label="Story of Jenny"
                  icon={<Text style={styles.settingsStoryIcon}>📖</Text>}
                  style={styles.settingsStoryButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    soundManager.play('button');
                    onClose();
                    onOpenStory();
                  }}
                />
              )}

              {onOpenTutorial && (
                <CandyButton
                  skin="blue"
                  size="sm"
                  label="How to Play"
                  icon={<Text style={styles.settingsStoryIcon}>🎓</Text>}
                  style={styles.settingsStoryButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    soundManager.play('button');
                    onClose();
                    onOpenTutorial();
                  }}
                />
              )}
            </View>
          </>
        )}

        {/* Legal Section */}
        <Text style={styles.settingsSectionTitle}>Legal</Text>
        <View style={styles.storyButtonsRow}>
          <CandyButton
            skin="neutral"
            size="sm"
            label="Terms of Service"
            icon={<Text style={styles.settingsStoryIcon}>📜</Text>}
            style={styles.settingsStoryButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              soundManager.play('button');
              setLegalDoc(TERMS_OF_SERVICE);
            }}
          />
          <CandyButton
            skin="neutral"
            size="sm"
            label="Privacy Policy"
            icon={<Text style={styles.settingsStoryIcon}>🔒</Text>}
            style={styles.settingsStoryButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              soundManager.play('button');
              setLegalDoc(PRIVACY_POLICY);
            }}
          />
        </View>

        {/* Action buttons */}
        <View style={styles.settingsActions}>
          {onRestart && (
            <CandyButton
              block
              skin="red"
              label="Restart Level"
              icon={<Text style={styles.settingsStoryIcon}>🔄</Text>}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                soundManager.play('button');
                onRestart();
              }}
            />
          )}

          <CandyButton
            block
            skin="neutral"
            label="Close"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onClose();
            }}
          />
        </View>
      </CandyPanel>
      <LegalDocumentModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 6, 32, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  settingsModal: {
    width: '100%',
    maxWidth: 380,
    shadowColor: '#0E0620',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 14,
  },
  settingsModalFace: {
    padding: 24,
    borderColor: CANDY_GOLD.base,
    borderWidth: 2,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: CANDY_GOLD.light,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 0,
  },
  hintCloseIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintCloseIconText: {
    fontSize: 16,
    color: CANDY_TEXT.onDarkSoft,
    fontWeight: '900',
  },
  settingsSectionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: CANDY_GOLD.base,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  settingsModeGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 22,
  },
  settingsModeOption: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: CANDY_SURFACE.bevel,
    alignItems: 'center',
    backgroundColor: 'rgba(20, 10, 44, 0.4)',
  },
  settingsModeOptionActive: {
    borderColor: CANDY_GOLD.base,
    backgroundColor: '#7C5CBF',
  },
  settingsModeEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  settingsModeText: {
    fontSize: 15,
    fontWeight: '800',
    color: CANDY_TEXT.onDarkSoft,
    marginBottom: 2,
  },
  settingsModeTextActive: {
    color: '#FFFFFF',
  },
  settingsModeSub: {
    fontSize: 11,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkMuted,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    marginBottom: 16,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingsRowIcon: {
    fontSize: 20,
  },
  settingsRowLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: CANDY_TEXT.onDark,
  },
  toggleSwitch: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(20, 10, 44, 0.55)',
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.bevel,
    minWidth: 64,
    alignItems: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#25B84E',
    borderColor: '#0F6B2B',
  },
  toggleSwitchText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  storyButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  settingsStoryButton: {
    flex: 1,
  },
  settingsStoryIcon: {
    fontSize: 16,
  },
  settingsActions: {
    gap: 10,
    marginTop: 6,
  },
});
