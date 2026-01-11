'use client';

import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';

const instagramPosts = [
  {
    id: 1,
    image: '/KKIT/openlipstick_gorgeous_onhand.jpg',
    user: '@emma.beauty',
    likes: 1243,
    comments: 89,
    caption: 'Obsessed with my new Set Gorgeous! 💕 #KittyKIT',
  },
  {
    id: 2,
    image: '/KKIT/openlipstick_leadinglady_onhand.jpg',
    user: '@sofia.glam',
    likes: 987,
    comments: 64,
    caption: 'Red lips never go out of style 💋 #KittyKIT #LeadingLady',
  },
  {
    id: 3,
    image: '/KKIT/beautysetup.jpg',
    user: '@isabella.mua',
    likes: 2156,
    comments: 142,
    caption: 'My entire collection! Can\'t pick a favorite 😍 #KittyKIT',
  },
  {
    id: 4,
    image: '/KKIT/inside_package_gorgeous.jpg',
    user: '@olivia.style',
    likes: 876,
    comments: 53,
    caption: 'Unboxing day! The packaging is so luxe ✨ #KittyKIT',
  },
  {
    id: 5,
    image: '/KKIT/lipstick_leadinglady_onhand.jpg',
    user: '@mia.looks',
    likes: 1432,
    comments: 97,
    caption: 'Perfect for date night 💄 #KittyKIT #SetLeadingLady',
  },
  {
    id: 6,
    image: '/KKIT/inside_packages.jpg',
    user: '@ava.beauty',
    likes: 1687,
    comments: 118,
    caption: 'Both shades are incredible! 💖 #KittyKIT #DuoPack',
  },
];

export default function InstagramFeed() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-950 via-pink-950/5 to-gray-950">
      {/* Background */}
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
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
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full glass-strong border border-pink-500/30"
          >
            <Instagram className="w-5 h-5 text-pink-500" />
            <span className="text-sm text-gray-300 font-medium">Follow Us</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Join the <span className="gradient-text-animated">#KittyKIT</span> Community
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Share your looks and get featured! Tag us @KittyKIT for a chance to be featured.
          </p>

          <motion.a
            href="https://instagram.com/kittykitbeauty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-pink-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-6 h-6" />
            Follow @KittyKIT
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Hover Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white"
              >
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 fill-white" />
                    <span className="font-bold" suppressHydrationWarning>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-bold" suppressHydrationWarning>{post.comments}</span>
                  </div>
                </div>
                <p className="text-sm text-center line-clamp-2">{post.caption}</p>
              </motion.div>

              {/* User Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-strong backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">{post.user}</span>
              </div>

              {/* Instagram Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: hoveredPost === post.id ? 1 : 0 }}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Instagram className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 text-lg mb-6">
            Want to be featured? Share your <span className="text-pink-400 font-bold">#KittyKIT</span> moments!
          </p>
          <motion.button
            onClick={() => window.open('https://instagram.com/kittykitbeauty', '_blank')}
            className="px-10 py-5 rounded-full glass-strong hover:bg-white/10 text-white font-bold transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-pink-400" />
              Share Your Look
              <Sparkles className="w-5 h-5 text-pink-400" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
