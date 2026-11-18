import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { PdfProvider } from './components/PdfViewer';
import {
  Marquee, About, Brands, Products, Experience, Media, Downloads, Contact, Footer, Lightbox, FloatingWhatsApp,
} from './components/Sections';

export default function App() {
  const [view, setView] = useState(null);
  return (
    <PdfProvider>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Brands onView={setView} />
        <Products />
        <Experience />
        <Media onView={setView} />
        <Downloads onView={setView} />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Lightbox item={view} onClose={() => setView(null)} />
    </PdfProvider>
  );
}
