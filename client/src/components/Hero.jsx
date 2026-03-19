import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center md:pt-52 pt-32 pb-20 sm:pb-28 bg-background">
      {/* Background Decor - Unclickable & Contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-primary/10 text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary" />
              <span>Certified Organic Farm</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black text-primary leading-[1.1] mb-4 sm:mb-6 tracking-tighter">
              Freshness <br className="hidden sm:block" />
              <span className="text-secondary">From Our Farm</span> <br className="hidden sm:block" />
              To Your Home.
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-lg leading-relaxed font-medium">
              Experience the pinnacle of poultry quality. Our hens are raised with care, ensuring every product meets the highest standards of health and nutrition.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <a 
                href="#products" 
                className="group flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 sm:px-8 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:bg-primary-dark transition-all shadow-xl sm:shadow-2xl shadow-primary/20"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#categories" 
                className="flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-100 px-6 py-4 sm:px-8 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:border-primary/20 hover:bg-primary/5 transition-all"
              >
                <span>View Categories</span>
              </a>
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-6 font-bold text-[10px] sm:text-sm">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 text-primary text-center">
                <ShieldCheck className="w-5 h-5 sm:w-5 sm:h-5 text-accent" />
                <span>100% Pure</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 text-primary text-center">
                <Zap className="w-5 h-5 sm:w-5 sm:h-5 text-accent" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 text-primary text-center">
                <Star className="w-5 h-5 sm:w-5 sm:h-5 text-accent" />
                <span>Top Rated</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            {/* Image Container with Custom Shape */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-5xl aspect-[4/5] border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1200&auto=format&fit=crop" 
                alt="Poultry Farm" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-5 xl:-right-10 glass-panel p-6 rounded-3xl shadow-premium z-20 max-w-[200px]"
            >
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <p className="font-heading font-bold text-primary">Quality Assured</p>
              <p className="text-[10px] text-gray-500 mt-1">Every product is tested for the highest standards.</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 -left-5 xl:-left-10 glass-panel p-6 rounded-3xl shadow-premium z-20 flex items-center gap-4"
            >
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-primary">500+ Happy Customers</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-accent text-accent" />)}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
