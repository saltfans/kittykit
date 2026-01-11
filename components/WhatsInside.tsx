'use client';

import { motion } from 'framer-motion';
import { Sparkles, Package, Heart } from 'lucide-react';

const kitContents = [
  {
    id: 'gorgeous',
    name: 'Set Gorgeous',
    color: 'Fuchsia Dream',
    mainImage: '/KKIT/inside_package_gorgeous.jpg',
    detailImages: [
      '/KKIT/openlipstick_gorgeous_onhand.jpg',
      '/KKIT/leadinglady_lipliner_open.jpg',
    ],
    gradient: 'from-fuchsia-500 to-pink-600',
    includes: [
      'Precision Lip Liner - Fuchsia',
      'Lustrous Lip Gloss - Fuchsia',
      'Premium Black Packaging',
      'Perfect for Bold Looks',
    ],
  },
  {
    id: 'leadinglady',
    name: 'Set Leading Lady',
    color: 'Classic Red',
    mainImage: '/KKIT/inside_package_leadinglady.jpg',
    detailImages: [
      '/KKIT/openlipstick_leadinglady_onhand.jpg',
      '/KKIT/lipstick_leadinglady_onhand.jpg',
    ],
    gradient: 'from-red-600 to-rose-700',
    includes: [
      'Precision Lip Liner - Red',
      'Lustrous Lip Gloss - Red',
      'Premium Black Packaging',
      'Perfect for Timeless Elegance',
    ],
  },
];

export default function WhatsInside() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      <motion.div 
        className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full glass-strong"
          >
            <Package className="w-5 h-5 text-pink-500" />
            <span className="text-sm text-gray-300 font-medium">Complete Kits</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            What's <span className="gradient-text-animated">Inside</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Each kit contains everything you need for <span className="text-pink-400 font-semibold">perfect lips</span>
          </p>
        </motion.div>

        {/* Kits */}
        <div className="space-y-24">
          {kitContents.map((kit, kitIndex) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: kitIndex * 0.2 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${kitIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Images */}
              <div className={`relative ${kitIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-3xl overflow-hidden glass-strong p-8 mb-6"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={kit.mainImage}
                      alt={kit.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Gradient overlay on corners */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${kit.gradient} opacity-20 blur-3xl`} />
                  <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${kit.gradient} opacity-20 blur-3xl`} />
                </motion.div>

                {/* Detail Images */}
                <div className="grid grid-cols-2 gap-4">
                  {kit.detailImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative rounded-2xl overflow-hidden glass-strong p-4"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <img
                          src={img}
                          alt={`${kit.name} detail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className={kitIndex % 2 === 1 ? 'lg:order-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: kitIndex % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${kit.gradient} bg-opacity-20 mb-6`}>
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span className="text-sm font-semibold text-pink-400">{kit.color}</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    {kit.name}
                  </h3>

                  <p className="text-xl text-gray-300 mb-8">
                    Complete lip kit with precision liner and lustrous gloss for flawless application
                  </p>

                  {/* Includes */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-pink-400 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      What's Included:
                    </h4>
                    <div className="space-y-3">
                      {kit.includes.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${kit.gradient}`} />
                          <span className="text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { label: 'Long-lasting', value: '12h+' },
                      { label: 'Cruelty-free', value: '100%' },
                      { label: 'Formula', value: 'Premium' },
                      { label: 'Made in', value: 'Europe' },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="glass-strong rounded-xl p-4 text-center"
                      >
                        <div className={`text-2xl font-bold bg-gradient-to-r ${kit.gradient} bg-clip-text text-transparent mb-1`}>
                          {feature.value}
                        </div>
                        <div className="text-xs text-gray-400">{feature.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-5 rounded-full font-bold text-lg bg-gradient-to-r ${kit.gradient} text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      Get This Kit - €24
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundle Offer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center glass-strong rounded-3xl p-12 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Get <span className="gradient-text-animated">Both Kits</span> & Save €13!
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Perfect for any occasion - Only <span className="text-pink-400 font-bold">€45</span> for both
            </p>
            <motion.button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 rounded-full gradient-pink text-white font-bold text-xl"
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Bundle Deal
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
