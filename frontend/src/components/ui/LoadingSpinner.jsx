const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = { sm: 'w-6 h-6', md: 'w-12 h-12', lg: 'w-16 h-16' };
  return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-accent-terracotta/20 border-t-accent-terracotta rounded-full animate-spin`} />
    </div>
  );
};
export default LoadingSpinner;
