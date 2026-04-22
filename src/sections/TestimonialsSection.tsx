import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation()
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string
    company: string
    text: string
  }>
  const count = testimonials.length

  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)

  const prev = useCallback(() => setCurrent((c) => (c - 1 + count) % count), [count])
  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count])

  // Auto-advance every 6 seconds
  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 50) dx > 0 ? next() : prev()
  }

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.32em] text-primary mb-3">
            {t('testimonials.label')}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] mb-4">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Track */}
          <div className="overflow-hidden mx-8 sm:mx-14">
            <div
              className="flex"
              style={{
                transform: `translateX(calc(-${current} * 100%))`,
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  style={{ minWidth: '100%', flex: '0 0 100%' }}
                  className="px-2 sm:px-6"
                >
                  <div
                    className="max-w-2xl mx-auto rounded-2xl p-8 sm:p-10 border border-surface"
                    style={{ background: 'rgba(var(--surface-strong-rgb), 0.6)' }}
                  >
                    {/* Quote mark + company */}
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-5xl leading-none text-primary font-serif select-none"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      <span className="text-xs uppercase tracking-[0.24em] font-semibold text-primary">
                        {item.company}
                      </span>
                    </div>

                    {/* Text — supports HTML from translation */}
                    <p
                      className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />

                    {/* Author */}
                    <p className="font-semibold text-[color:var(--text-primary)]">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-surface bg-surface flex items-center justify-center text-[color:var(--text-secondary)] hover:border-primary hover:text-primary transition-colors duration-200"
          >
            &#8592;
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-surface bg-surface flex items-center justify-center text-[color:var(--text-secondary)] hover:border-primary hover:text-primary transition-colors duration-200"
          >
            &#8594;
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '1.5rem' : '0.5rem',
                height: '0.5rem',
                background:
                  i === current
                    ? 'var(--primary)'
                    : 'rgba(var(--surface-strong-rgb), 1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
