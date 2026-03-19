import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'te' : 'en');
  };

  const navLinks = [
    { name: t('Hens'), path: '/products/hen' },
    { name: t('Cocks'), path: '/products/cock' },
    { name: t('Chicks'), path: '/products/chick' },
    { name: t('Eggs'), path: '/products/egg' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-500 rounded-3xl ${
          scrolled ? 'glass-panel shadow-premium py-3 px-6' : 'bg-transparent py-2 px-0'
        } flex justify-between items-center`}>
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl text-primary leading-none tracking-tight">POULTRY</span>
              <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-[0.2em] leading-none mt-1">Premium Farm</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 rounded-xl transition-all duration-300 font-semibold text-sm relative group whitespace-nowrap ${
                  isActive(link.path) ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                  />
                )}
                {!isActive(link.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary/20 rounded-full transition-all duration-300 group-hover:w-4"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-xl bg-earth text-secondary font-bold text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-all duration-300 border border-secondary/10"
            >
              {i18n.language === 'en' ? 'తెలుగు' : 'English'}
            </button>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-light transition-all duration-300 shadow-lg shadow-primary/30 font-bold text-sm"
            >
              <MessageCircle size={18} />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
             <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl bg-earth text-secondary text-[10px] font-bold uppercase"
            >
              {i18n.language === 'en' ? 'తె' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${scrolled ? 'hover:bg-primary/10' : 'hover:bg-white/20'}`}
            >
              {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className={`md:hidden absolute left-4 right-4 z-40 transition-all duration-500 ${scrolled ? 'top-[74px]' : 'top-[98px]'}`}
            >
              <div className="glass-panel shadow-premium rounded-[2rem] p-5 sm:p-6 border border-white/50 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between p-4 rounded-2xl text-base sm:text-lg font-bold transition-all ${
                      isActive(link.path) ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-800 hover:bg-primary/5 hover:text-primary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <ArrowRight size={18} className={isActive(link.path) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} />
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-gray-100/50 flex flex-col gap-3">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/5 text-secondary font-bold text-sm sm:text-base active:scale-95 transition-transform"
                  >
                    <Phone size={18} />
                    Call Support
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20"
                  >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
