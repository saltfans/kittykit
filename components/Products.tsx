'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, Star, TrendingUp, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

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
    name: 'Single Lipstick Kit',
    quantity: 1,
    originalPrice: 25,
    price: 19,
    discount: 6,
    popular: false,
  },
  {
    id: 'duo',
    name: 'Duo Pack',
    quantity: 2,
    description: 'Both colors',
    originalPrice: 50,
    price: 35,
    discount: 15,
    popular: true,
    badge: 'Best Value',
  },
  {
    id: 'quad',
    name: 'Quad Pack',
    quantity: 4,
    description: '2 of each color',
    originalPrice: 100,
    price: 60,
    discount: 40,
    popular: false,
    badge: 'Save 40%',
  },
];

interface ProductCardProps {
  product: typeof products[0];
  index: number;
  selectedColor: string | null;
  onSelect: (id: string) => void;
}

function ProductCard({ product, index, selectedColor, onSelect }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isSelected = selectedColor === product.id;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, type: 'spring' }}
      onClick={() => onSelect(product.id)}
      className="relative group cursor-pointer"
    >
      {/* Outer glow for selected */}
      {isSelected && (
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
        isSelected 
          ? 'ring-2 ring-pink-400/50 shadow-2xl shadow-pink-500/30' 
          : 'hover:shadow-xl hover:shadow-pink-500/10'
      }`}>
        
        {/* Sophisticated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95">
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
        {isSelected && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 bg-gradient-to-r ${product.gradient} rounded-full`}
                initial={{ 
                  x: `${(i * 12.5)}%`, 
                  y: '100%',
                  opacity: 0 
                }}
                animate={{ 
                  y: '-20%',
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        )}

        {/* Checkmark badge with glow */}
        {isSelected && (
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
        {isSelected && (
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
                scale: isSelected ? [1, 1.2, 1] : 1,
                opacity: isSelected ? [0.2, 0.4, 0.2] : 0.2,
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
                filter: isSelected 
                  ? [
                      'drop-shadow(0 20px 60px rgba(0,0,0,0.7))',
                      'drop-shadow(0 25px 70px rgba(236, 72, 153, 0.4))',
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
                textShadow: isSelected 
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
          isSelected ? 'ring-pink-400/30' : 'ring-white/10'
        }`} />
      </div>
    </motion.div>
  );
}

export default function Products({ onCheckout }: { onCheckout: (bundle: any, color?: string) => void }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [hoveredBundle, setHoveredBundle] = useState<string | null>(null);

  return (
    <section id="products" className="relative py-32 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
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
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-sm text-gray-300 font-medium">Premium Collection</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Choose Your <span className="gradient-text-animated">Shade</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Premium formula that lasts up to <span className="text-pink-400 font-semibold">12 hours</span>.
            <br className="hidden md:block" />
            Cruelty-free and made in Europe with love.
          </p>
        </motion.div>

        {/* Products Grid with 3D Cards */}
        <div className="grid md:grid-cols-2 gap-16 mb-28 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          ))}
        </div>

        {/* Enhanced Pricing Plans */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: bundle.popular ? 1.05 : 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: bundle.popular ? 1.08 : 1.03,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredBundle(bundle.id)}
              onHoverEnd={() => setHoveredBundle(null)}
              className={`relative rounded-3xl p-8 transition-all duration-500 ${
                bundle.popular
                  ? 'glass-strong ring-2 ring-pink-500 shadow-2xl shadow-pink-500/20'
                  : 'glass hover:glass-strong hover:ring-2 hover:ring-pink-500/50'
              }`}
            >
              {/* Animated gradient background for popular */}
              {bundle.popular && (
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/10"
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}

              {bundle.badge && (
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 gradient-pink-glow rounded-full text-sm font-bold text-white shadow-lg"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {bundle.badge}
                </motion.div>
              )}

              <div className="relative text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
                {bundle.description && (
                  <p className="text-gray-300 text-sm">{bundle.description}</p>
                )}
              </div>

              <div className="relative mb-8 text-center">
                <motion.div 
                  className="flex items-baseline justify-center gap-2 mb-3"
                  animate={hoveredBundle === bundle.id ? { scale: 1.05 } : { scale: 1 }}
                >
                  <span className="text-6xl font-bold bg-gradient-to-br from-white to-pink-200 bg-clip-text text-transparent">
                    €{bundle.price}
                  </span>
                  {bundle.quantity > 1 && <span className="text-gray-400 text-lg">total</span>}
                </motion.div>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-gray-500 line-through text-lg">€{bundle.originalPrice}</span>
                  <motion.span 
                    className="text-pink-400 font-bold text-lg px-3 py-1 rounded-full bg-pink-500/10"
                    animate={hoveredBundle === bundle.id ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Save €{bundle.discount}
                  </motion.span>
                </div>
                {bundle.quantity > 0 && (
                  <div className="text-sm text-gray-400 mt-2">
                    €{(bundle.price / bundle.quantity).toFixed(2)} per lipstick
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8 relative">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-pink-500" />
                  </div>
                  <span>{bundle.quantity} Premium Lipstick{bundle.quantity > 1 ? 's' : ''}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-pink-500" />
                  </div>
                  <span>{bundle.quantity} Premium Lipliner{bundle.quantity > 1 ? 's' : ''}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-pink-500" />
                  </div>
                  <span>12-hour lasting formula</span>
                </li>
                {bundle.quantity > 1 && (
                  <li className="flex items-center gap-3 text-pink-300 font-medium">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/30 flex items-center justify-center">
                      <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                    </div>
                    <span>€{bundle.discount} instant savings!</span>
                  </li>
                )}
              </ul>

              <motion.button
                onClick={() => onCheckout(bundle, bundle.id === 'single' ? selectedColor ?? undefined : undefined)}
                disabled={bundle.id === 'single' && !selectedColor}
                className={`relative w-full py-5 rounded-full font-bold text-lg transition-all duration-500 overflow-hidden ${
                  bundle.popular
                    ? 'gradient-pink text-white'
                    : 'glass-strong text-white'
                } ${
                  bundle.id === 'single' && !selectedColor ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={bundle.id === 'single' && !selectedColor ? {} : { scale: 1.05 }}
                whileTap={bundle.id === 'single' && !selectedColor ? {} : { scale: 0.98 }}
              >
                {/* Shimmer effect on hover */}
                {hoveredBundle === bundle.id && !(bundle.id === 'single' && !selectedColor) && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  />
                )}
                <span className="relative z-10">
                  {bundle.id === 'single' && !selectedColor ? 'Select a color first' : 'Add to Cart'}
                </span>
              </motion.button>

              {hoveredBundle === bundle.id && bundle.discount >= 40 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  className="absolute -top-3 -right-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full p-3 shadow-lg"
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 grid grid-cols-2 md:grid-cols-3 gap-6 text-center"
        >
          {[
            { icon: '✨', text: 'Cruelty-Free', gradient: 'from-pink-500/10 to-purple-500/10' },
            { icon: '🇪🇺', text: 'Made in Europe', gradient: 'from-blue-500/10 to-pink-500/10' },
            { icon: '💝', text: 'Premium Quality', gradient: 'from-pink-500/10 to-red-500/10' },
          ].map((badge, i) => (
            <motion.div 
              key={i} 
              className="relative glass-strong rounded-3xl p-8 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-100`}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="relative text-6xl mb-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {badge.icon}
              </motion.div>
              <div className="relative text-gray-200 font-semibold text-lg">{badge.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
