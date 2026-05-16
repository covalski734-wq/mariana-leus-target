import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CheckIcon from '@mui/icons-material/Check';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GoogleIcon from '@mui/icons-material/Google';

type IconProps = { size?: number; className?: string };

export const IconArrow: React.FC<IconProps> = ({ size = 20, className }) => (
  <ArrowForwardIcon sx={{ fontSize: size }} className={className} />
);
export const IconArrowUp: React.FC<IconProps> = ({ size = 20, className }) => (
  <NorthEastIcon sx={{ fontSize: size }} className={className} />
);
export const IconCheck: React.FC<IconProps> = ({ size = 20, className }) => (
  <CheckIcon sx={{ fontSize: size }} className={className} />
);
export const IconMail: React.FC<IconProps> = ({ size = 20, className }) => (
  <EmailOutlinedIcon sx={{ fontSize: size }} className={className} />
);
export const IconSun: React.FC<IconProps> = ({ size = 20, className }) => (
  <LightModeOutlinedIcon sx={{ fontSize: size }} className={className} />
);
export const IconMoon: React.FC<IconProps> = ({ size = 20, className }) => (
  <DarkModeOutlinedIcon sx={{ fontSize: size }} className={className} />
);
export const IconTelegram: React.FC<IconProps> = ({ size = 20, className }) => (
  <TelegramIcon sx={{ fontSize: size }} className={className} />
);
export const IconSearch: React.FC<IconProps> = ({ size = 20, className }) => (
  <SearchIcon sx={{ fontSize: size }} className={className} />
);
export const IconCode: React.FC<IconProps> = ({ size = 20, className }) => (
  <CodeIcon sx={{ fontSize: size }} className={className} />
);
export const IconSocial: React.FC<IconProps> = ({ size = 20, className }) => (
  <ShareOutlinedIcon sx={{ fontSize: size }} className={className} />
);

// Brand icons available in MUI
export const IconFacebook: React.FC<IconProps> = ({ size = 20, className }) => (
  <FacebookIcon sx={{ fontSize: size }} className={className} />
);
export const IconInstagram: React.FC<IconProps> = ({ size = 20, className }) => (
  <InstagramIcon sx={{ fontSize: size }} className={className} />
);
export const IconWhatsApp: React.FC<IconProps> = ({ size = 20, className }) => (
  <WhatsAppIcon sx={{ fontSize: size }} className={className} />
);

// Meta — not in MUI, custom stroke SVG (∞ symbol)
const Stroke: React.FC<{ size?: number; children: React.ReactNode }> = ({ size = 20, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const IconMeta: React.FC<IconProps> = ({ size = 20 }) => (
  <Stroke size={size}>
    <path d="M2 12C2 9 4 7 6.5 7C9 7 10.3 9 12 12C13.7 15 15 17 17.5 17C20 17 22 15 22 12C22 9 20 7 17.5 7C15 7 13.7 9 12 12C10.3 15 9 17 6.5 17C4 17 2 15 2 12Z" />
  </Stroke>
);

export const IconGoogle: React.FC<IconProps> = ({ size = 20, className }) => (
  <GoogleIcon sx={{ fontSize: size }} className={className} />
);
