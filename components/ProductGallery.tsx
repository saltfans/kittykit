'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  {
    src: '/KKIT/beautysetup.jpg',
    alt: 'Kitty KIT Beauty Setup',
    title: 'Complete Collection',
    description: 'Both stunning sets together',
  },
  {
    src: '/KKIT/inside_packages.jpg',
    alt: 'Inside Packages',
    title: 'Luxury Packaging',
    description: 'Elegant presentation',
  },
  {
    src: '/KKIT/inside_packages2.jpg',
    alt: 'Package Details',
    title: 'Premium Quality',
    description: 'Beautiful unboxing experience',
  },
  {
    src: '/KKIT/openlipstick_gorgeous_onhand.jpg',
    alt: 'Set Gorgeous Open',
    title: 'Set Gorgeous',
    description: 'Stunning fuchsia lip gloss',
  },
  {
    src: '/KKIT/openlipstick_leadinglady_onhand.jpg',
    alt: 'Set Leading Lady Open',
    title: 'Set Leading Lady',
    description: 'Classic red lip gloss',
  },
  {
    src: '/KKIT/lipstick_leadinglady_onhand.jpg',
    alt: 'Leading Lady in Hand',
    title: 'Perfect Application',
    description: 'Easy to use design',
  },
  {
    src: '/KKIT/leadinglady_lipliner_close.jpg',
    alt: 'Lip Liner Close-up',
    title: 'Precision Liner',
    description: 'Perfect line every time',
  },
  {
    src: '/KKIT/leadinglady_lipliner_open.jpg',
    alt: 'Lip Liner Open',
    title: 'Quality Construction',
    description: 'Long-lasting formula',
  },
  {
    src: '/KKIT/inside_package_gorgeous.jpg',
    alt: 'Set Gorgeous Package',
    title: 'Set Gorgeous Kit',
    description: 'Liner + Gloss in beautiful packaging',
  },
  {
    src: '/KKIT/inside_package_leadinglady.jpg',
    alt: 'Set Leading Lady Package',
    title: 'Set Leading Lady Kit',
    description: 'Complete lip perfection',
  },
];

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const minSwipeDistance = 50;

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  return (
    <>
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-950 via-pink-950/5 to-gray-950">
        {/* Background decoration */}
        <motion.div 
          className="absolute top-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full glass-strong"
            >
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm text-gray-300 font-medium">See What You Get</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Inside <span className="gradient-text-animated">Every Kit</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Luxurious packaging, premium products, flawless results
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group glass-strong"
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">{image.title}</p>
                    <p className="text-pink-300 text-xs">{image.description}</p>
                  </div>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 gradient-pink"
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative text-white font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Shop Now
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full glass-strong hover:bg-pink-500/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image */}
              <div className="relative flex-1 flex items-center justify-center">
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />
              </div>

              {/* Info */}
              <div className="text-center mt-6 glass-strong rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-pink-300 text-lg">
                  {galleryImages[selectedImage].description}
                </p>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevious}
                  className="p-4 rounded-full glass-strong hover:bg-pink-500/20 transition-colors pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="p-4 rounded-full glass-strong hover:bg-pink-500/20 transition-colors pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Counter */}
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-strong">
                <span className="text-white font-medium">
                  {selectedImage + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
