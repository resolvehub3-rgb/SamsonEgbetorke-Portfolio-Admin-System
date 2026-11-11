/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { EducationItem, WorkExperienceItem, AchievementItem } from '../../types/portfolio.ts';

interface ExperienceSectionProps {
  education: EducationItem[];
  experience: WorkExperienceItem[];
  achievements: AchievementItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  education,
  experience,
  achievements,
}) => {
  return (
    <section id="experience" className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <Briefcase className="w-4 h-4" />
            <span>Honest Background &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Experience, Education &amp; Achievements
          </h2>
          <p className="text-base text-slate-400 max-w-2xl">
            A real-world journey spanning practical labour, visual communications, education,
            security operations, academic degree studies, and independent software development.
          </p>
        </div>

        {/* 2-Column Grid: Work Experience on left, Education & Achievements on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Column 1: Work Experience */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3">
              <Briefcase className="w-4 h-4 text-sky-400" />
              <span>Professional Journey &amp; Work Experience</span>
            </div>

            <div className="space-y-6 relative border-l-2 border-slate-800 ml-3 pl-6">
              {experience
                .filter((e) => e.is_visible)
                .map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                        item.is_current
                          ? 'bg-sky-400 border-[#0B1530]'
                          : 'bg-slate-700 border-[#0B1530]'
                      }`}
                    />

                    <div className="p-5 rounded-xl bg-[#0e1b3d]/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-mono text-sky-400 font-semibold">
                          {item.company_or_org}
                        </span>
                        {item.start_date && (
                          <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {item.start_date} – {item.end_date || 'Present'}
                            </span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white">{item.role_title}</h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 2: Education & Verified Achievements */}
          <div className="space-y-12">
            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>Formal Education &amp; Academic Qualifications</span>
              </div>

              <div className="space-y-4">
                {education
                  .filter((e) => e.is_visible)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-xl bg-[#0e1b3d]/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-sky-400">
                          {item.institution}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                            item.status === 'in_progress'
                              ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                              : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                          }`}
                        >
                          {item.status === 'in_progress' ? (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>Currently Pursuing</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Completed</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">{item.qualification}</h3>

                      {item.details && (
                        <p className="text-xs sm:text-sm text-slate-300">{item.details}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Achievements & Milestones */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3">
                <Award className="w-4 h-4 text-sky-400" />
                <span>Verified Milestones</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                        {ach.event_date && (
                          <span className="text-[11px] font-mono text-slate-400">
                            {ach.event_date}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
