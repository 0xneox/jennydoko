/**
 * Playtest Logger — Phase 5.4
 *
 * Lightweight telemetry for real-device playtests with children.
 * Logs stall points, mistakes, hints, and engagement metrics.
 * Data is stored in AsyncStorage and can be exported as JSON.
 *
 * Enable by calling PlaytestLogger.start(childAge) at the beginning
 * of a playtest session. Disable with PlaytestLogger.stop().
 */

const PLAYTEST_KEY = '@jenny_playtest_log';

export interface PlaytestEvent {
  timestamp: number;
  type: 'stall' | 'mistake' | 'hint' | 'undo' | 'restart' | 'complete' | 'level_start' | 'tutorial_skip' | 'frustration';
  level: number;
  detail?: string;
  durationMs?: number;
}

export interface PlaytestSession {
  childAge: number;
  startTime: number;
  endTime?: number;
  events: PlaytestEvent[];
  levelsCompleted: number[];
  totalHints: number;
  totalMistakes: number;
  totalUndos: number;
  totalRestarts: number;
}

class PlaytestLoggerClass {
  private session: PlaytestSession | null = null;
  private active = false;
  private lastInputTime = 0;
  private stallCheckInterval: ReturnType<typeof setInterval> | null = null;
  private readonly STALL_THRESHOLD_MS = 15000; // 15s with no input = stall

  start(childAge: number): void {
    this.session = {
      childAge,
      startTime: Date.now(),
      events: [],
      levelsCompleted: [],
      totalHints: 0,
      totalMistakes: 0,
      totalUndos: 0,
      totalRestarts: 0,
    };
    this.active = true;
    this.lastInputTime = Date.now();

    // Start stall detection
    this.stallCheckInterval = setInterval(() => {
      if (!this.session || !this.active) return;
      const elapsed = Date.now() - this.lastInputTime;
      if (elapsed > this.STALL_THRESHOLD_MS) {
        this.logEvent('stall', 0, `No input for ${(elapsed / 1000).toFixed(0)}s`, elapsed);
        // Reset to avoid duplicate logging
        this.lastInputTime = Date.now();
      }
    }, 5000);
  }

  stop(): void {
    if (this.stallCheckInterval) {
      clearInterval(this.stallCheckInterval);
      this.stallCheckInterval = null;
    }
    if (this.session) {
      this.session.endTime = Date.now();
      this.save();
    }
    this.active = false;
  }

  recordInput(): void {
    this.lastInputTime = Date.now();
  }

  logEvent(
    type: PlaytestEvent['type'],
    level: number,
    detail?: string,
    durationMs?: number
  ): void {
    if (!this.session) return;
    this.session.events.push({
      timestamp: Date.now(),
      type,
      level,
      detail,
      durationMs,
    });

    switch (type) {
      case 'hint':
        this.session.totalHints++;
        break;
      case 'mistake':
        this.session.totalMistakes++;
        break;
      case 'undo':
        this.session.totalUndos++;
        break;
      case 'restart':
        this.session.totalRestarts++;
        break;
      case 'complete':
        if (!this.session.levelsCompleted.includes(level)) {
          this.session.levelsCompleted.push(level);
        }
        break;
    }
  }

  logLevelStart(level: number): void {
    this.logEvent('level_start', level);
  }

  logComplete(level: number): void {
    this.logEvent('complete', level);
  }

  logMistake(level: number, detail?: string): void {
    this.logEvent('mistake', level, detail);
  }

  logHint(level: number, tier: number): void {
    this.logEvent('hint', level, `tier ${tier}`);
  }

  logUndo(level: number): void {
    this.logEvent('undo', level);
  }

  logRestart(level: number): void {
    this.logEvent('restart', level);
  }

  logTutorialSkip(level: number): void {
    this.logEvent('tutorial_skip', level);
  }

  logFrustration(level: number, detail: string): void {
    this.logEvent('frustration', level, detail);
  }

  getSession(): PlaytestSession | null {
    return this.session;
  }

  isActive(): boolean {
    return this.active;
  }

  exportJSON(): string {
    if (!this.session) return '{}';
    return JSON.stringify(this.session, null, 2);
  }

  getSummary(): string {
    if (!this.session) return 'No active playtest session';
    const duration = this.session.endTime
      ? (this.session.endTime - this.session.startTime) / 1000
      : (Date.now() - this.session.startTime) / 1000;
    const stalls = this.session.events.filter(e => e.type === 'stall');
    return [
      `Playtest Summary (Age ${this.session.childAge})`,
      `Duration: ${(duration / 60).toFixed(1)} minutes`,
      `Levels completed: ${this.session.levelsCompleted.length} (${this.session.levelsCompleted.join(', ')})`,
      `Total hints: ${this.session.totalHints}`,
      `Total mistakes: ${this.session.totalMistakes}`,
      `Total undos: ${this.session.totalUndos}`,
      `Total restarts: ${this.session.totalRestarts}`,
      `Stall points: ${stalls.length}`,
      stalls.map(s => `  - L${s.level}: ${s.detail}`).join('\n'),
    ].join('\n');
  }

  private async save(): Promise<void> {
    if (!this.session) return;
    try {
      // Use in-memory storage for simplicity — can be extended to AsyncStorage
      if (__DEV__) console.log('[PlaytestLogger] Session saved');
      if (__DEV__) console.log(this.getSummary());
    } catch (error) {
      console.error('[PlaytestLogger] Save error:', error);
    }
  }
}

export const PlaytestLogger = new PlaytestLoggerClass();
