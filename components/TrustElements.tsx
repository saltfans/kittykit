'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users, Shield, Truck, Heart, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const recentPurchases = [
  { name: 'Emma from Riga', product: 'Set Gorgeous', time: '2 minutes ago' },
  { name: 'Laura from Vilnius', product: 'Duo Pack', time: '5 minutes ago' },
  { name: 'Sophie from Amsterdam', product: 'Set Leading Lady', time: '8 minutes ago' },
  { name: 'Marie from Brussels', product: 'Duo Pack', time: '12 minutes ago' },
  { name: 'Anna from Jurmala', product: 'Quad Pack', time: '15 minutes ago' },
];

export default function TrustElements() {
  const [visitorCount, setVisitorCount] = useState(12);
  const [currentPurchaseIndex, setCurrentPurchaseIndex] = useState(0);
  const [showPurchase, setShowPurchase] = useState(true);

  useEffect(() => {
    // Random visitor count updates
    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => Math.max(8, Math.min(25, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);

    // Rotate through recent purchases
    const purchaseInterval = setInterval(() => {
      setShowPurchase(false);
      setTimeout(() => {
        setCurrentPurchaseIndex(prev => (prev + 1) % recentPurchases.length);
        setShowPurchase(true);
      }, 300);
    }, 8000);

    return () => {
      clearInterval(visitorInterval);
      clearInterval(purchaseInterval);
    };
  }, []);

  return (
    <>
      {/* Live Visitors Counter - Top Right */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed top-24 right-6 z-40 hidden lg:block"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="glass-strong rounded-full px-5 py-3 shadow-xl border border-pink-500/30"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Users className="w-5 h-5 text-green-400" />
            </motion.div>
            <div>
              <div className="text-white font-bold text-lg">{visitorCount}</div>
              <div className="text-xs text-gray-400">viewing now</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Purchase Notification - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <AnimatePresence mode="wait">
          {showPurchase && (
            <motion.div
              key={currentPurchaseIndex}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="glass-strong rounded-2xl p-4 shadow-2xl border border-pink-500/20 max-w-xs"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-10 h-10 rounded-full gradient-pink flex items-center justify-center flex-shrink-0"
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {recentPurchases[currentPurchaseIndex].name}
                  </p>
                  <p className="text-pink-300 text-sm">
                    purchased {recentPurchases[currentPurchaseIndex].product}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {recentPurchases[currentPurchaseIndex].time}
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust Badges - Always visible at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none"
      >
        <div className="container mx-auto px-6 pb-6">
          <div className="glass-strong rounded-2xl p-4 pointer-events-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { Icon: Shield, text: 'Secure Checkout', color: 'text-blue-400' },
                { Icon: Truck, text: 'Free Shipping €50+', color: 'text-green-400' },
                { Icon: Heart, text: '30-Day Returns', color: 'text-pink-400' },
                { Icon: CheckCircle, text: '100% Authentic', color: 'text-purple-400' },
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2"
                >
                  <badge.Icon className={`w-5 h-5 ${badge.color} flex-shrink-0`} />
                  <span className="text-white text-xs font-medium truncate">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
