'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      // Show banner after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'accepted');
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'declined');
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="glass-strong rounded-2xl border border-pink-500/30 p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex-shrink-0"
                >
                  <div className="w-16 h-16 gradient-pink rounded-2xl flex items-center justify-center">
                    <Cookie className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">
                    🍪 We Use Cookies
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    We use cookies to improve your experience on our site, personalize content and analyze visits. 
                    By continuing to use this site, you agree to our{' '}
                    <button
                      className="text-pink-400 hover:text-pink-300 underline font-medium"
                      onClick={() => alert('Privacy Policy page')}
                    >
                      privātuma politikai
                    </button>
                    .
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="flex items-center justify-center gap-2 px-6 py-3 gradient-pink-glow rounded-xl text-white font-semibold shadow-lg whitespace-nowrap"
                  >
                    <Check className="w-5 h-5" />
                    Accept
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDecline}
                    className="flex items-center justify-center gap-2 px-6 py-3 glass border border-white/20 rounded-xl text-white font-medium hover:border-white/40 transition-all whitespace-nowrap"
                  >
                    <X className="w-5 h-5" />
                    Decline
                  </motion.button>
                </div>
              </div>

              {/* Additional Options */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.5 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <button
                    onClick={() => alert('Manage preferences')}
                    className="hover:text-pink-400 transition-colors"
                  >
                    ⚙️ Manage preferences
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => alert('Learn more about cookies')}
                    className="hover:text-pink-400 transition-colors"
                  >
                    📖 Learn more
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 gradient-pink rounded-2xl blur-3xl -z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
