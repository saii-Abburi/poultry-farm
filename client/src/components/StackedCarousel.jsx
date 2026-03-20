import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const products = [
  {
    id: 1,
    name: 'Premium Brown Hen',
    category: 'Hens',
    price: '₹550',
    image: 'https://images.unsplash.com/photo-1548443916-2917e9232ff4?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Young Chicks (Day Old)',
    category: 'Chicks',
    price: '₹45',
    image: 'https://images.unsplash.com/photo-1518296996677-789a74fb1c32?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Organic Farm Eggs',
    category: 'Eggs',
    price: '₹72/dozen',
    image: 'https://images.unsplash.com/photo-1506976773555-b3a165154318?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Robust Farm Rooster',
    category: 'Cocks',
    price: '₹850',
    image: 'https://images.unsplash.com/photo-1548442816-ce54be704770?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'White Leghorn Hen',
    category: 'Hens',
    price: '₹480',
    image: 'https://images.unsplash.com/photo-1548443916-2917e9232ff4?q=80&w=1000&auto=format&fit=crop',
  },
];

const StackedCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getCardStyles = (index) => {
    let position = index - currentIndex;
    
    if (position > Math.floor(products.length / 2)) {
      position -= products.length;
    } else if (position < -Math.floor(products.length / 2)) {
      position += products.length;
    }

    const isActive = position === 0;
    const isSide = Math.abs(position) === 1;
    const isBack = Math.abs(position) === 2;
    
    let scale = 1;
    let translateX = 0;
    let opacity = 1;
    let zIndex = 10;

    if (isActive) {
      scale = 1;
      translateX = 0;
      opacity = 1;
      zIndex = 30;
    } else if (isSide) {
      scale = 0.9;
      translateX = position * 60; 
      opacity = 0.8;
      zIndex = 20;
    } else if (isBack) {
      scale = 0.8;
      translateX = position * 100;
      opacity = 0.6;
      zIndex = 10;
    } else {
      opacity = 0;
      scale = 0.5;
      zIndex = 0;
    }

    return {
      scale,
      x: translateX,
      opacity,
      zIndex,
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
    };
  };

  return (
    <section className="py-12 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Rounded Container */}
        <div className=" rounded-[40px]  overflow-hidden py-12 px-4 md:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black font-heading tracking-tight text-[#FFC107] mb-4"
            >
              OUR PRODUCTS
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="h-2 w-24 bg-[#FFC107] mx-auto rounded-full"
            />
          </div>

          {/* Carousel Container */}
          <div className="relative h-[480px] flex items-center justify-center">
            {/* Navigation Arrows (Desktop) */}
            <div className="absolute inset-0 flex items-center  justify-between z-40 pointer-events-none px-4">
              <button 
                onClick={prevSlide}
                className="pointer-events-auto shadow-2xl bg-white/10 hover:bg-white/20 text-[#FFC107] p-4 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={nextSlide}
                className="pointer-events-auto shadow-2xl bg-white/10 hover:bg-white/20 text-[#FFC107] p-4 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="relative w-full max-w-[240px] sm:max-w-[320px] h-[320px] sm:h-[420px] flex items-center justify-center mx-auto">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  animate={getCardStyles(index)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    const swipe = Math.abs(offset.x) > 50;
                    if (swipe) {
                      if (offset.x > 0) prevSlide();
                      else nextSlide();
                    }
                  }}
                  className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                >
                  <div className="w-full h-full bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col border border-white/10 group">
                    <div className="relative h-2/3 overflow-hidden bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-[#8b0000] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                        {product.category}
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1 mb-0.5 sm:mb-1">{product.name}</h3>
                        <p className="text-[10px] sm:text-sm text-gray-500 uppercase tracking-widest font-semibold">Premium Quality</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 sm:mt-4">
                        <span className="text-xl sm:text-2xl font-black text-[#8b0000]">{product.price}</span>
                        <button className="bg-[#FFC107] text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold hover:bg-yellow-500 transition-colors shadow-sm">
                          {t('Order Now')}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center space-x-3 mt-12 relative z-10">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-10 bg-[#FFC107] shadow-[0_0_10px_rgba(255,193,7,0.5)]' 
                    : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackedCarousel;
