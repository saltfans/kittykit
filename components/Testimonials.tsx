'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Johansone',
    location: 'Riga, Latvia',
    rating: 5,
    text: 'This is the best lip gloss I’ve ever tried! The color is perfect and lasts all day. Highly recommend!',
    image: 'https://i.pravatar.cc/150?img=1',
    tier: 'Platinum',
    purchases: 12,
  },
  {
    id: 2,
    name: 'Laura Kalnina',
    location: 'Vilnius, Lithuania',
    rating: 5,
    text: 'Excellent quality! The lips are soft, and the formula isn’t sticky. My favorite is the Mocha color.',
    image: 'https://i.pravatar.cc/150?img=5',
    tier: 'Gold',
    purchases: 8,
  },
  {
    id: 3,
    name: 'Kristīne Bērziņa',
    location: 'Tallinn, Estonia',
    rating: 5,
    text: 'Delivery was fast, and the packaging is beautiful! The product exceeded all expectations. 100% recommend!',
    image: 'https://i.pravatar.cc/150?img=9',
    tier: 'Silver',
    purchases: 5,
  },
  {
    id: 4,
    name: 'Sophie van Berg',
    location: 'Amsterdam, Netherlands',
    rating: 5,
    text: 'Amazing quality! The colors are beautiful and it stays on for hours. Will definitely order again!',
    image: 'https://i.pravatar.cc/150?img=10',
    tier: 'Gold',
    purchases: 7,
  },
  {
    id: 5,
    name: 'Marie Dubois',
    location: 'Brussels, Belgium',
    rating: 5,
    text: 'Je suis absolument ravie! La texture est parfaite et les couleurs sont magnifiques. Merci!',
    image: 'https://i.pravatar.cc/150?img=16',
    tier: 'Bronze',
    purchases: 3,
  },
  {
    id: 6,
    name: 'Anna Liepa',
    location: 'Jurmala, Latvia',
    rating: 5,
    text: 'Perfect gift set! All colors are beautiful and suitable for different occasions. Very satisfied!',
    image: 'https://i.pravatar.cc/150?img=24',
    tier: 'Platinum',
    purchases: 15,
  },
];

const stats = [
  { value: '5,000+', label: 'Happy Customers' },
  { value: '15,000+', label: 'Products Sold' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '98%', label: 'Repeat Purchases' },
];

export default function Testimonials() {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'from-purple-400 to-pink-400';
      case 'Gold':
        return 'from-yellow-400 to-orange-400';
      case 'Silver':
        return 'from-gray-300 to-gray-400';
      default:
        return 'from-amber-600 to-amber-700';
    }
  };

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 -left-48 w-96 h-96 gradient-pink rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 gradient-pink rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-block mb-4"
          >
            <div className="flex items-center gap-1 px-4 py-2 glass-strong rounded-full border border-pink-500/30">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-white font-semibold">4.9/5</span>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="gradient-text-animated">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust our quality
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 glass-strong rounded-2xl border border-pink-500/20 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text-animated mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div className="p-6 glass-strong rounded-2xl border border-pink-500/20 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-pink-500/30 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <div
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${getTierColor(
                          testimonial.tier
                        )} text-white`}
                      >
                        {testimonial.tier}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                    <p className="text-xs text-pink-400 mt-1">
                      {testimonial.purchases} purchases made
                    </p>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="absolute inset-0 gradient-pink rounded-2xl blur-2xl -z-10"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Become our next satisfied customer! 💕
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 gradient-pink-glow rounded-full text-white font-semibold text-lg shadow-xl"
          >
            View Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
