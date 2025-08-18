import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Menu, X, Coffee, Cake, ShoppingBag, ChevronRight, Star } from 'lucide-react'
import FoxiLogo from './assets/Foxi_logo 1.png'
import maplibregl from 'maplibre-gl'
import { FaTiktok } from 'react-icons/fa';
import 'maplibre-gl/dist/maplibre-gl.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [map, setMap] = useState(null)

  // Initialize map when component mounts
  useEffect(() => {
    if (document.getElementById('map')) {
      const initializedMap = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=9Vy2og5Qbu51kSj5QOC1',
        center: [28.8415, 47.0265], // [lng, lat]
        zoom: 13
      })

      initializedMap.on('load', () => {
        setMap(initializedMap)
        addMarkers(initializedMap)
      })

      return () => {
        initializedMap.remove()
      }
    }
  }, [])

  const addMarkers = (mapInstance) => {
    locations.forEach(location => {
      // Create a popup
      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2" style="min-width: 200px">
            <h3 class="font-bold text-lg" style="color: #125242">${location.name}</h3>
            <p class="text-sm" style="color: #333">${location.address}</p>
            <p class="text-sm" style="color: #333">${location.hours}</p>
            <p class="text-sm font-semibold" style="color: #DF7634">${location.phone}</p>
          </div>
        `)

      // Create marker element
      const el = document.createElement('div')
      el.className = 'custom-marker'
      el.innerHTML = `
        <div style="background-color: #DF7634; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `

      // Add marker to map
      new maplibregl.Marker({ element: el })
        .setLngLat([location.coords[1], location.coords[0]]) // [lng, lat]
        .setPopup(popup)
        .addTo(mapInstance)
    })
  }

  // Culori definite pentru consistență
  const colors = {
    primaryBg: '#F5C9A2', 
    accent: '#125242', 
    complementary1: '#FCFFFB', 
    complementary2: '#DF7634', 
    complementary3: '#F7975B', 
    textDark: '#333333', 
    textLight: '#f5f5f5' 
  }

  const locations = [
    {
      id: 1,
      name: "Igor Vieru 16/1",
      address: "Strada Igor Vieru 16/1, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 60 665 665",
      coords: [47.0506347, 28.8947369]
    },
    {
      id: 2,
      name: "Andrei Doga 26/4",
      address: "Strada Andrei Doga 26/4, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 60 665 665",
      coords: [47.03465, 28.8555]
    },
    {
      id: 3,
      name: "Gheorghe Asachi 27/C",
      address: "Strada Gheorghe Asachi 27/C, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 60 665 665",
      coords: [47.00119, 28.82255]
    },
    {
      id: 4,
      name: "Ierusalim 7",
      address: "Strada Ierusalim 7, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 60 665 665",
      coords: [47.030519, 28.838768]
    },
    {
      id: 5,
      name: "Mircea cel Bătrân 41A",
      address: "Strada Mircea cel Bătrân 41A, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 60 665 665",
      coords: [47.0600006, 28.8910569]
    },
    {
      id: 6,
      name: "Albișoara 84/9",
      address: "Strada Albișoara 84/9, Chișinău",
      hours: "7:00 - 22:00",
      phone: "+373 60 665 665",
      coords: [47.0367294, 28.8283902]
    }
  ]

  const products = [
    {
      id: 1,
      name: "Swisso Coffee",
      description: "Cafea de specialitate prăjită proaspăt, cu arome intense și echilibrate.",
      label: "Cafea Premium",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800",
      icon: <Coffee className="w-6 h-6" />
    },
    {
      id: 2,
      name: "Motiko Sweets",
      description: "Deserturi tradiționale japoneze din orez, cu arome delicate și textură unică.",
      label: "Deserturi Japoneze",
      image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800",
      icon: <Cake className="w-6 h-6" />
    },
    {
      id: 3,
      name: "Patiserie Proaspătă",
      description: "Produse de patiserie proaspete, pregătite zilnic de către artizanii noștri.",
      label: "Patiserie",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800",
      icon: <ShoppingBag className="w-6 h-6" />
    },
    {
      id: 4,
      name: "Sandwichuri & Snacks",
      description: "Sandwichuri proaspete și gustări sănătoase pentru orice moment al zilei.",
      label: "Gustări",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
      icon: <ShoppingBag className="w-6 h-6" />
    }
  ]

  const testimonials = [
    {
      id: 1,
      text: "Cafeaua preferată din Chișinău. Aromă intensă și echilibrată, iar atmosfera este perfectă pentru o pauză rapidă.",
      author: "Ana M.",
      rating: 5
    },
    {
      id: 2,
      text: "Motiko e genial! Deserturile japoneze au o textură unică pe care nu o găsești în altă parte.",
      author: "Victor C.",
      rating: 5
    },
    {
      id: 3,
      text: "Atmosferă prietenoasă și produse bune. Perfect pentru cafeaua de dimineață și gustări sănătoase.",
      author: "Maria S.",
      rating: 5
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)

    if (!element) return

    // Așteaptă închiderea meniului, apoi scroll
    setIsMenuOpen(false)

    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' })
    }, 300) // timp în care meniul se închide și layout-ul se stabilizează
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5C9A2' }}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#F5C9A2]/90 backdrop-blur-md shadow-lg border-b border-[#DF7634]/20' 
            : 'bg-transparent'
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.a 
              href="#" 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={FoxiLogo} 
                alt="Foxi Cafe Logo" 
                className="h-14 w-auto"
              />
            </motion.a>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', name: 'Acasă' },
                { id: 'about', name: 'Despre Noi' },
                { id: 'products', name: 'Produse' },
                { id: 'locations', name: 'Locații' },
                { id: 'contact', name: 'Contact' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-medium text-lg transition-colors"
                  style={{ color: '#125242' }}
                  whileHover={{ scale: 1.1, color: '#DF7634' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
            
            <motion.button
              className="md:hidden"
              style={{ color: '#125242' }}
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
              className="md:hidden"
              style={{ backgroundColor: '#F5C9A2', zIndex: 1000 }}
            >
              <div className="container mx-auto px-6 py-4 space-y-4 border-t border-[#DF7634]/20">
                {[
                  { id: 'home', name: 'Acasă' },
                  { id: 'about', name: 'Despre Noi' },
                  { id: 'products', name: 'Produse' },
                  { id: 'locations', name: 'Locații' },
                  { id: 'contact', name: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left font-medium text-lg transition-colors"
                    style={{ color: '#125242' }}
                    onMouseEnter={(e) => e.target.style.color = '#DF7634'}
                    onMouseLeave={(e) => e.target.style.color = '#125242'}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#125242]/40 to-[#125242]/60" />
          </div>
        </motion.div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Cafea de specialitate
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            & mini-market urban în inima Chișinăului
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={() => scrollToSection('products')}
              className="px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
              style={{ backgroundColor: '#DF7634', color: '#FCFFFB' }}
              whileHover={{ scale: 1.05, backgroundColor: '#F7975B' }}
              whileTap={{ scale: 0.95 }}
            >
              Vezi produsele
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('locations')}
              className="px-8 py-3 border-2 rounded-full font-semibold text-lg transition-all duration-300"
              style={{ borderColor: '#FCFFFB', color: '#FCFFFB' }}
              whileHover={{ scale: 1.05, backgroundColor: '#FCFFFB', color: '#125242' }}
              whileTap={{ scale: 0.95 }}
            >
              Găsește locația
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28" style={{ backgroundColor: '#FCFFFB' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#125242' }}>
              Despre Noi
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg"
              style={{ color: '#333333' }}
            >
              <p className="leading-relaxed">
                Foxi Cafe & Market este o experiență urbană modernă ce combină farmecul unei cafenele de specialitate cu funcționalitatea unui mini-market.
              </p>
              <p className="leading-relaxed">
                Oferim cafea de înaltă calitate, deserturi japoneze Motiko, patiserie proaspătă și sandwichuri rapide - toate într-un singur loc.
              </p>
              <p className="leading-relaxed">
                Cu design minimalist și atmosferă prietenoasă, locațiile noastre sunt perfecte pentru pauze scurte sau cumpărături rapide în oraș.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800" 
                alt="Foxi Cafe Interior" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <motion.div
                className="absolute -bottom-4 -right-4 p-4 rounded-2xl shadow-lg"
                style={{ backgroundColor: '#DF7634' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-white text-sm font-semibold">6 Locații</p>
                <p className="text-white text-xs">în Chișinău</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 md:py-28" style={{ backgroundColor: '#F5C9A2' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#125242' }}>
              Produsele Noastre
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div 
                  className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                  style={{ backgroundColor: '#FCFFFB' }}
                >
                  <div className="relative overflow-hidden flex-1">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: '#DF7634', color: '#FCFFFB' }}
                    >
                      {product.label}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div style={{ color: '#DF7634' }}>{product.icon}</div>
                      <h3 className="text-xl font-bold" style={{ color: '#125242' }}>
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

      {/* Locations Section */}
      <section id="locations" className="py-20 md:py-28" style={{ backgroundColor: '#FCFFFB' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#125242' }}>
              Locațiile Noastre
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="p-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl"
                    style={{ backgroundColor: 'white' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: '#125242' }}>
                      <MapPin className="w-5 h-5" style={{ color: '#DF7634' }} />
                      {location.name}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: '#333333' }}>{location.address}</p>
                    <p className="text-sm mb-1 flex items-center gap-2" style={{ color: '#333333' }}>
                      <Clock className="w-4 h-4" style={{ color: '#DF7634' }} />
                      {location.hours}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: '#DF7634' }}>{location.phone}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ border: `3px solid ${colors.complementary2}` }}
            >
              <div id="map" className="w-full h-full"></div>
              <style jsx global>{`
                .custom-marker {
                  cursor: pointer;
                  transition: transform 0.2s;
                }
                .custom-marker:hover {
                  transform: scale(1.1);
                }
                .maplibregl-popup-content {
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
              `}</style>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5C9A2' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#125242' }}>
              Ce Spun Clienții
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="rounded-2xl shadow-xl p-8 md:p-12"
              style={{ backgroundColor: '#FCFFFB' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl mb-6 italic" style={{ color: '#333333' }}>
                    "{testimonials[currentSlide].text}"
                  </p>
                  <p className="text-lg font-bold" style={{ color: '#DF7634' }}>
                    {testimonials[currentSlide].author}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-8' : ''
                    }`}
                    style={{ 
                      backgroundColor: index === currentSlide ? '#DF7634' : '#F7975B' 
                    }}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28" style={{ backgroundColor: '#FCFFFB' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#125242' }}>
              Contactează-ne
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#DF7634' }} />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#125242' }}>Informații de contact</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: "+373 60 665 665" },
                  { icon: Mail, text: "hello@foxicafe.md" },
                  { icon: Clock, text: "Luni-Duminică: 7:00 - 22:00" },
                  { icon: MapPin, text: "6 locații în Chișinău" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    style={{ color: '#333333' }}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: '#DF7634' }} />
                    <span className="text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex space-x-4 mt-8">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/foxi_cafemarketmoldova/" },
                  { icon: FaTiktok, href: "https://www.tiktok.com/@foxi_cafemarketmoldova?is_from_webapp=1&sender_device=pc" },
                ].map(({ icon: Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full transition-colors"
                    style={{ backgroundColor: '#F5C9A2', color: '#125242' }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#125242' }}>Abonează-te la noutăți</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Adresa ta de email"
                  className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none text-lg"
                  style={{ 
                    backgroundColor: '#F5C9A2', 
                    borderColor: '#DF7634', 
                    color: '#125242' 
                  }}
                />
                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                  style={{ backgroundColor: '#DF7634', color: '#FCFFFB' }}
                  whileHover={{ scale: 1.02, backgroundColor: '#F7975B' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Abonează-te
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: '#125242' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col items-center max-w-md">
              <img 
                src={FoxiLogo} 
                alt="Foxi Cafe Logo" 
                className="h-12 w-auto mb-4 opacity-90 hover:opacity-100 transition-opacity"
              />
              <p className="text-sm mb-2 font-light" style={{ color: '#F5C9A2' }}>
                Cafea de specialitate & mini-market urban
              </p>
              <p className="text-xs font-light" style={{ color: 'rgba(245, 201, 162, 0.7)' }}>
                © 2025 Foxi Cafe & Market. Toate drepturile rezervate.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default App