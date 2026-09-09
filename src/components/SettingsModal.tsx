import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '../store/gameStore';
import { soundManager } from '../utils/soundManager';

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

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.settingsModal}>
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
                <TouchableOpacity
                  style={styles.settingsStoryButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    soundManager.play('button');
                    onClose();
                    onOpenStory();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.settingsStoryIcon}>📖</Text>
                  <Text style={styles.settingsStoryText}>Story of Jenny</Text>
                </TouchableOpacity>
              )}

              {onOpenTutorial && (
                <TouchableOpacity
                  style={styles.settingsStoryButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    soundManager.play('button');
                    onClose();
                    onOpenTutorial();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.settingsStoryIcon}>🎓</Text>
                  <Text style={styles.settingsStoryText}>How to Play</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {/* Action buttons */}
        <View style={styles.settingsActions}>
          {onRestart && (
            <TouchableOpacity
              style={styles.settingsRestartButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onRestart();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.settingsRestartText}>🔄 Restart Level</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.settingsCloseButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onClose();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.settingsCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storyButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  settingsStoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#F7F5F0',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E8E1D5',
  },
  settingsStoryIcon: {
    fontSize: 18,
  },
  settingsStoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5C4E3D',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  settingsModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C3E50',
  },
  hintCloseIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintCloseIconText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '700',
  },
  settingsSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7F8C8D',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  settingsModeGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  settingsModeOption: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E8ECF0',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  settingsModeOptionActive: {
    borderColor: '#4A90E2',
    backgroundColor: '#EFF6FF',
  },
  settingsModeEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  settingsModeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 2,
  },
  settingsModeTextActive: {
    color: '#2563EB',
  },
  settingsModeSub: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
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
    fontWeight: '600',
    color: '#374151',
  },
  toggleSwitch: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    minWidth: 64,
    alignItems: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#10B981',
  },
  toggleSwitchText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  settingsActions: {
    gap: 10,
    marginTop: 6,
  },
  settingsRestartButton: {
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    alignItems: 'center',
  },
  settingsRestartText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E11D48',
  },
  settingsCloseButton: {
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  settingsCloseText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4B5563',
  },
});
