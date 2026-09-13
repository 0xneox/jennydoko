import React, { useRef, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Cell, CellBorders } from './Cell';
import { Board as BoardType } from '../game/types';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { CANDY_SURFACE, CANDY_GOLD } from '../utils/theme';

/**
 * Tray chrome dimensions. Drag hit-testing converts touch coordinates that are
 * relative to the outer tray, so these must stay in sync with the styles below —
 * they're declared once and referenced from both places.
 */
const TRAY_OUTER_BORDER = 2;
const TRAY_OUTER_PADDING = 7;
const TRAY_INNER_BORDER = 1.5;
const TRAY_INNER_PADDING = 7;
const GRID_OFFSET =
  TRAY_OUTER_BORDER + TRAY_OUTER_PADDING + TRAY_INNER_BORDER + TRAY_INNER_PADDING;

interface BoardProps {
  board: BoardType;
  onCellPress: (row: number, col: number) => void;
  onMarkCell?: (row: number, col: number) => void;
  cellSize: number;
  wrongCell?: { row: number; col: number } | null;
  hintCell?: { row: number; col: number } | null;
  isCompleting?: boolean;
  showCatAura?: boolean;
  linkedPulseRegionId?: number | null;
  quota?: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  onCellPress,
  onMarkCell,
  cellSize,
  wrongCell,
  hintCell,
  isCompleting,
  showCatAura,
  linkedPulseRegionId,
  quota,
  onDragStart,
  onDragEnd,
}) => {
  const lastMarkedCellRef = useRef<{ row: number; col: number } | null>(null);
  const isDraggingRef = useRef(false);

  // Cells are memoized, so their per-cell onPress closure may be stale across
  // renders — route through a ref + stable callback so it always hits the
  // latest handler (inputMode/lastTap live in GameScreen state).
  const onCellPressRef = useRef(onCellPress);
  onCellPressRef.current = onCellPress;
  const pressCell = useCallback(
    (r: number, c: number) => onCellPressRef.current(r, c),
    []
  );

  // Quick lookup cache for region IDs — only rebuilt when the region layout changes
  const cellRegionMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const region of board.regions) {
      for (const cell of region.cells) {
        map.set(`${cell.row},${cell.col}`, region.id);
      }
    }
    return map;
  }, [board.regions]);

  // Cat aura: cells touching a cat get a soft red glow on board reveal
  const catAuraCells = useMemo(() => {
    if (!showCatAura) return new Set<string>();
    const aura = new Set<string>();
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (let r = 0; r < board.gridSize; r++) {
      for (let c = 0; c < board.gridSize; c++) {
        if (board.cells[r][c].value === 'cat') {
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < board.gridSize && nc >= 0 && nc < board.gridSize) {
              aura.add(`${nr},${nc}`);
            }
          }
        }
      }
    }
    return aura;
  }, [board.cells, board.gridSize, showCatAura]);

  // Linked beds: regions whose cells aren't 4-connected share one puppy.
  // Detected structurally so the 🔗 badge shows even if data forgets the flag.
  const linkedRegionIds = useMemo(() => {
    const ids = new Set<number>();
    for (const region of board.regions) {
      if (region.linked) {
        ids.add(region.id);
        continue;
      }
      if (region.cells.length <= 1) continue;
      const cellSet = new Set(region.cells.map(c => `${c.row},${c.col}`));
      const visited = new Set<string>([`${region.cells[0].row},${region.cells[0].col}`]);
      const queue = [region.cells[0]];
      while (queue.length > 0) {
        const cur = queue.pop()!;
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const key = `${cur.row + dr},${cur.col + dc}`;
          if (cellSet.has(key) && !visited.has(key)) {
            visited.add(key);
            queue.push({ row: cur.row + dr, col: cur.col + dc });
          }
        }
      }
      if (visited.size !== region.cells.length) ids.add(region.id);
    }
    return ids;
  }, [board.regions]);

  const getRegionId = (row: number, col: number): number | undefined => {
    return cellRegionMap.get(`${row},${col}`);
  };

  // Pre-compute all cell borders once per region layout — avoids creating
  // 100 new objects per render on a 10×10 twin board.
  const bordersMap = useMemo(() => {
    const map = new Map<string, CellBorders>();
    for (let r = 0; r < board.gridSize; r++) {
      for (let c = 0; c < board.gridSize; c++) {
        const regionId = getRegionId(r, c);
        const topRegion = r > 0 ? getRegionId(r - 1, c) : undefined;
        const bottomRegion = r < board.gridSize - 1 ? getRegionId(r + 1, c) : undefined;
        const leftRegion = c > 0 ? getRegionId(r, c - 1) : undefined;
        const rightRegion = c < board.gridSize - 1 ? getRegionId(r, c + 1) : undefined;
        map.set(`${r},${c}`, {
          top: r === 0 || topRegion !== regionId,
          bottom: r === board.gridSize - 1 || bottomRegion !== regionId,
          left: c === 0 || leftRegion !== regionId,
          right: c === board.gridSize - 1 || rightRegion !== regionId,
        });
      }
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.regions, board.gridSize, cellRegionMap]);

  const getBorders = (row: number, col: number, regionId?: number): CellBorders => {
    return bordersMap.get(`${row},${col}`) || { top: true, bottom: true, left: true, right: true };
  };

  // Hit-test: convert touch coordinates to grid cell. Each Cell occupies a
  // fixed `cellSize` slot with no margin, so the grid pitch is exactly cellSize.
  const getCellFromPosition = (x: number, y: number): { row: number; col: number } | null => {
    const relativeX = x - GRID_OFFSET;
    const relativeY = y - GRID_OFFSET;

    if (relativeX < 0 || relativeY < 0) return null;

    const col = Math.floor(relativeX / cellSize);
    const row = Math.floor(relativeY / cellSize);

    if (row < 0 || row >= board.gridSize || col < 0 || col >= board.gridSize) {
      return null;
    }

    return { row, col };
  };

  const panGesture = Gesture.Pan()
    .minDistance(12)
    .runOnJS(true)
    .onStart(() => {
      isDraggingRef.current = true;
      lastMarkedCellRef.current = null;
      onDragStart?.();
    })
    .onUpdate((e) => {
      if (!isDraggingRef.current) return;

      const { x, y } = e;
      const cell = getCellFromPosition(x, y);

      if (!cell) return;

      const lastMarked = lastMarkedCellRef.current;
      if (!lastMarked || lastMarked.row !== cell.row || lastMarked.col !== cell.col) {
        if (board.cells[cell.row]?.[cell.col]?.value === 'empty' && onMarkCell) {
          onMarkCell(cell.row, cell.col);
          lastMarkedCellRef.current = cell;
        }
      }
    })
    .onEnd(() => {
      isDraggingRef.current = false;
      lastMarkedCellRef.current = null;
      onDragEnd?.();
    })
    .shouldCancelWhenOutside(false)
    .simultaneousWithExternalGesture(Gesture.Native());

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.trayShadow}>
        {/* Gold arcade cabinet frame */}
        <LinearGradient
          colors={[CANDY_GOLD.light, CANDY_GOLD.base, CANDY_GOLD.dark]}
          locations={[0, 0.4, 1]}
          style={styles.trayOuter}
        >
          {/* Recessed dark well so the saturated candies pop off the board */}
          <LinearGradient
            colors={[CANDY_SURFACE.wellTop, CANDY_SURFACE.wellBottom]}
            style={styles.trayInner}
          >
            {board.cells.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => {
                  const regionId = getRegionId(rowIndex, colIndex);
                  const borders = getBorders(rowIndex, colIndex, regionId);

                  return (
                    <Cell
                      key={`${rowIndex}-${colIndex}`}
                      value={cell.value}
                      onPress={() => pressCell(rowIndex, colIndex)}
                      regionId={regionId}
                      size={cellSize}
                      borders={borders}
                      row={rowIndex}
                      col={colIndex}
                      isWrong={
                        wrongCell?.row === rowIndex &&
                        wrongCell?.col === colIndex
                      }
                      isHinted={
                        hintCell?.row === rowIndex &&
                        hintCell?.col === colIndex
                      }
                      isCatAura={catAuraCells.has(`${rowIndex},${colIndex}`)}
                      isLinkedPulse={
                        linkedPulseRegionId !== null &&
                        linkedPulseRegionId !== undefined &&
                        regionId === linkedPulseRegionId
                      }
                      showBow={quota !== undefined && quota > 1}
                      isCompleting={isCompleting}
                      isLinked={regionId !== undefined && linkedRegionIds.has(regionId)}
                    />
                  );
                })}
              </View>
            ))}
          </LinearGradient>
        </LinearGradient>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  trayShadow: {
    borderRadius: 26,
    backgroundColor: CANDY_GOLD.shadow,
    paddingBottom: 5,
    shadowColor: '#150A2E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  },
  trayOuter: {
    padding: TRAY_OUTER_PADDING,
    borderRadius: 26,
    borderWidth: TRAY_OUTER_BORDER,
    borderColor: CANDY_GOLD.dark,
  },
  trayInner: {
    padding: TRAY_INNER_PADDING,
    borderRadius: 18,
    borderWidth: TRAY_INNER_BORDER,
    borderColor: '#20123F',
  },
  row: {
    flexDirection: 'row',
  },
});
