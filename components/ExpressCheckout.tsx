'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Zap, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ExpressCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  onComplete: (method: string) => void;
}

export default function ExpressCheckout({ isOpen, onClose, product, onComplete }: ExpressCheckoutProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const expressMethods = [
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Pay with Touch ID or Face ID',
      color: 'from-gray-800 to-black',
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: Smartphone,
      description: 'Pay with your Google account',
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 'card',
      name: 'Saved Card',
      icon: CreditCard,
      description: 'Visa ending in 4242',
      color: 'from-purple-600 to-pink-600',
    },
  ];

  const handleExpressCheckout = async (methodId: string) => {
    setSelectedMethod(methodId);
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setProcessing(false);
    onComplete(methodId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
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
            className="relative w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-300" />
            </motion.button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-600"
              >
                <Zap className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm">Express Checkout</span>
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Complete in Seconds</h2>
              <p className="text-gray-400">Skip the form, pay instantly</p>
            </div>

            {/* Product Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{product.name}</h3>
                  <p className="text-2xl font-bold gradient-text-animated">€{product.price}</p>
                </div>
              </div>
            </motion.div>

            {/* Express Methods */}
            <div className="space-y-3 mb-6">
              {expressMethods.map((method, index) => (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => handleExpressCheckout(method.id)}
                  disabled={processing}
                  className={`w-full p-4 rounded-2xl bg-gradient-to-r ${method.color} text-white font-bold text-left transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group`}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />

                  <div className="relative flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/10">
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{method.name}</div>
                      <div className="text-sm opacity-80">{method.description}</div>
                    </div>
                    {selectedMethod === method.id && processing && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    )}
                    {selectedMethod === method.id && !processing && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-gray-400"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Secure & Encrypted Payment</span>
              </div>
              <p className="text-xs">Your payment information is protected</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
