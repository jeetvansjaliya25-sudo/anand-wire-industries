import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X, Loader2, FileWarning } from 'lucide-react';
import { downloadFile } from '../lib/files';

const Ctx = createContext({ openPdf: () => {} });
export const usePdf = () => useContext(Ctx);

/** Wrap the app; any component can call `openPdf({file, title})`. */
export function PdfProvider({ children }) {
  const [doc, setDoc] = useState(null);
  const openPdf = useCallback((d) => setDoc(d), []);
  return (
    <Ctx.Provider value={{ openPdf }}>
      {children}
      <AnimatePresence>{doc && <PdfModal key={doc.file} doc={doc} onClose={() => setDoc(null)} />}</AnimatePresence>
    </Ctx.Provider>
  );
}

let pdfjsPromise = null;
function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(([lib, worker]) => {
      lib.GlobalWorkerOptions.workerSrc = worker.default;
      return lib;
    });
  }
  return pdfjsPromise;
}

function PdfModal({ doc, onClose }) {
  const pagesRef = useRef(null);
  const [state, setState] = useState({ status: 'loading', pages: 0 });
  const [saving, setSaving] = useState('');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    let task;
    (async () => {
      try {
        const pdfjs = await loadPdfjs();
        task = pdfjs.getDocument({ url: doc.file });
        const pdf = await task.promise;
        if (cancelled) return;
        setState({ status: 'ready', pages: pdf.numPages });
        const host = pagesRef.current;
        const width = Math.min(host.clientWidth - 2, 900);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        for (let n = 1; n <= pdf.numPages; n++) {
          if (cancelled) return;
          const page = await pdf.getPage(n);
          const base = page.getViewport({ scale: 1 });
          const scale = width / base.width;
          const vp = page.getViewport({ scale: scale * dpr });
          const canvas = document.createElement('canvas');
          canvas.width = vp.width;
          canvas.height = vp.height;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${(vp.height / dpr).toFixed(0)}px`;
          canvas.className = 'pdf-page';
          canvas.setAttribute('aria-label', `Page ${n}`);
          host.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        }
      } catch (e) {
        if (!cancelled) setState({ status: 'error', pages: 0 });
      }
    })();
    return () => {
      cancelled = true;
      task && task.destroy && task.destroy();
    };
  }, [doc.file]);

  const save = async () => {
    setSaving('Preparing…');
    const r = await downloadFile(doc.file);
    setSaving(r === 'declined' ? '' : 'Saved');
    if (r !== 'declined') setTimeout(() => setSaving(''), 2500);
  };

  return (
    <motion.div className="pdf-modal" role="dialog" aria-modal="true" aria-label={doc.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} onClick={onClose}>
      <motion.div className="pdf-sheet" initial={{ y: 40, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0, transition: { duration: 0.15 } }} transition={{ type: 'spring', stiffness: 160, damping: 20 }} onClick={(e) => e.stopPropagation()}>
        <header className="pdf-head">
          <div className="pdf-title">
            <strong>{doc.title}</strong>
            <small>{state.status === 'ready' ? `${state.pages} page${state.pages > 1 ? 's' : ''} · PDF` : 'PDF'}</small>
          </div>
          <button className="btn btn-dark btn-sm" onClick={save} disabled={!!saving && saving !== 'Saved'}>
            <Download size={16} /> {saving || 'Download'}
          </button>
          <button className="pdf-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>
        <div className="pdf-body">
          {state.status === 'loading' && (
            <div className="pdf-msg">
              <Loader2 className="spin" size={28} /> Opening {doc.title}…
            </div>
          )}
          {state.status === 'error' && (
            <div className="pdf-msg">
              <FileWarning size={28} /> This PDF could not be shown here. Use Download to save it instead.
            </div>
          )}
          <div className="pdf-pages" ref={pagesRef} />
        </div>
      </motion.div>
    </motion.div>
  );
}
