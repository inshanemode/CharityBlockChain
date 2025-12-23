import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MinimalTabSwitcher from './components/MinimalTabSwitcher';
import Footer from './components/Footer';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Donate from './pages/Donate';
import Success from './pages/Success';
import History from './pages/History';
import Explorer from './pages/Explorer';
import MyWallet from './pages/MyWallet';
import About from './pages/About';
import Demo from './pages/Demo';
import Product from './pages/Product';
import Contact from './pages/Contact';
import './styles/globals.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <MinimalTabSwitcher />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/success" element={<Success />} />
          <Route path="/history" element={<History />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/my-wallet" element={<MyWallet />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
