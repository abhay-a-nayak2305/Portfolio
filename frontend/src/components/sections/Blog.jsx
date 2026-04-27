import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { articleApi } from '../../utils/api';
import { formatDate, truncate } from '../../utils/helpers';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await articleApi.getAll({ limit: 6, featured: 'true' });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="blog" className="py-20 md:py-32 bg-gray-50
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title gradient-text mb-4">Latest Articles</h2>
          <p className="section-subtitle">
            Thoughts on web development, technology, and best practices
          </p>
        </motion.div>

        {/* Articles Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : articles.length === 0 ? (
          <EmptyState
            icon={<Tag className="w-12 h-12" />}
            title="No articles yet"
            description="Check back later for tech deep-dives and tutorials"
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, index) => (
              <motion.article
                key={article._id}
                variants={itemVariants}
                className="card-interactive group"
              >
                {article.coverImage && (
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {article.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-white
                                      text-xs font-bold rounded-full">
                        â­ FEATURED
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary-100 -primary-900/30 text-primary-700
                                   -primary-300 text-xs font-medium rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 -gray-400">
                      {article.readingTime} min read
                    </span>
                  </div>

                  <Link to={`/blog/${article.slug}`}>
                    <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary-600
                                 -hover:text-primary-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 -gray-400 text-sm mb-4 line-clamp-3">
                    {truncate(article.excerpt, 120)}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500 -gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.publishedAt || article.createdAt)}
                    </div>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-primary-600 -primary-400
                               font-medium group-hover:gap-2 transition-all"
                    >
                      Read <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Articles <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;


