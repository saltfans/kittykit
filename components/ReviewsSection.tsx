'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, Check, Filter, Image as ImageIcon, Camera, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: 5 | 4 | 3 | 2 | 1;
  date: string;
  verified: boolean;
  product: 'gorgeous' | 'leadinglady' | 'both';
  productName: string;
  title: string;
  review: string;
  images?: string[];
  helpful: number;
  userHelpful?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    user: 'Emma Wilson',
    avatar: 'EW',
    rating: 5,
    date: '2 days ago',
    verified: true,
    product: 'gorgeous',
    productName: 'Set Gorgeous',
    title: 'Absolutely Stunning!',
    review: 'This fuchsia shade is absolutely gorgeous! The formula is long-lasting and the gloss gives the perfect shine. I\'ve received so many compliments. The liner makes application super easy and precise.',
    images: ['/KKIT/openlipstick_gorgeous_onhand.jpg', '/KKIT/inside_package_gorgeous.jpg'],
    helpful: 24,
    userHelpful: false,
  },
  {
    id: 2,
    user: 'Sofia Martinez',
    avatar: 'SM',
    rating: 5,
    date: '5 days ago',
    verified: true,
    product: 'leadinglady',
    productName: 'Set Leading Lady',
    title: 'Perfect Classic Red',
    review: 'I\'ve been searching for the perfect red lip kit and this is it! The color is timeless, the formula stays put all day, and it doesn\'t dry out my lips. Worth every penny!',
    images: ['/KKIT/openlipstick_leadinglady_onhand.jpg', '/KKIT/lipstick_leadinglady_onhand.jpg'],
    helpful: 31,
    userHelpful: false,
  },
  {
    id: 3,
    user: 'Isabella Rodriguez',
    avatar: 'IR',
    rating: 5,
    date: '1 week ago',
    verified: true,
    product: 'both',
    productName: 'Duo Pack',
    title: 'Best Investment Ever!',
    review: 'Got both sets and I\'m obsessed! Perfect for any occasion - fuchsia for nights out and red for professional settings. The quality is incredible and the packaging is so luxurious.',
    images: ['/KKIT/beautysetup.jpg', '/KKIT/inside_packages.jpg', '/KKIT/inside_packages2.jpg'],
    helpful: 45,
    userHelpful: false,
  },
  {
    id: 4,
    user: 'Olivia Kim',
    avatar: 'OK',
    rating: 5,
    date: '1 week ago',
    verified: true,
    product: 'gorgeous',
    productName: 'Set Gorgeous',
    title: 'Love the Formula!',
    review: 'The formula is amazing - not sticky at all and lasts through meals and drinks. The fuchsia color is so vibrant and beautiful. Highly recommend!',
    helpful: 18,
    userHelpful: false,
  },
  {
    id: 5,
    user: 'Mia Johnson',
    avatar: 'MJ',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    product: 'leadinglady',
    productName: 'Set Leading Lady',
    title: 'Elegant & Long-lasting',
    review: 'This red is so elegant! I wore it to a wedding and it looked perfect in all the photos. Didn\'t need to reapply once. The liner helps create such a clean line.',
    images: ['/KKIT/leadinglady_lipliner_close.jpg'],
    helpful: 27,
    userHelpful: false,
  },
  {
    id: 6,
    user: 'Ava Thompson',
    avatar: 'AT',
    rating: 4,
    date: '2 weeks ago',
    verified: true,
    product: 'gorgeous',
    productName: 'Set Gorgeous',
    title: 'Great Product!',
    review: 'Really love this kit! The color is beautiful and the quality is top-notch. Only giving 4 stars because I wish there was a darker shade option too.',
    helpful: 12,
    userHelpful: false,
  },
];

export default function ReviewsSection() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'photos' | '5star' | 'verified'>('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [helpfulClicks, setHelpfulClicks] = useState<{ [key: number]: boolean }>({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filters = [
    { id: 'all', label: 'All Reviews', count: reviews.length },
    { id: 'photos', label: 'With Photos', count: reviews.filter(r => r.images && r.images.length > 0).length },
    { id: '5star', label: '5 Stars', count: reviews.filter(r => r.rating === 5).length },
    { id: 'verified', label: 'Verified', count: reviews.filter(r => r.verified).length },
  ];

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'photos') return review.images && review.images.length > 0;
    if (selectedFilter === '5star') return review.rating === 5;
    if (selectedFilter === 'verified') return review.verified;
    if (selectedRating !== null) return review.rating === selectedRating;
    return true;
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100,
  }));

  const handleHelpfulClick = (reviewId: number) => {
    setHelpfulClicks(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950">
      {/* Background */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-300 font-medium">Customer Reviews</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Loved by <span className="gradient-text-animated">Thousands</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. See what our customers have to say!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Rating Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-7xl font-bold gradient-text-animated mb-2"
              >
                {averageRating}
              </motion.div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-400">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {ratingDistribution.map((dist) => (
                <motion.button
                  key={dist.rating}
                  onClick={() => setSelectedRating(selectedRating === dist.rating ? null : dist.rating)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    selectedRating === dist.rating ? 'bg-pink-500/20' : 'hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-white font-medium">{dist.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dist.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                    />
                  </div>
                  <span className="text-gray-400 text-sm w-8">{dist.count}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right: Filters & Reviews */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id as any)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    selectedFilter === filter.id
                      ? 'gradient-pink text-white shadow-lg shadow-pink-500/30'
                      : 'glass-strong text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.label} ({filter.count})
                </motion.button>
              ))}
            </motion.div>

            {/* Reviews List */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {displayedReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-strong rounded-2xl p-6 hover:bg-white/5 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full gradient-pink flex items-center justify-center text-white font-bold">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-bold">{review.user}</h4>
                            {review.verified && (
                              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product Badge */}
                    <div className="mb-3">
                      <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm font-medium">
                        {review.productName}
                      </span>
                    </div>

                    {/* Content */}
                    <h5 className="text-white font-bold text-lg mb-2">{review.title}</h5>
                    <p className="text-gray-300 mb-4 leading-relaxed">{review.review}</p>

                    {/* Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                        {review.images.map((img, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer"
                          >
                            <img
                              src={img}
                              alt={`Review photo ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Helpful */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <motion.button
                        onClick={() => handleHelpfulClick(review.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                          helpfulClicks[review.id]
                            ? 'bg-pink-500/20 text-pink-400'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Helpful ({review.helpful + (helpfulClicks[review.id] ? 1 : 0)})
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show More Button */}
            {filteredReviews.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <motion.button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="px-8 py-4 rounded-full glass-strong hover:bg-white/10 text-white font-bold transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    {showAllReviews ? 'Show Less' : `Show All ${filteredReviews.length} Reviews`}
                    <motion.div
                      animate={{ rotate: showAllReviews ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
