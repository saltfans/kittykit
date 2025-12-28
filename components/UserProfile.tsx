'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Gift, ShoppingBag, Star, TrendingUp, LogOut } from 'lucide-react';
import { User } from './Auth';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
}

const TIER_BENEFITS: Record<'bronze' | 'silver' | 'gold' | 'platinum', {
  name: string;
  color: string;
  discount: number;
  pointsNeeded: number;
  nextTier: 'silver' | 'gold' | 'platinum' | null;
}> = {
  bronze: {
    name: 'Bronze Member',
    color: 'from-orange-600 to-orange-400',
    discount: 0,
    pointsNeeded: 0,
    nextTier: 'silver',
  },
  silver: {
    name: 'Silver Member',
    color: 'from-gray-400 to-gray-300',
    discount: 5,
    pointsNeeded: 100,
    nextTier: 'gold',
  },
  gold: {
    name: 'Gold Member',
    color: 'from-yellow-600 to-yellow-400',
    discount: 10,
    pointsNeeded: 300,
    nextTier: 'platinum',
  },
  platinum: {
    name: 'Platinum Member',
    color: 'from-purple-600 to-pink-500',
    discount: 15,
    pointsNeeded: 500,
    nextTier: null,
  },
};

export default function UserProfile({ isOpen, onClose, user, onLogout }: UserProfileProps) {
  const tierInfo = TIER_BENEFITS[user.discountTier];
  const nextTierInfo = tierInfo.nextTier ? TIER_BENEFITS[tierInfo.nextTier] : null;
  const pointsToNextTier = nextTierInfo ? nextTierInfo.pointsNeeded - user.points : 0;
  const tierProgress = nextTierInfo 
    ? ((user.points - tierInfo.pointsNeeded) / (nextTierInfo.pointsNeeded - tierInfo.pointsNeeded)) * 100
    : 100;

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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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

                {/* Profile Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="relative inline-block mb-4"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full border-4 border-pink-500/50"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full gradient-pink-glow flex items-center justify-center text-3xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="absolute -bottom-2 -right-2 p-2 rounded-full gradient-pink-glow"
                    >
                      <Award className="w-5 h-5 text-white" />
                    </motion.div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>

                {/* Tier Status */}
                <div className="mb-8">
                  <div className="glass rounded-2xl p-6 border border-pink-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Current Status</p>
                        <h3 className={`text-2xl font-bold bg-gradient-to-r ${tierInfo.color} bg-clip-text text-transparent`}>
                          {tierInfo.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Your Discount</p>
                        <p className="text-3xl font-bold text-pink-500">{tierInfo.discount}%</p>
                      </div>
                    </div>

                    {nextTierInfo && (
                      <>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>{user.points} points</span>
                            <span>{nextTierInfo.pointsNeeded} points to {nextTierInfo.name}</span>
                          </div>
                          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(tierProgress, 100)}%` }}
                              className={`h-full bg-gradient-to-r ${nextTierInfo.color}`}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                          {pointsToNextTier} more points to unlock {nextTierInfo.discount}% discount!
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{user.points}</p>
                    <p className="text-xs text-gray-400">Points</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <ShoppingBag className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{user.totalPurchases}</p>
                    <p className="text-xs text-gray-400">Purchases</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{tierInfo.discount}%</p>
                    <p className="text-xs text-gray-400">Discount</p>
                  </motion.div>
                </div>

                {/* Rewards */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-pink-500" />
                    How to Earn Points
                  </h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Complete your first purchase', points: 50 },
                      { action: 'Every €10 spent', points: 10 },
                      { action: 'Leave a product review', points: 25 },
                      { action: 'Refer a friend', points: 100 },
                    ].map((reward, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-xl p-4 flex justify-between items-center"
                      >
                        <span className="text-gray-300">{reward.action}</span>
                        <span className="text-pink-500 font-bold">+{reward.points} pts</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tier Benefits */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Membership Tiers</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(TIER_BENEFITS).map(([key, tier]) => (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        className={`glass rounded-xl p-4 border ${
                          user.discountTier === key
                            ? 'border-pink-500 ring-2 ring-pink-500/50'
                            : 'border-gray-800'
                        }`}
                      >
                        <h4 className={`font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-1`}>
                          {tier.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">{tier.pointsNeeded}+ points</p>
                        <p className="text-lg font-bold text-pink-500">{tier.discount}% OFF</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLogout}
                  className="w-full py-4 rounded-full glass-strong border border-red-500/50 text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
