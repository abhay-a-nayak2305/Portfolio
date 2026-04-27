import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { truncate } from '../../utils/helpers';

const ProjectCard = ({ project, size = 'normal' }) => {
  const isCompact = size === 'compact';

  return (
    <div className="card-interactive group">
      <Link to={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              isCompact ? 'h-40' : 'h-48 md:h-64'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0
                          group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                aria-label="View live site"
              >
                <ExternalLink className="w-5 h-5 text-primary-600" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                aria-label="View source code"
              >
                <Github className="w-5 h-5 text-gray-900" />
              </a>
            )}
            <span className="px-4 py-2 bg-white/90 rounded-full text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-white
                            text-xs font-bold rounded-full shadow-lg">
              â­ FEATURED
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-primary-100 -primary-900/30 text-primary-700
                         -primary-300 text-xs font-medium rounded">
            {project.category}
          </span>
        </div>

        <Link to={`/projects/${project.slug}`}>
          <h3 className={`font-bold font-heading mb-2 group-hover:text-primary-600
                        -hover:text-primary-400 transition-colors ${
                          isCompact ? 'text-lg' : 'text-xl md:text-2xl'
                        }`}
          >
            {project.title}
          </h3>
        </Link>

        <p className={`text-gray-600 -gray-400 mb-4 ${
          isCompact ? 'text-sm line-clamp-2' : 'line-clamp-3'
        }`}>
          {truncate(project.description, isCompact ? 80 : 120)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, isCompact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600
                       -gray-300 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > (isCompact ? 2 : 3) && (
            <span className="px-2 py-1 text-gray-500 text-xs">
              +{project.tags.length - (isCompact ? 2 : 3)}
            </span>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && !isCompact && (
          <div className="pt-4 border-t border-gray-100 flex gap-4 text-sm">
            <span className="text-gray-500">
              <strong className="text-gray-900 -white">{project.metrics[0].value}</strong> {project.metrics[0].label}
            </span>
            {project.metrics[1] && (
              <span className="text-gray-500">
                <strong className="text-gray-900 -white">{project.metrics[1].value}</strong> {project.metrics[1].label}
              </span>
            )}
          </div>
        )}

        {/* Views count */}
        <div className="text-xs text-gray-500 -gray-400 mt-3 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {project.views?.toLocaleString() || 0} views
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;


