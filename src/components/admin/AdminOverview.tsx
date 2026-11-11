/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Layers,
  FolderGit2,
  FileEdit,
  CheckCircle2,
  Clock,
  Mail,
  MailWarning,
  Plus,
  ExternalLink,
  Database,
  ArrowRight,
} from 'lucide-react';
import { ProjectItem, ContactEnquiryItem } from '../../types/portfolio.ts';
import { calculateProjectStats, calculateEnquiryStats } from '../../utils/portfolioLogic.ts';
import { isSupabaseConfigured } from '../../lib/supabase.ts';

interface AdminOverviewProps {
  projects: ProjectItem[];
  enquiries: ContactEnquiryItem[];
  onNavigateTab: (tab: string) => void;
  onNewProject: () => void;
  onViewLiveSite: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  projects,
  enquiries,
  onNavigateTab,
  onNewProject,
  onViewLiveSite,
}) => {
  const projectStats = calculateProjectStats(projects);
  const enquiryStats = calculateEnquiryStats(enquiries);
  const configured = isSupabaseConfigured();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-sky-400 font-semibold">SamTeck Console</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                configured
                  ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                  : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
              }`}
            >
              {configured ? 'Supabase Connected' : 'Local / Preview Mode'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Samson's Portfolio Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time control over all public portfolio pages, projects, services, and enquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onNewProject}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Project</span>
          </button>
          <button
            onClick={onViewLiveSite}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>
        </div>
      </div>

      {/* Real Statistics Grid (calculated from database records) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Published Projects */}
        <div className="p-4 rounded-xl bg-[#0e1b3d]/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-sky-400">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Public</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {projectStats.published}
          </div>
          <p className="text-[11px] text-slate-400">Published Projects</p>
        </div>

        {/* Completed */}
        <div className="p-4 rounded-xl bg-[#0e1b3d]/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Status</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {projectStats.completed}
          </div>
          <p className="text-[11px] text-slate-400">Completed Projects</p>
        </div>

        {/* Working */}
        <div className="p-4 rounded-xl bg-[#0e1b3d]/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-sky-400">
            <FolderGit2 className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Status</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {projectStats.working}
          </div>
          <p className="text-[11px] text-slate-400">Working Systems</p>
        </div>

        {/* Under Development */}
        <div className="p-4 rounded-xl bg-[#0e1b3d]/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Status</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {projectStats.underDevelopment}
          </div>
          <p className="text-[11px] text-slate-400">In Development</p>
        </div>

        {/* Drafts */}
        <div className="p-4 rounded-xl bg-[#0e1b3d]/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <FileEdit className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">State</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {projectStats.drafts}
          </div>
          <p className="text-[11px] text-slate-400">Draft Projects</p>
        </div>

        {/* Unread Enquiries */}
        <div className="p-4 rounded-xl bg-[#0e1b3d]/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-sky-400">
            {enquiryStats.unread > 0 ? (
              <MailWarning className="w-4 h-4 text-amber-400" />
            ) : (
              <Mail className="w-4 h-4" />
            )}
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Inbox</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {enquiryStats.unread}
          </div>
          <p className="text-[11px] text-slate-400">
            Unread of {enquiryStats.total}
          </p>
        </div>
      </div>

      {/* Quick Launch & Content Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects Quick Table */}
        <div className="p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Managed Projects</h3>
            <button
              onClick={() => onNavigateTab('projects')}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-semibold text-white">{p.name}</h4>
                  <p className="text-[11px] text-slate-400">{p.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  {p.is_featured && (
                    <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                      Featured
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-slate-300">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Connection / Enquiries Status */}
        <div className="p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Database Architecture</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Supabase PostgreSQL &amp; Storage
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All portfolio content (projects, skills, education, experience, biography, services, and enquiries)
              is stored in relational tables protected with Row Level Security (RLS).
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('settings')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#173D78] hover:bg-sky-600 rounded-lg transition-colors cursor-pointer"
            >
              Configure Supabase Keys
            </button>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              View Inbound Enquiries ({enquiryStats.total})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
