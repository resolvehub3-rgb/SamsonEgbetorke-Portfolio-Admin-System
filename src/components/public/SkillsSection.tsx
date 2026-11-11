/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal, Check } from 'lucide-react';
import { SkillCategory } from '../../types/portfolio.ts';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  return (
    <section id="skills" className="py-20 border-t border-slate-800/80 bg-[#0e1b3d]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <Terminal className="w-4 h-4" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Confirmed Technical Stack
          </h2>
          <p className="text-base text-slate-400 max-w-2xl">
            Only genuine, active technologies and tools utilized in Samson's software projects,
            SaaS builds, and database architectures. No fabricated or unverified skills.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {category.name}
                </h3>
                <span className="text-[11px] font-mono text-sky-400">
                  {category.skills?.length || 0} Tools
                </span>
              </div>

              {/* Skills list - clean unboxed typography with subtle checkmark */}
              <div className="space-y-2.5">
                {category.skills
                  ?.filter((s) => s.is_visible)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between text-xs text-slate-300 py-1 px-2 rounded hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-400" />
                        <span className="font-medium text-slate-200">{skill.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Verified</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
