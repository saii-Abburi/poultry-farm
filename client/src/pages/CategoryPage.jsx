import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Layers } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';

const CATEGORY_META = {
  hen:   { label: 'Hens',   emoji: '🐔', desc: 'Browse our healthy, farm-raised hens.' },
  cock:  { label: 'Cocks',  emoji: '🐓', desc: 'Strong and healthy cocks from our farm.' },
  chick: { label: 'Chicks', emoji: '🐣', desc: 'Young, healthy chicks ready for rearing.' },
  egg:   { label: 'Eggs',   emoji: '🥚', desc: 'Fresh farm eggs — nutritious and delicious.' },
};

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const meta = CATEGORY_META[category] || { label: category, emoji: '🐾', desc: 'Browse our products.' };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/category/${category}`);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (category) fetchCategoryProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner — sits below the fixed navbar (pt-28 clears ~80px nav + breathing room) */}
      <div className="pt-24 sm:pt-28 pb-8 sm:pb-16 bg-gradient-to-br from-primary/5 via-white to-secondary/5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 sm:gap-2 text-primary font-semibold hover:text-green-800 mb-6 sm:mb-8 transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-3xl sm:text-4xl">
              {meta.emoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-secondary font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1">
                <Layers className="w-3 h-3 sm:w-[13px] sm:h-[13px]" /> Category
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-primary capitalize tracking-tight">
                {meta.label}
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm font-medium mt-0.5 sm:mt-1">{meta.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white/50 backdrop-blur animate-pulse h-80 rounded-[2rem] border border-gray-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <span className="text-6xl">{meta.emoji}</span>
            <h2 className="text-2xl text-gray-500 font-heading font-bold mt-4">
              No {meta.label} listed yet.
            </h2>
            <p className="text-gray-400 text-sm mt-2">Check back soon or browse another category.</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {products.map(product => (
                <motion.div
                  key={product._id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
