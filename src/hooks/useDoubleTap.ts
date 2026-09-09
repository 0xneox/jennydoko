import { useRef, useCallback } from 'react';

/**
 * Hook to handle single vs double tap gestures on mobile.
 * Returns a handler function to be attached to a pressable component.
 *
 * @param onSingleTap Called when a single tap is confirmed.
 * @param onDoubleTap Called when a double tap is detected (two taps within DOUBLE_TAP_DELAY ms on the same target).
 * @param DOUBLE_TAP_DELAY Delay in milliseconds to differentiate single vs double tap. Defaults to 280ms.
 */
export function useDoubleTap(
  onSingleTap: () => void,
  onDoubleTap: () => void,
  DOUBLE_TAP_DELAY = 280
) {
  const lastTap = useRef<{ time: number } | null>(null);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current.time < DOUBLE_TAP_DELAY) {
      // Double tap detected
      lastTap.current = null;
      onDoubleTap();
    } else {
      // Potential single tap – start timer to confirm it's not a double
      lastTap.current = { time: now };
      setTimeout(() => {
        // If lastTap still exists, it's a single tap
        if (lastTap.current) {
          lastTap.current = null;
          onSingleTap();
        }
      }, DOUBLE_TAP_DELAY);
    }
  }, [onSingleTap, onDoubleTap, DOUBLE_TAP_DELAY]);

  return handleTap;
}
