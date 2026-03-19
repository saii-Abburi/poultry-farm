import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-dark text-white pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-light to-transparent opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-16 mb-12 sm:mb-20 text-center sm:text-left">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-4 sm:space-y-6">
            <Link to="/" className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg shadow-primary/20">
                P
              </div>
              <span className="font-heading font-black text-xl sm:text-2xl tracking-tighter">POULTRY</span>
            </Link>
            <p className="text-primary-light/60 text-xs sm:text-sm font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
              Delivering premium, farm-fresh poultry products directly to your doorstep with care and integrity since 1995.
            </p>
            <div className="flex justify-center sm:justify-start gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300 border border-white/5">
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary-light">The Collection</h3>
            <ul className="space-y-3 sm:space-y-4">
              {['Hens', 'Cocks', 'Chicks', 'Eggs'].map((item) => (
                <li key={item}>
                  <Link to={`/products/${item.toLowerCase()}`} className="text-white font-bold text-xs sm:text-sm hover:text-accent transition-colors flex items-center justify-center sm:justify-start group">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    {t(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary-light">Support</h3>
            <ul className="space-y-3 sm:space-y-4">
              {['Shipping Policy', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white font-bold text-xs sm:text-sm hover:text-accent transition-colors">{item}</a>
                </li>
              ))}
              <li>
                <Link to="/auth" className="text-accent font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1 sm:gap-2 mt-2 sm:mt-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary-light">Get in touch</h3>
            <ul className="space-y-3 sm:space-y-5">
              <li className="flex items-start justify-center sm:justify-start gap-3 sm:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-primary-light">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-primary-light/80 text-left max-w-[200px] sm:max-w-none">
                  123 Green Valley Farm, Agricultural Belt, AP, India
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-primary-light">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold">+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-primary-light">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold">hello@poultryhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 sm:pt-12 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center">
          <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary-light/40">
            &copy; {new Date().getFullYear()} POULTRYHUB PREMIUM. HANDCRAFTED QUALITY.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary-light/40">
            <span>Powered by FarmConnect</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
