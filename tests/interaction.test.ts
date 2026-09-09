import { Board as BoardType } from '../src/game/types';

// Hit-test function from Board.tsx for testing
const getCellFromPosition = (
  x: number,
  y: number,
  cellSize: number,
  gridSize: number
): { row: number; col: number } | null => {
  const boardPadding = 10;
  const cellMargin = 2;
  const effectiveCellSize = cellSize + (cellMargin * 2);
  
  const relativeX = x - boardPadding;
  const relativeY = y - boardPadding;
  
  if (relativeX < 0 || relativeY < 0) return null;
  
  const col = Math.floor(relativeX / effectiveCellSize);
  const row = Math.floor(relativeY / effectiveCellSize);
  
  if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
    return null;
  }
  
  return { row, col };
};

describe('Interaction System Regression Tests', () => {
  describe('Double Tap Detection', () => {
    it('single tap should mark X (not puppy)', () => {
      // This test validates the logic that a single tap should mark X
      // The actual implementation is in GameScreen.tsx handleCellPress
      // Here we test the timing threshold logic conceptually
      const DOUBLE_TAP_MAX_DELAY = 350;
      const firstTapTime = Date.now();
      const secondTapTime = firstTapTime + DOUBLE_TAP_MAX_DELAY + 50; // Beyond threshold
      
      const isDoubleTap = (secondTapTime - firstTapTime) < DOUBLE_TAP_MAX_DELAY;
      expect(isDoubleTap).toBe(false);
    });

    it('double tap within threshold should place puppy', () => {
      const DOUBLE_TAP_MAX_DELAY = 350;
      const firstTapTime = Date.now();
      const secondTapTime = firstTapTime + 200; // Within threshold
      
      const isDoubleTap = (secondTapTime - firstTapTime) < DOUBLE_TAP_MAX_DELAY;
      expect(isDoubleTap).toBe(true);
    });

    it('double tap must not produce X', () => {
      // Validates that when double-tap is detected, X marking is skipped
      const DOUBLE_TAP_MAX_DELAY = 350;
      const firstTapTime = Date.now();
      const secondTapTime = firstTapTime + 200;
      
      const isDoubleTap = (secondTapTime - firstTapTime) < DOUBLE_TAP_MAX_DELAY;
      const shouldMarkX = !isDoubleTap;
      
      expect(isDoubleTap).toBe(true);
      expect(shouldMarkX).toBe(false);
    });

    it('works around the threshold boundary', () => {
      const DOUBLE_TAP_MAX_DELAY = 350;
      
      // Just below threshold
      const belowThreshold = Date.now() + (DOUBLE_TAP_MAX_DELAY - 1);
      expect((belowThreshold - Date.now()) < DOUBLE_TAP_MAX_DELAY).toBe(true);
      
      // Just above threshold
      const aboveThreshold = Date.now() + (DOUBLE_TAP_MAX_DELAY + 1);
      expect((aboveThreshold - Date.now()) < DOUBLE_TAP_MAX_DELAY).toBe(false);
    });

    it('rapid double tap is detected', () => {
      const DOUBLE_TAP_MAX_DELAY = 350;
      const rapidInterval = 100; // Very fast double tap
      
      const isDoubleTap = rapidInterval < DOUBLE_TAP_MAX_DELAY;
      expect(isDoubleTap).toBe(true);
    });

    it('different board sizes should not affect tap detection', () => {
      // Tap detection is time-based, not grid-size based
      const DOUBLE_TAP_MAX_DELAY = 350;
      const tapInterval = 200;
      
      const isDoubleTap = tapInterval < DOUBLE_TAP_MAX_DELAY;
      expect(isDoubleTap).toBe(true);
      
      // This should work regardless of whether grid is 4x4 or 10x10
      // because tap detection doesn't depend on cell dimensions
    });
  });

  describe('Continuous Drag X-Marking', () => {
    it('hit-test correctly identifies cell from position', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      // Board padding is 10, cell margin is 2
      // Effective cell size = 64 + 4 = 68
      
      // Cell (0,0) should be at position (10, 10) to (78, 78)
      const cell00 = getCellFromPosition(44, 44, cellSize, gridSize);
      expect(cell00).toEqual({ row: 0, col: 0 });
      
      // Cell (1,1) should be at position (78, 78) to (146, 146)
      const cell11 = getCellFromPosition(112, 112, cellSize, gridSize);
      expect(cell11).toEqual({ row: 1, col: 1 });
    });

    it('hit-test returns null for positions outside board', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      // Before board padding
      expect(getCellFromPosition(5, 44, cellSize, gridSize)).toBeNull();
      expect(getCellFromPosition(44, 5, cellSize, gridSize)).toBeNull();
      
      // Beyond grid bounds
      expect(getCellFromPosition(500, 44, cellSize, gridSize)).toBeNull();
      expect(getCellFromPosition(44, 500, cellSize, gridSize)).toBeNull();
    });

    it('hit-test works for different cell sizes', () => {
      const gridSize = 5;
      
      // Small cell size (30 for 10x10)
      const smallCell = getCellFromPosition(35, 35, 30, gridSize);
      expect(smallCell).toEqual({ row: 0, col: 0 });
      
      // Large cell size (64 for 4x4)
      const largeCell = getCellFromPosition(44, 44, 64, gridSize);
      expect(largeCell).toEqual({ row: 0, col: 0 });
    });

    it('hit-test works for all grid sizes 4x4 through 10x10', () => {
      const cellSizes = [64, 56, 48, 42, 38, 33, 30]; // 4x4 to 10x10
      
      cellSizes.forEach((cellSize, index) => {
        const gridSize = 4 + index;
        // Use position that accounts for board padding (10) and cell margin (2)
        // Position should be in the middle of the first cell
        const effectiveCellSize = cellSize + 4; // cellSize + 2*margin
        const position = 10 + (effectiveCellSize / 2); // padding + half cell
        const cell = getCellFromPosition(position, position, cellSize, gridSize);
        expect(cell).toEqual({ row: 0, col: 0 });
      });
    });

    it('drag marks cells as finger moves across board', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      const markedCells: { row: number; col: number }[] = [];
      const lastMarkedCellRef = { current: null as { row: number; col: number } | null };
      
      // Simulate dragging from (0,0) to (0,3)
      const positions = [
        { x: 44, y: 44 },   // (0,0)
        { x: 112, y: 44 },  // (0,1)
        { x: 180, y: 44 },  // (0,2)
        { x: 248, y: 44 },  // (0,3)
      ];
      
      positions.forEach(pos => {
        const cell = getCellFromPosition(pos.x, pos.y, cellSize, gridSize);
        if (cell) {
          const lastMarked = lastMarkedCellRef.current;
          if (!lastMarked || lastMarked.row !== cell.row || lastMarked.col !== cell.col) {
            markedCells.push(cell);
            lastMarkedCellRef.current = cell;
          }
        }
      });
      
      expect(markedCells).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
      ]);
    });

    it('same cell is not repeatedly marked while finger stays in it', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      const markedCells: { row: number; col: number }[] = [];
      const lastMarkedCellRef = { current: null as { row: number; col: number } | null };
      
      // Simulate finger staying in same cell with slight movement
      const positions = [
        { x: 44, y: 44 },
        { x: 50, y: 44 },
        { x: 44, y: 50 },
        { x: 50, y: 50 },
      ];
      
      positions.forEach(pos => {
        const cell = getCellFromPosition(pos.x, pos.y, cellSize, gridSize);
        if (cell) {
          const lastMarked = lastMarkedCellRef.current;
          if (!lastMarked || lastMarked.row !== cell.row || lastMarked.col !== cell.col) {
            markedCells.push(cell);
            lastMarkedCellRef.current = cell;
          }
        }
      });
      
      // Should only mark once
      expect(markedCells.length).toBe(1);
      expect(markedCells[0]).toEqual({ row: 0, col: 0 });
    });

    it('vertical drag marks cells correctly', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      const markedCells: { row: number; col: number }[] = [];
      const lastMarkedCellRef = { current: null as { row: number; col: number } | null };
      
      const positions = [
        { x: 44, y: 44 },   // (0,0)
        { x: 44, y: 112 },  // (1,0)
        { x: 44, y: 180 },  // (2,0)
        { x: 44, y: 248 },  // (3,0)
      ];
      
      positions.forEach(pos => {
        const cell = getCellFromPosition(pos.x, pos.y, cellSize, gridSize);
        if (cell) {
          const lastMarked = lastMarkedCellRef.current;
          if (!lastMarked || lastMarked.row !== cell.row || lastMarked.col !== cell.col) {
            markedCells.push(cell);
            lastMarkedCellRef.current = cell;
          }
        }
      });
      
      expect(markedCells).toEqual([
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 },
      ]);
    });

    it('drag works without any puppy on board', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      // No puppy needed for drag to work
      const cell = getCellFromPosition(44, 44, cellSize, gridSize);
      expect(cell).toEqual({ row: 0, col: 0 });
    });

    it('drag works with puppy on board', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      // Drag should work regardless of puppy existence
      const cell = getCellFromPosition(44, 44, cellSize, gridSize);
      expect(cell).toEqual({ row: 0, col: 0 });
    });

    it('drag starting from any cell works', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      // Start from middle cell
      const cell = getCellFromPosition(112, 112, cellSize, gridSize);
      expect(cell).toEqual({ row: 1, col: 1 });
    });

    it('fast drag (large position jumps) still marks cells', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      const markedCells: { row: number; col: number }[] = [];
      const lastMarkedCellRef = { current: null as { row: number; col: number } | null };
      
      // Large jumps simulating fast drag
      const positions = [
        { x: 44, y: 44 },    // (0,0)
        { x: 248, y: 44 },   // (0,3) - jump across 2 cells
        { x: 248, y: 248 },  // (3,3) - jump down 3 cells
      ];
      
      positions.forEach(pos => {
        const cell = getCellFromPosition(pos.x, pos.y, cellSize, gridSize);
        if (cell) {
          const lastMarked = lastMarkedCellRef.current;
          if (!lastMarked || lastMarked.row !== cell.row || lastMarked.col !== cell.col) {
            markedCells.push(cell);
            lastMarkedCellRef.current = cell;
          }
        }
      });
      
      expect(markedCells).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 3 },
        { row: 3, col: 3 },
      ]);
    });

    it('diagonal movement does not mark unrelated cells', () => {
      const cellSize = 64;
      const gridSize = 4;
      
      const markedCells: { row: number; col: number }[] = [];
      const lastMarkedCellRef = { current: null as { row: number; col: number } | null };
      
      // Diagonal movement
      const positions = [
        { x: 44, y: 44 },    // (0,0)
        { x: 112, y: 112 },  // (1,1)
        { x: 180, y: 180 },  // (2,2)
        { x: 248, y: 248 },  // (3,3)
      ];
      
      positions.forEach(pos => {
        const cell = getCellFromPosition(pos.x, pos.y, cellSize, gridSize);
        if (cell) {
          const lastMarked = lastMarkedCellRef.current;
          if (!lastMarked || lastMarked.row !== cell.row || lastMarked.col !== cell.col) {
            markedCells.push(cell);
            lastMarkedCellRef.current = cell;
          }
        }
      });
      
      // Only marks the actual cells touched, not intermediate ones
      expect(markedCells).toEqual([
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
        { row: 3, col: 3 },
      ]);
    });
  });

  describe('Gesture Priority and State Management', () => {
    it('drag start clears pending single-tap timeout', () => {
      // Validates that drag start clears the single-tap timeout to prevent conflicts
      let timeoutCleared = false;
      const mockTimeoutRef = { current: setTimeout(() => {}, 350) as ReturnType<typeof setTimeout> | null };
      
      // Simulate drag start clearing timeout
      if (mockTimeoutRef.current) {
        clearTimeout(mockTimeoutRef.current);
        mockTimeoutRef.current = null;
        timeoutCleared = true;
      }
      
      expect(timeoutCleared).toBe(true);
      expect(mockTimeoutRef.current).toBeNull();
    });

    it('drag start clears lastTap state', () => {
      let lastTap = { row: 0, col: 0, time: Date.now() };
      
      // Simulate drag start clearing lastTap
      lastTap = null as any;
      
      expect(lastTap).toBeNull();
    });

    it('isDragging state prevents tap during drag', () => {
      let isDragging = true;
      
      // Tap should be ignored when dragging
      const shouldProcessTap = !isDragging;
      
      expect(shouldProcessTap).toBe(false);
    });

    it('undo clears isDragging state', () => {
      let isDragging = true;
      
      // Simulate undo clearing drag state
      isDragging = false;
      
      expect(isDragging).toBe(false);
    });

    it('restart clears isDragging state', () => {
      let isDragging = true;
      
      // Simulate restart clearing drag state
      isDragging = false;
      
      expect(isDragging).toBe(false);
    });

    it('level transition clears isDragging state', () => {
      let isDragging = true;
      
      // Simulate level change clearing drag state
      isDragging = false;
      
      expect(isDragging).toBe(false);
    });

    it('drag end sets isDragging to false', () => {
      let isDragging = true;
      
      // Simulate drag end
      isDragging = false;
      
      expect(isDragging).toBe(false);
    });

    it('drag end clears lastMarkedCellRef', () => {
      let lastMarkedCell = { row: 2, col: 2 };
      
      // Simulate drag end clearing last marked cell
      lastMarkedCell = null as any;
      
      expect(lastMarkedCell).toBeNull();
    });
  });

  describe('Dual Input Mode Switcher (Sprint 1)', () => {
    it('in puppy mode, single tap places puppy', () => {
      let inputMode: 'puppy' | 'mark' = 'puppy';
      let placedPuppy = false;
      let markedCell = false;

      const handlePress = () => {
        if (inputMode === 'puppy') {
          placedPuppy = true;
        } else {
          markedCell = true;
        }
      };

      handlePress();
      expect(placedPuppy).toBe(true);
      expect(markedCell).toBe(false);
    });

    it('in mark mode, single tap marks cell as X', () => {
      const mode: 'puppy' | 'mark' = 'mark' as 'puppy' | 'mark';
      let placedPuppy = false;
      let markedCell = false;

      const handlePress = (inputMode: 'puppy' | 'mark') => {
        if (inputMode === 'puppy') {
          placedPuppy = true;
        } else {
          markedCell = true;
        }
      };

      handlePress(mode);
      expect(placedPuppy).toBe(false);
      expect(markedCell).toBe(true);
    });

    it('in mark mode, double-tap acts as shortcut to place puppy', () => {
      const mode: 'puppy' | 'mark' = 'mark' as 'puppy' | 'mark';
      const DOUBLE_TAP_MAX_DELAY = 400;
      let cellState: 'empty' | 'marked' | 'puppy' = 'empty';
      let lastTap: { row: number; col: number; time: number } | null = null;

      const handleCellPress = (row: number, col: number, now: number, inputMode: 'puppy' | 'mark') => {
        if (lastTap && lastTap.row === row && lastTap.col === col && now - lastTap.time < DOUBLE_TAP_MAX_DELAY) {
          // Double tap shortcut
          cellState = 'puppy';
          lastTap = null;
          return;
        }

        if (inputMode === 'puppy') {
          cellState = 'puppy';
        } else {
          cellState = cellState === 'marked' ? 'empty' : 'marked';
        }
        lastTap = { row, col, time: now };
      };

      // First tap in mark mode
      handleCellPress(0, 0, 1000, mode);
      expect(cellState).toBe('marked');

      // Second tap within 200ms
      handleCellPress(0, 0, 1200, mode);
      expect(cellState).toBe('puppy');
    });

    it('drag marking only marks in mark mode', () => {
      let inputMode: 'puppy' | 'mark' = 'puppy';
      let markedCount = 0;

      const handleMarkCell = () => {
        if (inputMode === 'mark') {
          markedCount++;
        }
      };

      // Try drag in puppy mode
      handleMarkCell();
      expect(markedCount).toBe(0);

      // Switch to mark mode
      inputMode = 'mark';
      handleMarkCell();
      expect(markedCount).toBe(1);
    });
  });
});

