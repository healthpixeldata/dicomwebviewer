import { useSyncExternalStore } from 'react';

/**
 * Innowave: global show/hide switch for the on-image text overlays
 * (patient/study info, W/L, slice number, orientation markers).
 * Toggled from the header settings menu via the `innowave:toggle-overlays`
 * window event, so it works on every screen size. The choice is remembered.
 */
const STORAGE_KEY = 'innowave.overlaysHidden';
const EVENT = 'innowave:toggle-overlays';

let hidden = false;
try {
  hidden = window.localStorage.getItem(STORAGE_KEY) === '1';
} catch (e) {
  // storage unavailable (private mode etc.) - start visible
}

const listeners = new Set<() => void>();

function set(next: boolean) {
  hidden = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
  } catch (e) {
    // ignore
  }
  listeners.forEach(l => l());
}

if (typeof window !== 'undefined') {
  window.addEventListener(EVENT, () => set(!hidden));
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function useOverlaysHidden(): boolean {
  return useSyncExternalStore(subscribe, () => hidden);
}
