/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Lightbulb, Target, HeartHandshake } from 'lucide-react';
import { Profile } from '../../types/portfolio.ts';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 border-t border-slate-800/80 bg-[#0e1b3d]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <Compass className="w-4 h-4" />
            <span>Background &amp; Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About Samson Egbetorke
          </h2>
          <p className="text-base text-slate-400 max-w-2xl">
            From humble beginnings in Ghana's Volta Region to building full-stack SaaS
            platforms and business management systems in Accra.
          </p>
        </div>

        {/* 2-Column Split: Story on the left, Pillars on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Approved Biography */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg">
            {profile.bio.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column: Core Drivers & Ambition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Problem-Driven Engineering</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Software development is not about writing code for its own sake. It begins by observing
                delays in salons, manual math in provision shops, or lost paper stock in retail
                stores, and translating those observations into practical automated tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Long-Term Ambition</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To become an outstanding technology innovator, contributing to Ghana's and Africa's
                technological advancement by building scalable, meaningful digital products that
                modernize commercial infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Practical Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Building with real databases, confirmed feature sets, and transparent communication.
                Every system in this portfolio is grounded in authentic execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
