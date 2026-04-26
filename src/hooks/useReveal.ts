import { useEffect, useRef } from 'react';

export const useReveal = () => {
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    ioRef.current?.disconnect();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            // Single rAF — browser has already painted the element in its hidden state.
            // CSS animation (not transition) ensures it always plays from keyframe start.
            requestAnimationFrame(() => {
              el.classList.add('in');
              io.unobserve(el);
            });
          }
        });
      },
      // No rootMargin on mobile — smaller viewports need zero margin to trigger reliably.
      // threshold 0.05 = fire as soon as 5% of the element is visible.
      { threshold: 0.05 }
    );

    ioRef.current = io;

    const observe = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach(el => io.observe(el));
    };

    observe();
    // Re-scan after 150ms for elements rendered asynchronously (lazy routes, etc.)
    const t1 = setTimeout(observe, 150);
    const t2 = setTimeout(observe, 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      io.disconnect();
    };
  });
};
