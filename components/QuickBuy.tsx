'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Sparkles, Check } from 'lucide-react';

interface QuickBuyProps {
  onBuyNow: (productId: string) => void;
}

const quickProducts = [
  {
    id: 'gorgeous',
    name: 'Set Gorgeous',
    tagline: 'Bold & Beautiful',
    color: 'Stunning Fuchsia',
    image: '/KKIT/openlipstick_gorgeous_onhand.jpg',
    packageImage: '/KKIT/inside_package_gorgeous.jpg',
    price: 24,
    gradient: 'from-fuchsia-500 to-pink-600',
    features: ['Lip Liner', 'Lip Gloss', 'Premium Box'],
  },
  {
    id: 'leadinglady',
    name: 'Set Leading Lady',
    tagline: 'Timeless & Classic',
    color: 'Classic Red',
    image: '/KKIT/openlipstick_leadinglady_onhand.jpg',
    packageImage: '/KKIT/inside_package_leadinglady.jpg',
    price: 24,
    gradient: 'from-red-600 to-rose-700',
    features: ['Lip Liner', 'Lip Gloss', 'Premium Box'],
  },
];

export default function QuickBuy({ onBuyNow }: QuickBuyProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-950 via-pink-950/10 to-gray-950">
      {/* Background */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-3xl"
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
            <ShoppingBag className="w-5 h-5 text-pink-500" />
            <span className="text-sm text-gray-300 font-medium">Quick Buy</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Choose Your <span className="gradient-text-animated">Perfect Set</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each kit includes precision liner + lustrous gloss. Just €24 per set!
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {quickProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="relative glass-strong rounded-3xl overflow-hidden border-2 border-pink-500/20 hover:border-pink-500/50 transition-all duration-500">
                {/* Background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative p-8">
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${product.gradient} mb-6`}>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">{product.tagline}</span>
                  </div>

                  {/* Product Info */}
                  <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-lg text-pink-300 mb-6">{product.color}</p>

                  {/* Images */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative aspect-square rounded-2xl overflow-hidden"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative aspect-square rounded-2xl overflow-hidden"
                    >
                      <img src={product.packageImage} alt={`${product.name} package`} className="w-full h-full object-cover" />
                    </motion.div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {product.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${product.gradient} flex items-center justify-center`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-4xl font-bold text-white">€{product.price}</div>
                      <div className="text-sm text-gray-400">Complete Kit</div>
                    </div>
                    <motion.button
                      onClick={() => onBuyNow(product.id)}
                      className={`px-8 py-4 rounded-full bg-gradient-to-r ${product.gradient} text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Buy Now
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Floating hearts on hover */}
              <motion.div
                className="absolute -top-2 -right-2 pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ 
                    y: [-5, -15, -5],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className={`w-8 h-8 text-pink-500 fill-pink-500`} />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bundle Offer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass-strong rounded-3xl p-12 text-center border-2 border-pink-500/30 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-fuchsia-500/10"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-pink mb-6"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">BEST DEAL</span>
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text-animated">Both Sets Bundle</span>
              </h3>
              <p className="text-2xl text-gray-300 mb-8">
                Get Set Gorgeous + Set Leading Lady
              </p>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-3xl text-gray-500 line-through">€58</div>
                <div className="text-6xl font-bold gradient-text-animated">€45</div>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/20 text-green-400 font-bold mb-8">
                <Check className="w-5 h-5" />
                Save €13 Instantly!
              </div>

              <motion.button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-6 rounded-full gradient-pink text-white font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all"
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  Get Bundle Deal
                  <Sparkles className="w-6 h-6" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
