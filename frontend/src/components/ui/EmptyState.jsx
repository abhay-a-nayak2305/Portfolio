const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 mb-6 rounded-full bg-br-warm/50 flex items-center justify-center text-accent-terracotta/60">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-ink-primary mb-3">{title}</h3>
      <p className="text-ink-secondary max-w-md leading-relaxed mb-6">{description}</p>
      {action}
    </div>
  );
};
export default EmptyState;
