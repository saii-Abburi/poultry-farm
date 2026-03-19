import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Plus, LogOut, CheckCircle, Trash2, Edit, 
  LayoutDashboard, ShoppingBag, Users, Settings, 
  BarChart3, Search, Bell, Menu as MenuIcon, X,
  ArrowUpRight, IndianRupee, Eye, ImagePlus, Video, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);   // 0–100
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('dash');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'hen',
    price: '',
    discount: '',
  });
  // images: array of { file: File, preview: string }
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);   // File | null
  const imageInputRef = useRef(null);

  useEffect(() => {
    const cookieUser = document.cookie.split('; ').find(row => row.startsWith('userInfo='));
    const localUser = localStorage.getItem('userInfo');
    
    // If neither cookie nor localStorage exists, boot them to login
    if (!cookieUser && !localUser) {
      navigate('/auth');
    } else {
      // If cookie exists but local storage doesn't (user reopened tab), restore to local storage
      if (cookieUser && !localUser) {
        try {
          const cookieVal = decodeURIComponent(cookieUser.split('=')[1]);
          localStorage.setItem('userInfo', cookieVal);
        } catch(e) { /* ignore parse errors */ }
      }
      fetchProducts();
    }
  }, [navigate]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      const productList = data.products || data;
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userInfo');
    // Clear cookie by expiring it
    document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax';
    
    navigate('/auth');
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      discount: product.discount || 0,
    });
    setImages([]);
    setVideo(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await api.delete(`/products/${id}`);
        setSuccess('Product deleted successfully');
        fetchProducts();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ----- Image handling -----
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
    const newItems = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(prev => [...prev, ...newItems]);
    // Reset the input so the same file can be re-selected if removed
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const removeImage = (index) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ----- Submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);
    setSuccess('');
    setError('');

    try {
      const uploadData = new FormData();
      Object.keys(formData).forEach(key => {
        uploadData.append(key, formData[key]);
      });

      // Append each image file
      if (images.length > 0) {
        images.forEach(img => uploadData.append('images', img.file));
      }
      if (video) uploadData.append('video', video);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        },
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, uploadData, config);
        setSuccess('Product updated successfully!');
      } else {
        await api.post('/products', uploadData, config);
        setSuccess('Product added successfully!');
      }

      setShowForm(false);
      setEditingId(null);
      fetchProducts();
      setFormData({ name: '', description: '', category: 'hen', price: '', discount: '' });
      setImages([]);
      setVideo(null);
      setUploadProgress(0);
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Product save error:', err);
      const msg = err.response?.data?.message || err.message || 'Operation failed. Please try again.';
      setError(msg);
      setUploadProgress(0);
      setTimeout(() => setError(''), 8000);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', category: 'hen', price: '', discount: '' });
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setVideo(null);
    setUploadProgress(0);
  };

  const stats = [
    { title: 'Total Products', value: products.length, icon: Package, color: 'bg-primary' },
    { title: 'Total Categories', value: '4', icon: LayoutDashboard, color: 'bg-emerald-500' },
    { title: 'Inventory Value', value: '₹' + products.reduce((acc, p) => acc + (p.price || 0), 0).toLocaleString(), icon: IndianRupee, color: 'bg-amber-500' },
    { title: 'Active Offers', value: products.filter(p => p.discount > 0).length, icon: ArrowUpRight, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#022C22] text-white shadow-[10px_0_40px_-15px_rgba(0,0,0,0.3)] border-r border-white/5 ${
          sidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full md:w-24 md:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="h-24 flex items-center px-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/20 rotate-3">
              P
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <h1 className="font-heading font-black text-xl tracking-tighter">
                    ADMIN<span className="text-primary-light">HUB</span>
                  </h1>
                  <p className="text-[10px] font-bold text-primary-light/60 uppercase tracking-widest mt-[-2px]">Poultry Farm MGMT</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 space-y-2.5">
          {[
            { id: 'dash', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'inv', name: 'Inventory', icon: ShoppingBag },
            { id: 'cust', name: 'Customers', icon: Users },
            { id: 'ana', name: 'Analytics', icon: BarChart3 },
            { id: 'sett', name: 'Settings', icon: Settings },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group relative flex items-center gap-4 h-14 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-primary-light/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`w-14 h-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`}>
                  <item.icon className={isActive ? 'w-6 h-6' : 'w-[22px] h-[22px]'} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-bold text-[13px] uppercase tracking-wider"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!sidebarOpen && (
                  <div className="hidden md:block absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100] whitespace-nowrap shadow-xl">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full h-14 flex items-center rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group overflow-hidden"
          >
            <div className="w-14 h-full flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
              <LogOut size={22} />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-[13px] uppercase tracking-wider">Sign Out</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className={`flex-grow flex flex-col min-h-screen transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        sidebarOpen ? 'md:ml-72' : 'md:ml-24'
      } ml-0`}>
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
            <h1 className="text-lg sm:text-xl font-bold font-heading text-gray-800 truncate max-w-[150px] sm:max-w-none">Inventory</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search inventory..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-earth overflow-hidden border border-gray-100 italic flex items-center justify-center font-bold text-primary">
              {JSON.parse(localStorage.getItem('userInfo'))?.name?.[0] || 'A'}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {/* Dashboard Stats */}
          {activeTab === 'dash' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={stat.title}
                  className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5 truncate">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Product Form & Table (Shows on both Dash and Inventory) */}
          {(activeTab === 'dash' || activeTab === 'inv') && (
            <>

          {/* Action Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-gray-900 uppercase tracking-tight">
                {editingId ? 'Edit Product' : 'Inventory'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {editingId ? `Modifying: ${formData.name}` : 'Manage all farm products.'}
              </p>
            </div>
            <button
              onClick={() => {
                if (showForm) resetForm();
                setShowForm(!showForm);
              }}
              className="w-full sm:w-auto bg-primary text-white px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
            >
              {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>

          {/* Notifications */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl mb-4 flex items-center gap-3 font-bold border border-emerald-100"
              >
                <CheckCircle className="text-emerald-500 shrink-0" /> {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 text-red-700 p-4 rounded-2xl mb-4 flex items-center gap-3 font-bold border border-red-100"
              >
                <XCircle className="text-red-500 shrink-0" /> {error}
              </motion.div>
            )}

            {/* ====== PRODUCT FORM ====== */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-premium mb-10 border border-primary/5"
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-8">
                  {/* Left column */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2">Product Name</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-none rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-sm sm:text-base"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Premium Brown Hen"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2">Category</label>
                      <select
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-none rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none font-medium text-sm sm:text-base cursor-pointer"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="hen">Hens</option>
                        <option value="cock">Cocks</option>
                        <option value="chick">Chicks</option>
                        <option value="egg">Eggs</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2">Base Price (₹)</label>
                        <input
                          required
                          type="number"
                          min="0"
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-none rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-sm sm:text-base"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2">Discount (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-none rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-sm sm:text-base"
                          value={formData.discount}
                          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2">Description</label>
                      <textarea
                        required
                        rows={3}
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border-none rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none font-medium text-sm sm:text-base"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detail the product qualities..."
                      />
                    </div>

                    {/* ---- IMAGE UPLOAD ---- */}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                        Product Images {images.length > 0 && <span className="text-primary">({images.length} selected)</span>}
                      </label>

                      {/* Image previews */}
                      {images.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {images.map((img, idx) => (
                            <div key={idx} className="relative group/img aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                              <img src={img.preview} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute inset-0 bg-red-500/70 text-white opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center"
                                title="Remove image"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          ))}
                          {/* Add more button */}
                          <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors bg-gray-50 text-gray-400">
                            <ImagePlus size={20} />
                            <span className="text-[10px] font-bold mt-1">Add</span>
                            <input
                              ref={imageInputRef}
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}

                      {/* Initial upload zone (shown when no images yet) */}
                      {images.length === 0 && (
                        <label className="flex flex-col items-center justify-center w-full py-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-primary/40 transition-colors group/upload">
                          <ImagePlus size={28} className="text-gray-300 group-hover/upload:text-primary/50 transition-colors mb-2" />
                          <span className="text-xs font-bold text-gray-400">Click to upload images</span>
                          <span className="text-[10px] text-gray-300 mt-1">You can select multiple at once</span>
                          <input
                            ref={imageInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* ---- VIDEO UPLOAD ---- */}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Promo Video (Optional)</label>
                      <label className="flex items-center gap-4 w-full px-5 py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-primary/40 transition-colors group/video">
                        <Video size={22} className={`transition-colors shrink-0 ${video ? 'text-primary' : 'text-gray-300 group-hover/video:text-primary/50'}`} />
                        <div className="flex-grow min-w-0">
                          {video ? (
                            <span className="text-xs font-bold text-primary truncate block">{video.name}</span>
                          ) : (
                            <span className="text-xs font-bold text-gray-400">Click to add promo video</span>
                          )}
                        </div>
                        {video && (
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setVideo(null); }}
                            className="shrink-0 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        )}
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* ---- UPLOAD PROGRESS ---- */}
                    {loading && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Uploading to cloud…</span>
                          <span className="text-xs font-black text-primary">{uploadProgress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3, ease: 'linear' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-primary/30 flex justify-center uppercase tracking-widest text-[11px] sm:text-sm"
                    >
                      {loading
                        ? `Uploading… ${uploadProgress}%`
                        : editingId
                        ? 'Update Product'
                        : 'Publish to Storefront'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ====== PRODUCT TABLE ====== */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-4 sm:px-8 py-4 sm:py-5 text-left text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Details</th>
                    <th className="hidden sm:table-cell px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                    <th className="px-4 sm:px-8 py-4 sm:py-5 text-left text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pricing</th>
                    <th className="px-4 sm:px-8 py-4 sm:py-5 text-right text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts && filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-primary/[0.01] transition-colors group">
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="h-10 w-10 sm:h-14 sm:w-14 shrink-0 bg-earth rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 p-1">
                            <img
                              className="h-full w-full object-cover rounded-lg sm:rounded-xl"
                              src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/56x56/f0fdf4/16a34a?text=P'}
                              alt={product.name}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-black text-gray-900 leading-none mb-1 truncate">{product.name}</div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">#{product._id.slice(-6)}</div>
                            <div className="sm:hidden mt-1 px-2 py-0.5 inline-flex text-[8px] font-black rounded-md bg-emerald-50 text-emerald-700 uppercase tracking-widest border border-emerald-100">
                             {product.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-8 py-6">
                        <span className="px-3 py-1.5 inline-flex text-[10px] font-black rounded-lg bg-emerald-50 text-emerald-700 uppercase tracking-widest border border-emerald-100">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <div className="text-xs sm:text-sm font-black text-gray-900">₹{product.price.toLocaleString()}</div>
                        {product.discount > 0 && (
                          <div className="text-[8px] sm:text-[10px] font-bold text-red-500 uppercase">-{product.discount}%</div>
                        )}
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                        <div className="flex items-center justify-end gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          {/* View in new tab — keeps admin on dashboard */}
                          <a
                            href={`/products/${product.category}/${product._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-earth text-primary hover:bg-primary hover:text-white rounded-xl transition-all"
                            title="View Public Page"
                          >
                            <Eye size={18} />
                          </a>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-3 bg-earth text-amber-600 hover:bg-amber-600 hover:text-white rounded-xl transition-all"
                            title="Edit Product"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                            title="Delete Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!filteredProducts || filteredProducts.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <div className="max-w-xs mx-auto">
                          <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                          <p className="text-gray-900 font-bold">No products match your criteria</p>
                          <p className="text-gray-400 text-sm font-medium mt-1">Try a different search term or add a new product.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Showing {filteredProducts.length} of {products.length} Products
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase hover:text-primary transition-colors">Previous</button>
                <button className="px-4 py-2 text-[10px] font-black text-primary uppercase border border-primary/10 rounded-lg">1</button>
                <button className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase hover:text-primary transition-colors">Next</button>
              </div>
            </div>
            </div>
            </>
          )}
          
          {/* Customers Placeholder View */}
          {activeTab === 'cust' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-black font-heading text-gray-900 uppercase tracking-tight">Customers</h2>
                <p className="text-sm text-gray-500 font-medium">Manage your buyers and contact list.</p>
              </div>
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden text-center py-24">
                <Users className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                <h3 className="text-xl font-black text-gray-900 mb-2">Customer Data Hub</h3>
                <p className="text-gray-400 text-sm font-medium mb-8 max-w-sm mx-auto">
                  We are developing the WhatsApp integration module. Soon you'll be able to see all user inquiries right here.
                </p>
                <button className="bg-gray-100 text-gray-400 px-6 py-3 rounded-2xl font-bold inline-flex items-center gap-2 opacity-60 cursor-not-allowed">
                  <Plus size={20} /> Import Contacts
                </button>
              </div>
            </motion.div>
          )}

          {/* Analytics Placeholder View */}
          {activeTab === 'ana' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-black font-heading text-gray-900 uppercase tracking-tight">Analytics</h2>
                <p className="text-sm text-gray-500 font-medium">Monitor farm performance and traffic.</p>
              </div>
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center py-24 px-4 text-center">
                <BarChart3 className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                <h3 className="text-xl font-black text-gray-900 mb-2">Traffic & Sales Reports</h3>
                <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto">
                  Analytics charting will be available once sufficient data is gathered from visitor activity.
                </p>
              </div>
            </motion.div>
          )}

          {/* Settings Placeholder View */}
          {activeTab === 'sett' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-black font-heading text-gray-900 uppercase tracking-tight">Settings</h2>
                <p className="text-sm text-gray-500 font-medium">Configure app preferences and credentials.</p>
              </div>
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden text-center py-24">
                <Settings className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                <h3 className="text-xl font-black text-gray-900 mb-2">System Configuration</h3>
                <p className="text-gray-400 text-sm font-medium mb-8 max-w-sm mx-auto">
                  The admin settings panel is under construction. Future updates will allow customizing farm details and changing passwords.
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
