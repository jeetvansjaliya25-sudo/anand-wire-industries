import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { company, waLink } from '../data/site';
import { WhatsAppIcon } from './ui';

const links = [
  ['About', '#about'],
  ['Brands', '#brands'],
  ['Products', '#products'],
  ['Experience', '#experience'],
  ['Videos', '#media'],
  ['Downloads', '#downloads'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <motion.div className="nav-progress" style={{ scaleX: progress }} />
      <div className="container nav-inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">
            <svg viewBox="0 0 40 40" width="38" height="38">
              <defs>
                <linearGradient id="lg" x1="0" x2="1">
                  <stop offset="0" stopColor="#f6c66a" />
                  <stop offset="1" stopColor="#b97a23" />
                </linearGradient>
              </defs>
              <rect x="9" y="6" width="22" height="5" rx="2.5" fill="url(#lg)" />
              <path d="M17 11h6v17l-3 7-3-7z" fill="url(#lg)" />
            </svg>
          </span>
          <span className="logo-text">
            <strong>ANAND</strong>
            <small>Wire Industries</small>
          </span>
        </a>

        <nav className="nav-links">
          {links.map(([l, h]) => (
            <a key={h} href={h}>
              {l}
            </a>
          ))}
        </nav>

        <a className="btn btn-wa nav-cta" href={waLink()} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={18} /> <span>WhatsApp</span>
        </a>

        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {links.map(([l, h], i) => (
              <motion.a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {l}
              </motion.a>
            ))}
            <a className="btn btn-wa" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Chat {company.whatsappDisplay}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
