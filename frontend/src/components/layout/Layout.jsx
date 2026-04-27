import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useMousePosition } from '../../hooks/useMousePosition';

const Layout = () => {
  const mouse = useMousePosition();
  const canvasRef = useRef(null);


  // Ambient light & particles effect
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    // Particle canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.className = 'fixed inset-0 pointer-events-none z-0';
    canvas.style.opacity = '0.4';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        sx: (Math.random() - 0.5) * 0.3,
        sy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'var(--color-ink-primary)';
      ctx.strokeStyle = 'var(--color-ink-primary)';

      particles.forEach((p, i) => {
        p.x += p.sx; p.y += p.sy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p2.x - p.x, p2.y - p.y);
          if (d < 150) {
            ctx.beginPath();
            ctx.globalAlpha = (1 - d / 150) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      if (canvasRef.current) canvasRef.current.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
