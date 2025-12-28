'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; targetX: number; targetY: number; duration: number }>>([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Generate particles only on client side
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        duration: 20 + Math.random() * 20,
      }))
    );
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProducts = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-gray-950 to-gray-950" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Video Background with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950 z-10" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-pink-950/10 to-transparent z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/logovideo.MOV" type="video/mp4" />
        </video>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-500/30 rounded-full"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
            }}
            animate={{
              x: `${particle.targetX}%`,
              y: `${particle.targetY}%`,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full glass-strong border-pink-500/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-pink-500" />
            </motion.div>
            <span className="text-sm text-gray-200 font-medium">Limited Time Offer</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.span 
              className="gradient-text-animated inline-block"
              style={{
                transform: `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`,
              }}
            >
              Kitty KIT
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-4"
          >
            <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 font-semibold max-w-2xl mx-auto">
              Premium Luxury Lipstick
            </p>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Experience bold, vibrant colors that last all day.
            <br />
            <span className="text-pink-400 font-medium">Available in stunning Pink and Red.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={scrollToProducts}
              className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500"
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background */}
              <motion.div 
                className="absolute inset-0 gradient-pink"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                    '0 0 40px rgba(236, 72, 153, 0.6)',
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative flex items-center gap-3 text-white font-bold text-lg">
                <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Shop Now
              </div>
            </motion.button>

            <motion.div 
              className="text-center sm:text-left glass-strong px-6 py-4 rounded-2xl border border-pink-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-white">
                Save up to <motion.span 
                  className="text-pink-500"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  45%
                </motion.span>
              </div>
              <div className="text-sm text-gray-300 mt-1">on bundle deals</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
    </section>
  );
}
