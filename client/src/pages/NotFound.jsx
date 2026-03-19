import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold font-heading text-primary">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="bg-primary hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
