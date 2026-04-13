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
        'bg-dark-card dark:bg-dark-card light:bg-light-card',
        'border border-dark-border dark:border-dark-border light:border-light-border',
        'p-6 rounded-lg transition-all duration-300',
        hover && 'hover:shadow-lg hover:scale-105 dark:hover:border-primary',
        className
      )}
    >
      {children}
    </div>
  )
}
