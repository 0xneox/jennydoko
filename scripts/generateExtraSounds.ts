/**
 * Renders the SFX that only existed as Web Audio synth buffers into mono
 * 16-bit 44.1kHz WAVs so the native (expo-audio) path has the same palette.
 * Reuses the exact generators the web build plays, so both sound identical.
 *
 *   npx ts-node scripts/generateExtraSounds.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import {
  generateCatPurr,
  generateCatHiss,
  generateComboChime,
  generateLinkedSparkle,
  generateWrongBoop,
  getSampleRate,
} from '../src/utils/audioSynthesis';

function createWavBuffer(samples: Float32Array, sampleRate: number): Buffer {
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.floor(s < 0 ? s * 0x8000 : s * 0x7fff), offset);
    offset += 2;
  }
  return buffer;
}

const soundsDir = path.join(__dirname, '../assets/sounds');
const files = [
  { name: 'cat_purr.wav', data: generateCatPurr() },
  { name: 'cat_hiss.wav', data: generateCatHiss() },
  { name: 'combo_chime.wav', data: generateComboChime() },
  { name: 'linked_sparkle.wav', data: generateLinkedSparkle() },
  { name: 'wrong_boop.wav', data: generateWrongBoop() },
];

for (const file of files) {
  const buffer = createWavBuffer(file.data, getSampleRate());
  fs.writeFileSync(path.join(soundsDir, file.name), buffer);
  console.log(`Generated ${file.name} (${buffer.length} bytes)`);
}
