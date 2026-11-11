/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  User,
  GraduationCap,
  Briefcase,
  Terminal,
  Server,
  Award,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';

interface AdminLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onViewLiveSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onViewLiveSite,
  children,
}) => {
  const { user, signOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects CMS', icon: Layers },
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Stack', icon: Terminal },
    { id: 'services', label: 'Services', icon: Server },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'enquiries', label: 'Enquiries', icon: Mail },
    { id: 'settings', label: 'Settings & Supabase', icon: Settings },
  ];

  const handleSelectTab = (tabId: string) => {
    onTabChange(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070e22] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0B1530] border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-sky-400" />
          <span className="font-bold text-sm text-white">SamTeck Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onViewLiveSite}
            className="p-2 text-slate-400 hover:text-white"
            title="View Public Site"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (260px) */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 bg-[#0B1530] border-r border-slate-800 shrink-0 md:sticky md:top-0 md:h-screen z-30 transition-all`}
      >
        {/* Brand Lockup */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">SamTeck Portal</h1>
              <p className="text-[10px] text-sky-400 font-mono">Administration System</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-400/50 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-sky-300 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: User identity & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <button
            onClick={onViewLiveSite}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </button>

          <div className="flex items-center justify-between pt-2 text-xs">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-medium text-slate-200 truncate">
                {user?.email || 'samtechdigital@gmail.com'}
              </p>
              <p className="text-[10px] text-sky-400 font-mono">Authorized Admin</p>
            </div>

            <button
              onClick={() => signOut()}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="hidden md:flex h-16 border-b border-slate-800 bg-[#0B1530]/60 backdrop-blur px-8 items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-white capitalize font-semibold">{currentTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewLiveSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
