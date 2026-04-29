import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Server, Database, Cloud as CloudIcon, Smartphone } from 'lucide-react';
import { skillApi } from '../../utils/api';
import ErrorBoundary from '../common/ErrorBoundary';
import SkillSkeleton from '../common/SkillSkeleton';

const About = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = [
    { id: 'all', label: 'All', icon: Code },
    { id: 'frontend', label: 'Frontend', icon: Palette },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'devops', label: 'DevOps', icon: CloudIcon },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await skillApi.getAll();
      setSkills(response.data);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  // Stats for display
  const stats = [
    { label: 'Projects', value: '50+' },
    { label: 'Years', value: '5+' },
    { label: 'Clients', value: '30+' },
    { label: 'Technologies', value: '20+' }
  ];

  return (
    <section 
      id="about" 
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg-base) 0%, var(--color-bg-warm) 50%, var(--color-bg-base) 100%)',
        backgroundSize: '100% 200%',
        animation: 'bgShift 20s ease-in-out infinite'
      }}
    >
      {/* Decorative background rings */}
      <div className="absolute top-0 right-0 w-96 h-96 border-2 border-accent-terracotta/10 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-2 border-accent-cerulean/10 rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Divider */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-divider mb-12"
        >
          <span className="section-number font-display font-bold text-accent-terracotta">01</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-hero leading-none mb-6">
                Crafted with <span className="gradient-warm">intention</span>,<br />
                designed for <span className="gradient-warm">impact</span>
              </h2>
              
              <div className="space-y-6 text-body-lg">
                <p className="text-ink-secondary leading-relaxed">
                  I work at the intersection of <em className="font-serif text-accent-terracotta text-xl">design</em> and 
                  {' '}<em className="font-serif text-accent-terracotta text-xl">engineering</em>, 
                  building websites that feel <em className="font-serif text-accent-terracotta">human</em>. 
                  No cookie-cutter templates, no soulless automation — just thoughtful, character-driven work.
                </p>
                <p className="text-ink-secondary leading-relaxed">
                  My approach marries brutalism's raw honesty with organic warmth.
                  The result? Digital products that <span className="font-serif italic text-accent-terracotta">breathe</span>, 
                  move, and connect.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 py-8 border-y border-gray-200/30">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl font-bold gradient-warm mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono tracking-wider text-ink-muted uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {skills.slice(0, 8).map((skill) => (
                <span 
                  key={skill._id}
                  className="px-4 py-2 border border-ink-subtle/30 text-ink-secondary text-xs tracking-wider uppercase
                           hover:border-accent-terracotta hover:text-accent-terracotta transition-colors duration-300 bg-bg-cream/50"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div 
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* Main frame */}
              <motion.div
                whileHover={{ rotateY: -5, rotateX: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative glass-card rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-shadow duration-500"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(20px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="aspect-[4/5] relative">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-olive/20 via-accent-terracotta/10 to-accent-cerulean/20" />
                  
                  {/* Geometric patterns */}
                  <div className="absolute inset-0 opacity-20"
                       style={{
                         backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(26,22,20,0.1) 20px, rgba(26,22,20,0.1) 21px)'
                       }} />

                  {/* Content placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto rounded-full border-4 border-accent-terracotta/30 flex items-center justify-center animate-pulse">
                        <Code className="w-12 h-12 text-accent-terracotta/50" />
                      </div>
                      <p className="font-display text-2xl font-bold text-ink-primary/20">Code & Design</p>
                    </div>
                  </div>
                </div>

                {/* Hand-drawn accent line */}
                <svg 
                  className="absolute bottom-4 right-4 w-24 h-24 opacity-50 text-accent-cerulean"
                  viewBox="0 0 100 100"
                >
                  <path 
                    d="M10,50 Q30,20 50,50 T90,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="200"
                    strokeDashoffset="0"
                    className="animate-[scribbleDraw_3s_ease-in-out_infinite]"
                  />
                </svg>
              </motion.div>

              {/* Floating shadow */}
              <div 
                className="absolute -bottom-6 -right-6 w-full h-full bg-ink-primary rounded-2xl -z-10 opacity-10 blur-2xl"
                style={{ filter: 'blur(40px)' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-32"
        >
          <div className="section-divider mb-12">
            <span className="section-number font-display font-bold text-accent-terracotta">Stack</span>
          </div>

          <h3 className="text-2xl font-display font-bold mb-10 text-center">
            Tools of the <span className="gradient-warm">trade</span>
          </h3>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono tracking-widest uppercase
                            transition-all duration-500 border ${
                              activeCategory === cat.id
                                ? 'bg-accent-terracotta text-white border-accent-terracotta -translate-y-1'
                                : 'border-gray-200 text-ink-muted hover:border-accent-terracotta hover:text-accent-terracotta'
                            }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Skills grid with staggered reveal */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkillSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-bg-cream/20 rounded-xl border border-dashed border-ink-subtle/30">
              <p className="text-ink-muted mb-4 font-mono text-sm">{error}</p>
              <button 
                onClick={fetchSkills}
                className="btn-ethereal btn-ethereal-secondary scale-75"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => {
                  // Fallback icon based on category if skill.icon is missing
                  const categoryIconMap = {
                    frontend: <Palette className="w-8 h-8" />,
                    backend: <Server className="w-8 h-8" />,
                    database: <Database className="w-8 h-8" />,
                    devops: <CloudIcon className="w-8 h-8" />,
                    mobile: <Smartphone className="w-8 h-8" />,
                    other: <Code className="w-8 h-8" />
                  };
                  
                  return (
                    <motion.div
                      key={skill._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-terracotta/5 to-accent-cerulean/5 rounded-xl opacity-0
                                    group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-bg-cream/60 backdrop-blur-sm border border-ink-subtle/20 
                                      rounded-xl p-6 text-center transition-all duration-500
                                      group-hover:-translate-y-2 group-hover:border-accent-terracotta/30">
                        <span className="mb-3 block opacity-80 group-hover:scale-110 transition-transform duration-500 text-accent-terracotta flex justify-center">
                          {skill.icon ? skill.icon : (categoryIconMap[skill.category] || <Code className="w-8 h-8" />)}
                        </span>
                        <h4 className="font-display font-semibold text-ink-primary mb-2">
                          {skill.name}
                        </h4>
                        <p className="text-xs font-mono text-ink-muted uppercase tracking-wider">
                          {skill.category}
                        </p>
                        
                        {/* Progress bar */}
                        {skill.level && (
                          <div className="mt-4 w-full bg-ink-subtle/20 rounded-full h-1 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level * 10}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                              className="h-full rounded-full bg-gradient-warm"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default About;


