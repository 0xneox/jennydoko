import * as fs from 'fs';
import * as path from 'path';
import { soundManager, SoundType } from '../src/utils/soundManager';

describe('Sprint 4: Native Audio & Haptic Feedback ("Juice")', () => {
  const soundsDir = path.join(__dirname, '../assets/sounds');

  describe('Foley Sound & BGM Asset Validation', () => {
    const requiredFiles = [
      'tile_click.wav',
      'puppy_place.wav',
      'level_clear.wav',
      'undo_erase.wav',
      'hint_sparkle.wav',
      'bgm_acoustic.wav',
    ];

    it.each(requiredFiles)('sound file %s exists on disk', (filename) => {
      const filePath = path.join(soundsDir, filename);
      expect(fs.existsSync(filePath)).toBe(true);
      expect(fs.statSync(filePath).size).toBeGreaterThan(1000);
    });

    it.each(requiredFiles)('sound file %s has valid 44.1kHz 16-bit PCM WAV headers', (filename) => {
      const filePath = path.join(soundsDir, filename);
      const buffer = fs.readFileSync(filePath);

      // Check RIFF header
      expect(buffer.toString('ascii', 0, 4)).toBe('RIFF');
      expect(buffer.toString('ascii', 8, 12)).toBe('WAVE');

      // Check fmt chunk
      expect(buffer.toString('ascii', 12, 16)).toBe('fmt ');
      const subchunk1Size = buffer.readUInt32LE(16);
      expect(subchunk1Size).toBe(16); // PCM chunk size

      const audioFormat = buffer.readUInt16LE(20);
      expect(audioFormat).toBe(1); // 1 = Uncompressed PCM

      const numChannels = buffer.readUInt16LE(22);
      expect(numChannels).toBe(1); // Mono

      const sampleRate = buffer.readUInt32LE(24);
      expect(sampleRate).toBe(44100); // 44.1 kHz

      const bitsPerSample = buffer.readUInt16LE(34);
      expect(bitsPerSample).toBe(16); // 16-bit audio

      // Check data chunk
      expect(buffer.toString('ascii', 36, 40)).toBe('data');
      const dataSize = buffer.readUInt32LE(40);
      expect(dataSize).toBeGreaterThan(0);
      expect(buffer.length).toBe(44 + dataSize);
    });

    it('validates specific sound durations match design requirements', () => {
      const getDuration = (filename: string) => {
        const filePath = path.join(soundsDir, filename);
        const buffer = fs.readFileSync(filePath);
        const dataSize = buffer.readUInt32LE(40);
        return dataSize / (44100 * 2); // 1 channel * 2 bytes
      };

      // Tile click is soft, quick transient
      expect(getDuration('tile_click.wav')).toBeLessThan(0.2);

      // Level clear is uplifting ~3-second fanfare
      const levelClearDuration = getDuration('level_clear.wav');
      expect(levelClearDuration).toBeGreaterThanOrEqual(2.8);
      expect(levelClearDuration).toBeLessThanOrEqual(3.5);

      // Undo erase is gentle friction sweep
      expect(getDuration('undo_erase.wav')).toBeLessThan(0.3);

      // BGM is a multi-second acoustic loop
      expect(getDuration('bgm_acoustic.wav')).toBeGreaterThan(10);
    });
  });

  describe('SoundManager Controls and State', () => {
    beforeEach(() => {
      soundManager.setEnabled(true);
      soundManager.setBgmEnabled(true);
    });

    afterEach(async () => {
      await soundManager.cleanup();
    });

    it('toggles sound effects enabled state', () => {
      expect(soundManager.isEnabled()).toBe(true);
      soundManager.setEnabled(false);
      expect(soundManager.isEnabled()).toBe(false);
      soundManager.setEnabled(true);
      expect(soundManager.isEnabled()).toBe(true);
    });

    it('toggles background music enabled state', () => {
      expect(soundManager.isBgmEnabled()).toBe(true);
      soundManager.setBgmEnabled(false);
      expect(soundManager.isBgmEnabled()).toBe(false);
      soundManager.setBgmEnabled(true);
      expect(soundManager.isBgmEnabled()).toBe(true);
    });

    it('supports all required sound types without throwing', async () => {
      const soundTypes: SoundType[] = [
        'placePuppy',
        'markX',
        'complete',
        'wrong',
        'button',
        'hint',
        'undo',
        'erase',
      ];

      for (const st of soundTypes) {
        await expect(soundManager.play(st)).resolves.not.toThrow();
      }
    });

    it('executes duckBgm without error', async () => {
      await expect(soundManager.duckBgm(100)).resolves.not.toThrow();
    });

    it('handles startBgm and stopBgm safely', async () => {
      await expect(soundManager.startBgm()).resolves.not.toThrow();
      await expect(soundManager.stopBgm()).resolves.not.toThrow();
    });
  });
});
