import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
      }
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-sky-500/[0.05] via-indigo-500/[0.04] to-purple-500/[0.04] blur-[110px] transition-transform duration-75 will-change-transform"
    />
  );
}