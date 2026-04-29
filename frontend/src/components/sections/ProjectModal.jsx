import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Play, Clock, Target, Lightbulb } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const ProjectModal = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white
                     rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90
                     backdrop-blur-sm border border-gray-200
                     hover:bg-gray-100 :bg-dark-border transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Content (No Image) */}
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50">
            <span className="inline-block px-3 py-1 bg-accent-terracotta text-white text-xs font-mono uppercase tracking-widest rounded-full mb-4">
              {project.category || 'Project'}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-bg-dark mb-4">
              {project.title}
            </h2>
            {project.metrics?.[0] && (
              <div className="flex items-center gap-4 text-gray-600">
                <span className="text-sm font-mono uppercase tracking-wider">
                  <strong>{project.metrics[0].value}</strong> {project.metrics[0].label}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-accent-terracotta text-white rounded-lg inline-flex items-center gap-2 hover:bg-accent-terracotta/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-gray-200 text-bg-dark rounded-lg inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
              {project.youtubeUrl && (
                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-dashed border-gray-300 text-gray-600 rounded-lg inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </a>
              )}
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <h3 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent-terracotta" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {project.timeline && (
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {formatDate(project.timeline.started)} - {formatDate(project.timeline.completed)}
                  {project.timeline.duration && ` (${project.timeline.duration})`}
                </span>
              </div>
            )}

            {/* Challenges & Solutions */}
            {(project.challenges?.length > 0 || project.solutions?.length > 0) && (
              <div className="grid md:grid-cols-2 gap-6">
                {project.challenges?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-4 flex items-center gap-2 text-red-600">
                      <Lightbulb className="w-5 h-5" />
                      Challenges
                    </h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">{challenge.title}</h4>
                            <p className="text-sm text-gray-600">
                              {challenge.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.solutions?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-4 flex items-center gap-2 text-green-600">
                      <Target className="w-5 h-5" />
                      Solutions
                    </h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">{solution.title}</h4>
                            <p className="text-sm text-gray-600">
                              {solution.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Views */}
            <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
              👁 {project.views?.toLocaleString() || 0} views
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;


