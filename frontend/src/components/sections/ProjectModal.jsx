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

          {/* Hero Image */}
          {project.image && (
            <div className="relative h-64 md:h-96">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full mb-3">
                  {project.category.toUpperCase()}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2">
                  {project.title}
                </h2>
                {project.metrics?.[0] && (
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="text-sm">
                      <strong>{project.metrics[0].value}</strong> {project.metrics[0].label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-gray-700 -gray-300 leading-relaxed">
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
                  className="btn-primary inline-flex items-center gap-2"
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
                  className="btn-secondary inline-flex items-center gap-2"
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
                  className="btn-ghost inline-flex items-center gap-2"
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
                  <Target className="w-5 h-5 text-primary-600" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 -gray-300
                               rounded-lg text-sm font-medium border border-gray-200
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {project.timeline && (
              <div className="flex items-center gap-4 text-sm text-gray-600 -gray-400">
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
                            <p className="text-sm text-gray-600 -gray-400">
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
                            <p className="text-sm text-gray-600 -gray-400">
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

            {/* Additional Images */}
            {project.images && project.images.length > 1 && (
              <div>
                <h3 className="text-lg font-bold font-heading mb-4">Screenshots</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${project.title} screenshot ${idx + 2}`}
                      className="rounded-lg border border-gray-200
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Views */}
            <div className="text-sm text-gray-500 -gray-400 pt-4 border-t border-gray-200
              👁 {project.views?.toLocaleString() || 0} views
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;


