'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User as UserIconComponent, LogIn } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuickBuy from '@/components/QuickBuy';
import WhatsInside from '@/components/WhatsInside';
import ProductGallery from '@/components/ProductGallery';
import ProductComparison from '@/components/ProductComparison';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Checkout from '@/components/Checkout';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Auth, { User } from '@/components/Auth';
import UserProfile from '@/components/UserProfile';
import OrderSuccess from '@/components/OrderSuccess';
import CookieConsent from '@/components/CookieConsent';
import Confetti from '@/components/Confetti';
import FloatingActionButton from '@/components/FloatingActionButton';
import TrustElements from '@/components/TrustElements';
import ScrollProgress from '@/components/ScrollProgress';
import BeforeAfter from '@/components/BeforeAfter';
import ReviewsSection from '@/components/ReviewsSection';
import InstagramFeed from '@/components/InstagramFeed';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderData, setOrderData] = useState<{
    orderNumber: string;
    email: string;
    total: number;
  } | null>(null);
  const [checkoutData, setCheckoutData] = useState<{
    isOpen: boolean;
    bundle: any;
    selectedColor?: string;
  }>({
    isOpen: false,
    bundle: null,
    selectedColor: undefined,
  });

  const handleCheckout = (bundle: any, color?: string) => {
    setCheckoutData({
      isOpen: true,
      bundle,
      selectedColor: color,
    });
  };
  
  const handleQuickBuy = (productId: string) => {
    // Create single bundle for selected product
    const singleBundle = {
      id: 'single',
      name: 'Single Lip Kit',
      quantity: 1,
      originalPrice: 29,
      price: 24,
      discount: 5,
      popular: false,
      description: 'Complete lip kit: liner + gloss',
    };
    
    handleCheckout(singleBundle, productId);
  };

  const closeCheckout = () => {
    setCheckoutData({ isOpen: false, bundle: null, selectedColor: undefined });
  };

  const handleCheckoutComplete = (email: string, total: number) => {
    // Generate order number
    const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    setOrderData({
      orderNumber,
      email,
      total,
    });
    
    closeCheckout();
    setShowOrderSuccess(true);
    setShowConfetti(true);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Header Navigation */}
      <Header
        user={user}
        onAuthClick={() => setShowAuth(true)}
        onProfileClick={() => setShowProfile(true)}
      />

      {/* Main Content - add pt for header spacing */}
      <div id="hero" className="pt-20">
        <Hero />
      </div>
      
      <QuickBuy onBuyNow={handleQuickBuy} />
      
      <WhatsInside />
      
      <ProductComparison />
      
      <ProductGallery />
      
      <div id="products">
        <Products onCheckout={handleCheckout} />
      </div>
      
      <BeforeAfter />
      
      <ReviewsSection />
      
      <InstagramFeed />
      
      <div id="testimonials">
        <Testimonials />
      </div>
      
      <Newsletter />
      
      <Contact />
      
      <div id="faq">
        <FAQ />
      </div>
      
      <Footer />
      
      {/* Modals and Overlays */}
      {checkoutData.bundle && (
        <Checkout
          isOpen={checkoutData.isOpen}
          onClose={closeCheckout}
          bundle={checkoutData.bundle}
          selectedColor={checkoutData.selectedColor}
          user={user}
          onCheckoutComplete={handleCheckoutComplete}
        />
      )}

      <Auth
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {user && (
        <UserProfile
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {showOrderSuccess && orderData && (
        <OrderSuccess
          orderNumber={orderData.orderNumber}
          email={orderData.email}
          total={orderData.total}
          onClose={() => {
            setShowOrderSuccess(false);
            setOrderData(null);
          }}
        />
      )}

      <CookieConsent />
      
      {/* Floating Elements */}
      <FloatingActionButton 
        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} 
      />
      
      <TrustElements />
      
      {showConfetti && (
        <Confetti 
          trigger={showConfetti} 
          onComplete={() => setShowConfetti(false)} 
        />
      )}
    </div>
  );
}