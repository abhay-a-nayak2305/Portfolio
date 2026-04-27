import { Github, Linkedin, Twitter, Mail, Heart, Sparkles } from 'lucide-react';
import { socialLinks } from '../../data/social';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  };

  return (
    <footer 
      className="relative bg-[#0a0908] border-t border-gray-900/50 overflow-hidden"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 
                      bg-gradient-to-r from-transparent via-accent-terracotta to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-display font-bold text-3xl leading-none tracking-tighter"
                style={{
                  background: 'linear-gradient(135deg, var(--color-ink-primary) 0%, var(--color-terracotta) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                ABHAY
              </span>
            </div>
            <p className="text-[rgba(250,248,244,0.5)] max-w-sm leading-relaxed">
              Designer & developer crafting expressive digital experiences with character.
              Blending brutalism with warmth, every interaction tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-ink-primary mb-6">Navigate</h3>
            <ul className="space-y-3">
              {['Home', 'Work', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[rgba(250,248,244,0.6)] hover:text-accent-terracotta
                             transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-accent-terracotta group-hover:w-4 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Status */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-ink-primary mb-6">Connect</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg border border-gray-800 
                               flex items-center justify-center
                               text-[rgba(250,248,244,0.5)] hover:text-accent-cerulean
                               hover:border-accent-cerulean/50 transition-all duration-300
                               hover:scale-110 hover:-translate-y-1"
                      aria-label={social.name}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-[rgba(250,248,244,0.5)]">
            <span>© {currentYear} ABHAY</span>
            <span className="hidden md:block">•</span>
            <span>New Delhi, India</span>
          </div>
          
          <p className="text-sm text-[rgba(250,248,244,0.5)] flex items-center gap-2 font-mono">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

