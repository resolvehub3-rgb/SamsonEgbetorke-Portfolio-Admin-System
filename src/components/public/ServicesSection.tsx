/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Code,
  Layers,
  Cpu,
  Database,
  Building2,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { ServiceItem } from '../../types/portfolio.ts';

interface ServicesSectionProps {
  services: ServiceItem[];
  onContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onContact }) => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'layers':
      case 'cloud':
        return <Layers className="w-5 h-5" />;
      case 'cpu':
        return <Cpu className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
      case 'building2':
        return <Building2 className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Layers className="w-4 h-4" />
              <span>Commercial &amp; Technical Offerings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Professional Engineering Services
            </h2>
            <p className="text-base text-slate-400 max-w-2xl">
              Specialized development capabilities focused on digitizing business operations,
              building custom SaaS architectures, and integrating robust database layers.
            </p>
          </div>

          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#173D78] hover:bg-sky-600 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>Discuss a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter((s) => s.is_published)
            .map((service, index) => (
              <div
                key={service.id}
                className="p-8 rounded-2xl bg-[#0e1b3d] border border-slate-800/80 hover:border-sky-500/40 space-y-4 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
                      {getIcon(service.icon_name)}
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      0{index + 1}.
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-sky-400">
                    SamTeck Engineering
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
