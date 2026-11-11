/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070e22] border-t border-slate-800/80 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Attribution */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Samson Egbetorke
            </h3>
            <p className="text-xs font-medium text-sky-400">
              Founder of SamTeck Digital · Accra, Ghana
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Practical software engineering, multi-tenant SaaS platforms, retail point-of-sale
              solutions, and robust database architectures. Built with verified data and real code.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/samteckdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-400 border border-slate-700/60 flex items-center justify-center transition-colors text-slate-300"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/samsonegbetorke"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-400 border border-slate-700/60 flex items-center justify-center transition-colors text-slate-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:samtechdigital@gmail.com"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-400 border border-slate-700/60 flex items-center justify-center transition-colors text-slate-300"
                aria-label="Email Samson"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('projects')}
                className="text-left text-slate-400 hover:text-sky-400 transition-colors py-1 cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left text-slate-400 hover:text-sky-400 transition-colors py-1 cursor-pointer"
              >
                About &amp; Journey
              </button>
              <button
                onClick={() => onNavigate('skills')}
                className="text-left text-slate-400 hover:text-sky-400 transition-colors py-1 cursor-pointer"
              >
                Technical Stack
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-slate-400 hover:text-sky-400 transition-colors py-1 cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => onNavigate('experience')}
                className="text-left text-slate-400 hover:text-sky-400 transition-colors py-1 cursor-pointer"
              >
                Experience &amp; Edu
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left text-slate-400 hover:text-sky-400 transition-colors py-1 cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Administration & System Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              System Access
            </h4>
            <p className="text-xs text-slate-400">
              Private content management and database oversight console.
            </p>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-sky-300 bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/50 rounded-lg transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Samson Egbetorke · SamTeck Digital. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
