/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, Globe, CheckCircle2, Cpu, Wrench, Shield, UserCheck, Layers } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio.ts';
import { ProjectPlaceholder } from '../common/ProjectPlaceholder.tsx';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'Working':
        return 'text-sky-400 border-sky-500/40 bg-sky-500/10';
      case 'Under Development':
        return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      case 'Concept':
        return 'text-slate-400 border-slate-500/40 bg-slate-500/10';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0B1530] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-[#0B1530]/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
              <span>{project.category}</span>
              {project.attribution && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400">{project.attribution}</span>
                </>
              )}
            </div>
            <h2 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(
                project.status
              )}`}
            >
              {project.status}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Media Section: Image or Architectural Blueprint */}
          <div>
            {project.cover_image_url ? (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 max-h-96">
                <img
                  src={project.cover_image_url}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <ProjectPlaceholder
                title={project.name}
                category={project.category}
                status={project.status}
                className="h-64 sm:h-72"
              />
            )}
          </div>

          {/* Quick Links & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Samson's Role
              </span>
              <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-sky-400" />
                <span>{project.owner_role}</span>
              </p>
            </div>

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Live Application</span>
              </a>
            )}
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#0e1b3d] border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>The Problem Identified</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem_statement}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0e1b3d] border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>The Solution Developed</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution_description}
              </p>
            </div>
          </div>

          {/* Confirmed Implemented Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmed Implemented Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Confirmed Technology Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-sky-200 bg-[#173D78]/40 border border-sky-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contributions & Architecture Notes */}
          {project.contributions && (
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-sky-400" />
                <span>Engineering Contributions &amp; Implementation Details</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.contributions}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#0B1530] border-t border-slate-800 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            SamTeck Digital Portfolio Case Study
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
