import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import './i18n';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname === '/auth';

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className={`flex-grow ${!isDashboard ? 'page-enter' : ''}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <WhatsAppButton />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products/:category" element={<CategoryPage />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/auth" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
