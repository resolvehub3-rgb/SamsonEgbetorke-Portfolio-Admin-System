/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, Database, ShieldCheck, Terminal, Smartphone } from 'lucide-react';

interface ProjectPlaceholderProps {
  title: string;
  category: string;
  className?: string;
  status?: string;
}

export const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({
  title,
  category,
  className = 'h-52',
  status,
}) => {
  return (
    <div
      className={`relative w-full ${className} bg-[#0e1b3d] border border-slate-700/50 rounded-xl overflow-hidden flex flex-col justify-between p-6 select-none`}
    >
      {/* Background blueprint subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px), linear-gradient(to right, #38BDF8 1px, transparent 1px 40px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px 40px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Header bar inside placeholder */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <span className="text-[11px] font-mono text-slate-400 ml-2 tracking-wider">
            SYSTEM ARCHITECTURE
          </span>
        </div>
        {status && (
          <span className="text-[11px] font-mono text-sky-400">
            {status.toUpperCase()}
          </span>
        )}
      </div>

      {/* Center diagram elements */}
      <div className="relative z-10 my-auto text-center py-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 mb-2">
          {category.toLowerCase().includes('pos') || category.toLowerCase().includes('retail') ? (
            <Layers className="w-6 h-6" />
          ) : category.toLowerCase().includes('booking') ? (
            <Smartphone className="w-6 h-6" />
          ) : category.toLowerCase().includes('school') ? (
            <Database className="w-6 h-6" />
          ) : category.toLowerCase().includes('complaint') ? (
            <ShieldCheck className="w-6 h-6" />
          ) : (
            <Terminal className="w-6 h-6" />
          )}
        </div>
        <h4 className="text-sm font-semibold text-white tracking-tight">{title}</h4>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{category}</p>
      </div>

      {/* Footer metadata */}
      <div className="relative z-10 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>SamTeck Engine</span>
        <span className="text-slate-400">Awaiting Screenshot</span>
      </div>
    </div>
  );
};
