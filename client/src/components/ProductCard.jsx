import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount 
    ? product.price - (product.price * (product.discount / 100))
    : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 border border-gray-100/50 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative aspect-[1/1] overflow-hidden bg-earth">
        <Link to={`/products/${product.category}/${product._id}`} className="block h-full">
          <motion.img 
            src={product.images[0] || 'https://via.placeholder.com/600?text=Premium+Poultry'} 
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-5 sm:left-5 flex flex-col gap-1 sm:gap-2 z-10">
          {hasDiscount && (
            <div className="bg-accent text-white text-[8px] sm:text-[10px] font-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl shadow-lg shadow-accent/20 uppercase tracking-widest">
              SAVE {product.discount}%
            </div>
          )}
          <div className="glass-panel px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold text-primary uppercase tracking-[0.1em] shadow-sm border-white/40">
            {product.category}
          </div>
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
          <a
            href={`https://wa.me/1234567890?text=Hi, I'm interested in ${product.name}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1 sm:gap-2 w-full bg-primary text-white py-1.5 sm:py-4 rounded-md sm:rounded-2xl font-bold text-[9px] sm:text-sm shadow-xl shadow-primary/20 hover:bg-primary-dark transition-colors"
          >
            <MessageCircle className="w-3 h-3 sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">Order</span>
          </a>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-2.5 sm:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 sm:mb-4">
          <Link to={`/products/${product.category}/${product._id}`} className="flex-grow">
            <h3 className="text-xs sm:text-xl font-heading font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-tight sm:leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[9px] sm:text-xs text-gray-400 line-through font-medium mb-0 sm:mb-0.5">₹{product.price.toLocaleString()}</span>
              )}
              <span className="text-[13px] sm:text-2xl font-black text-primary tracking-tight">
                ₹{discountedPrice.toLocaleString()}
              </span>
            </div>
            
            <Link 
              to={`/products/${product.category}/${product._id}`}
              className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-earth text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
