/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ProjectItem } from '../../types/portfolio.ts';
import { ProjectCard } from './ProjectCard.tsx';
import { Search, Filter, Layers } from 'lucide-react';

interface FeaturedProjectsProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredList = useMemo(() => {
    return projects.filter((p) => p.is_featured && p.publishing_status === 'published');
  }, [projects]);

  const filteredAllProjects = useMemo(() => {
    return projects
      .filter((p) => p.publishing_status === 'published')
      .filter((p) => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'featured') return p.is_featured;
        return p.status.toLowerCase() === activeFilter.toLowerCase();
      })
      .filter((p) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [projects, activeFilter, searchQuery]);

  return (
    <section id="projects" className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Layers className="w-4 h-4" />
              <span>Engineered Products &amp; Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Software Projects &amp; SaaS Systems
            </h2>
            <p className="text-base text-slate-400 max-w-2xl">
              Practical applications engineered to digitise operations, eliminate paper logs,
              and streamline daily business workflows in real commercial environments.
            </p>
          </div>

          {/* Interactive filter buttons (allowed segmented controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'featured', label: 'Featured' },
              { id: 'working', label: 'Working' },
              { id: 'completed', label: 'Completed' },
              { id: 'under development', label: 'In Dev' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project name or technology (e.g. React, Supabase)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/60 border border-slate-800 focus:border-sky-500 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Project Cards Grid */}
        {filteredAllProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAllProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0e1b3d]/40 rounded-2xl border border-dashed border-slate-800 p-8">
            <p className="text-sm text-slate-400">No projects match the selected criteria.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
