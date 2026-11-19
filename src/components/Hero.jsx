import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Download, ShieldCheck, Globe } from 'lucide-react';
import { company, waLink, brands } from '../data/site';
import { WhatsAppIcon, Counter } from './ui';

const words = ['Precision', 'Wire', 'Nails.'];
const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rotArt = useTransform(scrollYProgress, [0, 1], [0, 6]);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.div className="badge" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}>
            <ShieldCheck size={15} /> ZED Bronze Certified · Ministry of MSME
          </motion.div>
          <motion.div className="badge badge-export" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease }}>
            <Globe size={15} /> Export facility available
          </motion.div>

          <h1>
            {words.map((w, i) => (
              <motion.span
                key={w}
                className={i === 2 ? 'accent-text' : ''}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, ease }}>
            {company.name}, Rajkot, makes export-quality wire nails from 100% prime wire coil. Perfect point, perfect
            gauge and a high-gloss double polish – the <em>{company.tagline}</em>.
          </motion.p>

          <motion.div className="hero-ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, ease }}>
            <a className="btn btn-wa btn-lg" href={waLink('Hello, I want a quotation for wire nails.')} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Get Quote on WhatsApp
            </a>
            <a className="btn btn-outline btn-lg" href="#downloads">
              <Download size={18} /> Catalogues
            </a>
          </motion.div>

          <motion.div className="hero-brands" initial="hide" animate="show" variants={{ show: { transition: { delayChildren: 0.95, staggerChildren: 0.08 } } }}>
            <span>Our brands</span>
            <div className="hero-logos">
              {brands.map((b) => (
                <motion.a
                  key={b.id}
                  href="#brands"
                  variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -4 }}
                  title={b.full}
                >
                  <img src={b.logo} alt={b.full} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="hero-art" style={{ y: yArt, rotate: rotArt }}>
          <motion.div className="hero-disc" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease }} />
          <motion.img
            src="images/nails-3d-hero.png"
            alt="Gold, zinc, polished and dark wire nails"
            className="hero-nails-img"
            initial={{ opacity: 0, y: -120, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 55, damping: 12 }}
          />
          <motion.div className="hero-float" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
            <motion.div className="hero-chip" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}>
              <b><Counter to={100} suffix="%" duration={2} delay={1.3} /></b>
              <span>Prime wire coil</span>
            </motion.div>
          </motion.div>
          <motion.div className="hero-chip alt" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: 'spring' }}>
            <b><Counter to={3} duration={1.2} delay={1.5} /></b>
            <span>Finishes · Polish, Zinc, Gold</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
