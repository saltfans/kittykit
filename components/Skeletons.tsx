'use client';

import { motion } from 'framer-motion';

export function ProductSkeleton() {
  return (
    <div className="relative">
      <div className="aspect-[3/4] rounded-3xl glass-strong overflow-hidden">
        {/* Shimmer background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative h-full flex flex-col items-center justify-center p-12">
          {/* Image placeholder */}
          <div className="w-80 h-80 rounded-full bg-gray-700/50 mb-8" />

          {/* Text placeholders */}
          <div className="w-48 h-8 bg-gray-700/50 rounded-full mb-4" />
          <div className="w-32 h-6 bg-gray-700/50 rounded-full mb-2" />
          <div className="w-64 h-4 bg-gray-700/50 rounded-full mb-8" />

          {/* Button placeholder */}
          <div className="w-full max-w-xs h-14 bg-gray-700/50 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="aspect-square rounded-2xl glass-strong overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.1 }}
          />
        </div>
      ))}
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="glass-strong rounded-2xl p-8">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-800/30 via-gray-700/30 to-gray-800/30 rounded-2xl"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative space-y-4">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-gray-700/50" />
          ))}
        </div>

        {/* Text lines */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-700/50 rounded-full" />
          <div className="w-5/6 h-4 bg-gray-700/50 rounded-full" />
          <div className="w-4/6 h-4 bg-gray-700/50 rounded-full" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4">
          <div className="w-12 h-12 rounded-full bg-gray-700/50" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-700/50 rounded-full" />
            <div className="w-24 h-3 bg-gray-700/50 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BundleSkeleton() {
  return (
    <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-800/30 via-gray-700/30 to-gray-800/30"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative space-y-6">
        {/* Badge */}
        <div className="w-32 h-8 bg-gray-700/50 rounded-full" />

        {/* Title */}
        <div className="w-48 h-10 bg-gray-700/50 rounded-full" />

        {/* Description */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-700/50 rounded-full" />
          <div className="w-3/4 h-4 bg-gray-700/50 rounded-full" />
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <div className="w-24 h-12 bg-gray-700/50 rounded-full" />
          <div className="w-16 h-6 bg-gray-700/50 rounded-full" />
        </div>

        {/* Features */}
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-700/50" />
              <div className="flex-1 h-4 bg-gray-700/50 rounded-full" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="w-full h-16 bg-gray-700/50 rounded-2xl" />
      </div>
    </div>
  );
}
