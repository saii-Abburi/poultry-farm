import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const cookieUser = document.cookie.split('; ').find(row => row.startsWith('userInfo='));
    const localUser = localStorage.getItem('userInfo');
    if (cookieUser || localUser) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(api);
      
      const { data } = await api.post('/auth/admin/login', { email, password });
      
      // LocalStorage payload
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Cookie payload setup (expires in 7 days)
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + (7 * 24 * 60 * 60 * 1000));
      document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(data))};expires=${expireDate.toUTCString()};path=/;SameSite=Lax`;

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-50 mx-auto">
        <div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-primary/30">
            <span className="text-2xl sm:text-3xl font-bold">F</span>
          </div>
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 font-heading mb-1 sm:mb-2">
            Admin Portal
          </h2>
          <p className="text-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">Sign in to manage your Farm.</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center justify-between border border-red-100">
            {error}
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 font-bold">&times;</button>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="admin@poultryfarm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
