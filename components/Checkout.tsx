'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, MapPin, Mail, User as UserIcon, Phone, Building2, AlertCircle, CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';
import { User } from './Auth';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: any;
  selectedColor?: string;
  user: User | null;
  onCheckoutComplete?: (email: string, total: number) => void;
}

const AVAILABLE_COUNTRIES = [
  { code: '🇳🇱', name: 'Netherlands', flag: '🇳🇱', shippingCost: 7.99 },
  { code: '🇧🇪', name: 'Belgium', flag: '🇧🇪', shippingCost: 8.99 },
  { code: '🇪🇪', name: 'Estonia', flag: '🇪🇪', shippingCost: 6.99 },
  { code: '🇱🇻', name: 'Latvia', flag: '🇱🇻', shippingCost: 5.49 },
  { code: '🇱🇹', name: 'Lithuania', flag: '🇱🇹', shippingCost: 6.99 },
];

const TIER_DISCOUNTS = {
  bronze: 0,
  silver: 5,
  gold: 10,
  platinum: 15,
};

export default function Checkout({ isOpen, onClose, bundle, selectedColor, user, onCheckoutComplete }: CheckoutProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '🇱🇻',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const userDiscount = user ? TIER_DISCOUNTS[user.discountTier] : 0;
  const bundleDiscount = bundle.originalPrice - bundle.price;
  const selectedCountry = AVAILABLE_COUNTRIES.find(c => c.code === formData.country);
  const shippingCost = selectedCountry?.shippingCost || 0;
  const subtotal = bundle.price - (bundle.price * userDiscount / 100);
  const finalPrice = subtotal + shippingCost;
  const pointsToEarn = Math.floor(finalPrice * 10); // 10 points per €

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      
      // Trigger success modal
      if (onCheckoutComplete) {
        onCheckoutComplete(formData.email, finalPrice);
      }
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={orderSuccess ? undefined : onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-8 border border-pink-500/20"
          >
            {!orderSuccess && (
              <>
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-pink-500/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Secure Checkout</h2>
                  <p className="text-gray-400">Complete your order safely</p>
                </div>

                {/* Country Restriction Notice */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-300 mb-1">Shipping Restriction</p>
                      <p className="text-xs text-blue-200/80">
                        Currently we deliver only to: Netherlands, Belgium, Estonia, Latvia and Lithuania 🌍
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* User Benefits */}
                {user && userDiscount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-2xl gradient-pink-glow"
                  >
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-white" />
                      <div>
                        <p className="text-sm font-bold text-white">
                          {user.discountTier.charAt(0).toUpperCase() + user.discountTier.slice(1)} Member Discount!
                        </p>
                        <p className="text-xs text-white/90">You save an extra {userDiscount}% on this order 🎉</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Order Summary */}
                <div className="mb-8 p-6 rounded-2xl glass border border-pink-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Bundle ({bundle.shades} Shades)</span>
                      <span>€{bundle.price.toFixed(2)}</span>
                    </div>
                    {selectedColor && (
                      <div className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                        Color: {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                      </div>
                    )}
                    <div className="flex justify-between text-pink-400 font-semibold">
                      <span>Bundle Discount</span>
                      <span>-€{bundleDiscount.toFixed(2)}</span>
                    </div>
                    {user && userDiscount > 0 && (
                      <div className="flex justify-between text-pink-400 font-semibold">
                        <span>Member Discount ({userDiscount}%)</span>
                        <span>-€{(bundle.price * userDiscount / 100).toFixed(2)}</span>
                      </div>
                    )}
                    
                    {/* Shipping Cost */}
                    {selectedCountry && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-3 border-t border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <motion.span 
                              className="text-2xl"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5 }}
                            >
                              {selectedCountry.flag}
                            </motion.span>
                            <span className="text-gray-300">Shipping to {selectedCountry.name}</span>
                          </div>
                          <span className="text-white font-semibold">€{shippingCost.toFixed(2)}</span>
                        </div>
                        {shippingCost === 5.49 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-xs text-green-400 flex items-center gap-1 mt-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                            Lowest shipping price! 🎉
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    <div className="border-t border-white/10 pt-3 mt-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Subtotal</span>
                        <span>€{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-2xl">
                        <span>Total</span>
                        <span className="gradient-text-animated">€{finalPrice.toFixed(2)}</span>
                      </div>
                      {user && (
                        <p className="text-sm text-pink-400 text-right mt-2">
                          +{pointsToEarn} loyalty points
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Shipping Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Country * (Shipping destination)
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white appearance-none cursor-pointer"
                            required
                          >
                            {AVAILABLE_COUNTRIES.map((country) => (
                              <option key={country.code} value={country.code} className="bg-gray-900">
                                {country.flag} {country.name} - €{country.shippingCost.toFixed(2)}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Shipping Costs Comparison */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-4 rounded-xl glass-strong border border-pink-500/20"
                        >
                          <p className="text-xs text-gray-400 mb-3 flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            >
                              🚚
                            </motion.span>
                            Shipping Prices by Country
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {AVAILABLE_COUNTRIES.sort((a, b) => a.shippingCost - b.shippingCost).map((country) => (
                              <motion.div
                                key={country.code}
                                whileHover={{ scale: 1.02 }}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                                  country.code === formData.country
                                    ? 'bg-pink-500/20 border border-pink-500/50'
                                    : 'bg-gray-800/50 border border-gray-700/50'
                                }`}
                              >
                                <span className="text-sm flex items-center gap-1.5">
                                  <span className="text-base">{country.flag}</span>
                                  <span className={country.code === formData.country ? 'text-white font-semibold' : 'text-gray-400'}>
                                    {country.name}
                                  </span>
                                </span>
                                <span className={`text-sm font-bold ${
                                  country.shippingCost === 5.49 
                                    ? 'text-green-400' 
                                    : country.code === formData.country 
                                    ? 'text-pink-400' 
                                    : 'text-gray-400'
                                }`}>
                                  €{country.shippingCost.toFixed(2)}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Street Address *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
                            placeholder="Street name and number"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-5 rounded-full gradient-pink-glow text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Lock className="w-5 h-5" />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Proceed to Secure Payment
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Your payment information is encrypted and secure
                  </p>
                </form>
              </>
            )}

            {/* Success Message */}
            {orderSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-pink-glow mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-3">Order Confirmed! 🎉</h3>
                <p className="text-gray-400 mb-6">
                  Thank you for your purchase!<br />
                  Check your email for order details.
                </p>
                {user && (
                  <div className="inline-block px-6 py-3 rounded-full glass-strong border border-pink-500/30">
                    <p className="text-pink-400 font-semibold">
                      +{pointsToEarn} loyalty points earned! ⭐
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
