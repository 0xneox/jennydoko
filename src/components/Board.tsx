import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Cell, CellBorders } from './Cell';
import { Board as BoardType } from '../game/types';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

interface BoardProps {
  board: BoardType;
  onCellPress: (row: number, col: number) => void;
  onMarkCell?: (row: number, col: number) => void;
  cellSize: number;
  wrongCell?: { row: number; col: number } | null;
  isCompleting?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  onCellPress,
  onMarkCell,
  cellSize,
  wrongCell,
  isCompleting,
  onDragStart,
  onDragEnd,
}) => {
  const lastMarkedCellRef = useRef<{ row: number; col: number } | null>(null);
  const isDraggingRef = useRef(false);

  // Quick lookup cache for region IDs
  const cellRegionMap = useRef<Map<string, number>>(new Map());
  cellRegionMap.current.clear();
  for (const region of board.regions) {
    for (const cell of region.cells) {
      cellRegionMap.current.set(`${cell.row},${cell.col}`, region.id);
    }
  }

  const getRegionId = (row: number, col: number): number | undefined => {
    return cellRegionMap.current.get(`${row},${col}`);
  };

  const getBorders = (row: number, col: number, regionId?: number): CellBorders => {
    const topRegion = row > 0 ? getRegionId(row - 1, col) : undefined;
    const bottomRegion = row < board.gridSize - 1 ? getRegionId(row + 1, col) : undefined;
    const leftRegion = col > 0 ? getRegionId(row, col - 1) : undefined;
    const rightRegion = col < board.gridSize - 1 ? getRegionId(row, col + 1) : undefined;

    return {
      top: row === 0 || topRegion !== regionId,
      bottom: row === board.gridSize - 1 || bottomRegion !== regionId,
      left: col === 0 || leftRegion !== regionId,
      right: col === board.gridSize - 1 || rightRegion !== regionId,
    };
  };

  // Hit-test: convert touch coordinates to grid cell
  const getCellFromPosition = (x: number, y: number): { row: number; col: number } | null => {
    const boardPadding = 12;
    // Each Cell has margin: 1.5, so cell total spacing = cellSize + 3
    const effectiveCellSize = cellSize + 3;

    const relativeX = x - boardPadding;
    const relativeY = y - boardPadding;

    if (relativeX < 0 || relativeY < 0) return null;

    const col = Math.floor(relativeX / effectiveCellSize);
    const row = Math.floor(relativeY / effectiveCellSize);

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
      <View style={styles.trayOuter}>
        <View style={styles.trayInner}>
          {board.cells.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => {
                const regionId = getRegionId(rowIndex, colIndex);
                const borders = getBorders(rowIndex, colIndex, regionId);

                return (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    value={cell.value}
                    onPress={() => onCellPress(rowIndex, colIndex)}
                    regionId={regionId}
                    size={cellSize}
                    borders={borders}
                    row={rowIndex}
                    col={colIndex}
                    isWrong={
                      wrongCell?.row === rowIndex &&
                      wrongCell?.col === colIndex
                    }
                    isCompleting={isCompleting}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  trayOuter: {
    padding: 6,
    backgroundColor: '#EAE1D2', // Cozy picnic basket / wooden tray outer rim
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#D8CEBE',
    shadowColor: '#5C4A38',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  trayInner: {
    padding: 6,
    backgroundColor: '#FAF7F0', // Warm linen canvas table backing
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEAE0',
  },
  row: {
    flexDirection: 'row',
  },
});
