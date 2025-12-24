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
    originalPrice: 38,
    price: 32,
    discount: 6,
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
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedColor(product.id)}
              className={`relative group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 ${
                selectedColor === product.id ? 'ring-4 ring-pink-500 scale-105' : 'hover:scale-102'
              }`}
            >
              <div className={`aspect-square bg-gradient-to-br ${product.gradient} p-12 flex items-center justify-center relative`}>
                {selectedColor === product.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-white rounded-full p-2"
                  >
                    <Check className="w-6 h-6 text-pink-600" />
                  </motion.div>
                )}
                
                {/* Product image */}
                <div className="text-white text-center relative">
                  <div className="w-64 h-64 mx-auto mb-4 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-lg opacity-90">{product.color}</p>
                </div>
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
