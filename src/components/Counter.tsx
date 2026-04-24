import React, { useState, useEffect, useRef } from 'react';

export const Counter: React.FC<{ to: number; prefix?: string; suffix?: string; duration?: number }> = ({ to, prefix = '', suffix = '', duration = 1800 }) => {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);

  const display = to >= 100 ? Math.round(v) : v.toFixed(1);
  return <span ref={ref}>{prefix}{display}<span className="unit">{suffix}</span></span>;
};
