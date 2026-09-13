import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Share,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { soundManager } from '../utils/soundManager';
import { PuppyMilestone } from '../utils/storage';
import { Confetti } from './Confetti';
import { CandyButton } from './candy/CandyButton';
import { APP_NAME, CANDY_GOLD } from '../utils/theme';

interface AdoptionModalProps {
  visible: boolean;
  milestone: PuppyMilestone | null;
  onClose: () => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  visible,
  milestone,
  onClose,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.75)).current;
  const badgeBounce = useRef(new Animated.Value(1)).current;
  const [copiedToast, setCopiedToast] = React.useState(false);
  const copiedToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear pending toast auto-dismiss when the modal hides or unmounts
  useEffect(() => {
    if (!visible) {
      if (copiedToastTimer.current) {
        clearTimeout(copiedToastTimer.current);
        copiedToastTimer.current = null;
      }
      setCopiedToast(false);
    }
  }, [visible]);

  useEffect(() => () => {
    if (copiedToastTimer.current) clearTimeout(copiedToastTimer.current);
  }, []);

  useEffect(() => {
    if (visible && milestone) {
      soundManager.play('complete');
      scaleAnim.setValue(0.75);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }).start();

      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(badgeBounce, { toValue: 1.15, duration: 400, useNativeDriver: true }),
          Animated.timing(badgeBounce, { toValue: 0.95, duration: 300, useNativeDriver: true }),
          Animated.timing(badgeBounce, { toValue: 1.05, duration: 250, useNativeDriver: true }),
          Animated.timing(badgeBounce, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.delay(1200),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [visible, milestone, scaleAnim, badgeBounce]);

  if (!visible || !milestone) return null;

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');

    const shareMessage = [
      `🎓 OFFICIAL PUPPY CARE CERTIFICATE 🐕`,
      `I just adopted the ${milestone.breedName}!`,
      `Title: ${milestone.badgeTitle}`,
      `"${milestone.quote}"`,
      `\nPlaying ${APP_NAME}: Cozy Logic Puzzles 🐾`,
    ].join('\n');

    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareMessage);
        setCopiedToast(true);
        if (copiedToastTimer.current) clearTimeout(copiedToastTimer.current);
        copiedToastTimer.current = setTimeout(() => {
          copiedToastTimer.current = null;
          setCopiedToast(false);
        }, 2400);
      } else {
        await Share.share({
          message: shareMessage,
          title: `Puppy Care Certificate: ${milestone.breedName}`,
        });
      }
    } catch {
      // Fallback
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <Confetti visible={visible} />

      <Animated.View
        style={[
          styles.certificateCard,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Ornate Gold Border & Header */}
        <View style={styles.ornateHeader}>
          <Text style={styles.headerRibbon}>📜 OFFICIAL ADOPTION CERTIFICATE 📜</Text>
        </View>

        {/* Large Puppy Avatar with Pulsing Halo */}
        <View style={styles.iconWrapper}>
          <View style={[styles.haloRing, { backgroundColor: milestone.color + '22' }]} />
          <Animated.Text
            style={[
              styles.puppyEmoji,
              { transform: [{ scale: badgeBounce }] },
            ]}
          >
            {milestone.icon}
          </Animated.Text>
        </View>

        {/* Adoption Title & Badge */}
        <Text style={styles.breedName}>{milestone.breedName}</Text>
        <View style={[styles.badgeContainer, { backgroundColor: milestone.color + '1A', borderColor: milestone.color }]}>
          <Text style={[styles.badgeTitle, { color: milestone.color }]}>
            {milestone.badgeTitle}
          </Text>
        </View>

        {/* Story Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>"{milestone.quote}"</Text>
        </View>

        {/* Chapter Milestone Tag */}
        <Text style={styles.chapterBadge}>
          Awarded for completing Chapter {milestone.chapter} (Level {milestone.level})
        </Text>

        {/* New Power Unlocked Ceremony */}
        {milestone.powerUnlocked && (
          <View style={styles.powerUnlockedCard}>
            <Text style={styles.powerUnlockedIcon}>✨</Text>
            <View style={styles.powerUnlockedContent}>
              <Text style={styles.powerUnlockedTitle}>NEW POWER UNLOCKED!</Text>
              <Text style={styles.powerUnlockedText}>{milestone.powerUnlocked}</Text>
            </View>
          </View>
        )}

        {/* Share Toast */}
        {copiedToast && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>📋 Certificate Copied to Clipboard! 🐾</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <CandyButton
            block
            size="lg"
            skin="grape"
            label="Share Certificate 📤"
            onPress={handleShare}
          />

          <CandyButton
            block
            skin="green"
            label="Continue Journey 🌿"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              soundManager.play('button');
              onClose();
            }}
          />
        </View>
      </Animated.View>
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
    backgroundColor: 'rgba(14, 6, 32, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  // Kept as warm "paper" on purpose — it's a certificate — but framed in the
  // candy gold trim so it reads as part of the arcade theme.
  certificateCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: CANDY_GOLD.base,
    shadowColor: '#0E0620',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 12,
  },
  ornateHeader: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FAF5EA',
    borderWidth: 1,
    borderColor: '#E6D3A3',
    marginBottom: 16,
  },
  headerRibbon: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9C7A3C',
    letterSpacing: 0.6,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  haloRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  puppyEmoji: {
    fontSize: 54,
  },
  breedName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C2A29',
    marginBottom: 6,
    textAlign: 'center',
  },
  badgeContainer: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    marginBottom: 14,
  },
  badgeTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  quoteCard: {
    backgroundColor: '#F7F3EC',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#C4B59D',
  },
  quoteText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#5C5446',
    textAlign: 'center',
    lineHeight: 19,
  },
  chapterBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A8275',
    marginBottom: 18,
    textAlign: 'center',
  },
  powerUnlockedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E8F7E',
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#7FE9D8',
    gap: 10,
    width: '100%',
  },
  powerUnlockedIcon: {
    fontSize: 28,
  },
  powerUnlockedContent: {
    flex: 1,
  },
  powerUnlockedTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  powerUnlockedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E0FFF8',
    lineHeight: 16,
  },
  toast: {
    backgroundColor: '#2A9D8F',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  toastText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  buttonGroup: {
    width: '100%',
    gap: 10,
  },
});
