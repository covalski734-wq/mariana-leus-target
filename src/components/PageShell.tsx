import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      {children}
    </div>
    <Footer />
  </>
)
