import { PlaytestLogger, PlaytestSession } from '../src/utils/playtestLogger';

describe('Playtest Logger — Phase 5.4', () => {
  beforeEach(() => {
    PlaytestLogger.stop();
  });

  afterEach(() => {
    PlaytestLogger.stop();
  });

  it('starts a session with child age', () => {
    PlaytestLogger.start(8);
    expect(PlaytestLogger.isActive()).toBe(true);
    const session = PlaytestLogger.getSession();
    expect(session).not.toBeNull();
    expect(session!.childAge).toBe(8);
    expect(session!.events).toEqual([]);
    expect(session!.levelsCompleted).toEqual([]);
  });

  it('logs level start events', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logLevelStart(1);
    const session = PlaytestLogger.getSession();
    expect(session!.events.length).toBe(1);
    expect(session!.events[0].type).toBe('level_start');
    expect(session!.events[0].level).toBe(1);
  });

  it('logs completion and tracks levels completed', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logLevelStart(1);
    PlaytestLogger.logComplete(1);
    const session = PlaytestLogger.getSession();
    expect(session!.levelsCompleted).toContain(1);
    expect(session!.totalHints).toBe(0);
  });

  it('tracks hints, mistakes, undos, and restarts', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logHint(1, 1);
    PlaytestLogger.logHint(1, 2);
    PlaytestLogger.logMistake(1, 'wrong cell');
    PlaytestLogger.logMistake(1);
    PlaytestLogger.logUndo(1);
    PlaytestLogger.logRestart(1);
    const session = PlaytestLogger.getSession();
    expect(session!.totalHints).toBe(2);
    expect(session!.totalMistakes).toBe(2);
    expect(session!.totalUndos).toBe(1);
    expect(session!.totalRestarts).toBe(1);
  });

  it('does not duplicate levels completed', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logComplete(5);
    PlaytestLogger.logComplete(5);
    const session = PlaytestLogger.getSession();
    expect(session!.levelsCompleted.length).toBe(1);
  });

  it('logs tutorial skip events', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logTutorialSkip(1);
    const session = PlaytestLogger.getSession();
    expect(session!.events.some(e => e.type === 'tutorial_skip')).toBe(true);
  });

  it('logs frustration events with detail', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logFrustration(201, 'Could not place puppy near cat');
    const session = PlaytestLogger.getSession();
    const frustration = session!.events.find(e => e.type === 'frustration');
    expect(frustration).toBeDefined();
    expect(frustration!.detail).toContain('cat');
  });

  it('stops session and sets endTime', () => {
    PlaytestLogger.start(8);
    expect(PlaytestLogger.isActive()).toBe(true);
    PlaytestLogger.stop();
    expect(PlaytestLogger.isActive()).toBe(false);
    const session = PlaytestLogger.getSession();
    expect(session!.endTime).toBeDefined();
  });

  it('exports valid JSON', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logComplete(1);
    const json = PlaytestLogger.exportJSON();
    const parsed = JSON.parse(json);
    expect(parsed.childAge).toBe(8);
    expect(parsed.events).toBeInstanceOf(Array);
    expect(parsed.levelsCompleted).toContain(1);
  });

  it('generates human-readable summary', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.logComplete(1);
    PlaytestLogger.logHint(1, 1);
    PlaytestLogger.logMistake(1);
    const summary = PlaytestLogger.getSummary();
    expect(summary).toContain('Age 8');
    expect(summary).toContain('Levels completed: 1');
    expect(summary).toContain('Total hints: 1');
    expect(summary).toContain('Total mistakes: 1');
  });

  it('records input to reset stall timer', () => {
    PlaytestLogger.start(8);
    PlaytestLogger.recordInput();
    // No stall should be logged immediately after input
    const session = PlaytestLogger.getSession();
    const stalls = session!.events.filter(e => e.type === 'stall');
    expect(stalls.length).toBe(0);
  });
});
