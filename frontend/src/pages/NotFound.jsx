import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, FileText, Mail, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-br-base pt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Big */}
        <h1 className="font-display text-[10rem] md:text-[14rem] font-bold leading-none text-ink-primary/10 mb-8">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Page <span className="gradient-warm">not found</span>
        </h2>
        <p className="font-serif text-xl text-ink-secondary mb-12 leading-relaxed">
          Oops! The page you're looking for seems to have drifted into the void.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="btn-ethereal btn-ethereal-primary"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/projects"
            className="btn-ethereal btn-ethereal-secondary"
          >
            <FileText className="w-4 h-4" />
            <span>View Projects</span>
          </Link>
        </div>

        {/* Decorative circle */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-16 w-32 h-32 mx-auto border-2 border-accent-cerulean/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-8 h-8 text-accent-cerulean/50" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
