'use client';

import { motion } from 'framer-motion';
import { Heart, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-3xl font-bold gradient-text mb-4">Kitty KIT</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Premium luxury lipsticks crafted for bold, confident women. 
              Made with love in Europe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-full glass hover:bg-pink-500/20 transition-colors">
                <Instagram className="w-5 h-5 text-pink-500" />
              </a>
              <a href="mailto:hello@kittykit.hot" className="p-3 rounded-full glass hover:bg-pink-500/20 transition-colors">
                <Mail className="w-5 h-5 text-pink-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#products" className="hover:text-pink-500 transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">Bundles</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">Return Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Kitty KIT. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>in Europe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
