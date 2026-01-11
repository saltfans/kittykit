'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles, Filter, Star } from 'lucide-react';
import { useState } from 'react';

const transformations = [
  {
    id: 1,
    before: '/KKIT/openlipstick_gorgeous_onhand.jpg',
    after: '/KKIT/inside_package_gorgeous.jpg',
    product: 'gorgeous',
    productName: 'Set Gorgeous',
    user: 'Emma S.',
    rating: 5,
    review: 'Incredible transformation! The fuchsia shade is absolutely stunning.',
    verified: true,
  },
  {
    id: 2,
    before: '/KKIT/openlipstick_leadinglady_onhand.jpg',
    after: '/KKIT/inside_package_leadinglady.jpg',
    product: 'leadinglady',
    productName: 'Set Leading Lady',
    user: 'Sofia M.',
    rating: 5,
    review: 'The classic red is perfect for any occasion. Love it!',
    verified: true,
  },
  {
    id: 3,
    before: '/KKIT/lipstick_leadinglady_onhand.jpg',
    after: '/KKIT/leadinglady_lipliner_open.jpg',
    product: 'leadinglady',
    productName: 'Set Leading Lady',
    user: 'Isabella R.',
    rating: 5,
    review: 'Long-lasting and beautiful finish. Highly recommend!',
    verified: true,
  },
  {
    id: 4,
    before: '/KKIT/inside_packages.jpg',
    after: '/KKIT/beautysetup.jpg',
    product: 'both',
    productName: 'Duo Pack',
    user: 'Olivia K.',
    rating: 5,
    review: 'Got both sets and I\'m obsessed! Best purchase ever.',
    verified: true,
  },
];

export default function BeforeAfter() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'gorgeous' | 'leadinglady' | 'both'>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const filters = [
    { id: 'all', label: 'All Results', icon: Sparkles },
    { id: 'gorgeous', label: 'Set Gorgeous', icon: Star },
    { id: 'leadinglady', label: 'Set Leading Lady', icon: Star },
    { id: 'both', label: 'Duo Pack', icon: Star },
  ];

  const filteredTransformations = selectedFilter === 'all' 
    ? transformations 
    : transformations.filter(t => t.product === selectedFilter);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-950 via-pink-950/10 to-gray-950">
      {/* Background */}
      <motion.div 
        className="absolute top-1/3 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full glass-strong border border-pink-500/30"
          >
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-sm text-gray-300 font-medium">Real Transformations</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            See the <span className="gradient-text-animated">Difference</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real results from real customers. Join thousands of happy Kitty KIT users!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedFilter === filter.id
                  ? 'gradient-pink text-white shadow-lg shadow-pink-500/30'
                  : 'glass-strong text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredTransformations.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedImage(item.id)}
                className="group cursor-pointer"
              >
                <div className="glass-strong rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500">
                  {/* Image Preview */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.before}
                      alt={`${item.productName} Before`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.3 }}
                    />
                    
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <div className="px-6 py-3 rounded-full gradient-pink text-white font-bold">
                        View Transformation
                      </div>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-pink-400 font-semibold">{item.productName}</span>
                      <div className="flex">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">&quot;{item.review}&quot;</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{item.user}</span>
                      {item.verified && (
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with Slider */}
      <AnimatePresence>
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-3 rounded-full glass-strong hover:bg-pink-500/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {transformations
                .filter(t => t.id === selectedImage)
                .map(item => (
                  <div key={item.id}>
                    {/* Before/After Slider */}
                    <div 
                      className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize"
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      onMouseLeave={() => setIsDragging(false)}
                      onMouseMove={handleMouseMove}
                      onTouchStart={() => setIsDragging(true)}
                      onTouchEnd={() => setIsDragging(false)}
                      onTouchMove={handleTouchMove}
                    >
                      {/* Before Image */}
                      <div className="absolute inset-0">
                        <img
                          src={item.before}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 px-4 py-2 rounded-full glass-strong">
                          <span className="text-white font-bold">BEFORE</span>
                        </div>
                      </div>

                      {/* After Image */}
                      <div
                        className="absolute inset-0"
                        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                      >
                        <img
                          src={item.after}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 px-4 py-2 rounded-full glass-strong">
                          <span className="text-white font-bold">AFTER</span>
                        </div>
                      </div>

                      {/* Slider Handle */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white/50"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-900 -ml-1" />
                          <ChevronRight className="w-4 h-4 text-gray-900 -mr-1" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-6 text-center glass-strong rounded-2xl p-6">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-white">{item.productName}</h3>
                        <div className="flex">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-lg mb-4">&quot;{item.review}&quot;</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-white font-medium">— {item.user}</span>
                        {item.verified && (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
