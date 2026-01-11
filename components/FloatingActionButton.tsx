'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Stop pulsing after 5 seconds
    const timer = setTimeout(() => setIsPulsing(false), 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={onClick}
            className="relative group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            animate={isPulsing ? {
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(236, 72, 153, 0.4)',
                '0 0 40px rgba(236, 72, 153, 0.6)',
                '0 0 20px rgba(236, 72, 153, 0.4)',
              ],
            } : {}}
            transition={isPulsing ? { duration: 2, repeat: Infinity } : {}}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {/* Main button */}
            <div className="relative w-16 h-16 rounded-full gradient-pink flex items-center justify-center shadow-2xl">
              <ShoppingBag className="w-7 h-7 text-white" />
              
              {/* Sparkle effect */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
            </div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full glass-strong whitespace-nowrap"
            >
              <span className="text-sm font-semibold text-white">Shop Now!</span>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
