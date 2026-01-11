'use client';

import { motion } from 'framer-motion';
import { Heart, Instagram, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/10 py-16 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      <motion.div 
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div 
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold gradient-text-animated mb-4">Kitty KIT</h3>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Premium lip kits with precision liner & lustrous gloss. Crafted for bold, confident women. 
              <br />
              <span className="text-pink-400 font-medium">Set Gorgeous · Set Leading Lady</span>
            </p>
            <div className="flex gap-4">
              <motion.a 
                href="#" 
                className="p-4 rounded-full glass-strong hover:bg-pink-500/20 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-6 h-6 text-pink-500" />
              </motion.a>
              <motion.a 
                href="mailto:hello@kittykit.hot" 
                className="p-4 rounded-full glass-strong hover:bg-pink-500/20 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-6 h-6 text-pink-500" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-white mb-6 text-lg">Shop</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <motion.a 
                  href="#products" 
                  className="hover:text-pink-400 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                >
                  Products
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="hover:text-pink-400 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                >
                  Bundles
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="hover:text-pink-400 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                >
                  Gift Cards
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-white mb-6 text-lg">Legal</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <motion.a 
                  href="#" 
                  className="hover:text-pink-400 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                >
                  Privacy Policy
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="hover:text-pink-400 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                >
                  Terms of Service
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="hover:text-pink-400 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                >
                  Shipping Policy
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="hover:text-pink-400 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                >
                  Return Policy
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 Kitty KIT. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </motion.div>
            <span>in Europe</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 gradient-pink-glow rounded-full shadow-2xl z-50"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </motion.button>
    </footer>
  );
}
