import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const trail = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const trailCount = 6;

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;
    document.body.style.cursor = 'none';

    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);

    // Detect hoverable elements
    const checkHover = () => {
      const el = document.elementFromPoint(mouse.current.x, mouse.current.y);
      if (el) {
        const isHoverable = el.closest('a, button, [role="button"], input, textarea, select, .tilt-card, .glass-card, .filter-pill, .icon-btn, .btn-primary, .btn-secondary');
        setHovering(!!isHoverable);
      }
    };

    const interval = setInterval(checkHover, 100);

    // Animation loop
    let raf;
    const animate = () => {
      // Smooth follow for ring
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (dot.current) {
        dot.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${hovering ? 1.8 : clicking ? 0.8 : 1})`;
      }

      // Trail particles
      trail.current.forEach((t, i) => {
        if (!t) return;
        const delay = (i + 1) * 0.06;
        const tx = mouse.current.x + Math.sin(Date.now() * 0.003 + i * 1.2) * (hovering ? 20 : 8);
        const ty = mouse.current.y + Math.cos(Date.now() * 0.003 + i * 1.2) * (hovering ? 20 : 8);
        const cx = parseFloat(t.dataset.x || tx);
        const cy = parseFloat(t.dataset.y || ty);
        const nx = cx + (tx - cx) * (0.08 + delay);
        const ny = cy + (ty - cy) * (0.08 + delay);
        t.dataset.x = nx;
        t.dataset.y = ny;
        t.style.transform = `translate(${nx}px, ${ny}px) translate(-50%, -50%) scale(${1 - i * 0.12})`;
        t.style.opacity = (0.5 - i * 0.07).toString();
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(raf);
      clearInterval(interval);
      document.body.style.cursor = '';
    };
  }, [visible, hovering, clicking]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" style={{ display: visible ? 'block' : 'none' }}>
      {/* Trail particles */}
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={el => (trail.current[i] = el)}
          className="cursor-trail"
          style={{
            '--hue': `${260 + i * 20}`,
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        ref={ring}
        className={`cursor-ring ${hovering ? 'cursor-ring-hover' : ''} ${clicking ? 'cursor-ring-click' : ''}`}
      />

      {/* Inner dot */}
      <div
        ref={dot}
        className={`cursor-dot ${hovering ? 'cursor-dot-hover' : ''} ${clicking ? 'cursor-dot-click' : ''}`}
      />
    </div>
  );
}
