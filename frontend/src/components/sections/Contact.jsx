import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@abh.dev',
      href: 'mailto:hello@abh.dev',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'New Delhi, India',
      href: null,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'At least 10 chars';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Simulate submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error('Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-32 overflow-hidden bg-bg-base text-ink-primary transition-colors duration-500"
    >
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent-terracotta/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent-cerulean/20 rounded-full blur-3xl animate-float animation-delay-200" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Divider */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-divider mb-16"
        >
          <span className="section-number font-display font-bold text-accent-terracotta">03</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Text & Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-heading leading-none mb-6">
                Let's make <em>something</em><br />
                <span className="font-serif italic text-accent-terracotta-light">memorable</span>
              </h2>
              <p className="font-serif text-body-lg text-ink-secondary leading-relaxed max-w-lg">
                Got a project that needs personality? Let's talk.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-5 pt-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="group flex items-center gap-5 p-5 rounded-xl
                             bg-ink-primary/5 border border-ink-primary/10 hover:border-accent-terracotta/50
                             transition-all duration-500 hover:bg-ink-primary/10"
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent-terracotta/10 
                                 flex items-center justify-center
                                 group-hover:bg-accent-terracotta/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent-terracotta" />
                    </div>
                    <div>
                      <h4 className="text-sm font-mono tracking-wider uppercase text-ink-muted mb-1">
                        {info.title}
                      </h4>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          className="text-xl font-semibold hover:text-accent-terracotta transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-xl font-semibold">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="relative bg-ink-primary/5 backdrop-blur-xl border border-ink-primary/10 rounded-2xl p-8 md:p-10"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-warm opacity-10 rounded-bl-full" />
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-accent-olive/20 mx-auto mb-6 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-accent-olive" />
                  </motion.div>
                  <h3 className="font-display text-3xl font-bold mb-3">Message sent!</h3>
                  <p className="text-ink-secondary">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-mono uppercase tracking-wider text-ink-muted">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-ink-primary/5 border border-ink-primary/10 rounded-lg
                                 text-ink-primary placeholder:text-ink-muted/50
                                 focus:outline-none focus:border-accent-terracotta transition-colors
                                 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-mono uppercase tracking-wider text-ink-muted">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-ink-primary/5 border border-ink-primary/10 rounded-lg
                                 text-ink-primary placeholder:text-ink-muted/50
                                 focus:outline-none focus:border-accent-terracotta transition-colors
                                 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-mono uppercase tracking-wider text-ink-muted">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-ink-primary/5 border border-ink-primary/10 rounded-lg
                               text-ink-primary placeholder:text-ink-muted/50
                               focus:outline-none focus:border-accent-terracotta transition-colors
                               ${errors.subject ? 'border-red-500' : ''}`}
                      placeholder="Project inquiry"
                    />
                    {errors.subject && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-mono uppercase tracking-wider text-ink-muted">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-ink-primary/5 border border-ink-primary/10 rounded-lg
                               text-ink-primary placeholder:text-ink-muted/50
                               focus:outline-none focus:border-accent-terracotta transition-colors resize-none
                               ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell me about your vision..."
                    />
                    {errors.message && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                  </div>

                  {/* Honeypot */}
                  <input type="text" name="website" value={formData.website} onChange={handleChange} className="sr-only" tabIndex={-1} autoComplete="off" />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-warm text-white font-bold tracking-wider uppercase
                             rounded-lg disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hand-drawn underline doodle */}
      <svg className="absolute bottom-0 left-0 w-full h-16 pointer-events-none opacity-20" viewBox="0 0 500 50" preserveAspectRatio="none">
        <path 
          d="M0,25 Q125,5 250,25 T500,25" 
          fill="none" 
          stroke="var(--color-terracotta)" 
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="600"
          strokeDashoffset="600"
          className="animate-[drawPath_4s_ease-out_1s_forwards]"
        />
      </svg>
    </section>
  );
};

export default Contact;

