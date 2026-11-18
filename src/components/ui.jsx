import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const tones = {
  steel: ['#f4f6f8', '#a9b1bb', '#5c6570', '#2d3239'],
  zinc: ['#ffffff', '#cfd8e0', '#8b99a6', '#4b5763'],
  gold: ['#fff1c4', '#f2c260', '#c4862a', '#7a4f12'],
  dark: ['#9aa3ad', '#5b636d', '#33393f', '#15181c'],
};

/** Realistic vector wire nail. Points downward by default. */
export function Nail({ tone = 'steel', length = 260, width = 14, grooves = true, className, style }) {
  const id = useRef('n' + Math.random().toString(36).slice(2, 8)).current;
  const [hi, mid, lo, deep] = tones[tone] || tones.steel;
  const headW = width * 2.4;
  const headH = width * 0.55;
  const cx = headW / 2;
  const shankTop = headH + 2;
  const pointLen = width * 2.6;
  const shankEnd = length - pointLen;
  const x0 = cx - width / 2;
  return (
    <svg className={className} style={style} width={headW} height={length} viewBox={`0 0 ${headW} ${length}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}s`} x1="0" x2="1">
          <stop offset="0" stopColor={lo} />
          <stop offset="0.28" stopColor={hi} />
          <stop offset="0.5" stopColor={mid} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <radialGradient id={`${id}h`} cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor={hi} />
          <stop offset="0.6" stopColor={mid} />
          <stop offset="1" stopColor={deep} />
        </radialGradient>
      </defs>
      <rect x={x0} y={shankTop - 2} width={width} height={shankEnd - shankTop + 2} fill={`url(#${id}s)`} />
      {grooves &&
        Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={x0} y={shankTop + 6 + i * (width * 0.9)} width={width} height={width * 0.22} fill={deep} opacity="0.55" rx="1" />
        ))}
      <path d={`M${x0} ${shankEnd} L${x0 + width} ${shankEnd} L${cx} ${length} Z`} fill={`url(#${id}s)`} />
      <ellipse cx={cx} cy={headH / 2 + 1} rx={headW / 2 - 0.5} ry={headH / 2 + 0.5} fill={`url(#${id}h)`} />
      <ellipse cx={cx} cy={headH / 2} rx={headW / 2 - 3} ry={headH / 3} fill="none" stroke={deep} strokeOpacity="0.35" strokeDasharray="1.5 2.5" />
    </svg>
  );
}

export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function SectionHead({ kicker, title, sub, center = true, light = false }) {
  return (
    <div className={`section-head ${center ? 'center' : ''} ${light ? 'light' : ''}`}>
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="sub">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/**
 * Counts up from 0 every time it scrolls into view (resets when it leaves).
 * `onProgress` receives 0..1 so a bar or ring can fill in step with the number.
 */
export function Counter({ to, suffix = '', duration = 2.4, delay = 0.35, onProgress, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) {
      setVal(0);
      setDone(false);
      onProgress && onProgress(0);
      return;
    }
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(to);
      setDone(true);
      onProgress && onProgress(1);
      return;
    }
    const c = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setVal(Math.round(v));
        onProgress && onProgress(v / to);
      },
      onComplete: () => setDone(true),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, duration, delay]);
  return (
    <span ref={ref} className={`counter ${done ? 'done' : ''} ${className || ''}`}>
      <span className="counter-num">{val.toLocaleString('en-IN')}</span>
      {suffix && <span className="counter-suffix">{suffix}</span>}
    </span>
  );
}

export function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C8.86 3 3.04 8.82 3.04 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.94 12.94 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.62c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.6 4.77 10.6 10.63 0 5.87-4.74 10.62-10.6 10.62Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.57 1.14 3.08 1.3 3.3.16.2 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.2 2 .12.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}
