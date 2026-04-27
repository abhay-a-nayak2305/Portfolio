import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { articleApi } from '../utils/api';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NotFound from './NotFound';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await articleApi.getBySlug(slug);
      setArticle(response.data);
      document.title = `${response.data.title} | ABHAY`;
    } catch (err) {
      if (err.response?.status === 404) setError('not-found');
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error === 'not-found') return <NotFound />;
  if (error) return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-br-base">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-ink-muted hover:text-accent-terracotta transition-colors font-mono text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to journal
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-sm text-ink-muted">
              <span>{article.category}</span>
              <span> </span>
              <span>{article.readingTime || 5} min read</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-ink-secondary leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-ink-muted">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(article.publishedAt || article.createdAt)}</time>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-ink-secondary leading-relaxed mb-16">
            <ReactMarkdown>{article.content || article.longDescription || ''}</ReactMarkdown>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-ink-primary">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-ink-secondary rounded-full text-sm hover:border-accent-terracotta hover:text-accent-terracotta transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Views */}
          <div className="mt-8 text-sm text-ink-muted font-mono">
            {article.views?.toLocaleString() || 0} views
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;
