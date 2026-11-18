// File helpers that work both on a normal website and inside the Claude
// artifact viewer (where the frame blocks plain <a download> links).

let dlPromise = null;
/** Resolve the Claude viewer's `downloads` capability once, or null on a normal site. */
function getClaudeDownloads() {
  if (!dlPromise) {
    dlPromise =
      typeof window !== 'undefined' && window.claude && typeof window.claude.use === 'function'
        ? window.claude.use('downloads').catch(() => null)
        : Promise.resolve(null);
  }
  return dlPromise;
}
// warm it up early so the first click is fast
if (typeof window !== 'undefined') setTimeout(getClaudeDownloads, 0);

const nameFrom = (url) => decodeURIComponent(url.split('/').pop().split('?')[0]);

/**
 * Save a file to the viewer's device.
 * Returns 'saved' | 'declined' | 'browser' (fell back to normal download).
 */
export async function downloadFile(url, filename = nameFrom(url)) {
  const dl = await getClaudeDownloads();
  if (dl) {
    try {
      const blob = await (await fetch(url)).blob();
      await dl.save({ filename, data: blob });
      return 'saved';
    } catch (e) {
      if (e && e.code === 'declined') return 'declined';
      if (e && e.code === 'rate_limited') return 'declined';
      // any other error: fall through to the browser path
    }
  }
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  return 'browser';
}

/** Click handler for an <a href download> that keeps the href for no-JS/SEO. */
export const onDownloadClick = (url, filename) => (e) => {
  e.preventDefault();
  downloadFile(url, filename);
};
