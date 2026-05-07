import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const glow = useRef(null);
  const trail = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const velocity = useRef({ vx: 0, vy: 0 });

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [label, setLabel] = useState('');

  const TRAIL_COUNT = 12;

  useEffect(() => {
    if ('ontouchstart' in window) return;

    document.body.style.cursor = 'none';

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    // Better hover detection
    const detectHover = () => {
      const el = document.elementFromPoint(
        mouse.current.x,
        mouse.current.y
      );

      if (!el) return;

      const target = el.closest(`
        a,
        button,
        [role="button"],
        input,
        textarea,
        .btn,
        .card,
        .glass-card,
        .magnetic,
        .hover-target
      `);

      setHovering(!!target);

      // Dynamic labels
      if (target?.dataset?.cursor) {
        setLabel(target.dataset.cursor);
      } else {
        setLabel('');
      }
    };

    const hoverInterval = setInterval(detectHover, 60);

    let raf;

    const animate = () => {
      // Smooth interpolation
      current.current.x +=
        (mouse.current.x - current.current.x) * 0.14;

      current.current.y +=
        (mouse.current.y - current.current.y) * 0.14;

      // Velocity
      velocity.current.vx =
        mouse.current.x - current.current.x;

      velocity.current.vy =
        mouse.current.y - current.current.y;

      const speed =
        Math.abs(velocity.current.vx) +
        Math.abs(velocity.current.vy);

      // Stretch based on speed
      const stretch = Math.min(speed * 0.015, 0.35);

      // Angle rotation
      const angle =
        Math.atan2(
          velocity.current.vy,
          velocity.current.vx
        ) *
        (180 / Math.PI);

      // DOT
      if (dot.current) {
        dot.current.style.transform = `
          translate(${mouse.current.x}px, ${mouse.current.y}px)
          translate(-50%, -50%)
          scale(${clicking ? 0.7 : hovering ? 1.8 : 1})
        `;
      }

      // RING
      if (ring.current) {
        ring.current.style.transform = `
          translate(${current.current.x}px, ${current.current.y}px)
          translate(-50%, -50%)
          rotate(${angle}deg)
          scaleX(${1 + stretch})
          scaleY(${1 - stretch})
          scale(${hovering ? 2.2 : clicking ? 0.85 : 1})
        `;
      }

      // GLOW
      if (glow.current) {
        glow.current.style.transform = `
          translate(${current.current.x}px, ${current.current.y}px)
          translate(-50%, -50%)
          scale(${hovering ? 1.8 : 1})
        `;
      }

      // PARTICLES
      trail.current.forEach((p, i) => {
        if (!p) return;

        const t = Date.now() * 0.002;

        const radius = hovering ? 32 : 14;

        const targetX =
          mouse.current.x +
          Math.cos(t + i) * radius;

        const targetY =
          mouse.current.y +
          Math.sin(t + i) * radius;

        const cx = parseFloat(p.dataset.x || targetX);
        const cy = parseFloat(p.dataset.y || targetY);

        const nx = cx + (targetX - cx) * 0.18;
        const ny = cy + (targetY - cy) * 0.18;

        p.dataset.x = nx;
        p.dataset.y = ny;

        p.style.transform = `
          translate(${nx}px, ${ny}px)
          translate(-50%, -50%)
          scale(${1 - i * 0.06})
        `;

        p.style.opacity = `${0.6 - i * 0.045}`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);

      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);

      clearInterval(hoverInterval);

      cancelAnimationFrame(raf);

      document.body.style.cursor = '';
    };
  }, [hovering, clicking]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999]"
      style={{
        display: visible ? 'block' : 'none',
      }}
    >
      {/* Glow */}
      <div
        ref={glow}
        className="
          fixed
          h-32
          w-32
          rounded-full
          bg-violet-500/20
          blur-3xl
          transition-transform
          duration-300
        "
      />

      {/* Particles */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trail.current[i] = el)}
          className="
            fixed
            h-2
            w-2
            rounded-full
            bg-violet-400
            mix-blend-screen
          "
        />
      ))}

      {/* Ring */}
      <div
        ref={ring}
        className={`
          fixed
          flex
          items-center
          justify-center
          h-10
          w-10
          rounded-full
          border
          border-violet-400/70
          bg-white/[0.03]
          backdrop-blur-md
          transition-[background,box-shadow]
          duration-300
          ${
            hovering
              ? 'bg-violet-500/10 shadow-[0_0_60px_rgba(139,92,246,0.9)]'
              : ''
          }
        `}
      >
        {/* Cursor Label */}
        {label && (
          <span
            className="
              text-[10px]
              font-medium
              tracking-widest
              uppercase
              text-white
              whitespace-nowrap
            "
          >
            {label}
          </span>
        )}
      </div>

      {/* Dot */}
      <div
        ref={dot}
        className={`
          fixed
          h-3
          w-3
          rounded-full
          bg-white
          transition-all
          duration-150
          ${hovering ? 'shadow-[0_0_25px_white]' : ''}
        `}
      />
    </div>
  );
}