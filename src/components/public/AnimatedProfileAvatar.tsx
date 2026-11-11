/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Profile } from '../../types/portfolio.ts';

interface AnimatedProfileAvatarProps {
  profile: Profile;
}

interface ProgrammingLanguageBadge {
  id: string;
  name: string;
  category: string;
  accentColor: string;
  bgGlow: string;
  borderColor: string;
  iconSvg: React.ReactNode;
}

// Authentic programming languages and core technologies Samson uses (NO emojis)
const PROGRAMMING_LANGUAGES: ProgrammingLanguageBadge[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Core Language',
    accentColor: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.35)',
    borderColor: 'border-sky-400/60',
    iconSvg: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C8.5 2 6 3.5 6 6v3h6v1H5C3 10 2 12 2 14.5S3.5 19 6 19h2v-3c0-2 1.5-3.5 3.5-3.5h5c1.5 0 2.5-1 2.5-2.5V6c0-2.5-2.5-4-7-4z" fill="currentColor" fillOpacity="0.25" />
        <path d="M12 22c3.5 0 6-1.5 6-4v-3h-6v-1h7c2 0 3-2 3-4.5S20.5 5 18 5h-2v3c0 2-1.5 3.5-3.5 3.5h-5C6 11.5 5 12.5 5 14v4c0 2.5 2.5 4 7 4z" stroke="currentColor" />
        <circle cx="8.5" cy="5.5" r="1.1" fill="currentColor" />
        <circle cx="15.5" cy="18.5" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Typed Language',
    accentColor: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.4)',
    borderColor: 'border-sky-400/70',
    iconSvg: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#173D78" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M6 9h6m-3 0v9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 16c.8.8 2 1.2 3.2.7.9-.4 1.3-1.4.9-2.3-.3-.7-1.1-1.1-1.9-1.3-.9-.2-1.8-.5-2.2-1.1-.5-.8-.2-1.9.6-2.5 1.1-.7 2.6-.5 3.5.2" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Core Language',
    accentColor: '#F59E0B',
    bgGlow: 'rgba(245, 158, 11, 0.35)',
    borderColor: 'border-amber-400/60',
    iconSvg: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#0B1530" stroke="#F59E0B" strokeWidth="1.5" />
        <path d="M8 11v6c0 .8-.5 1.5-1.5 1.5H5.5" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M12.5 17.5c.7.6 1.6.9 2.5.6.8-.3 1.2-1.1.9-1.9-.3-.6-.9-.9-1.5-1.1-.8-.2-1.5-.4-1.9-.9-.4-.7-.2-1.6.5-2.1.9-.6 2.1-.5 2.8.1" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Database Language',
    accentColor: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.35)',
    borderColor: 'border-sky-500/60',
    iconSvg: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#38BDF8" fill="#173D78" fillOpacity="0.5" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#38BDF8" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    category: 'UI Architecture',
    accentColor: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.4)',
    borderColor: 'border-sky-400/60',
    iconSvg: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="2.2" fill="#38BDF8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#38BDF8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#38BDF8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#38BDF8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend Runtime',
    accentColor: '#10B981',
    bgGlow: 'rgba(16, 185, 129, 0.35)',
    borderColor: 'border-emerald-500/60',
    iconSvg: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l8 4.6v9.2L12 20.4 4 15.8V6.6L12 2z" stroke="#10B981" fill="#0B1530" />
        <path d="M12 6.5v8m-4-5l8 4.6m-8 0l8-4.6" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const AnimatedProfileAvatar: React.FC<AnimatedProfileAvatarProps> = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeBadge, setActiveBadge] = useState<ProgrammingLanguageBadge | null>(null);

  const totalBadges = PROGRAMMING_LANGUAGES.length;

  return (
    <div
      className="relative isolate flex items-center justify-center w-full max-w-[480px] h-[380px] sm:h-[480px] mx-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveBadge(null);
      }}
    >
      {/* =========================================================================
          BACKGROUND ANIMATED TECH RINGS & ORBITAL SYSTEM (z-0 to z-10)
          ========================================================================= */}

      {/* Layer 0: Ambient Radial Glow behind the whole system */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#173D78]/50 via-sky-500/20 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Layer 1: Outer Static Guide Ring with Precision Tick Marks */}
      <div className="absolute w-[290px] sm:w-[430px] h-[290px] sm:h-[430px] rounded-full border border-slate-700/50 pointer-events-none z-0 flex items-center justify-center">
        {/* Subtle dashed radar track */}
        <div className="absolute inset-0 rounded-full border border-dashed border-sky-500/20" />
      </div>

      {/* Layer 2: Counter-Rotating Fine Radar & Coordinate Ring */}
      <motion.div
        className="absolute w-[250px] sm:w-[380px] h-[250px] sm:h-[380px] rounded-full border border-dashed border-sky-400/25 pointer-events-none z-0"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: 'linear',
        }}
      >
        {/* Coordinate indicator nodes on the inner ring */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
        <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
      </motion.div>

      {/* Layer 3: Main Animated Rotating Orbit Ring Carrying Samson's Programming Languages */}
      <motion.div
        className="absolute w-[230px] sm:w-[370px] h-[230px] sm:h-[370px] rounded-full z-10 pointer-events-auto"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: isHovered ? 55 : 28, // Smooth speed reduction on hover for easy inspection
          ease: 'linear',
        }}
        aria-label="Orbiting programming languages used by Samson Egbetorke"
      >
        {/* Orbital Track Visual Path */}
        <div className="absolute inset-0 rounded-full border-2 border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]" />

        {/* Orbiting Language Badges (Equidistant around perimeter with Counter-Rotation) */}
        {PROGRAMMING_LANGUAGES.map((lang, index) => {
          // Angle in radians
          const angle = (index * 2 * Math.PI) / totalBadges;
          // Percentage coordinates from center (50% + 50% * cos/sin)
          const xPercent = 50 + 50 * Math.cos(angle);
          const yPercent = 50 + 50 * Math.sin(angle);

          return (
            <div
              key={lang.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
              style={{
                top: `${yPercent}%`,
                left: `${xPercent}%`,
              }}
            >
              {/* Counter-rotation container: ensures badge text & logo stay upright at all times! */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: isHovered ? 55 : 28,
                  ease: 'linear',
                }}
              >
                <div
                  onMouseEnter={() => setActiveBadge(lang)}
                  onMouseLeave={() => setActiveBadge(null)}
                  className={`group flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#0B1530] border ${lang.borderColor} shadow-xl transition-all duration-300 cursor-pointer hover:scale-115 hover:border-sky-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.5)]`}
                  style={{
                    boxShadow: `0 4px 14px ${lang.bgGlow}`,
                  }}
                  title={`${lang.name} — ${lang.category}`}
                >
                  {/* Clean SVG Vector Icon (No emojis) */}
                  <span className="text-slate-100 group-hover:text-white transition-colors">
                    {lang.iconSvg}
                  </span>

                  {/* Clean Typographic Language Name */}
                  <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wide text-white group-hover:text-sky-300">
                    {lang.name}
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* =========================================================================
          FOREGROUND: ANIMATED PROFILE AVATAR CONTAINER (z-30)
          ========================================================================= */}
      <motion.div
        className="relative z-30 flex flex-col items-center"
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          repeat: Infinity,
          duration: 5.5,
          ease: 'easeInOut',
        }}
      >
        {/* Pulsing Backlight Halo directly behind the photo */}
        <motion.div
          className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#173D78] via-sky-500/40 to-[#F59E0B]/25 blur-lg pointer-events-none z-0"
          animate={{
            opacity: [0.6, 0.95, 0.6],
            scale: [0.97, 1.03, 0.97],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: 'easeInOut',
          }}
        />

        {/* Circular Avatar Frame with High-Tech Beveled Border */}
        <div className="relative w-36 h-36 sm:w-52 sm:h-52 rounded-full p-1 sm:p-1.5 bg-gradient-to-b from-sky-400 via-[#173D78] to-slate-900 shadow-[0_0_40px_rgba(11,21,48,0.95)] z-10">
          {/* Inner Rotating Light Trim & Photo Container */}
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0B1530] bg-[#0e1b3d] relative">
            <img
              src={profile.avatar_url || '/src/assets/images/samson_profile_portrait_1794388187201.jpg'}
              alt="Samson Egbetorke - Founder of SamTeck Digital"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
            />

            {/* Subtle Gradient Vignette to ground the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530]/80 via-transparent to-transparent pointer-events-none" />

            {/* Subtle interactive scanline highlight on hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-sky-400/15 to-transparent pointer-events-none"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              />
            )}
          </div>
        </div>

        {/* Floating Identity & Status Chip anchored below the avatar */}
        <div className="absolute -bottom-4 z-40 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1530] border border-sky-400/50 shadow-2xl backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-100 tracking-wide">
              {activeBadge ? `${activeBadge.name} · ${activeBadge.category}` : 'Founder · SamTeck Digital'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
