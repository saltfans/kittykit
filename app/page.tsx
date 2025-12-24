'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Checkout from '@/components/Checkout';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
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

  const closeCheckout = () => {
    setCheckoutData({ isOpen: false, bundle: null, selectedColor: undefined });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Hero />
      <Products onCheckout={handleCheckout} />
      <FAQ />
      <Footer />
      
      {checkoutData.bundle && (
        <Checkout
          isOpen={checkoutData.isOpen}
          onClose={closeCheckout}
          bundle={checkoutData.bundle}
          selectedColor={checkoutData.selectedColor}
        />
      )}
    </div>
  );
}