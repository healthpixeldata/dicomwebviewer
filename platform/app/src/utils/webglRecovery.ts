/**
 * Innowave: recovery from WebGL exhaustion (MPR / 3D / many tabs).
 *
 * When the browser runs out of WebGL contexts or GPU memory, the VTK mapper
 * throws errors such as "isAttributeUsed" / "setMapperShaderParameters" and the
 * viewport goes black. OHIF would show its error modal; instead we swallow that
 * specific error and reload the page once, which restores a clean context.
 *
 * Reloads are rate-limited (max 2 within 30 s) so a persistent failure shows
 * the normal error instead of reloading forever.
 *
 * app-config.js: `webglRecovery: 'reload'` (default) | 'off'
 */
const PATTERN = /isAttributeUsed|setMapperShaderParameters|CONTEXT_LOST_WEBGL|WebGL context (was )?lost/i;
const STORAGE_KEY = 'innowave.webglRecovery';
const MAX_RELOADS = 2;
const WINDOW_MS = 30_000;

function canReload(): boolean {
  try {
    const now = Date.now();
    const recent: number[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]').filter(
      (t: number) => now - t < WINDOW_MS
    );
    if (recent.length >= MAX_RELOADS) {
      return false;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...recent, now]));
    return true;
  } catch {
    return false; // storage unavailable (private mode): never auto-reload
  }
}

export function installWebGLRecovery(mode: 'reload' | 'off' = 'reload'): () => void {
  if (mode === 'off') {
    return () => {};
  }

  let reloading = false;

  const recover = (message: string, event: Event) => {
    if (!PATTERN.test(message) || reloading) {
      return;
    }
    if (!canReload()) {
      console.error('[webglRecovery] WebGL keeps failing; not reloading again.', message);
      return; // let OHIF show its normal error
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    reloading = true;
    console.warn('[webglRecovery] WebGL error, reloading to restore the GPU context:', message);
    setTimeout(() => window.location.reload(), 500);
  };

  const onError = (e: ErrorEvent) => recover(e.message || e.error?.message || '', e);
  const onRejection = (e: PromiseRejectionEvent) =>
    recover(String(e.reason?.message ?? e.reason ?? ''), e);

  window.addEventListener('error', onError, true);
  window.addEventListener('unhandledrejection', onRejection);
  return () => {
    window.removeEventListener('error', onError, true);
    window.removeEventListener('unhandledrejection', onRejection);
  };
}
