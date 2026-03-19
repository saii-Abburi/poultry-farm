import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import StackedCarousel from '../components/StackedCarousel';
import api from '../services/api';
import { ArrowRight, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await api.get('/products?pageNumber=1');
        setProducts(data.products.slice(0, 4)); // Show only top 4
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="min-h-screen bg-background page-transition">
      <Hero />
      
      <div id="categories" className="py-12 sm:py-24">
        <Categories />
      </div>
      
      <section className="py-12 sm:py-24 relative overflow-hidden" id="products">
        {/* Background Decor */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-16 gap-6">
            <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
              <div className="flex items-center justify-center md:justify-start gap-1 sm:gap-2 text-secondary font-bold text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Just In Stock</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                Latest Arrivals
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-base text-gray-600 font-medium px-2 md:px-0">
                Discover our newest selection of farm-fresh products, handpicked for quality and health.
              </p>
            </div>
            <a 
              href="/products/hen" 
              className="group flex items-center justify-center md:justify-end gap-1 sm:gap-2 text-primary font-bold hover:text-secondary transition-colors uppercase tracking-widest text-[10px] sm:text-xs w-full md:w-auto mt-2 md:mt-0"
            >
              <span>View Collection</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="bg-white/50 backdrop-blur animate-pulse h-96 rounded-[2.5rem] border border-gray-100"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <div className="py-12 sm:py-24 bg-white/50 backdrop-blur">
        <StackedCarousel />
      </div>

      <div className="py-16 sm:py-32 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <Slider />
      </div>
    </div>
  );
};

export default LandingPage;
