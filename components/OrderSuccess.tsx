'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderSuccessProps {
  orderNumber: string;
  email: string;
  total: number;
  onClose: () => void;
}

export default function OrderSuccess({ orderNumber, email, total, onClose }: OrderSuccessProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Create confetti particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  const steps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been successfully received',
      status: 'completed',
    },
    {
      icon: Package,
      title: 'Packaging',
      description: 'We are carefully packaging your products',
      status: 'pending',
    },
    {
      icon: Truck,
      title: 'Delivery',
      description: 'Delivery within 2-4 business days',
      status: 'pending',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-hidden">
      {/* Confetti Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, y: '-10%', x: `${particle.x}%` }}
          animate={{
            opacity: [1, 1, 0],
            y: '100vh',
            rotate: [0, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: 'easeInOut',
            delay: Math.random() * 0.5,
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: ['#ec4899', '#f472b6', '#fbcfe8'][particle.id % 3],
            left: `${particle.x}%`,
          }}
        />
      ))}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-2xl w-full glass-strong rounded-3xl border border-pink-500/30 p-8 md:p-12 relative overflow-hidden z-10"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 left-0 w-96 h-96 gradient-pink rounded-full blur-3xl"
        />

        <div className="relative z-10">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-24 h-24 gradient-pink rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 gradient-pink rounded-full blur-xl"
              />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              🎉 <span className="gradient-text-animated">Thank You for Your Order!</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Your order has been successfully placed
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-6 glass rounded-2xl border border-pink-500/20"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Order Number</p>
                <p className="text-white font-mono font-semibold text-lg">#{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Kopā</p>
                <p className="text-white font-bold text-lg">€{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-1">E-pasta apstiprinājums nosūtīts uz:</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-400" />
                <p className="text-white font-medium">{email}</p>
              </div>
            </div>
          </motion.div>

          {/* Order Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 space-y-4"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  step.status === 'completed'
                    ? 'bg-pink-500/10 border border-pink-500/30'
                    : 'glass border border-white/10'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    step.status === 'completed'
                      ? 'gradient-pink'
                      : 'bg-white/5'
                  }`}
                >
                  <step.icon
                    className={`w-6 h-6 ${
                      step.status === 'completed' ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-white font-semibold">{step.title}</h4>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                {step.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
          >
            <p className="text-blue-300 text-sm text-center">
              💌 Check your email to receive order details and tracking number!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-6 py-4 gradient-pink-glow rounded-xl text-white font-semibold shadow-xl"
            >
              <Home className="w-5 h-5" />
              Return to Homepage
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert('Track order feature')}
              className="flex items-center justify-center gap-2 px-6 py-4 glass border border-pink-500/30 rounded-xl text-white font-semibold hover:border-pink-500/50 transition-all"
            >
              Track Order
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Social Share */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-400 mb-3">
              Share with your friends! 💝
            </p>
            <div className="flex justify-center gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map((platform) => (
                <motion.button
                  key={platform}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center border border-white/10 hover:border-pink-500/30 transition-all"
                  onClick={() => alert(`Share on ${platform}`)}
                >
                  <span className="text-xs">📱</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
