/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, CheckCircle2, Globe, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio.ts';
import { ProjectPlaceholder } from '../common/ProjectPlaceholder.tsx';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getStatusColor = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Working':
        return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
      case 'Under Development':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'Concept':
        return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
      default:
        return 'text-slate-300 border-slate-700 bg-slate-800';
    }
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative bg-[#0e1b3d] hover:bg-[#12224d] border border-slate-800 hover:border-sky-500/40 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-lg"
    >
      {/* Top Media Header: Actual image if provided, else neutral blueprint placeholder */}
      <div className="relative overflow-hidden">
        {project.cover_image_url ? (
          <div className="h-52 w-full overflow-hidden bg-slate-900">
            <img
              src={project.cover_image_url}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <ProjectPlaceholder
            title={project.name}
            category={project.category}
            status={project.status}
            className="h-52"
          />
        )}

        {/* Live link indicator if present */}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900/90 hover:bg-sky-600 rounded-md backdrop-blur-sm border border-slate-700 shadow-sm transition-colors"
          >
            <Globe className="w-3 h-3 text-sky-400" />
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata line with status */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium text-sky-400 line-clamp-1">{project.category}</span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
            {project.name}
          </h3>

          {/* Short description */}
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {project.short_description}
          </p>

          {/* Confirmed features snippet */}
          {project.features && project.features.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Key Capabilities:
              </span>
              <ul className="space-y-1">
                {project.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tech Stack & Action Footer */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-mono text-slate-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1 text-xs font-semibold text-sky-400 group-hover:text-sky-300">
            <span>Explore Case Study</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
