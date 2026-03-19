import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MessageCircle, Tag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const ProductDetails = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const { t } = useTranslation();
  
  const cookieUser = document.cookie.split('; ').find(row => row.startsWith('userInfo='));
  const localUser = localStorage.getItem('userInfo');
  const isAdmin = !!(cookieUser || localUser);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex justify-center items-center bg-background pt-24">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-primary" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading product…</p>
      </div>
    </div>
  );

  const discountedPrice = product.discount > 0
    ? product.price - (product.price * (product.discount / 100))
    : product.price;

  // Helper to revert the optimized DB URL back to the absolute original raw upload
  const getOriginalMediaUrl = (url) => {
    if (!url) return '';
    return url.replace('/f_auto,q_auto/', '/');
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ordering *${product.name}* (₹${discountedPrice.toFixed(2)}). Could you provide more details?`
  );
  const whatsappLink = `https://wa.me/7207062315?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb strip — clears fixed navbar with pt-28 */}
      <div className="pt-24 sm:pt-28 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/products/${product.category}`} className="hover:text-primary transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-primary truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 sm:gap-2 text-primary font-semibold hover:text-green-800 mb-6 sm:mb-8 transition-colors text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          Go Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 bg-white p-4 sm:p-8 rounded-3xl sm:rounded-[2.5rem] shadow-xl border border-gray-100">

          {/* ---- Gallery ---- */}
          <div className="space-y-4">
            {/* Main image */}
            <a 
              href={getOriginalMediaUrl(selectedImage)} 
              target="_blank" 
              rel="noreferrer" 
              title="Click to view original high-resolution image"
              className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 block group/mainimg"
            >
              {!imgLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-100 rounded-2xl" />
              )}
              <motion.img
                key={selectedImage}
                src={selectedImage || 'https://placehold.co/600x600/f0fdf4/16a34a?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover group-hover/mainimg:scale-105 transition-transform duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: imgLoaded ? 1 : 0 }}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/mainimg:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm text-sm">View Original Size</span>
              </div>
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white font-black px-4 py-2 rounded-full shadow-lg text-sm z-10">
                  -{product.discount}% OFF
                </div>
              )}
            </a>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setImgLoaded(false); setSelectedImage(img); }}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-primary ring-2 ring-primary/20 scale-105'
                        : 'border-transparent hover:border-primary/40 hover:scale-105'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Video */}
            {product.video && (
              <div className="mt-4 aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <video src={product.video} controls className="w-full h-full" />
              </div>
            )}
          </div>

          {/* ---- Details ---- */}
          <div className="flex flex-col mt-4 sm:mt-0">
            {/* Category badge */}
            <span className="inline-flex items-center gap-1 sm:gap-1.5 self-start bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">
              <Tag className="w-3 h-3 sm:w-[11px] sm:h-[11px]" /> {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-gray-900 mb-3 sm:mb-5 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="flex items-end gap-3 sm:gap-4 mb-6 sm:mb-8">
              <span className="text-3xl sm:text-4xl font-black text-primary">
                ₹{discountedPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {product.discount > 0 && (
                <div className="flex flex-col pb-0.5 sm:pb-1">
                  <span className="text-base sm:text-lg text-gray-400 line-through leading-none">
                    ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-red-500 mt-0.5">You save ₹{(product.price - discountedPrice).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="flex-grow border-y border-gray-100 py-5 sm:py-7 mb-6 sm:mb-8">
              <h3 className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 sm:mb-3">About this product</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">{product.description}</p>
            </div>

            {/* CTA */}
            {isAdmin ? (
              <div className="w-full bg-primary/10 text-primary font-black py-3 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all text-base sm:text-lg border-2 border-primary/20">
                Admin Preview Mode
              </div>
            ) : (
              <>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-black py-3 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-xl shadow-green-500/25 text-base sm:text-lg"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  {t('Order Now')} 
                </a>
                <p className="text-center text-[10px] sm:text-xs text-gray-400 font-medium mt-3 sm:mt-4">
                  You'll be redirected to WhatsApp to complete your enquiry
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
