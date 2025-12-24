'use client';

import { motion } from 'framer-motion';
import { Check, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    id: 'pink',
    name: 'Kitty KIT Pink',
    color: 'Pink Perfection',
    image: '/lipstick-pink.jpg',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    id: 'red',
    name: 'Kitty KIT Red',
    color: 'Ruby Red',
    image: '/lipstick-red.jpg',
    gradient: 'from-red-500 to-red-600',
  },
];

const bundles = [
  {
    id: 'single',
    name: 'Single Lipstick',
    quantity: 1,
    originalPrice: 25,
    price: 19,
    discount: 24,
    popular: false,
  },
  {
    id: 'duo',
    name: 'Duo Pack',
    quantity: 2,
    description: 'Both colors',
    originalPrice: 50,
    price: 32,
    discount: 18,
    popular: true,
    badge: 'Best Value',
  },
  {
    id: 'quad',
    name: 'Quad Pack',
    quantity: 4,
    description: '2 of each color',
    originalPrice: 100,
    price: 55,
    discount: 45,
    popular: false,
    badge: 'Save 45%',
  },
];

export default function Products({ onCheckout }: { onCheckout: (bundle: any, color?: string) => void }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [hoveredBundle, setHoveredBundle] = useState<string | null>(null);

  return (
    <section id="products" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your <span className="gradient-text">Shade</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium formula that lasts up to 12 hours. Cruelty-free and made in Europe.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedColor(product.id)}
              className="relative group cursor-pointer"
            >
              {/* Outer glow for selected */}
              {selectedColor === product.id && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute -inset-8 bg-gradient-to-br ${product.gradient} rounded-full blur-3xl opacity-30`}
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute -inset-4 bg-gradient-to-br ${product.gradient} rounded-full blur-2xl`}
                  />
                </>
              )}

              <div className={`relative aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-700 ${
                selectedColor === product.id 
                  ? 'ring-2 ring-pink-400/50 shadow-2xl shadow-pink-500/30' 
                  : 'hover:shadow-xl hover:shadow-pink-500/10'
              }`}>
                
                {/* Sophisticated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95">
                  {/* Subtle colored accent */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${product.gradient} opacity-5`} />
                  
                  {/* Animated shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                </div>

                {/* Floating particles for selected */}
                {selectedColor === product.id && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${product.gradient} rounded-full`}
                        initial={{ 
                          x: Math.random() * 100 + '%', 
                          y: '100%',
                          opacity: 0 
                        }}
                        animate={{ 
                          y: '-20%',
                          opacity: [0, 1, 0],
                        }}
                        transition={{ 
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: 'easeOut'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Checkmark badge with glow */}
                {selectedColor === product.id && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-full blur-md opacity-60`} />
                    <div className="relative bg-white rounded-full p-3 shadow-2xl">
                      <Check className="w-6 h-6 text-pink-600" />
                    </div>
                  </motion.div>
                )}

                {/* Selected badge */}
                {selectedColor === product.id && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute top-6 left-6 z-20 px-4 py-2 glass rounded-full shadow-lg border border-pink-400/30"
                  >
                    <span className="text-pink-400 font-semibold text-sm flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ✨
                      </motion.span>
                      Selected
                    </span>
                  </motion.div>
                )}

                {/* Main content */}
                <div className="relative h-full flex flex-col items-center justify-center p-12">
                  
                  {/* Product image with sophisticated effects */}
                  <motion.div
                    className="relative mb-8"
                    whileHover={{ 
                      scale: 1.05,
                      y: -15,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    {/* Image glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-full blur-3xl opacity-20`}
                      animate={{
                        scale: selectedColor === product.id ? [1, 1.2, 1] : 1,
                        opacity: selectedColor === product.id ? [0.2, 0.4, 0.2] : 0.2,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Spotlight effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                      }}
                    />

                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="relative w-80 h-80 object-contain filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                      animate={{
                        filter: selectedColor === product.id 
                          ? [
                              'drop-shadow(0 20px 60px rgba(0,0,0,0.7))',
                              `drop-shadow(0 25px 70px rgba(236, 72, 153, 0.4))`,
                              'drop-shadow(0 20px 60px rgba(0,0,0,0.7))',
                            ]
                          : 'drop-shadow(0 20px 60px rgba(0,0,0,0.7))'
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Circular accent behind image */}
                    <div className="absolute inset-0 -z-10">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${product.gradient} opacity-5 blur-2xl`} />
                    </div>
                  </motion.div>

                  {/* Product info with elegant styling */}
                  <div className="text-center space-y-3 relative z-10">
                    <motion.h3 
                      className="text-3xl font-bold text-white tracking-tight"
                      animate={{
                        textShadow: selectedColor === product.id 
                          ? '0 0 20px rgba(236, 72, 153, 0.3)'
                          : '0 0 0px rgba(236, 72, 153, 0)'
                      }}
                    >
                      {product.name}
                    </motion.h3>
                    
                    <p className="text-lg text-gray-300 font-medium">{product.color}</p>
                    
                    {/* Elegant divider */}
                    <motion.div 
                      className="flex items-center justify-center gap-3 pt-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="h-px w-8 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${product.gradient} shadow-lg`} />
                      <div className="h-px w-8 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
                    </motion.div>

                    <motion.p 
                      className="text-sm text-gray-400 pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      12-hour lasting • Cruelty-free
                    </motion.p>
                  </div>
                </div>

                {/* Hover border glow */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ring-1 ring-inset ${
                  selectedColor === product.id ? 'ring-pink-400/30' : 'ring-white/10'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onHoverStart={() => setHoveredBundle(bundle.id)}
              onHoverEnd={() => setHoveredBundle(null)}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                bundle.popular
                  ? 'glass ring-2 ring-pink-500 scale-105 md:scale-110'
                  : 'glass hover:ring-2 hover:ring-pink-500/50'
              }`}
            >
              {bundle.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-pink rounded-full text-sm font-semibold text-white">
                  {bundle.badge}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
                {bundle.description && (
                  <p className="text-gray-400 text-sm">{bundle.description}</p>
                )}
              </div>

              <div className="mb-6 text-center">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">€{bundle.price}</span>
                  {bundle.quantity > 1 && <span className="text-gray-400 text-lg">total</span>}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-500 line-through text-lg">€{bundle.originalPrice}</span>
                  <span className="text-pink-500 font-semibold">Save €{bundle.discount}</span>
                </div>
                {bundle.quantity > 1 && (
                  <div className="text-sm text-gray-400 mt-2">
                    €{(bundle.price / bundle.quantity).toFixed(2)} per lipstick
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-pink-500" />
                  <span>{bundle.quantity} Premium Lipstick{bundle.quantity > 1 ? 's' : ''}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-pink-500" />
                  <span>12-hour lasting formula</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-pink-500" />
                  <span>Free shipping in Europe</span>
                </li>
                {bundle.quantity > 1 && (
                  <li className="flex items-center gap-2 text-gray-300">
                    <Star className="w-5 h-5 text-pink-500 fill-pink-500" />
                    <span className="font-semibold">€{bundle.discount} instant savings!</span>
                  </li>
                )}
              </ul>

              <button
                onClick={() => onCheckout(bundle, bundle.id === 'single' ? selectedColor ?? undefined : undefined)}
                disabled={bundle.id === 'single' && !selectedColor}
                className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                  bundle.popular
                    ? 'gradient-pink text-white hover:shadow-lg hover:shadow-pink-500/50'
                    : 'glass text-white hover:bg-white/10'
                } ${
                  bundle.id === 'single' && !selectedColor ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {bundle.id === 'single' && !selectedColor ? 'Select a color first' : 'Add to Cart'}
              </button>

              {hoveredBundle === bundle.id && bundle.discount >= 40 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-2 -right-2"
                >
                  <TrendingUp className="w-8 h-8 text-pink-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { icon: '✨', text: 'Cruelty-Free' },
            { icon: '🇪🇺', text: 'Made in Europe' },
            { icon: '💝', text: 'Premium Quality' },
            { icon: '🚚', text: 'Free Shipping' },
          ].map((badge, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="text-gray-300 font-semibold">{badge.text}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
