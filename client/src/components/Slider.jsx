import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1600&auto=format&fit=crop', // Big farm
  'https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=1600&auto=format&fit=crop', // Premium Hen
  'https://images.unsplash.com/photo-1548442816-ce54be704770?q=80&w=1600&auto=format&fit=crop', // Rooster
  'https://images.unsplash.com/photo-1518296996677-789a74fb1c32?q=80&w=1600&auto=format&fit=crop', // Chicks
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[600px] max-w-full m-auto overflow-hidden bg-stone-900 group sm:rounded-xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover opacity-80"
          alt="Farm Showcase"
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 sm:bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 sm:p-3 rounded-full text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 sm:bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 sm:p-3 rounded-full text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-accent w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
