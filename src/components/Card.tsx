import React from 'react'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <div
      className={clsx(
        'card-shell border border-surface rounded-lg p-6 transition-all duration-300',
        hover && 'hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}
