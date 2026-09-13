
import {
  generateTileClick,
  generatePuppyPlace,
  generateLevelClear,
  generateUndoErase,
  generateHintSparkle,
  generateBgm,
  generateCatPurr,
  generateCatHiss,
  generateComboChime,
  generateLinkedSparkle,
  generateWrongBoop,
  getSampleRate,
} from './audioSynthesis';
import { loadAudioPrefs, saveAudioPrefs } from './storage';

export type SoundType =
  | 'placePuppy'
  | 'markX'
  | 'complete'
  | 'wrong'
  | 'button'
  | 'hint'
  | 'undo'
  | 'erase'
  | 'catPurr'
  | 'catHiss'
  | 'combo'
  | 'linkedSparkle';

const getSoundAsset = (key: string): any => {
  try {
    switch (key) {
      case 'puppy_place':
        return require('../../assets/sounds/puppy_place.wav');
      case 'tile_click':
        return require('../../assets/sounds/tile_click.wav');
      case 'level_clear':
        return require('../../assets/sounds/level_clear.wav');
      case 'undo_erase':
        return require('../../assets/sounds/undo_erase.wav');
      case 'hint_sparkle':
        return require('../../assets/sounds/hint_sparkle.wav');
      case 'wrong_boop':
        return require('../../assets/sounds/wrong_boop.wav');
      case 'cat_purr':
        return require('../../assets/sounds/cat_purr.wav');
      case 'cat_hiss':
        return require('../../assets/sounds/cat_hiss.wav');
      case 'combo_chime':
        return require('../../assets/sounds/combo_chime.wav');
      case 'linked_sparkle':
        return require('../../assets/sounds/linked_sparkle.wav');
      case 'bgm_acoustic':
        return require('../../assets/sounds/bgm_acoustic.m4a');
      default:
        return null;
    }
  } catch {
    return null;
  }
};

// Native file-backed assets. Every SoundType has its own file so phones get
// the same palette the Web Audio synth path produces.
const SOUND_MAP: Record<SoundType, string> = {
  placePuppy: 'puppy_place',
  markX: 'tile_click',
  button: 'tile_click',
  wrong: 'wrong_boop',
  complete: 'level_clear',
  undo: 'undo_erase',
  erase: 'undo_erase',
  hint: 'hint_sparkle',
  catPurr: 'cat_purr',
  catHiss: 'cat_hiss',
  combo: 'combo_chime',
  linkedSparkle: 'linked_sparkle',
};

// Web Audio synthesized buffer per SoundType.
const WEB_BUFFER_MAP: Record<SoundType, string> = {
  placePuppy: 'puppyPlace',
  markX: 'tileClick',
  button: 'tileClick',
  wrong: 'wrongBoop',
  complete: 'levelClear',
  undo: 'undoErase',
  erase: 'undoErase',
  hint: 'hintSparkle',
  catPurr: 'catPurr',
  catHiss: 'catHiss',
  combo: 'comboChime',
  linkedSparkle: 'linkedSparkle',
};

class SoundManager {
  private sfxEnabled: boolean = true;
  private bgmEnabled: boolean = true;
  private initialized: boolean = false;
  private initPromise: Promise<void> | null = null;
  private defaultBgmVolume: number = 0.32;
  private duckedBgmVolume: number = 0.06;

  // Web Audio state
  private webAudioCtx: any = null;
  private sfxGain: any = null;
  private bgmGain: any = null;
  private webAudioBuffers: Record<string, any> = {};
  private bgmSource: any = null;
  private isBgmPlaying: boolean = false;
  private duckTimeout: ReturnType<typeof setTimeout> | null = null;
  private isUnlocked: boolean = false;

  // Native expo-audio state (modern Expo SDK 57 standard)
  private expoAudioModule: any = null;
  private expoAudioBgmPlayer: any = null;
  private expoAudioPlayers: Map<string, any> = new Map();

  // Native legacy expo-av state (fallback if expo-audio native bindings unavailable)
  private legacyAvModule: any = null;
  private legacyBgmSound: any = null;

  async init(): Promise<void> {
    if (this.initialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      // Restore persisted audio prefs before any engine reads the toggles
      const prefs = await loadAudioPrefs().catch(() => null);
      if (prefs) {
        this.sfxEnabled = prefs.sfxEnabled;
        this.bgmEnabled = prefs.bgmEnabled;
      }

      const isWeb =
        typeof window !== 'undefined' && typeof (window as any).document !== 'undefined';

      if (isWeb) {
        this.initWebAudio();
      } else {
        await this.initNativeAudio();
      }
      this.initialized = true;
    })();

    return this.initPromise;
  }

  // --- Web Audio Engine (Browsers) ---
  private initWebAudio() {
    try {
      if (typeof window === 'undefined') return;
      const AudioContextClass =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      this.webAudioCtx = ctx;

      // Master gain nodes
      this.sfxGain = ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? 1.0 : 0.0, ctx.currentTime);
      this.sfxGain.connect(ctx.destination);

      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(
        this.bgmEnabled ? this.defaultBgmVolume : 0.0,
        ctx.currentTime
      );
      this.bgmGain.connect(ctx.destination);

      // Pre-synthesize sound buffers in memory
      const sampleRate = getSampleRate();
      const soundGenerators: Record<string, () => Float32Array> = {
        tileClick: generateTileClick,
        puppyPlace: generatePuppyPlace,
        levelClear: generateLevelClear,
        undoErase: generateUndoErase,
        hintSparkle: generateHintSparkle,
        bgm: generateBgm,
        catPurr: generateCatPurr,
        catHiss: generateCatHiss,
        comboChime: generateComboChime,
        linkedSparkle: generateLinkedSparkle,
        wrongBoop: generateWrongBoop,
      };

      for (const [key, generator] of Object.entries(soundGenerators)) {
        const samples = generator();
        const buffer = ctx.createBuffer(1, samples.length, sampleRate);
        buffer.getChannelData(0).set(samples);
        this.webAudioBuffers[key] = buffer;
      }

      console.log('[SoundManager] Web Audio initialized with synthesized buffers');

      // User gesture unlock for web autoplay policies
      const unlockAudio = () => {
        if (!this.webAudioCtx) return;
        if (this.webAudioCtx.state === 'suspended') {
          this.webAudioCtx.resume().catch(() => {});
        }
        this.isUnlocked = true;
        if (this.bgmEnabled && !this.isBgmPlaying) {
          this.startBgm();
        }
        ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
          window.removeEventListener(evt, unlockAudio);
        });
      };

      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlockAudio, { once: true, passive: true });
      });
    } catch (e) {
      console.warn('[SoundManager] Web Audio init error:', e);
    }
  }

  // --- Native Audio Engine (Android / iOS) ---
  private async initNativeAudio() {
    // 1. Try modern expo-audio first (Expo SDK 57 standard)
    try {
      const expoAudio = await import('expo-audio');
      if (expoAudio && typeof expoAudio.createAudioPlayer === 'function') {
        this.expoAudioModule = expoAudio;
        if (typeof expoAudio.setAudioModeAsync === 'function') {
          await expoAudio.setAudioModeAsync({
            playsInSilentMode: true,
          }).catch(() => {});
        }
        console.log('[SoundManager] Native audio engine initialized via expo-audio (SDK 57)');
        return;
      }
    } catch {
      // expo-audio not available or not linked in current runtime, fall through to expo-av
    }

    // 2. Try legacy expo-av as secondary fallback
    try {
      const av = await import('expo-av');
      if (av?.Audio) {
        this.legacyAvModule = av.Audio;
        await this.legacyAvModule.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        }).catch(() => {});
        console.log('[SoundManager] Native audio engine initialized via expo-av fallback');
        return;
      }
    } catch {
      // expo-av not available
    }

    console.log('[SoundManager] Native sound module unavailable in current environment; haptics active');
  }

  // --- Sound Effects Playback ---
  // NOTE: callers fire their own haptics alongside play() — do NOT trigger
  // haptics here or every tap vibrates twice.
  async play(type: SoundType) {
    if (!this.sfxEnabled) return;

    if (!this.initialized) {
      await this.init();
    }

    // Automatic volume ducking during completion celebration
    if (type === 'complete') {
      this.duckBgm(3200);
    }

    const soundKey = SOUND_MAP[type] || 'tile_click';
    const asset = getSoundAsset(soundKey);

    // 1. Web Audio playback
    if (this.webAudioCtx && this.sfxGain) {
      try {
        if (this.webAudioCtx.state === 'suspended') {
          await this.webAudioCtx.resume();
        }

        const buffer = this.webAudioBuffers[WEB_BUFFER_MAP[type] ?? 'tileClick'];
        if (buffer) {
          const source = this.webAudioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(this.sfxGain);
          source.start(0);
        }
      } catch (err) {
        console.warn('[SoundManager] Web Audio play error:', err);
      }
      return;
    }

    // 2. Modern Native Playback via expo-audio
    if (this.expoAudioModule && asset) {
      try {
        let player = this.expoAudioPlayers.get(soundKey);
        if (!player) {
          player = this.expoAudioModule.createAudioPlayer(asset);
          if (player) {
            player.volume = 0.85;
            this.expoAudioPlayers.set(soundKey, player);
          }
        }
        if (player) {
          if (typeof player.seekTo === 'function') {
            await player.seekTo(0).catch(() => {});
          }
          player.play();
        }
        return;
      } catch (err) {
        console.warn('[SoundManager] expo-audio play error:', err);
      }
    }

    // 3. Fallback Native Playback via expo-av
    if (this.legacyAvModule && asset) {
      try {
        const { sound } = await this.legacyAvModule.Sound.createAsync(asset, {
          shouldPlay: true,
          volume: 0.85,
        });
        sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.didJustFinish) {
            sound.unloadAsync().catch(() => {});
          }
        });
      } catch {
        // Fallback ignore
      }
    }
  }

  // --- Background Music (BGM) ---
  async startBgm() {
    if (!this.bgmEnabled || this.isBgmPlaying) return;

    if (!this.initialized) {
      await this.init();
    }

    // 1. Web Audio BGM
    if (this.webAudioCtx && this.webAudioBuffers['bgm']) {
      try {
        if (this.webAudioCtx.state === 'suspended') {
          return;
        }

        if (this.bgmSource) {
          try {
            this.bgmSource.stop();
          } catch {}
        }

        const source = this.webAudioCtx.createBufferSource();
        source.buffer = this.webAudioBuffers['bgm'];
        source.loop = true;

        if (this.bgmGain) {
          this.bgmGain.gain.setValueAtTime(this.defaultBgmVolume, this.webAudioCtx.currentTime);
          source.connect(this.bgmGain);
        }

        source.start(0);
        this.bgmSource = source;
        this.isBgmPlaying = true;
        console.log('[SoundManager] Cozy acoustic BGM playing (Web)');
      } catch (err) {
        console.warn('[SoundManager] Web BGM start error:', err);
      }
      return;
    }

    // 2. Modern expo-audio BGM
    if (this.expoAudioModule) {
      try {
        if (!this.expoAudioBgmPlayer) {
          const bgmAsset = getSoundAsset('bgm_acoustic');
          const player = bgmAsset ? this.expoAudioModule.createAudioPlayer(bgmAsset) : null;
          if (player) {
            player.loop = true;
            player.volume = this.defaultBgmVolume;
            this.expoAudioBgmPlayer = player;
          }
        }
        if (this.expoAudioBgmPlayer) {
          this.expoAudioBgmPlayer.play();
          this.isBgmPlaying = true;
          console.log('[SoundManager] Cozy acoustic BGM playing (expo-audio native)');
        }
        return;
      } catch (err) {
        console.warn('[SoundManager] expo-audio BGM start error:', err);
      }
    }

    // 3. Fallback expo-av BGM
    if (this.legacyAvModule) {
      try {
        if (!this.legacyBgmSound) {
          const bgmAsset = getSoundAsset('bgm_acoustic');
          const { sound } = await this.legacyAvModule.Sound.createAsync(
            bgmAsset,
            {
              isLooping: true,
              volume: this.defaultBgmVolume,
              shouldPlay: true,
            }
          );
          this.legacyBgmSound = sound;
        } else {
          await this.legacyBgmSound.playAsync();
        }
        this.isBgmPlaying = true;
        console.log('[SoundManager] Cozy acoustic BGM playing (expo-av native)');
      } catch {}
    }
  }

  async stopBgm() {
    if (this.bgmSource) {
      try {
        this.bgmSource.stop();
      } catch {}
      this.bgmSource = null;
    }

    if (this.expoAudioBgmPlayer) {
      try {
        this.expoAudioBgmPlayer.pause();
      } catch {}
    }

    if (this.legacyBgmSound) {
      try {
        await this.legacyBgmSound.stopAsync();
      } catch {}
    }

    this.isBgmPlaying = false;
  }

  async duckBgm(durationMs: number = 3200) {
    if (!this.bgmEnabled) return;

    if (this.duckTimeout) clearTimeout(this.duckTimeout);

    // Duck Web Audio BGM
    if (this.webAudioCtx && this.bgmGain) {
      try {
        const now = this.webAudioCtx.currentTime;
        this.bgmGain.gain.cancelScheduledValues(now);
        this.bgmGain.gain.linearRampToValueAtTime(this.duckedBgmVolume, now + 0.15);

        this.duckTimeout = setTimeout(() => {
          if (this.webAudioCtx && this.bgmGain && this.bgmEnabled) {
            const resumeTime = this.webAudioCtx.currentTime;
            this.bgmGain.gain.cancelScheduledValues(resumeTime);
            this.bgmGain.gain.linearRampToValueAtTime(this.defaultBgmVolume, resumeTime + 0.8);
          }
        }, durationMs);
      } catch {}
    }

    // Duck expo-audio BGM
    if (this.expoAudioBgmPlayer) {
      try {
        this.expoAudioBgmPlayer.volume = this.duckedBgmVolume;
        this.duckTimeout = setTimeout(() => {
          if (this.expoAudioBgmPlayer && this.bgmEnabled) {
            this.expoAudioBgmPlayer.volume = this.defaultBgmVolume;
          }
        }, durationMs);
      } catch {}
    }

    // Duck legacy expo-av BGM
    if (this.legacyBgmSound) {
      try {
        await this.legacyBgmSound.setVolumeAsync(this.duckedBgmVolume);
        this.duckTimeout = setTimeout(async () => {
          if (this.legacyBgmSound && this.bgmEnabled) {
            await this.legacyBgmSound.setVolumeAsync(this.defaultBgmVolume);
          }
        }, durationMs);
      } catch {}
    }
  }

  // --- Toggles & State ---
  setEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    saveAudioPrefs({ sfxEnabled: this.sfxEnabled, bgmEnabled: this.bgmEnabled }).catch(() => {});
    if (this.webAudioCtx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(enabled ? 1.0 : 0.0, this.webAudioCtx.currentTime);
    }
  }

  isEnabled(): boolean {
    return this.sfxEnabled;
  }

  setBgmEnabled(enabled: boolean) {
    this.bgmEnabled = enabled;
    saveAudioPrefs({ sfxEnabled: this.sfxEnabled, bgmEnabled: this.bgmEnabled }).catch(() => {});
    if (this.webAudioCtx && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(
        enabled ? this.defaultBgmVolume : 0.0,
        this.webAudioCtx.currentTime
      );
    }
    if (this.expoAudioBgmPlayer) {
      this.expoAudioBgmPlayer.volume = enabled ? this.defaultBgmVolume : 0;
    }
    if (enabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
  }

  isBgmEnabled(): boolean {
    return this.bgmEnabled;
  }

  async cleanup() {
    if (this.duckTimeout) clearTimeout(this.duckTimeout);
    await this.stopBgm();

    // Cleanup expo-audio players
    for (const player of this.expoAudioPlayers.values()) {
      try {
        if (typeof player.release === 'function') {
          player.release();
        }
      } catch {}
    }
    this.expoAudioPlayers.clear();

    if (this.expoAudioBgmPlayer) {
      try {
        if (typeof this.expoAudioBgmPlayer.release === 'function') {
          this.expoAudioBgmPlayer.release();
        }
      } catch {}
      this.expoAudioBgmPlayer = null;
    }

    if (this.legacyBgmSound) {
      try {
        await this.legacyBgmSound.unloadAsync();
      } catch {}
      this.legacyBgmSound = null;
    }
  }
}

export const soundManager = new SoundManager();
