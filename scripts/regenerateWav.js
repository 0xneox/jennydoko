/**
 * Regenerates tile_click.wav and bgm_acoustic.wav as mono 44.1kHz 16-bit PCM.
 *
 * - tile_click.wav: Generated from the procedural audio synthesis (short 80ms click)
 * - bgm_acoustic.wav: Converted from the existing stereo file to mono by
 *   averaging channels, with the LIST chunk stripped.
 *
 * Run: node scripts/regenerateWav.js
 */
const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;
const soundsDir = path.join(__dirname, '..', 'assets', 'sounds');

function writeWav(filename, samples) {
  const numSamples = samples.length;
  const dataSize = numSamples * 2; // 16-bit = 2 bytes per sample
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0, 'ascii');
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8, 'ascii');

  // fmt chunk
  buffer.write('fmt ', 12, 'ascii');
  buffer.writeUInt32LE(16, 16);       // subchunk1Size
  buffer.writeUInt16LE(1, 20);        // audioFormat = PCM
  buffer.writeUInt16LE(1, 22);        // numChannels = mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24); // sampleRate
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28); // byteRate = sampleRate * channels * bytesPerSample
  buffer.writeUInt16LE(2, 32);        // blockAlign = channels * bytesPerSample
  buffer.writeUInt16LE(16, 34);       // bitsPerSample

  // data chunk
  buffer.write('data', 36, 'ascii');
  buffer.writeUInt32LE(dataSize, 40);

  // Write 16-bit PCM samples
  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    const intSample = Math.round(clamped * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  const filePath = path.join(soundsDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Wrote ${filename}: ${numSamples} samples, ${(numSamples / SAMPLE_RATE).toFixed(3)}s, ${buffer.length} bytes`);
}

// 1. Regenerate tile_click.wav from procedural synthesis
function generateTileClick() {
  const duration = 0.08; // 80ms
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const f1 = 920;
    const f2 = 1450;
    const env = Math.exp(-t * 65);
    const bodyEnv = Math.exp(-t * 40);

    const click = Math.sin(2 * Math.PI * f1 * t) * 0.6 + Math.sin(2 * Math.PI * f2 * t) * 0.4;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 300) * 0.3;

    samples[i] = (click * env + noise * bodyEnv) * 0.85;
  }
  return samples;
}

// 2. Convert bgm_acoustic.wav from stereo to mono
function convertBgmToMono() {
  const filePath = path.join(soundsDir, 'bgm_acoustic.wav');
  const buf = fs.readFileSync(filePath);

  // Find the data chunk (skip LIST and other chunks)
  let pos = 12;
  let dataOffset = -1;
  let dataLen = 0;
  while (pos < buf.length - 8) {
    const chunkId = buf.toString('ascii', pos, pos + 4);
    const chunkSize = buf.readUInt32LE(pos + 4);
    if (chunkId === 'data') {
      dataOffset = pos + 8;
      dataLen = chunkSize;
      break;
    }
    pos += 8 + chunkSize + (chunkSize % 2); // chunks are word-aligned
  }

  if (dataOffset < 0) {
    console.error('Could not find data chunk in bgm_acoustic.wav');
    process.exit(1);
  }

  console.log(`Found data chunk at offset ${dataOffset}, size ${dataLen} bytes`);

  // Stereo 16-bit: each frame is 4 bytes (2 bytes L + 2 bytes R)
  const numFrames = Math.floor(dataLen / 4);
  const monoSamples = new Float32Array(numFrames);

  for (let i = 0; i < numFrames; i++) {
    const left = buf.readInt16LE(dataOffset + i * 4);
    const right = buf.readInt16LE(dataOffset + i * 4 + 2);
    monoSamples[i] = (left + right) / 2 / 32768;
  }

  console.log(`Converted ${numFrames} stereo frames to ${numFrames} mono samples`);
  console.log(`Duration: ${(numFrames / SAMPLE_RATE).toFixed(1)}s`);
  return monoSamples;
}

// Main
console.log('Regenerating WAV assets as mono 44.1kHz 16-bit PCM...\n');

const tileClickSamples = generateTileClick();
writeWav('tile_click.wav', tileClickSamples);

console.log('');
const bgmSamples = convertBgmToMono();
writeWav('bgm_acoustic.wav', bgmSamples);

console.log('\nDone! Both files are now mono 44.1kHz 16-bit PCM.');
