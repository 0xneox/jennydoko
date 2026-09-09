/**
 * Procedural Audio Synthesis for Jenny's Puppies
 * Generates pure 44.1kHz PCM Float32 audio samples for instant, zero-dependency,
 * high-fidelity playback across Web, Mobile, and Desktop.
 */

const SAMPLE_RATE = 44100;

export function getSampleRate(): number {
  return SAMPLE_RATE;
}

// 1. Tile Click: Tactile soft wooden clack (woodblock strike with body resonance)
export function generateTileClick(): Float32Array {
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

// 2. Puppy Place: Happy little yip / joyful bark + soft chime
export function generatePuppyPlace(): Float32Array {
  const duration = 0.45; // 450ms
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    let yip = 0;
    if (t < 0.18) {
      const yipEnv = Math.sin((t / 0.18) * Math.PI);
      const freq = 550 + Math.sin((t / 0.18) * Math.PI * 0.5) * 500;
      const phase = 2 * Math.PI * freq * t;
      yip = (Math.sin(phase) * 0.6 + Math.sin(phase * 2) * 0.25 + Math.sin(phase * 3) * 0.15) * yipEnv * 0.65;
    }

    const chimeEnv = Math.exp(-t * 8.5);
    const chime1 = Math.sin(2 * Math.PI * 1760 * t);
    const chime2 = Math.sin(2 * Math.PI * 2637 * t) * 0.4;
    const chime3 = Math.sin(2 * Math.PI * 3520 * t) * 0.15;
    const chime = (chime1 + chime2 + chime3) * chimeEnv * 0.5;

    samples[i] = yip + chime;
  }
  return samples;
}

// 3. Level Clear: Uplifting 3-second acoustic guitar & harp arpeggio fanfare
export function generateLevelClear(): Float32Array {
  const duration = 3.0;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const notes = [
    { freq: 261.63, time: 0.00 }, // C4
    { freq: 329.63, time: 0.14 }, // E4
    { freq: 392.00, time: 0.28 }, // G4
    { freq: 493.88, time: 0.42 }, // B4
    { freq: 587.33, time: 0.56 }, // D5
    { freq: 659.25, time: 0.70 }, // E5
    { freq: 783.99, time: 0.86 }, // G5
    { freq: 1046.50, time: 1.05 }, // C6
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let val = 0;

    for (const note of notes) {
      if (t >= note.time) {
        const dt = t - note.time;
        const env = Math.exp(-dt * 1.8);
        const f = note.freq;

        const h1 = Math.sin(2 * Math.PI * f * dt);
        const h2 = Math.sin(2 * Math.PI * f * 2 * dt) * 0.35;
        const h3 = Math.sin(2 * Math.PI * f * 3 * dt) * 0.15;
        const h4 = Math.sin(2 * Math.PI * f * 4 * dt) * 0.08;

        val += (h1 + h2 + h3 + h4) * env * 0.24;
      }
    }

    const masterEnv = t > 2.6 ? Math.max(0, 1 - (t - 2.6) / 0.4) : 1;
    samples[i] = val * masterEnv;
  }
  return samples;
}

// 4. Undo / Erase: Gentle rubber eraser sweep sound
export function generateUndoErase(): Float32Array {
  const duration = 0.18;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.sin((t / duration) * Math.PI);
    const sweepFreq = 650 - (t / duration) * 350;
    const body = Math.sin(2 * Math.PI * sweepFreq * t) * 0.4;
    const frictionNoise = (Math.random() * 2 - 1) * 0.4;

    samples[i] = (body + frictionNoise) * env * 0.7;
  }
  return samples;
}

// 5. Hint: Magical sparkle sound
export function generateHintSparkle(): Float32Array {
  const duration = 0.5;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const sparkleFrequencies = [2093, 2637, 3136, 4186, 4698];
  const noteDuration = 0.07;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let val = 0;

    sparkleFrequencies.forEach((freq, idx) => {
      const startTime = idx * noteDuration;
      if (t >= startTime) {
        const dt = t - startTime;
        const env = Math.exp(-dt * 12);
        const vibrato = Math.sin(2 * Math.PI * 18 * dt) * 15;
        const bell = Math.sin(2 * Math.PI * (freq + vibrato) * dt);
        val += bell * env * 0.28;
      }
    });

    samples[i] = val;
  }
  return samples;
}

// 6. Cozy Acoustic Background Music (BGM)
export function generateBgm(): Float32Array {
  const bpm = 78;
  const beatDuration = 60 / bpm;
  const totalBeats = 16;
  const duration = totalBeats * beatDuration;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const bassNotes = [
    { beat: 0, freq: 130.81 }, // C3
    { beat: 4, freq: 110.00 }, // A2
    { beat: 8, freq: 87.31 },  // F2
    { beat: 12, freq: 98.00 }, // G2
  ];

  const kalimbaNotes = [
    { beat: 0.5, freq: 523.25 },
    { beat: 1.5, freq: 659.25 },
    { beat: 2.0, freq: 783.99 },
    { beat: 3.0, freq: 987.77 },
    { beat: 4.5, freq: 440.00 },
    { beat: 5.5, freq: 523.25 },
    { beat: 6.0, freq: 659.25 },
    { beat: 7.0, freq: 783.99 },
    { beat: 8.5, freq: 349.23 },
    { beat: 9.5, freq: 440.00 },
    { beat: 10.0, freq: 523.25 },
    { beat: 11.0, freq: 659.25 },
    { beat: 12.5, freq: 392.00 },
    { beat: 13.5, freq: 493.88 },
    { beat: 14.0, freq: 587.33 },
    { beat: 15.0, freq: 659.25 },
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;

    let sampleVal = 0;

    for (const bass of bassNotes) {
      const noteTime = bass.beat * beatDuration;
      if (t >= noteTime) {
        const dt = t - noteTime;
        const env = Math.exp(-dt * 1.2);
        const f = bass.freq;
        const stringTone =
          Math.sin(2 * Math.PI * f * dt) * 0.7 +
          Math.sin(2 * Math.PI * f * 2 * dt) * 0.25 +
          Math.sin(2 * Math.PI * f * 3 * dt) * 0.05;
        sampleVal += stringTone * env * 0.26;
      }
    }

    for (const tine of kalimbaNotes) {
      const noteTime = tine.beat * beatDuration;
      if (t >= noteTime) {
        const dt = t - noteTime;
        const env = Math.exp(-dt * 2.8);
        const f = tine.freq;
        const tone =
          Math.sin(2 * Math.PI * f * dt) * 0.8 +
          Math.sin(2 * Math.PI * f * 2.76 * dt) * 0.15;
        sampleVal += tone * env * 0.18;
      }
    }

    samples[i] = Math.tanh(sampleVal * 1.4) * 0.55;
  }

  const fadeLength = Math.floor(SAMPLE_RATE * 0.02);
  for (let i = 0; i < fadeLength; i++) {
    const factor = i / fadeLength;
    samples[i] = samples[i] * factor + samples[numSamples - fadeLength + i] * (1 - factor);
  }

  return samples;
}
