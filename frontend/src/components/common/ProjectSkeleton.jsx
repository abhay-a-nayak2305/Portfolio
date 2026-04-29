import { motion } from 'framer-motion';

const ProjectSkeleton = () => {
  return (
    <div className="project-card relative border-b border-gray-800 pb-12 animate-pulse">
      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-8 h-8 bg-gray-800 rounded"></div>
            <div className="w-24 h-4 bg-gray-800 rounded"></div>
          </div>
          <div className="w-3/4 h-12 bg-gray-800 rounded"></div>
          <div className="w-full h-20 bg-gray-800 rounded"></div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-16 h-6 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;
