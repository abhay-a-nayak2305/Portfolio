import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { projectApi } from '../utils/api';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NotFound from './NotFound';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getBySlug(slug);
      setProject(response.data);
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
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-ink-muted
                     hover:text-accent-terracotta transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden mb-16 shadow-soft"
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-terracotta/20 to-accent-cerulean/20 flex items-center justify-center">
              <span className="font-display text-[12rem] font-bold text-ink-primary/10">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="inline-block px-4 py-2 border border-accent-terracotta/30 
                           text-accent-terracotta text-xs font-mono tracking-widest uppercase mb-4">
              {project.category || 'Project'}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-br-cream leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-[rgba(250,248,244,0.7)] max-w-3xl font-serif leading-relaxed">
              {project.description}
            </p>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* About Project */}
            <section>
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-gradient-warm" />
                About
              </h2>
              <div className="prose prose-lg max-w-none text-ink-secondary leading-relaxed">
                {project.content ? (
                  <p>{project.content}</p>
                ) : (
                  <p className="font-serif italic text-xl">
                    This project showcases a unique blend of design and technology,
                    creating an engaging digital experience that stands out.
                  </p>
                )}
              </div>
            </section>

            {/* Details */}
            <section>
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-gradient-warm" />
                Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 rounded-xl bg-white/50">
                  <div className="text-sm font-mono uppercase tracking-wider text-ink-muted mb-2">Year</div>
                  <div className="font-semibold text-lg">
                    {project.year || new Date().getFullYear()}
                  </div>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl bg-white/50">
                  <div className="text-sm font-mono uppercase tracking-wider text-ink-muted mb-2">Role</div>
                  <div className="font-semibold text-lg">Developer</div>
                </div>
              </div>
            </section>

            {/* Gallery placeholder */}
            <section>
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-gradient-warm" />
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="aspect-video bg-gradient-warm/20 rounded-xl border border-gray-200 flex items-center justify-center text-ink-muted/30">
                    Image {i}
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Tech Stack */}
            <div className="p-8 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm">
              <h3 className="font-display font-bold mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {(project.tags || ['React', 'Node.js', 'Tailwind']).map(tag => (
                  <span key={tag} className="px-3 py-1.5 border border-gray-300 text-xs uppercase tracking-wider rounded-lg text-ink-secondary hover:border-accent-terracotta transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-4 px-6 bg-gradient-warm text-white font-bold tracking-wider uppercase rounded-xl
                           hover:shadow-lg hover:shadow-accent-terracotta/30 transition-all group"
                >
                  <span>Visit Site</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-4 px-6 border border-gray-300 text-ink-primary font-medium rounded-xl
                           hover:border-accent-terracotta transition-colors"
                >
                  <span>Source Code</span>
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Contact CTA */}
            <div className="p-6 text-center rounded-xl bg-br-warm/50">
              <p className="font-serif italic text-ink-muted mb-4">
                Interested in a similar project?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-accent-terracotta font-semibold hover:gap-3 transition-all"
              >
                Let's talk <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
