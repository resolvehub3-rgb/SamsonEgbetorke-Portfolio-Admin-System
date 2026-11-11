/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, GraduationCap, Loader2 } from 'lucide-react';
import { EducationItem } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';

interface EducationManagerProps {
  education: EducationItem[];
  onUpdated: () => void;
}

export const EducationManager: React.FC<EducationManagerProps> = ({ education, onUpdated }) => {
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setEditingItem({
      id: '',
      institution: '',
      qualification: '',
      details: '',
      status: 'completed',
      display_order: education.length + 1,
      is_visible: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: EducationItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete qualification "${name}"?`)) {
      await portfolioService.deleteEducation(id);
      onUpdated();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    try {
      await portfolioService.saveEducation(editingItem);
      onUpdated();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Failed to save education:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Education Management</h2>
          <p className="text-xs text-slate-400">
            Manage academic qualifications, ongoing degrees, and institutions in the database.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Qualification</span>
        </button>
      </div>

      <div className="space-y-3">
        {education.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-[#0e1b3d] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-semibold text-sky-400 font-mono">
                  {item.institution}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    item.status === 'in_progress'
                      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                      : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                  }`}
                >
                  {item.status === 'in_progress' ? 'Currently Pursuing' : 'Completed'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{item.qualification}</h3>
              {item.details && <p className="text-xs text-slate-300">{item.details}</p>}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Edit qualification"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.institution)}
                className="p-2 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition-colors"
                title="Delete qualification"
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
                {editingItem.id ? 'Edit Qualification' : 'Add Qualification'}
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
                <label className="text-xs font-medium text-slate-300">Institution *</label>
                <input
                  type="text"
                  required
                  value={editingItem.institution}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, institution: e.target.value })
                  }
                  placeholder="e.g. Accra Institute of Technology (AIT)"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Qualification Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.qualification}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, qualification: e.target.value })
                  }
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Details / Coursework</label>
                <textarea
                  rows={3}
                  value={editingItem.details || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, details: e.target.value })
                  }
                  placeholder="Visual Arts, Graphic Design, Elective ICT..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Status</label>
                  <select
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as 'in_progress' | 'completed',
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="in_progress">Currently Pursuing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.display_order}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        display_order: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
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
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
