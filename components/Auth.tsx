'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, LogIn, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  totalPurchases: number;
  discountTier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export default function Auth({ isOpen, onClose, onAuthSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      const user: User = {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: `https://ui-avatars.com/api/?name=Demo+User&background=ec4899&color=fff`,
        points: 0,
        totalPurchases: 0,
        discountTier: 'bronze',
      };
      onAuthSuccess(user);
      setLoading(false);
      onClose();
    }, 1500);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate email/password auth
    setTimeout(() => {
      const user: User = {
        id: 'email_' + Math.random().toString(36).substr(2, 9),
        name: name || email.split('@')[0],
        email,
        points: 0,
        totalPurchases: 0,
        discountTier: 'bronze',
      };
      onAuthSuccess(user);
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md"
            >
              <div className="glass-strong rounded-3xl p-8 border border-pink-500/20 shadow-2xl">
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-pink-500/20 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>

                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-pink-glow mb-4"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isLogin ? 'Welcome Back!' : 'Join Kitty KIT'}
                  </h2>
                  <p className="text-gray-400">
                    {isLogin ? 'Log in to access exclusive benefits' : 'Create account and earn rewards'}
                  </p>
                </div>

                {/* Google Login */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full mb-6 py-4 px-6 rounded-full bg-white text-gray-900 font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {loading ? 'Connecting...' : 'Continue with Google'}
                </motion.button>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900/50 text-gray-400">Or continue with email</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-full glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                          placeholder="Your name"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full glass-strong border border-gray-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full gradient-pink-glow text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <LogIn className="w-5 h-5" />
                    {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Create Account')}
                  </motion.button>
                </form>

                {/* Toggle */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <span className="text-pink-400 font-semibold">
                      {isLogin ? 'Sign up' : 'Log in'}
                    </span>
                  </button>
                </div>

                {/* Benefits */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <p className="text-xs text-gray-500 text-center mb-3">Member Benefits:</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {['Earn Points', 'Exclusive Deals', 'Free Shipping'].map((benefit, i) => (
                      <div key={i} className="text-xs text-gray-400">
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
