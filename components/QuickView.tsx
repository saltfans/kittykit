'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Sparkles, Check, Star } from 'lucide-react';
import { useState } from 'react';

interface QuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    color: string;
    description: string;
    images: string[];
    image: string;
    gradient: string;
    video?: string;
  };
  onAddToCart: (productId: string) => void;
}

export default function QuickView({ isOpen, onClose, product, onAddToCart }: QuickViewProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const features = [
    'Long-lasting 12+ hours',
    'Waterproof formula',
    'Vegan & Cruelty-free',
    'Precision liner included',
    'High-shine finish',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl glass-strong rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-3 rounded-full glass-strong hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Left: Images */}
              <div className="relative">
                <motion.div
                  className="relative aspect-square rounded-2xl overflow-hidden mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={product.images[currentImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-4 right-4 p-3 rounded-full glass-strong hover:bg-pink-500/20 transition-colors"
                  >
                    <Heart 
                      className={`w-6 h-6 transition-colors ${
                        isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-white'
                      }`}
                    />
                  </motion.button>
                </motion.div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                        currentImage === idx 
                          ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-gray-900' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="flex flex-col">
                <div className="flex-1">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r ${product.gradient}`}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">Premium Quality</span>
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-4xl font-bold text-white mb-2">{product.name}</h2>
                  <p className={`text-xl font-medium bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent mb-4`}>
                    {product.color}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">(128 reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`p-1.5 rounded-full bg-gradient-to-r ${product.gradient}`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-5xl font-bold text-white">€24</span>
                    <span className="text-2xl text-gray-400 line-through">€29</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold">
                      Save €5
                    </span>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${
                      justAdded
                        ? 'bg-green-500 text-white'
                        : `bg-gradient-to-r ${product.gradient} text-white hover:shadow-xl hover:shadow-pink-500/50`
                    }`}
                    whileHover={{ scale: justAdded ? 1 : 1.02, y: justAdded ? 0 : -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={justAdded}
                  >
                    <span className="flex items-center justify-center gap-3">
                      {justAdded ? (
                        <>
                          <Check className="w-6 h-6" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-6 h-6" />
                          Add to Cart
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
