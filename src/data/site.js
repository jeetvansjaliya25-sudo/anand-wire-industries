// ─────────────────────────────────────────────────────────────
//  All business content lives here. Edit this file to update
//  the website – no need to touch the components.
// ─────────────────────────────────────────────────────────────

export const company = {
  name: 'Anand Wire Industries',
  owner: 'Ghanshyam Patel',
  tagline: 'First Choice of Carpenter',
  whatsapp: '919925117519', // used for wa.me links (no + or spaces)
  whatsappDisplay: '+91 99251 17519',
  phoneAlt: '+91 94093 99544',
  gst: '24ABEFA4208M1ZL',
  udyam: 'UDYAM-GJ-20-0083370',
  address: 'Samrat Industrial Area, Street No. 22, Bh. ST Workshop, Rajkot, Gujarat – 360004, India',
  lat: 22.2548704,
  lng: 70.7957957,
  zedDate: 'February 3, 2024',
  zedCertNo: '03022024_238325',
};

export const waLink = (text = `Hello ${company.name}, I would like to know more about your wire nails.`) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

// ── OUR PRESENCE & EXPERIENCE ────────────────────────────────
// ⚠️ The screenshot with these details was not attached, so the
//    values below are PLACEHOLDERS. Replace them with the exact
//    figures from your screenshot.
export const experience = {
  stats: [
    { value: 25, suffix: '+', label: 'Years of Experience', icon: 'calendar' },
    { value: 500, suffix: '+', label: 'Dealers & Distributors', icon: 'users' },
    { value: 25, suffix: '+', label: 'States Served', icon: 'map' },
    { value: 2, suffix: '+', label: 'Countries', icon: 'globe' },
    { value: 4, suffix: '', label: 'Trusted Brands', icon: 'award' },
  ],
  regions: [
    'Gujarat',
    'Maharashtra',
    'Rajasthan',
    'Madhya Pradesh',
    'Karnataka',
    'Tamil Nadu',
    'Telangana',
    'Andhra Pradesh',
    'Uttar Pradesh',
    'Punjab',
  ],
  milestones: [
    { year: 'Founded', title: 'Anand Wire Industries begins', text: 'Started in Rajkot by Ghanshyam Patel with a focus on honest, carpenter-grade wire nails.' },
    { year: 'Growth', title: 'Brand portfolio expands', text: 'GP, Egybel, Jaguar and On Point brands launched for different markets and price points.' },
    { year: '2024', title: 'ZED Bronze Certified', text: 'Certified under the MSME Sustainable (ZED) Scheme, Ministry of MSME, Govt. of India.' },
    { year: 'Today', title: 'Pan-India supply', text: 'Supplying hardware dealers, distributors and B2B customers across India.' },
  ],
};

export const brands = [
  {
    id: 'gp',
    name: 'GP',
    full: 'GP Wire Nails',
    logo: 'images/logo-gp.png',
    accent: '#d2232a',
    tint: '#f6e7da',
    poster: 'images/gp-poster.jpg',
    packs: 'images/gp-packs.jpg',
    catalogue: 'docs/GP-Wire-Nails-Catalogue.pdf',
    blurb: 'Our flagship brand. Export quality wire nails made from 100% prime wire coil with a high-gloss double-polished finish.',
    tags: ['Export Quality', 'ISO 9001:2015 packing', '250 g · 500 g · 2.5 kg'],
  },
  {
    id: 'egybel',
    name: 'Egybel',
    full: 'Egybel Wire Nails',
    logo: 'images/logo-egybel.png',
    accent: '#1f7fc1',
    tint: '#f3f6dc',
    poster: 'images/egybel-poster.jpg',
    packs: 'images/egybel-packs.jpg',
    catalogue: 'docs/Egybel-Wire-Nails-Catalogue.pdf',
    blurb: 'Premium nails with perfect long point and perfect gauge – trusted by carpenters for clean, split-free fixing.',
    tags: ['Perfect Long Point', 'Perfect Gauge', '250 g · 500 g · 2.5 kg'],
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    full: 'Jaguar Wire Nails',
    logo: 'images/logo-jaguar.png',
    accent: '#e0262b',
    tint: '#fbf0c8',
    poster: 'images/jaguar-poster.jpg',
    packs: 'images/jaguar-packs.jpg',
    catalogue: null,
    blurb: 'Strong, sharp and dependable – built for construction sites and everyday carpentry work.',
    tags: ['100% Prime Quality', 'Sharp Point', '250 g · 500 g · 2.5 kg'],
  },
  {
    id: 'onpoint',
    name: 'On Point',
    full: 'On Point Wire Nails',
    logo: 'images/logo-onpoint.png',
    accent: '#1f6f78',
    tint: '#e3f0ef',
    poster: 'images/onpoint-poster.jpg',
    packs: 'images/onpoint-packs.jpg',
    catalogue: 'docs/OnPoint-Wire-Nails-Catalogue.pdf',
    blurb: 'Precision-pointed nails for accurate driving and a neat finish on furniture and interior work.',
    tags: ['Export Quality', 'Perfect Gauge', '250 g · 500 g · 2.5 kg'],
  },
];

// Packing sizes offered for every brand and finish.
export const packings = [
  { size: '250', unit: 'g', name: '250 g Packing', text: 'Handy small pack for retail counters and everyday home use.' },
  { size: '500', unit: 'g', name: '500 g Packing', text: 'Our most popular pack – pouch and box, ready for hardware shelves.', popular: true },
  { size: '2.5', unit: 'kg', name: '2.5 kg Packing', text: 'Bulk pack for carpenters, contractors and dealers.' },
];

export const exportInfo = {
  title: 'Export facility available',
  text: 'We supply international buyers with export-quality wire nails – packing, finish and documentation as per your order.',
};

export const finishes = [
  { id: 'polish', name: 'Regular Double Polish', desc: 'High-gloss, double-polished bright finish for general carpentry and furniture.', tone: 'steel', img: 'images/finish-steel.png', video: 'videos/finish-steel.mp4' },
  { id: 'zinc', name: 'Zinc Plating', desc: 'Silvery zinc coat for added rust resistance in humid and semi-outdoor use.', tone: 'zinc', img: 'images/finish-zinc.png', video: 'videos/finish-zinc.mp4' },
  { id: 'gold', name: 'Gold Plating', desc: 'Brass-tone gold plating for decorative and visible applications.', tone: 'gold', img: 'images/finish-gold.png', video: 'videos/finish-gold.mp4' },
];

export const qualities = [
  'Perfect Long Point',
  'Long Head',
  'Perfect Gauge',
  'Accurate Length',
  'High Gloss Double Polished',
  'Export Quality',
  'Made from 100% Prime Wire Coil',
];

export const process = [
  { title: 'Prime Wire Coil', text: 'Only 100% prime quality wire coil is selected – no recycled scrap.' },
  { title: 'Wire Drawing', text: 'Wire is drawn to the exact gauge for consistent strength.' },
  { title: 'Heading & Pointing', text: 'Automatic machines form a firm head and a sharp, long point.' },
  { title: 'Double Polishing', text: 'Nails are tumbled and polished twice for a high-gloss finish.' },
  { title: 'Plating', text: 'Optional zinc or gold plating as per order.' },
  { title: 'Quality Check & Packing', text: 'Checked for gauge and length, then packed in 250 g, 500 g and 2.5 kg packs.' },
];

export const documents = [
  { title: 'GP Wire Nails – Catalogue', file: 'docs/GP-Wire-Nails-Catalogue.pdf', size: '195 KB', thumb: 'images/gp-poster.jpg', type: 'Catalogue' },
  { title: 'Egybel Wire Nails – Catalogue', file: 'docs/Egybel-Wire-Nails-Catalogue.pdf', size: '185 KB', thumb: 'images/egybel-poster.jpg', type: 'Catalogue' },
  { title: 'On Point Wire Nails – Catalogue', file: 'docs/OnPoint-Wire-Nails-Catalogue.pdf', size: '213 KB', thumb: 'images/onpoint-poster.jpg', type: 'Catalogue' },
  { title: 'ZED Bronze Certificate', file: 'docs/ZED-Bronze-Certificate.pdf', size: '2.1 MB', thumb: 'images/zed-certificate.jpg', type: 'Certificate' },
  { title: 'ZED Assessment Report', file: 'docs/ZED-Assessment-Report.pdf', size: '1.3 MB', thumb: 'images/zed-report-cover.jpg', type: 'Report' },
];

// Gallery: real product & factory photos (catalogue posters live in Downloads).
// span: 'tall' = 2 rows, 'wide' = 2 columns; fit: 'contain' shows the whole image.
export const gallery = [
  { src: 'images/gallery/size-chart.jpg', caption: 'Wire nails – gauge & size chart', span: 'tall', fit: 'contain' },
  { src: 'images/gallery/black-carriage-bolts.jpg', caption: 'Black carriage bolts with nut & washer', span: 'wide' },
  { src: 'images/gallery/zinc-wire-nails.jpg', caption: 'Zinc plated wire nails', span: 'tall' },
  { src: 'images/nails-hand-1.jpg', caption: 'Finished nails – quality check' },
  { src: 'images/factory-front.jpg', caption: 'Our unit, Rajkot' },
  { src: 'images/gallery/nickel-carriage-bolts.jpg', caption: 'Nickel finish carriage bolts', span: 'wide' },
  { src: 'images/gallery/egybel-carriage-bolt-pack.jpg', caption: 'Egybel carriage bolt – 1/4 × 1.50", 1 kg pack' },
  { src: 'images/gallery/nickel-bolts-box.jpg', caption: 'Nickel carriage bolts – box packing', span: 'tall' },
  { src: 'images/factory-gate.jpg', caption: 'Factory entrance', span: 'wide' },
  { src: 'images/nails-3d-hero.png', caption: 'Our four nail finishes – 3D render', fit: 'contain' },
];
