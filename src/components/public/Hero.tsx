/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Mail, Code2, Database, Shield, Zap } from 'lucide-react';
import { Profile } from '../../types/portfolio.ts';
import { AnimatedProfileAvatar } from './AnimatedProfileAvatar.tsx';

interface HeroProps {
  profile: Profile;
  onViewProjects: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onViewProjects, onContact }) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden">
      {/* Subtle radial ambient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#173D78]/25 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-screen Hero (Left: Typographic hierarchy, Right: Portrait container) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed kicker (No pill enclosure) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <span>{profile.business_name}</span>
              <span aria-hidden="true">·</span>
              <span>Accra, Ghana</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] text-balance">
              Building practical software and systems that solve real problems.
            </h1>

            {/* Professional Title & Positioning */}
            <div className="space-y-3">
              <p className="text-lg sm:text-xl font-medium text-sky-300">
                {profile.title}
              </p>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {profile.short_intro}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onViewProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600 rounded-lg shadow-md transition-all cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-[#173D78]/60 hover:bg-[#173D78] border border-slate-700 hover:border-sky-400/50 rounded-lg transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right Column: Animated Profile Avatar with Orbital Programming Languages Ring */}
          <div className="lg:col-span-5 flex justify-center items-center py-4">
            <AnimatedProfileAvatar profile={profile} />
          </div>
        </div>

        {/* Engineering Philosophy Proof Strip (Full-width row below the split) */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Product First</span>
            </div>
            <p className="text-xs text-slate-400">
              End-to-end practical SaaS platforms and business management tools.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400">
              <Database className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Relational Core</span>
            </div>
            <p className="text-xs text-slate-400">
              PostgreSQL, Supabase, and Neon database architectures with strict RLS.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Real Solutions</span>
            </div>
            <p className="text-xs text-slate-400">
              Solving manual paperwork, appointment friction, and inventory loss.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Production Grade</span>
            </div>
            <p className="text-xs text-slate-400">
              Live deployments, automated SMS reminders, and seamless QR integrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
