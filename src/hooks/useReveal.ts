import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const check = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach(el => {
        const { top } = el.getBoundingClientRect();
        // Reveal when element's top edge is within the viewport + 80px buffer
        if (top < vh + 80) {
          el.classList.add('in');
        }
      });
    };

    // Multiple passes to catch elements at different React render phases:
    // t1=50ms  — first meaningful paint
    // t2=250ms — after lazy/deferred renders
    // t3=700ms — failsafe for slow / heavy pages
    const t1 = setTimeout(check, 50);
    const t2 = setTimeout(check, 250);
    const t3 = setTimeout(check, 700);

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [pathname]); // Re-initialise on every route change
};
