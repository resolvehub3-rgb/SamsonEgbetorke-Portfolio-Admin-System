/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Layers, Eye, EyeOff, Loader2 } from 'lucide-react';
import { ServiceItem } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';

interface ServicesManagerProps {
  services: ServiceItem[];
  onUpdated: () => void;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({ services, onUpdated }) => {
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setEditingItem({
      id: '',
      title: '',
      description: '',
      icon_name: 'Code',
      display_order: services.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: ServiceItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete service "${title}"?`)) {
      await portfolioService.deleteService(id);
      onUpdated();
    }
  };

  const handleTogglePublished = async (item: ServiceItem) => {
    await portfolioService.saveService({
      ...item,
      is_published: !item.is_published,
    });
    onUpdated();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    try {
      await portfolioService.saveService(editingItem);
      onUpdated();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Failed to save service:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Services Management</h2>
          <p className="text-xs text-slate-400">
            Configure commercial software development offerings and SaaS capabilities.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-xl bg-[#0e1b3d] border ${
              service.is_published ? 'border-slate-800' : 'border-slate-800/40 opacity-70'
            } space-y-3 flex flex-col justify-between`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-sky-400 uppercase">
                  {service.icon_name}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    service.is_published
                      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                      : 'text-slate-400 border-slate-600 bg-slate-800'
                  }`}
                >
                  {service.is_published ? 'Published' : 'Hidden'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{service.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleTogglePublished(service)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                {service.is_published ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                    <span>Unpublish</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Publish</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0B1530] border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingItem.id ? 'Edit Service' : 'Add Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  placeholder="e.g. Custom Software Development"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Icon Identifier
                </label>
                <select
                  value={editingItem.icon_name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, icon_name: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Code">Code (Software)</option>
                  <option value="Layers">Layers (SaaS Platforms)</option>
                  <option value="Cpu">Cpu (AI Solutions)</option>
                  <option value="Database">Database (Relational &amp; RLS)</option>
                  <option value="Building2">Building2 (Business Operations)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Summary of service scope and client outcomes..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published_checkbox"
                  checked={editingItem.is_published}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_published: e.target.checked,
                    })
                  }
                  className="rounded bg-slate-900 border-slate-700 text-sky-500"
                />
                <label htmlFor="published_checkbox" className="text-xs text-slate-300 cursor-pointer">
                  Publish on public portfolio
                </label>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
