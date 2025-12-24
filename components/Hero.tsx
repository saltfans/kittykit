'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/90 to-gray-950 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/logovideo.MOV" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-gray-300">Limited Time Offer</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">Kitty KIT</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto">
            Premium Luxury Lipstick
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
            Experience bold, vibrant colors that last all day. Available in stunning Pink and Red.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToProducts}
              className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 gradient-pink" />
              <div className="relative flex items-center gap-2 text-white font-semibold">
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </div>
            </button>

            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-white">
                Save up to <span className="text-pink-500">45%</span>
              </div>
              <div className="text-sm text-gray-400">on bundle deals</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
    </section>
  );
}
