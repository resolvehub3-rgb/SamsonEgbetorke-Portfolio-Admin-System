/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Briefcase, Eye, EyeOff, Loader2 } from 'lucide-react';
import { WorkExperienceItem } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';

interface ExperienceManagerProps {
  experience: WorkExperienceItem[];
  onUpdated: () => void;
}

export const ExperienceManager: React.FC<ExperienceManagerProps> = ({ experience, onUpdated }) => {
  const [editingItem, setEditingItem] = useState<WorkExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setEditingItem({
      id: '',
      role_title: '',
      company_or_org: '',
      description: '',
      start_date: '',
      end_date: '',
      is_current: false,
      display_order: experience.length + 1,
      is_visible: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: WorkExperienceItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, role: string) => {
    if (confirm(`Delete experience entry "${role}"?`)) {
      await portfolioService.deleteExperience(id);
      onUpdated();
    }
  };

  const handleToggleVisibility = async (item: WorkExperienceItem) => {
    await portfolioService.saveExperience({
      ...item,
      is_visible: !item.is_visible,
    });
    onUpdated();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    try {
      await portfolioService.saveExperience(editingItem);
      onUpdated();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Failed to save experience:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Work Experience Manager</h2>
          <p className="text-xs text-slate-400">
            Record real professional journey positions with authentic descriptions and attribution.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-3">
        {experience.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl bg-[#0e1b3d] border ${
              item.is_visible ? 'border-slate-800' : 'border-slate-800/40 opacity-70'
            } flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-semibold text-sky-400 font-mono">
                  {item.company_or_org}
                </span>
                {item.start_date && (
                  <span className="text-[11px] font-mono text-slate-400">
                    ({item.start_date} – {item.end_date || 'Present'})
                  </span>
                )}
                {item.is_current && (
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                    Current
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white">{item.role_title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleToggleVisibility(item)}
                className={`p-2 rounded hover:bg-slate-800 transition-colors ${
                  item.is_visible ? 'text-slate-400 hover:text-white' : 'text-amber-400'
                }`}
                title={item.is_visible ? 'Hide from public portfolio' : 'Visible on public portfolio'}
              >
                {item.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="p-2 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Edit entry"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.role_title)}
                className="p-2 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition-colors"
                title="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0B1530] border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingItem.id ? 'Edit Experience' : 'Add Experience Position'}
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
                <label className="text-xs font-medium text-slate-300">Role Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.role_title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, role_title: e.target.value })
                  }
                  placeholder="e.g. Independent Technology Developer"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.company_or_org}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, company_or_org: e.target.value })
                  }
                  placeholder="e.g. SamTeck Digital"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Start Date</label>
                  <input
                    type="text"
                    value={editingItem.start_date || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, start_date: e.target.value })
                    }
                    placeholder="2023"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">End Date</label>
                  <input
                    type="text"
                    value={editingItem.end_date || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, end_date: e.target.value })
                    }
                    placeholder="Present"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Honest description of duties and learnings..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.is_current}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_current: e.target.checked })
                    }
                    className="rounded bg-slate-900 border-slate-700 text-sky-500"
                  />
                  <span className="text-xs text-slate-300">Current Position</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.is_visible}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_visible: e.target.checked })
                    }
                    className="rounded bg-slate-900 border-slate-700 text-sky-500"
                  />
                  <span className="text-xs text-slate-300">Visible on Public Site</span>
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
                  <span>Save Position</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
