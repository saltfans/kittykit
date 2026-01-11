'use client';

import { motion } from 'framer-motion';
import { Check, X, ArrowLeftRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    id: 'gorgeous',
    name: 'Set Gorgeous',
    tagline: 'Bold & Beautiful',
    color: 'Stunning Fuchsia',
    image: '/KKIT/openlipstick_gorgeous_onhand.jpg',
    price: 24,
    gradient: 'from-fuchsia-500 to-pink-600',
    features: {
      color: 'Fuchsia',
      finish: 'High Shine',
      lasting: '12+ hours',
      vegan: true,
      crueltyFree: true,
      waterproof: true,
      bestFor: 'Bold, Statement Looks',
      skinTone: 'All Skin Tones',
      occasion: 'Party, Night Out, Special Events',
    },
  },
  {
    id: 'leadinglady',
    name: 'Set Leading Lady',
    tagline: 'Timeless & Classic',
    color: 'Classic Red',
    image: '/KKIT/openlipstick_leadinglady_onhand.jpg',
    price: 24,
    gradient: 'from-red-600 to-rose-700',
    features: {
      color: 'Classic Red',
      finish: 'Lustrous',
      lasting: '12+ hours',
      vegan: true,
      crueltyFree: true,
      waterproof: true,
      bestFor: 'Elegant, Timeless Style',
      skinTone: 'All Skin Tones',
      occasion: 'Professional, Formal, Everyday',
    },
  },
];

export default function ProductComparison() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950">
      {/* Background */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
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
            <ArrowLeftRight className="w-5 h-5 text-pink-500" />
            <span className="text-sm text-gray-300 font-medium">Compare Sets</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Which Kit is <span className="gradient-text-animated">Perfect for You?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Both stunning, both high-quality. Compare features to find your match.
          </p>
        </motion.div>

        {/* Interactive Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative max-w-4xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden glass-strong">
            {/* Left Product */}
            <div className="absolute inset-0">
              <img
                src={products[0].image}
                alt={products[0].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold text-white mb-2">{products[0].name}</h3>
                <p className="text-pink-300 text-lg">{products[0].color}</p>
              </div>
            </div>

            {/* Right Product with clip-path */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <img
                src={products[1].image}
                alt={products[1].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
              <div className="absolute bottom-8 right-8 text-right">
                <h3 className="text-3xl font-bold text-white mb-2">{products[1].name}</h3>
                <p className="text-rose-300 text-lg">{products[1].color}</p>
              </div>
            </div>

            {/* Slider Control */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white/50 cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={(_, info) => {
                  const container = (info.point.x / window.innerWidth) * 100;
                  setSliderPosition(Math.max(0, Math.min(100, container * (100 / 80))));
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeftRight className="w-6 h-6 text-gray-900" />
              </motion.div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Drag the slider to compare both products
          </p>
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl overflow-hidden"
        >
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Feature Names */}
            <div className="p-8 space-y-6">
              <div className="text-lg font-bold text-white mb-8">Features</div>
              {Object.keys(products[0].features).map((key, idx) => (
                <div key={idx} className="text-gray-300 font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              ))}
            </div>

            {/* Set Gorgeous */}
            <div className="p-8 space-y-6 bg-fuchsia-500/5">
              <div>
                <div className={`text-lg font-bold bg-gradient-to-r ${products[0].gradient} bg-clip-text text-transparent mb-2`}>
                  {products[0].name}
                </div>
                <div className="text-sm text-gray-400">{products[0].tagline}</div>
              </div>
              {Object.values(products[0].features).map((value, idx) => (
                <div key={idx} className="text-white font-medium">
                  {typeof value === 'boolean' ? (
                    value ? <Check className="w-5 h-5 text-green-400" /> : <X className="w-5 h-5 text-red-400" />
                  ) : (
                    value
                  )}
                </div>
              ))}
            </div>

            {/* Set Leading Lady */}
            <div className="p-8 space-y-6 bg-red-500/5">
              <div>
                <div className={`text-lg font-bold bg-gradient-to-r ${products[1].gradient} bg-clip-text text-transparent mb-2`}>
                  {products[1].name}
                </div>
                <div className="text-sm text-gray-400">{products[1].tagline}</div>
              </div>
              {Object.values(products[1].features).map((value, idx) => (
                <div key={idx} className="text-white font-medium">
                  {typeof value === 'boolean' ? (
                    value ? <Check className="w-5 h-5 text-green-400" /> : <X className="w-5 h-5 text-red-400" />
                  ) : (
                    value
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6 text-lg">Can't decide? Get both and save!</p>
          <motion.button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-6 rounded-full gradient-pink text-white font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Get Duo Pack - Save €13
              <Sparkles className="w-6 h-6" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
