'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Orders are typically processed within 1-2 business days and delivered within 5-7 business days depending on your location.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, you can return unused products for a full refund within 30 days of delivery.',
  },
  {
    question: 'Are your products cruelty-free?',
    answer: 'Yes! All Kitty KIT products are 100% cruelty-free and never tested on animals. We\'re committed to ethical beauty practices.',
  },
  {
    question: 'How long does the lipstick last?',
    answer: 'Our premium formula is designed to last up to 12 hours with minimal fading. The long-lasting, comfortable wear means fewer touch-ups throughout your day.',
  },
  {
    question: 'Can I buy just one color?',
    answer: 'Absolutely! You can purchase a single lipstick in your preferred color (Pink or Red) for €19, or save more by choosing our bundle deals.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment gateway. Your payment information is always encrypted and protected.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto max-w-3xl relative z-10">
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
            <span className="text-sm text-gray-300 font-medium">Got Questions?</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Frequently Asked <span className="gradient-text-animated">Questions</span>
          </h2>
          <p className="text-gray-400 text-xl">
            Everything you need to know about Kitty KIT
          </p>
        </motion.div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass-strong rounded-2xl p-6 text-left transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/10"
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-bold text-white text-lg pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="flex-shrink-0"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-pink-500 shadow-lg shadow-pink-500/50' 
                        : 'bg-pink-500/20'
                    }`}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${
                        openIndex === index ? 'text-white' : 'text-pink-400'
                      }`} />
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                    marginTop: openIndex === index ? 16 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="text-gray-300 leading-relaxed text-base border-t border-pink-500/20 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6 text-lg">Still have questions?</p>
          <motion.a
            href="mailto:hello@kittykit.hot"
            className="inline-flex items-center gap-2 px-8 py-4 gradient-pink-glow rounded-full text-white font-bold text-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
