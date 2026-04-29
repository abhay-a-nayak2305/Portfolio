import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projectApi } from '../../utils/api';
import ErrorBoundary from '../common/ErrorBoundary';
import ProjectSkeleton from '../common/ProjectSkeleton';

const ProjectsContent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [categories, setCategories] = useState([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getAll({ limit: 50 });
      setProjects(response.data.projects);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await projectApi.getCategories();
      setCategories(['all', ...response.data]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
    exit: { opacity: 0, scale: 0.9 }
  };

  // Visual styles for each project
  const visualStyles = [
    'bg-gradient-to-br from-accent-terracotta/20 to-accent-ochre/20',
    'bg-gradient-to-br from-accent-cerulean/20 to-accent-olive/20',
    'bg-gradient-to-br from-accent-olive/20 to-br-cream',
    'bg-gradient-to-br from-accent-ochre/20 to-accent-terracotta/20',
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Section Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <div className="section-divider">
          <span className="section-number font-display font-bold text-accent-terracotta" aria-label="Section 02">02</span>
          <div className="h-px flex-1 bg-gradient-to-r from-ink-subtle to-transparent opacity-30" />
        </div>
        
        <h2 className="text-heading mb-6">
          Selected <em className="gradient-warm">projects</em>
        </h2>
        
        <p className="font-serif text-body-lg text-[rgba(250,248,244,0.6)] max-w-xl leading-relaxed">
          A curation of recent work — each piece a unique challenge, each solution hand-crafted.
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-12 justify-center"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-500 border ${
              filter === cat
                ? 'bg-accent-terracotta text-white border-accent-terracotta'
                : 'border-gray-700 text-[rgba(250,248,244,0.6)] hover:border-accent-terracotta hover:text-accent-terracotta'
            }`}
          >
            {cat === 'all' ? 'All Projects' : cat}
          </button>
        ))}
      </motion.div>

      {/* Projects List */}
      {loading ? (
        <div className="flex flex-col gap-12">
          {[1, 2, 3].map(i => <ProjectSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800">
          <p className="text-red-400 mb-4 font-mono">Unable to load projects</p>
          <button 
            onClick={fetchProjects}
            className="btn-ethereal btn-ethereal-secondary scale-75"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <p className="text-center text-[rgba(250,248,244,0.5)]">No projects found in this category.</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12"
        >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project._id}
                  variants={itemVariants}
                  exit={{ opacity: 0, x: -100 }}
                  className="project-card group relative border-b border-gray-800 pb-12"
                >
                  <div className="flex flex-col gap-8">
                    {/* Main Content */}
                    <div className="space-y-6">
                      <div className="flex items-baseline gap-6 font-mono text-sm">
                        <span className="text-accent-terracotta text-2xl font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[rgba(250,248,244,0.4)] uppercase tracking-wider">
                          {project.category || 'Project'}
                        </span>
                        <span className="text-[rgba(250,248,244,0.3)]">•</span>
                        <span className="text-[rgba(250,248,244,0.4)]">
                          {new Date(project.createdAt).getFullYear()}
                        </span>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight transition-colors duration-500
                                   group-hover:gradient-warm">
                        {project.title}
                      </h3>

                      <p className="text-lg text-[rgba(250,248,244,0.6)] max-w-4xl leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 8).map((tag) => (
                            <span 
                              key={tag}
                              className="px-3 py-1 text-xs font-mono uppercase tracking-wider
                                       border border-gray-800 text-[rgba(250,248,244,0.5)] 
                                       hover:border-accent-terracotta hover:text-accent-terracotta
                                       transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex items-center gap-6 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-accent-terracotta
                                     hover:text-accent-terracotta-light transition-colors"
                          >
                            <span>Visit Site</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium
                                     hover:text-accent-cerulean transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
  );
};

const Projects = () => (
  <section 
    id="work" 
    className="relative py-32 bg-bg-dark text-br-cream overflow-hidden"
  >
    {/* Atmospheric background */}
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-terracotta/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cerulean/10 rounded-full blur-3xl animate-float animation-delay-200"></div>
    </div>
    
    <ErrorBoundary>
      <ProjectsContent />
    </ErrorBoundary>
  </section>
);

export default Projects;

