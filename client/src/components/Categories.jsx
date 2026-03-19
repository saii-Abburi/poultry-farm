import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 'hen',
    name: 'Hens',
    count: '24+ Varieties',
    image: 'https://images.unsplash.com/photo-1548443916-2917e9232ff4?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-orange-500',
  },
  {
    id: 'cock',
    name: 'Cocks',
    count: '12+ Breeds',
    image: 'https://images.unsplash.com/photo-1548442816-ce54be704770?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-red-600',
  },
  {
    id: 'chick',
    name: 'Chicks',
    count: 'Fresh Hatch',
    image: 'https://images.unsplash.com/photo-1518296996677-789a74fb1c32?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-amber-400',
  },
  {
    id: 'egg',
    name: 'Eggs',
    count: 'Farm Fresh',
    image: 'https://images.unsplash.com/photo-1506976773555-b3a165154318?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-stone-400',
  },
];

const Categories = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-16 gap-4 sm:gap-6">
          <div className="text-center md:text-left mx-auto md:mx-0">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-primary font-heading tracking-tight"
            >
              Our <span className="text-secondary">Specialties</span>
            </motion.h2>
            <p className="text-sm sm:text-base text-gray-500 font-medium mt-1 sm:mt-2 px-4 md:px-0">Explore our diverse range of premium poultry products.</p>
          </div>
          <div className="h-px bg-gray-100 flex-grow hidden md:block mx-10"></div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 cursor-not-allowed">
              <ArrowUpRight size={20} className="rotate-[-90deg]" />
            </div>
            <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link to={`/products/${category.id}`} className="block relative h-[220px] sm:h-[450px] rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-premium group-hover:shadow-premium-hover transition-all duration-500">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className={`${category.color} w-6 sm:w-10 h-1 rounded-full mb-2 sm:mb-4 shadow-lg`}></div>
                  <span className="text-accent text-[8px] sm:text-xs font-black uppercase tracking-[0.2em] mb-1 sm:mb-2">{category.count}</span>
                  <h3 className="text-xl sm:text-4xl font-black text-white mb-2 sm:mb-4 tracking-tight">
                    {t(category.name)}
                  </h3>
                  
                  <div className="flex items-center gap-1 sm:gap-2 text-white font-bold text-[10px] sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transition-all">
                    <span className="hidden sm:inline">Discover More</span>
                    <span className="sm:hidden">View</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                
                {/* Floating Decoration */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl glass-panel flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 rotate-12 group-hover:rotate-0">
                    <ArrowUpRight className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
