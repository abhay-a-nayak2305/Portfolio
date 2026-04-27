import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projectApi } from '../../utils/api';
import ProjectCard from '../cards/ProjectCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const CTA = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await projectApi.getFeatured();
      setFeaturedProjects(response.data.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch featured projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-bg-base text-ink-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Ready to Start Your Project?</h2>
          <p className="section-subtitle text-lg">
            Let's collaborate and build something amazing together.
            Check out some of my recent work below.
          </p>
        </motion.div>

        {/* Featured Projects Preview */}
        {!loading && featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-lg px-8 py-4"
            >
              View All Work
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;


