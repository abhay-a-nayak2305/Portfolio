import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);

  // useMousePosition hook is now centralized in Layout.jsx
  // It automatically updates the --mouse-x and --mouse-y CSS variables used in this component.


  const titleWords = [
    { text: 'I create', delay: 0.2 },
    { text: 'alive', accent: true, delay: 0.4 },
    { text: 'digital', delay: 0.6 },
    { text: 'experiences', accent: true, delay: 0.8 }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'var(--color-bg-base)',
        paddingTop: '6rem'
      }}
    >
      {/* Ambient light layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(196,69,54,0.08)_0%,transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(74,143,168,0.06)_0%,transparent_50%)] animate-pulse-slow animation-delay-200" />
      </div>

      {/* Gradient mesh blobs */}
      <div className="blob-container">
        <div className="blob" />
        <div className="blob opacity-30" style={{ animationDelay: '-8s' }} />
        <div className="blob opacity-20" style={{ animationDelay: '-16s' }} />
        <div className="blob opacity-15" style={{ animationDelay: '-22s' }} />
      </div>

      {/* Decorative hand-drawn SVG */}
      <svg 
        className="absolute top-20 left-8 w-48 h-48 pointer-events-none opacity-20 text-accent-terracotta"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path 
          d="M10,50 Q30,20 50,50 T90,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset="300"
          className="animate-[drawPath_10s_ease-out_infinite]"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-20 bg-gradient-warm" />
            <span 
              className="font-serif text-xl italic text-ink-muted"
              style={{ animationDelay: '0.7s' }}
            >
              Designer & Developer
            </span>
            <span className="w-2 h-2 rounded-full bg-accent-terracotta animate-pulse" />
          </motion.div>

          {/* Title */}
          <h1 className="font-display font-bold leading-[0.9] tracking-tighter">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: '15deg' }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.2,
                  delay: word.delay,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className={`block ${word.accent ? 'gradient-warm' : 'text-ink-muted'}`}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          {/* Lead */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-serif text-body-lg italic text-ink-secondary max-w-xl mt-8"
          >
            Blending brutalism with warmth. Every interaction tells a{' '}
            <span className="relative inline-block">
              story
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-warm origin-left scale-x-0 animate-[grow_1s_ease-out_1.2s_forwards]" />
            </span>
            .
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-6 mt-10"
          >
            <motion.a
              href="#work"
              className="btn-ethereal btn-ethereal-primary group"
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(196,69,54,0.25)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-text relative z-10">View projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-gradient-warm opacity-0 transition-opacity duration-500 rounded-sm z-[-1]" />
            </motion.a>

            <motion.a
              href="#contact"
              className="btn-ethereal btn-ethereal-secondary group"
              whileHover={{ y: -2 }}
            >
              <span>Start a project</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ink-primary transform scale-x-100 transition-transform duration-500 group-hover:scale-x-0 group-hover:origin-right" />
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 flex items-center gap-4 text-sm font-mono text-ink-muted"
          >
            <div className="h-12 w-px bg-gradient-to-b from-accent-terracotta to-transparent animate-pulse" />
            <span className="uppercase tracking-widest">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute top-1/4 right-[10%]">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-32 h-32 border-2 border-accent-terracotta/30 rounded-full"
        />
      </div>

      <div className="pointer-events-none absolute bottom-1/4 right-[25%]">
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="w-16 h-16 border-2 border-accent-cerulean/40 rounded-full"
        />
      </div>

        {/* Floating dots */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="pointer-events-none absolute bottom-1/3 right-[20%] text-accent-olive text-xs tracking-widest"
        >
          • • •
        </motion.div>
    </section>
  );
};

export default Hero;

