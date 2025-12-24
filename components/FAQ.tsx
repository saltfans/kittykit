'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'We offer free shipping across Europe. Orders are typically processed within 1-2 business days and delivered within 5-7 business days depending on your location.',
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
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about Kitty KIT
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass rounded-2xl p-6 text-left transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-semibold text-white text-lg">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:hello@kittykit.hot"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-colors text-pink-500 font-semibold"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
