import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, BadgeCheck, Building2, CheckCircle2, Download, Factory, FileText, MapPin, Phone,
  Play, Send, Sparkles, Target, Truck, X, Eye, MessageCircle, Navigation, CalendarClock, Users, Map as MapIcon, Globe,
} from 'lucide-react';
import {
  company, waLink, brands, finishes, qualities, process, experience, documents, gallery,
} from '../data/site';
import { Reveal, SectionHead, Counter, WhatsAppIcon } from './ui';
import { usePdf } from './PdfViewer';
import { onDownloadClick } from '../lib/files';

/* ───────────────────────── Marquee ───────────────────────── */
export function Marquee() {
  const items = ['GP', 'Egybel', 'Jaguar', 'On Point', ...qualities, 'Zinc Plating', 'Gold Plating', 'ZED Bronze Certified'];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            <i className="dot" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── About ───────────────────────── */
export function About() {
  const pillars = [
    { icon: Target, title: 'Precision', text: 'Perfect gauge, long point and accurate length in every nail.' },
    { icon: BadgeCheck, title: 'Prime Material', text: 'Made only from 100% prime wire coil – no compromise.' },
    { icon: Truck, title: 'Timely Delivery', text: 'Delivery records maintained & measured – verified in our ZED audit.' },
    { icon: Award, title: 'Certified Quality', text: 'ZED Bronze certified under the Ministry of MSME scheme.' },
  ];
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-media">
          <Reveal className="about-img main">
            <img src="images/factory-front.jpg" alt="Anand Wire Industries factory, Rajkot" loading="lazy" />
          </Reveal>
          <Reveal className="about-img second" delay={0.15}>
            <img src="images/nails-hand-1.jpg" alt="Finished wire nails" loading="lazy" />
          </Reveal>
          <motion.div
            className="about-stamp"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90, delay: 0.3 }}
          >
            <img src="images/zed-certificate.jpg" alt="" />
            <span>ZED<br />Bronze</span>
          </motion.div>
        </div>

        <div className="about-copy">
          <SectionHead
            center={false}
            kicker="About Us"
            title={<>Built on honest work, <span className="accent-text">one nail at a time.</span></>}
          />
          <Reveal delay={0.1}>
            <p>
              <strong>{company.name}</strong> is a Rajkot-based manufacturer of wire nails, led by our proprietor{' '}
              <strong>{company.owner}</strong>. From our unit in Samrat Industrial Area, we produce nails that carpenters,
              contractors and hardware dealers rely on every day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Every batch starts with prime wire coil and ends with a careful quality check – so the nail you buy drives
              straight, holds strong and looks clean. That's why our customers call us the <em>First Choice of Carpenter</em>.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="owner-card">
            <div className="owner-avatar">GP</div>
            <div>
              <strong>{company.owner}</strong>
              <span>Proprietor, {company.name}</span>
            </div>
            <a href={waLink(`Hello ${company.owner} ji,`)} target="_blank" rel="noreferrer" className="owner-wa" aria-label="WhatsApp owner">
              <WhatsAppIcon size={20} />
            </a>
          </Reveal>

          <div className="pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.08} className="pillar">
                <p.icon size={22} />
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="ids">
            <span><b>GSTIN</b> {company.gst}</span>
            <span><b>Udyam</b> {company.udyam}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Brands ───────────────────────── */
function BrandLogo({ b, big }) {
  return <img className={`brand-logo-img ${big ? 'big' : ''}`} src={b.logo} alt={b.full} />;
}

export function Brands({ onView }) {
  const { openPdf } = usePdf();
  const [active, setActive] = useState(brands[0].id);
  const b = brands.find((x) => x.id === active);
  return (
    <section id="brands" className="section brands">
      <div className="container">
        <SectionHead
          kicker="Our Brands"
          title={<>Four brands. <span className="accent-text">One promise of quality.</span></>}
          sub="Choose the brand that fits your market – every one is made in the same factory, to the same standard."
        />

        <Reveal className="brand-tabs">
          {brands.map((x) => (
            <button key={x.id} className={x.id === active ? 'on' : ''} onClick={() => setActive(x.id)} style={{ '--c': x.accent }}>
              {x.id === active && <motion.span layoutId="tabpill" className="tab-pill" />}
              <span className="tab-label">{x.name}</span>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={b.id}
            className="brand-stage"
            style={{ '--tint': b.tint, '--acc': b.accent }}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.45 }}
          >
            <div className="brand-info">
              <BrandLogo b={b} big />
              <h3>{b.full}</h3>
              <p>{b.blurb}</p>
              <div className="tags">
                {b.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <ul className="checks">
                {qualities.slice(0, 5).map((q) => (
                  <li key={q}>
                    <CheckCircle2 size={16} /> {q}
                  </li>
                ))}
              </ul>
              <div className="brand-ctas">
                {b.catalogue ? (
                  <>
                    <a className="btn btn-dark" href={b.catalogue} download onClick={onDownloadClick(b.catalogue)}>
                      <Download size={18} /> Download {b.name} Catalogue
                    </a>
                    <a className="btn btn-outline" href={b.catalogue} onClick={(e) => { e.preventDefault(); openPdf({ file: b.catalogue, title: `${b.full} – Catalogue` }); }}>
                      <Eye size={18} /> View
                    </a>
                  </>
                ) : (
                  <a className="btn btn-dark" href={waLink(`Hello, please share the ${b.full} catalogue and price list.`)} target="_blank" rel="noreferrer">
                    <FileText size={18} /> Request Catalogue
                  </a>
                )}
                <a className="btn btn-wa" href={waLink(`Hello, I am interested in ${b.full}. Please share rates.`)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} /> Enquire
                </a>
              </div>
            </div>

            <div className="brand-visual">
              <motion.img
                className="brand-packs"
                src={b.packs}
                alt={`${b.full} 500 g pouch and box`}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 90, damping: 16 }}
              />
              <motion.button
                className="poster"
                onClick={() => onView({ src: b.poster, caption: b.full })}
                initial={{ rotate: 6, y: 40, opacity: 0 }}
                animate={{ rotate: 3, y: 0, opacity: 1 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              >
                <img src={b.poster} alt={`${b.full} brochure`} />
                <span className="zoom"><Eye size={16} /> View brochure</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="brand-cards">
          {brands.map((x, i) => (
            <Reveal key={x.id} delay={i * 0.08}>
              <motion.button
                className="brand-card"
                whileHover={{ y: -8 }}
                onClick={() => {
                  setActive(x.id);
                  document.getElementById('brands').scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ '--c': x.accent }}
              >
                <BrandLogo b={x} />
                <span>{x.full}</span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Products / Finishes ───────────────────────── */
export function Products() {
  const [fin, setFin] = useState(finishes[0]);
  return (
    <section id="products" className="section products">
      <div className="container">
        <SectionHead
          kicker="Products & Finishes"
          title={<>Wire nails in <span className="accent-text">three premium finishes.</span></>}
          sub="Tap a finish to see it. All finishes are available across our brands in 500 g pouch and box packing."
        />

        <div className="finish-grid">
          <div className="finish-stage">
            <div className="finish-disc" />
            <AnimatePresence mode="wait">
              <motion.video
                key={fin.id}
                className="finish-video"
                src={fin.video}
                poster={fin.img}
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              />
            </AnimatePresence>
            <span className="finish-label">{fin.name}</span>
          </div>

          <div className="finish-list">
            {finishes.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.08}>
                <button className={`finish-item ${f.id === fin.id ? 'on' : ''}`} onClick={() => setFin(f)}>
                  <span className={`swatch ${f.tone}`} />
                  <span>
                    <strong>{f.name}</strong>
                    <small>{f.desc}</small>
                  </span>
                </button>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="quality-box">
              <h4>
                <Sparkles size={18} /> 100% Prime Quality
              </h4>
              <ul>
                {qualities.map((q) => (
                  <li key={q}>
                    <CheckCircle2 size={15} /> {q}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="pack-row">
          {[
            ...brands.map((x) => ({ img: x.packs, t: `${x.name} – 500 g Pouch & Box` })),
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} className="pack">
              <img src={p.img} alt={p.t} loading="lazy" />
              <span>{p.t}</span>
            </Reveal>
          ))}
        </div>

        <div className="process">
          <Reveal>
            <h3 className="process-title">
              <Factory size={22} /> How we make our nails
            </h3>
          </Reveal>
          <div className="process-track">
            <motion.div
              className="process-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
            {process.map((s, i) => (
              <Reveal key={s.title} delay={0.2 + i * 0.15} className="step">
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Presence & Experience ───────────────────────── */
const statIcons = { calendar: CalendarClock, users: Users, map: MapIcon, globe: Globe, award: Award };

function StatCard({ stat, index }) {
  const [p, setP] = useState(0);
  const Icon = statIcons[stat.icon] || Award;
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <motion.div
      className="stat"
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 110, damping: 15 }}
      whileHover={{ y: -8 }}
    >
      <span className="stat-ring" aria-hidden="true">
        <svg className="ring" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={R} className="ring-bg" />
          <circle cx="32" cy="32" r={R} className="ring-fg" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
        </svg>
        <Icon size={22} />
      </span>
      <b>
        <Counter to={stat.value} suffix={stat.suffix} delay={0.15 + index * 0.12} onProgress={setP} />
      </b>
      <span className="stat-label">{stat.label}</span>
      <span className="stat-bar" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></span>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHead
          kicker="Our Presence & Experience"
          title={<>Experience you can <span className="accent-text">count on.</span></>}
          sub="Years of manufacturing know-how and a dealer network that keeps growing across India."
        />

        <div className="stats">
          {experience.stats.map((st, i) => (
            <StatCard key={st.label} stat={st} index={i} />
          ))}
        </div>

        <div className="exp-grid">
          <Reveal className="presence">
            <h3>
              <MapPin size={20} /> Where you'll find us
            </h3>
            <div className="hq">
              <span className="ping" />
              <div>
                <strong>Head Office & Factory</strong>
                <small>Rajkot, Gujarat</small>
              </div>
            </div>
            <div className="regions">
              {experience.regions.map((r, i) => (
                <motion.span
                  key={r}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05, type: 'spring' }}
                >
                  {r}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <div className="timeline">
            {experience.milestones.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.12} className="tl-item">
                <span className="tl-dot" />
                <span className="tl-year">{m.year}</span>
                <strong>{m.title}</strong>
                <p>{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Video + Gallery ───────────────────────── */
export function Media({ onView }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section id="media" className="section media">
      <div className="container">
        <SectionHead
          kicker="Videos & Gallery"
          title={<>See our <span className="accent-text">nails & brands</span> in motion.</>}
        />

        <Reveal className="video-wrap">
          {playing ? (
            <video src="videos/anand-wire-showcase.mp4" controls autoPlay playsInline poster="images/video-poster.jpg" />
          ) : (
            <button className="video-cover" onClick={() => setPlaying(true)} aria-label="Play video">
              <img src="images/video-poster.jpg" alt="Anand Wire Industries showcase video" />
              <motion.span className="play" whileHover={{ scale: 1.1 }} animate={{ boxShadow: ['0 0 0 0 rgba(242,194,96,.6)', '0 0 0 28px rgba(242,194,96,0)'] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <Play size={34} fill="currentColor" />
              </motion.span>
              <span className="video-label">Watch: Anand Wire Industries – Showcase</span>
            </button>
          )}
        </Reveal>

        <div className="gallery">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={(i % 4) * 0.07} className={`g-item g${i}`}>
              <button onClick={() => onView(g)}>
                <img src={g.src} alt={g.caption} loading="lazy" />
                <span>{g.caption}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Certification + Downloads ───────────────────────── */
export function Downloads({ onView }) {
  const { openPdf } = usePdf();
  return (
    <section id="downloads" className="section downloads">
      <div className="container">
        <div className="cert-banner">
          <Reveal className="cert-img">
            <button onClick={() => onView({ src: 'images/zed-certificate.jpg', caption: 'ZED Bronze Certificate' })}>
              <img src="images/zed-certificate.jpg" alt="ZED Bronze Certificate" />
            </button>
          </Reveal>
          <div className="cert-copy">
            <SectionHead
              center={false}
              kicker="Certification"
              title={<>MSME <span className="bronze-text">ZED Bronze</span> Certified</>}
            />
            <Reveal delay={0.1}>
              <p>
                Awarded under the MSME Sustainable (Zero Defect Zero Effect) Certification Scheme of the Ministry of Micro,
                Small & Medium Enterprises, Government of India – assessed on leadership, swachh workplace, workplace safety,
                timely delivery and quality management.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="cert-facts">
              <span><b>Issued</b>{company.zedDate}</span>
              <span><b>Certificate No.</b>{company.zedCertNo}</span>
              <span><b>Udyam</b>{company.udyam}</span>
              <span><b>Validity</b>3 years</span>
            </Reveal>
          </div>
        </div>

        <SectionHead
          kicker="Downloads"
          title={<>Catalogues & <span className="accent-text">documents</span></>}
          sub="Download our brochures and certificates as PDF."
        />
        <div className="docs">
          {documents.map((d, i) => (
            <Reveal key={d.file} delay={i * 0.08}>
              <motion.div className="doc" whileHover={{ y: -8 }}>
                <div className="doc-thumb" role="button" tabIndex={0} onClick={() => openPdf({ file: d.file, title: d.title })} onKeyDown={(e) => e.key === 'Enter' && openPdf({ file: d.file, title: d.title })}>
                  <img src={d.thumb} alt="" loading="lazy" />
                  <span className="doc-type">{d.type}</span>
                </div>
                <div className="doc-body">
                  <strong>{d.title}</strong>
                  <small>PDF · {d.size}</small>
                  <div className="doc-actions">
                    <a href={d.file} download className="btn btn-gold btn-sm" onClick={onDownloadClick(d.file)}>
                      <Download size={16} /> Download
                    </a>
                    <a href={d.file} className="btn btn-outline btn-sm" onClick={(e) => { e.preventDefault(); openPdf({ file: d.file, title: d.title }); }}>
                      <Eye size={16} /> View
                    </a>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
export function Contact() {
  const [form, setForm] = useState({ name: '', city: '', gstin: '', brand: 'GP', finish: finishes[0].name, qty: '', note: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const msg =
      `Hello ${company.name},\n\nI would like a quotation.\n` +
      `• Name: ${form.name}\n• City: ${form.city}\n• GSTIN: ${form.gstin}\n• Brand: ${form.brand}\n• Finish: ${form.finish}\n` +
      `• Quantity: ${form.qty || '-'}\n${form.note ? `• Note: ${form.note}\n` : ''}`;
  const submit = (e) => e.preventDefault();
  // Block sending until required fields are filled; show the browser's own hints.
  const checkForm = (e) => {
    const f = e.currentTarget.closest('form');
    if (f && !f.checkValidity()) {
      e.preventDefault();
      f.reportValidity();
    }
  };
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHead
          kicker="Contact"
          title={<>Let's talk <span className="accent-text">nails.</span></>}
          sub="Dealers, distributors and bulk buyers – send your requirement and we'll reply on WhatsApp."
        />
        <div className="contact-grid">
          <Reveal className="contact-info">
            <a className="ci" href={waLink()} target="_blank" rel="noreferrer">
              <span className="ci-ico wa"><WhatsAppIcon /></span>
              <span><small>WhatsApp</small><strong>{company.whatsappDisplay}</strong></span>
            </a>
            <a className="ci" href={`tel:${company.whatsappDisplay.replace(/\s/g, '')}`}>
              <span className="ci-ico"><Phone size={20} /></span>
              <span><small>Call</small><strong>{company.whatsappDisplay}</strong></span>
            </a>
            <a className="ci" href={`tel:${company.phoneAlt.replace(/\s/g, '')}`}>
              <span className="ci-ico"><Phone size={20} /></span>
              <span><small>Factory</small><strong>{company.phoneAlt}</strong></span>
            </a>
            <a className="ci" href={`https://www.google.com/maps?q=${company.lat},${company.lng}`} target="_blank" rel="noreferrer">
              <span className="ci-ico"><MapPin size={20} /></span>
              <span><small>Factory Address</small><strong className="addr">{company.address}</strong></span>
            </a>
            <div className="ci">
              <span className="ci-ico"><Building2 size={20} /></span>
              <span><small>Proprietor</small><strong>{company.owner}</strong></span>
            </div>
            <div className="map-card">
              <svg className="map-art" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="600" height="300" className="m-land" />
                <path d="M-20 230 C 120 200, 200 260, 330 225 S 520 170, 640 205 L 640 320 L -20 320 Z" className="m-water" />
                <rect x="40" y="30" width="120" height="70" rx="8" className="m-park" />
                <rect x="430" y="40" width="140" height="80" rx="8" className="m-block" />
                <rect x="70" y="130" width="150" height="60" rx="8" className="m-block" />
                <rect x="380" y="150" width="110" height="45" rx="8" className="m-park" />
                <path d="M0 115 H600 M0 40 C200 60 400 20 600 50 M300 0 V300 M190 0 L250 300 M470 0 L420 300" className="m-road" />
                <path d="M0 115 H600 M300 0 V300" className="m-road-main" />
                <text x="312" y="108" className="m-label">St. No. 22</text>
                <text x="60" y="68" className="m-label">Samrat Ind. Area</text>
              </svg>
              <div className="map-pin" aria-hidden="true">
                <span className="pin-pulse" />
                <MapPin size={30} strokeWidth={2.2} />
              </div>
              <div className="map-bar">
                <div className="map-bar-text">
                  <strong>{company.name}</strong>
                  <small>Samrat Industrial Area, Rajkot · {company.lat.toFixed(4)}° N, {company.lng.toFixed(4)}° E</small>
                </div>
                <div className="map-actions">
                  <a className="btn btn-dark btn-sm" href={`https://www.google.com/maps/search/?api=1&query=${company.lat},${company.lng}`} target="_blank" rel="noreferrer">
                    <MapPin size={16} /> Open in Google Maps
                  </a>
                  <a className="btn btn-outline btn-sm" href={`https://www.google.com/maps/dir/?api=1&destination=${company.lat},${company.lng}`} target="_blank" rel="noreferrer">
                    <Navigation size={16} /> Directions
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="quote" onSubmit={submit}>
              <h3>
                <MessageCircle size={20} /> Quick Quote on WhatsApp
              </h3>
              <div className="row">
                <label>
                  <span className="lbl">Your name <span className="req" aria-hidden="true">*</span></span>
                  <input required value={form.name} onChange={set('name')} placeholder="e.g. Ramesh Hardware" />
                </label>
                <label>
                  <span className="lbl">City <span className="req" aria-hidden="true">*</span></span>
                  <input required value={form.city} onChange={set('city')} placeholder="e.g. Ahmedabad" />
                </label>
              </div>
              <label>
                <span className="lbl">GSTIN number <span className="req" aria-hidden="true">*</span></span>
                <input
                  id="quote-gstin"
                  required
                  value={form.gstin}
                  onChange={(e) => {
                    setForm({ ...form, gstin: e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 15) });
                    e.target.setCustomValidity('');
                  }}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      e.target.value ? 'Enter a valid 15-character GSTIN, e.g. 24ABCDE1234F1Z5' : 'Please enter your GSTIN number',
                    )
                  }
                  pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]"
                  minLength={15}
                  maxLength={15}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="e.g. 24ABCDE1234F1Z5"
                  className="gstin-input"
                />
                <small className="hint">15 characters – required for dealer and GST billing.</small>
              </label>
              <div className="row">
                <label>
                  Brand
                  <select value={form.brand} onChange={set('brand')}>
                    {brands.map((b) => (
                      <option key={b.id}>{b.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Finish
                  <select value={form.finish} onChange={set('finish')}>
                    {finishes.map((f) => (
                      <option key={f.id}>{f.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Quantity
                <input value={form.qty} onChange={set('qty')} placeholder="e.g. 50 boxes / 200 kg" />
              </label>
              <label>
                Size / message
                <textarea rows="3" value={form.note} onChange={set('note')} placeholder="Nail sizes, delivery location, etc." />
              </label>
              <a className="btn btn-wa btn-lg full" href={waLink(msg)} target="_blank" rel="noreferrer" onClick={checkForm}>
                <Send size={18} /> Send on WhatsApp
              </a>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
export function Footer() {
  const { openPdf } = usePdf();
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <div className="foot-logo">
            <strong>ANAND</strong> Wire Industries
          </div>
          <p>Manufacturer of premium wire nails – GP, Egybel, Jaguar & On Point. {company.tagline}.</p>
          <p className="muted">GSTIN {company.gst}</p>
        </div>
        <div>
          <h5>Explore</h5>
          <a href="#about">About</a>
          <a href="#brands">Brands</a>
          <a href="#products">Products</a>
          <a href="#downloads">Downloads</a>
        </div>
        <div>
          <h5>Downloads</h5>
          {documents.map((d) => (
            <a key={d.file} href={d.file} onClick={(e) => { e.preventDefault(); openPdf({ file: d.file, title: d.title }); }}>
              {d.title}
            </a>
          ))}
        </div>
        <div>
          <h5>Contact</h5>
          <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp {company.whatsappDisplay}</a>
          <a href={`tel:${company.phoneAlt.replace(/\s/g, '')}`}>{company.phoneAlt}</a>
          <span className="muted">Rajkot, Gujarat 360004</span>
        </div>
      </div>
      <div className="container foot-bottom">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span>Proprietor: {company.owner}</span>
      </div>
    </footer>
  );
}

/* ───────────────────────── Lightbox + Floating WhatsApp ───────────────────────── */
export function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);
  return (
    <AnimatePresence>
      {item && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button className="lb-close" aria-label="Close" onClick={onClose}>
            <X />
          </button>
          <motion.figure initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
            <img src={item.src} alt={item.caption} />
            <figcaption>{item.caption}</figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingWhatsApp() {
  const [tip, setTip] = useState(true);
  return (
    <div className="fab-wrap">
      <AnimatePresence>
        {tip && (
          <motion.div className="fab-tip" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, transition: { delay: 0, duration: 0.2 } }} transition={{ delay: 2.5 }}>
            <button aria-label="Dismiss" onClick={() => setTip(false)}>
              <X size={14} />
            </button>
            Need a price? <b>Chat with us!</b>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        className="fab"
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat on WhatsApp ${company.whatsappDisplay}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
      >
        <WhatsAppIcon size={32} />
      </motion.a>
    </div>
  );
}
