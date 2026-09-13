import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CandyPanel } from './candy/CandyPanel';
import { CandyButton } from './candy/CandyButton';
import { CANDY_GOLD, CANDY_SURFACE, CANDY_TEXT } from '../utils/theme';
import { LegalDocument } from '../data/legalText';

interface LegalDocumentModalProps {
  /** The document to show, or null to render nothing. */
  doc: LegalDocument | null;
  onClose: () => void;
}

/**
 * Scrollable legal document viewer (Terms / Privacy). Rendered as an
 * absolute-fill overlay so it can sit on top of the settings modal.
 */
export const LegalDocumentModal: React.FC<LegalDocumentModalProps> = ({ doc, onClose }) => {
  if (!doc) return null;

  return (
    <View style={styles.overlay}>
      <CandyPanel style={styles.modal} contentStyle={styles.modalFace}>
        <View style={styles.header}>
          <Text style={styles.title}>📜 {doc.title}</Text>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onClose();
            }}
            style={styles.closeIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.updated}>Last updated: {doc.lastUpdated}</Text>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {doc.sections.map((section) => (
            <View key={section.heading} style={styles.section}>
              <Text style={styles.sectionHeading}>{section.heading}</Text>
              <Text style={styles.sectionBody}>{section.body}</Text>
            </View>
          ))}
        </ScrollView>

        <CandyButton
          block
          skin="neutral"
          label="Close"
          onPress={onClose}
          style={styles.closeButton}
        />
      </CandyPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 6, 32, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100,
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
  },
  modalFace: {
    padding: 22,
    borderColor: CANDY_GOLD.base,
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: CANDY_GOLD.light,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 0,
  },
  closeIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconText: {
    fontSize: 16,
    color: CANDY_TEXT.onDarkSoft,
    fontWeight: '900',
  },
  updated: {
    fontSize: 11,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkMuted,
    marginTop: 4,
    marginBottom: 12,
  },
  scroll: {
    flexGrow: 0,
  },
  section: {
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '900',
    color: CANDY_GOLD.base,
    marginBottom: 4,
  },
  sectionBody: {
    fontSize: 13,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkSoft,
    lineHeight: 19,
  },
  closeButton: {
    marginTop: 14,
  },
});
