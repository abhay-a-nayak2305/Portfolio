import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Tag, Search, ArrowRight } from 'lucide-react';
import { articleApi } from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    try {
      const response = await articleApi.getAll({ limit: 12 });
      setArticles(response.data.articles || []);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  return (
    <div className="py-32 bg-bg-base transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-divider">
            <span className="section-number font-display font-bold text-accent-terracotta">Journal</span>
          </div>
          <h1 className="text-heading mt-8 mb-6">
            Thoughts & <span className="gradient-warm">Learnings</span>
          </h1>
          <p className="font-serif text-body-lg text-ink-secondary max-w-2xl mx-auto">
            Exploring ideas at the intersection of design and engineering.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : articles.length === 0 ? (
          <EmptyState icon={<Tag />} title="No articles yet" description="Check back soon." />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, i) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative bg-bg-cream/60 backdrop-blur-sm border border-ink-subtle/20 rounded-2xl overflow-hidden
                         hover:-translate-y-2 hover:border-accent-terracotta/30 transition-all duration-500"
              >
                {article.coverImage && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4 font-mono text-xs text-ink-muted">
                    <span>{article.category}</span>
                    <span> </span>
                    <span>{article.readingTime} min read</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-3 leading-tight group-hover:text-accent-terracotta transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-ink-secondary mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent-terracotta
                             hover:gap-3 transition-all"
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
