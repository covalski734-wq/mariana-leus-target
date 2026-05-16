// Generic UI icons — from lucide-react (all use 24x24 viewBox, consistent stroke)
export {
  ArrowRight as IconArrow,
  ArrowUpRight as IconArrowUp,
  Check as IconCheck,
  Mail as IconMail,
  Sun as IconSun,
  Moon as IconMoon,
  Send as IconTelegram,
  Search as IconSearch,
  Code2 as IconCode,
  Share2 as IconSocial,
} from 'lucide-react';

// Brand / logo icons — stroke-based, 24×24 viewBox, lucide style
import React from 'react';

const Stroke: React.FC<{ size?: number; children: React.ReactNode }> = ({ size = 20, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

// Meta logo — ∞ infinity symbol
export const IconMeta: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Stroke size={size}>
    <path d="M2 12C2 9 4 7 6.5 7C9 7 10.3 9 12 12C13.7 15 15 17 17.5 17C20 17 22 15 22 12C22 9 20 7 17.5 7C15 7 13.7 9 12 12C10.3 15 9 17 6.5 17C4 17 2 15 2 12Z" />
  </Stroke>
);

// Google logo — letter G shape
export const IconGoogle: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Stroke size={size}>
    <path d="M20.3 12.1H12v3h4.8C16 17.2 14.2 18.5 12 18.5a6.5 6.5 0 1 1 4.4-11.2l2.2-2.2A9.5 9.5 0 1 0 12 21.5c5.2 0 9.5-4.3 9.5-9.5 0-.6-.1-1.3-.2-1.9Z" />
    <path d="M12 12.1h8.3" />
  </Stroke>
);

// Instagram — rounded square camera
export const IconInstagram: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Stroke size={size}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </Stroke>
);

// WhatsApp — speech bubble with phone
export const IconWhatsApp: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Stroke size={size}>
    <path d="M3 21l1.5-4A9 9 0 1 1 8 18.5L3 21Z" />
    <path d="M9 10c0 3 2 5 5 5l1-1-1.5-1.5-1 1c-.5-.5-1.5-1.5-2-2l1-1L9.5 9 9 10Z" />
  </Stroke>
);

// Facebook — letter f
export const IconFacebook: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Stroke size={size}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  </Stroke>
);

