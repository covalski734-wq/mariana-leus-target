import React from 'react';

export const Logo: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <img
    src="/logo.svg"
    alt="Mariana Leus"
    width={size}
    height={size}
    style={{ display: 'block', objectFit: 'contain' }}
  />
);
