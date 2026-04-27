const SkillSkeleton = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 text-center animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
      <div className="w-3/4 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
      <div className="w-1/2 h-2 bg-gray-200 rounded mx-auto"></div>
    </div>
  );
};

export default SkillSkeleton;
