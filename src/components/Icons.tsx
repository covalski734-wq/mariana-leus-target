import React from 'react';

const IconBase: React.FC<{ size?: number; children: React.ReactNode } & React.SVGProps<SVGSVGElement>> = ({ size = 20, children, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    {...props}>{children}</svg>
);

export const IconMeta: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="M4 16c0-4 2-10 5-10s4 4 7 8 4 4 5 4" /><path d="M4 16c0 2 1 3 3 3 3 0 4-3 6-7" /></IconBase>;
export const IconGoogle: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="M12 4v8l6 3" /><circle cx="12" cy="12" r="9" /><path d="M3 12h3M18 12h3" /></IconBase>;
export const IconCode: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="m9 8-5 4 5 4" /><path d="m15 8 5 4-5 4" /><path d="m13 5-2 14" /></IconBase>;
export const IconSocial: React.FC<{ size?: number }> = (p) => <IconBase {...p}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8 7.5 16 17M16 7.5 8 17" /></IconBase>;
export const IconSearch: React.FC<{ size?: number }> = (p) => <IconBase {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /><path d="M8 11h6M11 8v6" /></IconBase>;
export const IconArrow: React.FC<{ size?: number; className?: string }> = (p) => <IconBase {...p}><path d="M5 12h14M13 6l6 6-6 6" /></IconBase>;
export const IconArrowUp: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="M7 17 17 7M8 7h9v9" /></IconBase>;
export const IconTelegram: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="m3 11 18-7-3 17-7-5-3 4v-5l10-8-11 6Z" /></IconBase>;
export const IconWhatsApp: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="M4 20l1.5-4A8 8 0 1 1 8 19l-4 1Z" /><path d="M9 10c0 3 2 5 5 5l1-1-2-1-1 1-2-2 1-1-1-2-1 1Z" /></IconBase>;
export const IconInstagram: React.FC<{ size?: number }> = (p) => <IconBase {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></IconBase>;
export const IconFacebook: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="M14 9h3l-.5 3H14v9h-3v-9H9V9h2V7c0-2 1-3 3-3h2v3h-1.5c-.5 0-.5.5-.5 1v1Z" /></IconBase>;
export const IconMail: React.FC<{ size?: number }> = (p) => <IconBase {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></IconBase>;
export const IconSun: React.FC<{ size?: number }> = (p) => <IconBase {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></IconBase>;
export const IconMoon: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z" /></IconBase>;
export const IconCheck: React.FC<{ size?: number }> = (p) => <IconBase {...p}><path d="m5 13 4 4 10-10" /></IconBase>;
