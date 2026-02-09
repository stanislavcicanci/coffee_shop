import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock,
  Instagram, X, Menu, Coffee,
  Cake, ShoppingBag, Star
} from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import maplibregl from 'maplibre-gl';
import EmberLogo from './assets/Ember_logo.png';
import 'maplibre-gl/dist/maplibre-gl.css';

// JSON-LD structured data pentru Ember Coffee și cele 6 locații
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://embercoffee.md/#org",
      "name": "Ember Coffee",
      "url": "https://embercoffee.md/",
      "email": "hello@embercoffee.md",
      "sameAs": [
        "https://www.instagram.com/embercoffee.md",
        "https://www.facebook.com/embercoffee.md"
      ]
    },
    {
      "@type": "CafeOrCoffeeShop",
      "@id": "https://embercoffee.md/#alexei-mateevici",
      "name": "Ember Coffee — Strada Alexei Mateevici 12",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Alexei Mateevici 12",
        "addressLocality": "Chișinău",
        "addressCountry": "MD"
      },
      "telephone": "+37322555010",
      "openingHours": "Mon–Sun 07:00–22:00",
      "geo": { "@type": "GeoCoordinates", "latitude": 47.0109, "longitude": 28.8543 },
      "parentOrganization": { "@id": "https://embercoffee.md/#org" }
    },
    {
      "@type": "CafeOrCoffeeShop",
      "@id": "https://embercoffee.md/#stefan-cel-mare",
      "name": "Ember Coffee — Strada Ștefan cel Mare 85",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Ștefan cel Mare 85",
        "addressLocality": "Chișinău",
        "addressCountry": "MD"
      },
      "telephone": "+37322555010",
      "openingHours": "Mon–Sun 07:00–22:00",
      "geo": { "@type": "GeoCoordinates", "latitude": 47.0118, "longitude": 28.8430 },
      "parentOrganization": { "@id": "https://embercoffee.md/#org" }
    },
    {
      "@type": "CafeOrCoffeeShop",
      "@id": "https://embercoffee.md/#mihai-eminescu",
      "name": "Ember Coffee — Strada Mihai Eminescu 3",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Mihai Eminescu 3",
        "addressLocality": "Chișinău",
        "addressCountry": "MD"
      },
      "telephone": "+37322555010",
      "openingHours": "Mon–Sun 07:00–22:00",
      "geo": { "@type": "GeoCoordinates", "latitude": 47.0152, "longitude": 28.8510 },
      "parentOrganization": { "@id": "https://embercoffee.md/#org" }
    },
    {
      "@type": "CafeOrCoffeeShop",
      "@id": "https://embercoffee.md/#vasile-alecsandri",
      "name": "Ember Coffee — Strada Vasile Alecsandri 22",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Vasile Alecsandri 22",
        "addressLocality": "Chișinău",
        "addressCountry": "MD"
      },
      "telephone": "+37322555010",
      "openingHours": "Mon–Sun 07:00–22:00",
      "geo": { "@type": "GeoCoordinates", "latitude": 47.0190, "longitude": 28.8565 },
      "parentOrganization": { "@id": "https://embercoffee.md/#org" }
    },
    {
      "@type": "CafeOrCoffeeShop",
      "@id": "https://embercoffee.md/#independentei",
      "name": "Ember Coffee — Strada Independenței 5",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Independenței 5",
        "addressLocality": "Chișinău",
        "addressCountry": "MD"
      },
      "telephone": "+37322555010",
      "openingHours": "Mon–Sun 07:00–22:00",
      "geo": { "@type": "GeoCoordinates", "latitude": 47.0085, "longitude": 28.8490 },
      "parentOrganization": { "@id": "https://embercoffee.md/#org" }
    },
    {
      "@type": "CafeOrCoffeeShop",
      "@id": "https://embercoffee.md/#tighina",
      "name": "Ember Coffee — Strada Tighina 14",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Tighina 14",
        "addressLocality": "Chișinău",
        "addressCountry": "MD"
      },
      "telephone": "+37322555010",
      "openingHours": "Mon–Sun 07:00–22:00",
      "geo": { "@type": "GeoCoordinates", "latitude": 47.0125, "longitude": 28.8572 },
      "parentOrganization": { "@id": "https://embercoffee.md/#org" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Care este filosofia Ember Coffee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La Ember Coffee punem accent pe boabe prăjite atent, preparare consecventă și experiență relaxantă. Ne mândrim cu produse proaspete și servicii prietenoase."
          }
        },
        {
          "@type": "Question",
          "name": "Pot comanda pentru evenimente private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Da — oferim servicii de catering pentru întâlniri mici și evenimente corporate. Trimite un e‑mail la press@embercoffee.md pentru detalii și ofertă."
          }
        }
      ]
    }
  ]
};


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!maplibregl || !document.getElementById('map')) return;
    const m = new maplibregl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=9Vy2og5Qbu51kSj5QOC1',
      // center: [lng, lat]
      center: [28.8543, 47.0109],
      zoom: 13
    });
    m.on('load', () => addMarkers(m));
    return () => m.remove();
  }, []);

  const locations = [
    {
      id: 1,
      name: "Strada Alexei Mateevici 12",
      address: "Strada Alexei Mateevici 12, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 22 555 010",
      coords: [47.0109, 28.8543]
    },
    {
      id: 2,
      name: "Strada Ștefan cel Mare 85",
      address: "Strada Ștefan cel Mare 85, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 22 555 010",
      coords: [47.0118, 28.8430]
    },
    {
      id: 3,
      name: "Strada Mihai Eminescu 3",
      address: "Strada Mihai Eminescu 3, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 22 555 010",
      coords: [47.0152, 28.8510]
    },
    {
      id: 4,
      name: "Strada Vasile Alecsandri 22",
      address: "Strada Vasile Alecsandri 22, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 22 555 010",
      coords: [47.0190, 28.8565]
    },
    {
      id: 5,
      name: "Strada Independenței 5",
      address: "Strada Independenței 5, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 22 555 010",
      coords: [47.0085, 28.8490]
    },
    {
      id: 6,
      name: "Strada Tighina 14",
      address: "Strada Tighina 14, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 22 555 010",
      coords: [47.0125, 28.8572]
    }
  ];

  const products = [
    {
      id: 1,
      name: "Swisso Coffee",
      description: "Cafea artizanală prăjită proaspăt, cu arome intense și echilibrate.",
      label: "Cafea Premium",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800",
      icon: <Coffee className="w-6 h-6" />
    },
    {
      id: 2,
      name: "Motiko Sweets",
      description: "Deserturi fine și proaspete, cu texturi delicate.",
      label: "Deserturi",
      image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800",
      icon: <Cake className="w-6 h-6" />
    },
    {
      id: 3,
      name: "Patiserie Proaspătă",
      description: "Produse de patiserie proaspete, pregătite zilnic.",
      label: "Patiserie",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800",
      icon: <ShoppingBag className="w-6 h-6" />
    },
    {
      id: 4,
      name: "Sandwichuri & Snacks",
      description: "Sandwichuri proaspete și gustări pentru orice moment al zilei.",
      label: "Gustări",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
      icon: <ShoppingBag className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Cafeaua preferată din Chișinău. Aromă intensă și echilibrată, iar atmosfera este perfectă pentru o pauză.",
      author: "Ana M.",
      rating: 5
    },
    {
      id: 2,
      text: "Deserturile sunt mereu proaspete și delicioase.",
      author: "Victor C.",
      rating: 5
    },
    {
      id: 3,
      text: "Locuri primitoare și servicii prietenoase. Recomand!",
      author: "Maria S.",
      rating: 5
    }
  ];

  // Social icons WITHOUT links (per request)
  const socials = [
    { icon: Instagram, name: "Instagram" },
    { icon: FaTiktok, name: "TikTok" }
  ];

  const addMarkers = (mapInstance) => {
    locations.forEach(location => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2" style="min-width: 200px">
          <h3 class="font-bold text-lg" style="color: #0f172a">${location.name}</h3>
          <p class="text-sm" style="color: #333">${location.address}</p>
          <p class="text-sm" style="color: #333">${location.hours}</p>
          <p class="text-sm font-semibold" style="color: #DF7634">${location.phone}</p>
        </div>
      `);
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div style="background-color: #DF7634; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `;
      new maplibregl.Marker({ element: el })
        .setLngLat([location.coords[1], location.coords[0]])
        .setPopup(popup)
        .addTo(mapInstance);
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setIsMenuOpen(false);
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F5C9A2' }}>
      <Helmet>
        <html lang="ro" />
        <title>Ember Coffee Chișinău — Cafea artizanală, patiserie & atmosferă modernă</title>
        <meta name="description" content="Ember Coffee — cafea artizanală, deserturi proaspete și spații primitoare în Chișinău. Vizitează una dintre cele 6 locații din oraș pentru espresso-uri, prăjituri și coworking." />
        <link rel="canonical" href="https://embercoffee.md/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ember Coffee" />
        <meta property="og:title" content="Ember Coffee — 6 locații în Chișinău" />
        <meta property="og:description" content="Cafea artizanală, patiserie proaspătă și locuri confortabile de întâlnire. Deschis zilnic 07:00–22:00." />
        <meta property="og:url" content="https://embercoffee.md/" />
        <meta property="og:image" content="https://embercoffee.md/og-cover.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

     {/* --- Navigation --- */}
<motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#F5C9A2]/20 backdrop-blur-xl shadow-lg border-b border-white/10' : 'bg-transparent backdrop-blur-none'}`}
  style={{ 
    zIndex: 1000,
    background: scrolled 
      ? 'rgba(245, 201, 162, 0.15)' 
      : 'transparent',
    backdropFilter: scrolled 
      ? 'blur(20px) saturate(180%)' 
      : 'none',
    WebkitBackdropFilter: scrolled 
      ? 'blur(20px) saturate(180%)' 
      : 'none',
    borderBottom: scrolled 
      ? '1px solid rgba(255, 255, 255, 0.125)' 
      : 'none',
    boxShadow: scrolled 
      ? '0 1px 12px rgba(0, 0, 0, 0.1)' 
      : 'none'
  }}
>
  <div className="container mx-auto px-4 sm:px-6 py-4">
    <div className="flex justify-between items-center">
      <motion.a href="#" className="flex items-center" whileHover={{ scale: 1.05 }}>
        <img src={EmberLogo} alt="Ember Coffee - cafenea în Chișinău" width="160" height="56" className="h-12 sm:h-14 w-auto" />
      </motion.a>
      <div className="hidden md:flex space-x-8">
        {[
          { id: 'home', name: 'Acasă' },
          { id: 'about', name: 'Despre Noi' },
          { id: 'products', name: 'Produse' },
          { id: 'locations', name: 'Locații' },
          { id: 'contact', name: 'Contact' },
        ].map(item => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="font-medium text-lg transition-colors"
            style={{ color: scrolled ? '#0f172a' : 'white', textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.2)' }}
            whileHover={{ scale: 1.1, color: '#DF7634' }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
          </motion.button>
        ))}
      </div>

    <motion.button 
  className="md:hidden" 
  style={{ color: '#0f172a' }}
  onClick={() => setIsMenuOpen(!isMenuOpen)} 
  whileTap={{ scale: 0.95 }}
>
  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
</motion.button>
    </div>
  </div>

<AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden fixed top-0 left-0 w-full mt-16" 
      style={{ 
        zIndex: 1000,
        background: 'rgba(245, 201, 162, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {[
            { id: 'home', name: 'Acasă' },
            { id: 'about', name: 'Despre Noi' },
            { id: 'products', name: 'Produse' },
            { id: 'locations', name: 'Locații' },
            { id: 'contact', name: 'Contact' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left font-medium text-lg transition-colors py-2"
              style={{ color: '#0f172a' }}
              onMouseEnter={e => (e.target.style.color = '#DF7634')}
              onMouseLeave={e => (e.target.style.color = '#0f172a')}
            >
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600')" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 to-[#0f172a]/60" />
          </div>
        </motion.div>

        <motion.div className="relative z-10 text-center text-white px-4 sm:px-6"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Cafea artizanală
          </motion.h1>
          <motion.p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            & patiserie proaspătă în inima Chișinăului
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <motion.button
            onClick={() => scrollToSection('products')}
            className="px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg"
            style={{ backgroundColor: '#DF7634', color: '#FCFFFB', cursor: 'pointer' }}
            whileHover={{ scale: 1.05, backgroundColor: '#F7975B', transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0 } }}
          >
            Vezi produsele
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('locations')}
            className="px-6 sm:px-8 py-3 border-2 rounded-full font-semibold text-base sm:text-lg"
            style={{ borderColor: '#FCFFFB', color: '#FCFFFB', cursor: 'pointer' }}
            whileHover={{ scale: 1.05, backgroundColor: '#FCFFFB', color: '#0f172a', transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0 } }}
          >
            Găsește locația
          </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-16 md:py-28" style={{ backgroundColor: '#FCFFFB' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#0f172a' }}>
              Despre Noi
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6 text-base sm:text-lg" style={{ color: '#333333' }}>
              <p className="leading-relaxed">
                Ember Coffee este o experiență urbană modernă ce combină cafeaua artizanală cu patiserie proaspătă și spații primitoare în Chișinău.
              </p>
              <p className="leading-relaxed">
                Oferim espresso-uri, prăjituri, și locuri potrivite pentru întâlniri sau lucru în echipă.
              </p>
              <p className="leading-relaxed">
                Cu design minimalist și atmosferă prietenoasă, locațiile noastre sunt perfecte pentru pauze sau întâlniri.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
                alt="Interior Ember Coffee – cafenea Chișinău"
                loading="lazy"
                width="800" height="600"
                className="rounded-2xl shadow-2xl w-full h-64 sm:h-96 object-cover" />
              <motion.div className="absolute -bottom-4 -right-4 p-4 rounded-2xl shadow-lg"
                style={{ backgroundColor: '#DF7634' }}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }}>
                <p className="text-white text-sm font-semibold">6 Locații</p>
                <p className="text-white text-xs">în Chișinău</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Products Section --- */}
      <section id="products" className="py-16 md:py-28" style={{ backgroundColor: '#F5C9A2' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#0f172a' }}>
              Produsele Noastre
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group">
                <div className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col" style={{ backgroundColor: '#FCFFFB' }}>
                  <div className="relative overflow-hidden flex-1">
                    <img src={product.image} alt={product.name} loading="lazy" width="800" height="600"
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: '#DF7634', color: '#FCFFFB' }}>
                      {product.label}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div style={{ color: '#DF7634' }}>{product.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold" style={{ color: '#0f172a' }}>
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-sm" style={{ color: '#333333' }}>
                      {product.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* --- Locations Section --- */}
<section id="locations" className="py-16 md:py-28" style={{ backgroundColor: '#FCFFFB' }}>
  <div className="container mx-auto px-4 sm:px-6">
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#0f172a' }}>
        Locațiile Noastre
      </h2>
      <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
    </motion.div>

    {/* Grid cu locații și mapă */}
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
      
      {/* Lista locațiilor */}
      <div className="space-y-4">
        {locations.map((location, index) => (
          <motion.div key={location.id} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
            <motion.div className="p-4 sm:p-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl" style={{ backgroundColor: 'white' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2" style={{ color: '#0f172a' }}>
                <MapPin className="w-5 h-5" style={{ color: '#DF7634' }}/>
                {location.name}
              </h3>
              <p className="text-sm mb-1" style={{ color: '#333333' }}>{location.address}</p>
              <p className="text-sm mb-1 flex items-center gap-2" style={{ color: '#333333' }}>
                <Clock className="w-4 h-4" style={{ color: '#DF7634' }}/>
                {location.hours}
              </p>
              <p className="text-sm font-semibold" style={{ color: '#DF7634' }}>
                <a href={`tel:${location.phone.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{location.phone}</a>
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Mapă centrată */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }} 
        viewport={{ once: true }}
        className="flex justify-center items-center h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative"
        style={{ border: `3px solid ${'#DF7634'}`, minHeight: '320px' }}
      >
        <div id="map" className="w-full h-full" />
        
        <style jsx global>{`
          .custom-marker { cursor: pointer; transition: transform 0.2s; }
          .custom-marker:hover { transform: scale(1.1); }
          .maplibregl-popup-content { border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .maplibregl-ctrl-top-right { top: 10px; right: 10px; }
        `}</style>
      </motion.div>

    </div>
  </div>
</section>

      {/* --- Testimonials Section --- */}
      <section className="py-16 md:py-28" style={{ backgroundColor: '#F5C9A2' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#0f172a' }}>
              Ce Spun Clienții
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.div className="rounded-2xl shadow-xl p-6 sm:p-8 md:p-12" style={{ backgroundColor: '#FCFFFB' }} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <AnimatePresence mode="wait">
                <motion.div key={currentSlide} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current"/>
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl mb-6 italic" style={{ color: '#333333' }}>
                    "{testimonials[currentSlide].text}"
                  </p>
                  <p className="text-base sm:text-lg font-bold" style={{ color: '#DF7634' }}>
                    {testimonials[currentSlide].author}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 sm:w-8' : ''}`}
                    style={{ backgroundColor: index === currentSlide ? '#DF7634' : '#F7975B' }}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

{/* --- Contact Section --- */}
<section id="contact" className="py-16 md:py-28" style={{ backgroundColor: '#FCFFFB' }}>
  <div className="container mx-auto px-4 sm:px-6">
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      viewport={{ once: true }} 
      className="text-center mb-12"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#0f172a' }}>
        Contactează-ne
      </h2>
      <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }}/>
    </motion.div>
    
    {/* Container principal centrat */}
    <div className="flex justify-center">
      <div className="max-w-lg w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          viewport={{ once: true }}
        >
          {/* Informațiile de contact */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left" style={{ color: '#0f172a' }}>
              Informații de contact
            </h3>
            
            <div className="space-y-4 sm:space-y-5">
              {[
                { icon: Phone, text: "+373 22 555 010", link: "tel:+37322555010" },
                { icon: Mail, text: "hello@embercoffee.md", link: "mailto:hello@embercoffee.md" },
                { icon: Clock, text: "Luni-Duminică: 7:00 - 22:00" }, 
                { icon: MapPin, text: "6 locații în Chișinău" }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-4" 
                  style={{ color: '#333333' }} 
                  whileHover={{ x: 8 }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5C9A2' }}>
                    <item.icon className="w-4 h-4" style={{ color: '#DF7634' }}/>
                  </div>
                  <span className="text-base sm:text-lg">
                    {item.link ? (
                      <a href={item.link} style={{color:'inherit', textDecoration:'none'}} className="hover:underline">
                        {item.text}
                      </a>
                    ) : (
                      item.text
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Rețelele sociale centrate (icons without links) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#0f172a' }}>
              Urmărește-ne
            </h4>
            <div className="flex justify-center gap-6">
              {socials.map((social, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-4 rounded-full transition-all duration-300 group-hover:shadow-lg" 
                    style={{ backgroundColor: '#F5C9A2', color: '#0f172a' }}>
                    <social.icon className="w-6 h-6 sm:w-7 sm:h-7"/>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    {social.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
</section>


      {/* --- Footer --- */}
      <footer className="py-8" style={{ backgroundColor: '#0f172a' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex flex-col items-center">
            <div className="flex flex-col items-center max-w-md text-center">
              <img src={EmberLogo} alt="Ember Coffee - cafenea în Chișinău" width="120" height="42" className="h-10 sm:h-12 w-auto mb-4 opacity-90 hover:opacity-100 transition-opacity" />
              <p className="text-sm mb-2 font-light" style={{ color: '#F5C9A2' }}>
                Cafea artizanală & patiserie proaspătă
              </p>
              <p className="text-xs font-light" style={{ color: 'rgba(245, 201, 162, 0.7)' }}>
                © 2026 Ember Coffee. Toate drepturile rezervate.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
